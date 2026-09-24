import { expect, test } from '../../fixtures/apiFixtures';
import testData from '../../src/data/api-requests/apiRequestData.json';
import postTestData from '../../src/data/api-requests/postRequest.json';
import putTestData from '../../src/data/api-requests/putRequest.json';

test('[TC-API-00  ] Create new booking Then Get booking details and validate fields', async ({ authRequest }) => {
  const response = await authRequest.post(`${process.env.API_BASE_URL}/booking`, {
    data: postTestData
  });

  console.log("Sent URL:", response.url());
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  const bookingIdNew = body.bookingid;
  console.log("The booking id is " + bookingIdNew)
  expect(body.bookingid).toBeDefined;
  expect(body.booking.totalprice).toBe(postTestData.totalprice);
  expect(body.booking.bookingdates.checkin).toBeDefined;


  //Get the newly created booking
  const getResponse = await authRequest.get(`${process.env.API_BASE_URL}/booking/${bookingIdNew}`, {
  });

  console.log("Sent URL:", getResponse.url());
  expect(getResponse.status()).toBe(200);

  const textBody = await getResponse.json();
  expect(textBody.firstname).toBe(postTestData.firstname);
  expect(textBody.lastname).toBe(postTestData.lastname);

});

test('[TC-API-003] Create - Update - Delete booking and validate fields', async ({ authRequest }) => {
  // Create new booking first to be updated
  const postResponse = await authRequest.post(`${process.env.API_BASE_URL}/booking`, {
    data: postTestData
  });

  console.log("Sent URL:", postResponse.url());
  expect(postResponse.status()).toBe(200);
  
  const createBody = await postResponse.json();
  const bookingIdNew = createBody.bookingid;
  console.log(createBody.bookingid)

  //Update existing Booking
  const loginResponse = await authRequest.post(`${process.env.API_BASE_URL}/auth`, {
    data: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
    }
  });
  const loginBody = await loginResponse.json();
  const myToken = loginBody.token; // Retrieve the literal token string

  const putResponse = await authRequest.put(`${process.env.API_BASE_URL}/booking/${bookingIdNew}`, {
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${myToken}`
    },
    data: putTestData,
    
  });

  //Validate if changes were applied
  console.log("Sent URL:", putResponse.url());
  expect(putResponse.status()).toBe(200);
  const updateBody = await putResponse.json();
  expect(updateBody.lastname).toBe(putTestData.lastname);
  expect(updateBody.depositpaid).toBe(putTestData.depositpaid);

  // Delete Existing Booking
  const deleteResponse = await authRequest.delete(`${process.env.API_BASE_URL}/booking/${bookingIdNew}`, {
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${myToken}`
    },
  });
  console.log("Sent URL:", postResponse.url());
  expect(deleteResponse.status()).toBe(201);
});