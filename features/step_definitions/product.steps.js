const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

let productId;
let response;

Given('there is an existing product:', async function(dataTable) {
    const productData = dataTable.hashes()[0];
    response = await request(app)
        .post('/v1/products')
        .send(productData);
    
    productId = response.body._id;
});

When('I create a new product with the following details:', async function(dataTable) {
    const productData = dataTable.hashes()[0];
    response = await request(app)
        .post('/v1/products')
        .send(productData);
});

When('I request all products', async function() {
    response = await request(app)
        .get('/v1/products');
});

When('I request the product by its ID', async function() {
    response = await request(app)
        .get(`/v1/products/${productId}`);
});

When('I update the product with the following details:', async function(dataTable) {
    const productData = dataTable.hashes()[0];
    response = await request(app)
        .put(`/v1/products/${productId}`)
        .send(productData);
});

When('I delete the product', async function() {
    response = await request(app)
        .delete(`/v1/products/${productId}`);
});

Then('the response status code should be {int}', function(statusCode) {
    expect(response.status).to.equal(statusCode);
});

Then('the product should be created successfully', function() {
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('price');
    expect(response.body).to.have.property('description');
});

Then('I should receive a list of products', function() {
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
});

Then('I should receive the correct product details', function() {
    expect(response.body).to.have.property('_id', productId);
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('price');
    expect(response.body).to.have.property('description');
});

Then('the product should be updated successfully', function() {
    expect(response.body).to.have.property('_id', productId);
    expect(response.body.name).to.equal('Updated Product');
    expect(response.body.price).to.equal(149.99);
    expect(response.body.description).to.equal('Updated description');
});
