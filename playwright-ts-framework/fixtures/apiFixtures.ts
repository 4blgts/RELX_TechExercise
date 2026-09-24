import { test as base, expect, request, type APIRequestContext } from '@playwright/test';

// Define the fixture type
type MyFixtures = {
  authRequest: APIRequestContext;
};

//This will catch the token generated
let cachedToken: string | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken) {
    return cachedToken;
  }

  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;

  if (!username || !password) {
    throw new Error('Missing AUTH_USERNAME or AUTH_PASSWORD environment variables.');
  }

  const loginContext = await request.newContext();

  try {
    const loginResponse = await loginContext.post(process.env.API_BASE_URL + '/auth', {
      data: {
        username,
        password,
      },
    });

    if (!loginResponse.ok()) {
      throw new Error(`Authentication failed: ${loginResponse.status()} ${loginResponse.statusText()}`);
    }

    const body = (await loginResponse.json()) as { token?: string };

    if (!body.token) {
      throw new Error('Authentication response did not include a token.');
    }

    cachedToken = body.token;
    return cachedToken;
  } finally {
    await loginContext.dispose();
  }
}

async function createAuthenticatedContext(): Promise<APIRequestContext> {
  const token = await getAccessToken();

  const authenticatedContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  authenticatedContext.on('request', (req) => {
    console.log(`🚀 [API REQUEST] ${req.method()} -> ${req.url()}`);
    if (req.postData()) {
      console.log(`📦 Payload: ${req.postData()}`);
    }
  });

  authenticatedContext.on('response', (res) => {
    console.log(`🎯 [API RESPONSE] Status: ${res.status()} ${res.statusText()} <- ${res.url()}`);
  });

  return authenticatedContext;
}

export const test = base.extend<MyFixtures>({
  request: async ({}, use) => {
    const authenticatedContext = await createAuthenticatedContext();
    await use(authenticatedContext);
    await authenticatedContext.dispose();
  },

  authRequest: async ({}, use) => {
    const authenticatedContext = await createAuthenticatedContext();
    await use(authenticatedContext);
    await authenticatedContext.dispose();
  },
});

export { expect };