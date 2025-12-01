import { test, expect } from '@playwright/test';
import users from '../../data/users.json';

test('GET - All products list', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/api/productsList`);
    const message = await response.text();
    console.log(message);
    
    expect(response.ok()).toBeTruthy();
    
    const body = await response.body();
    expect(body.length).toBeGreaterThan(0);
    expect(message).toContain('products');
});


test('POST - To All products list', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/api/productsList`);
    const message = await response.text();
    console.log(message);
    
    expect(response.status()).toBe(200);
    expect(message).toContain('{"responseCode": 405, "message": "This request method is not supported."}');
});


test('GET - All Brands List', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/api/brandsList`);
    const message = await response.text();
    console.log(message);
    
    expect(response.ok()).toBeTruthy();
    expect(message).toContain('brands');
});

test('POST - To Search Product', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/api/searchProduct`, {
     form: { search_product: 'jean'},
  });
    const message = await response.text();
    console.log(message);
    
    expect(response.status()).toBe(200);
   
});


test('POST - To Verify Login with valid details', async({request, baseURL})=>{
    const response = await request.post(`${baseURL}/api/verifyLogin`,
        {
            form: {
                email: users.validUser.email,
                password: users.validUser.password
            }
        }
    );

    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    console.log('📦 Datos devueltos por API:', json);
    //Verify message match
    expect(json.responseCode).toEqual(200)
    expect(json.message).toBe('User exists!');
});


test('POST To Create/Register User Account', async ({request, baseURL})=> {
    const response = await request.post(`${baseURL}/api/createAccount`,
        {
            form: {
                name: 'testname',
                email: 'ar@test.com',
                password: 'test',
                title: 'Mr',
                birth_date: '28',
                birth_month: '6',
                birth_year: '1982',
                firstname: 'Agus',
                lastname: 'Rojas',
                company: 'AD',
                address1: 'Av 111',
                address2: 'Av 222',
                country: 'Arg',
                zipcode: '5501',
                state: 'Mza',
                city: 'GC',
                mobile_number: '123456789'
            }
        }
    );

    const message = await response.text();
    console.log(message);
    expect(response.status()).toBe(200);
    expect(message).toContain('{"responseCode": 201, "message": "User created!"}');

});


test('DELETE METHOD To Delete User Account', async({request, baseURL})=>{
    const response = await request.delete(`${baseURL}/api/deleteAccount`,
        {
            form : {
                email: 'ar@test.com',
                password: 'test'
            }
        }
    );

    const message = await response.text();
    console.log(message);
    expect(response.status()).toBe(200);
    expect(message).toContain('{"responseCode": 200, "message": "Account deleted!"}');

});