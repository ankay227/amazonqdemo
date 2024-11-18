Feature: Product Management API
  As an API user
  I want to manage products
  So that I can maintain product information

  Scenario: Create a new product
    When I create a new product with the following details:
      | name          | price | description        |
      | Test Product  | 99.99 | Test description  |
    Then the response status code should be 201
    And the product should be created successfully

  Scenario: Get all products
    Given there is an existing product:
      | name          | price | description        |
      | Test Product  | 99.99 | Test description  |
    When I request all products
    Then the response status code should be 200
    And I should receive a list of products

  Scenario: Get product by ID
    Given there is an existing product:
      | name          | price | description        |
      | Test Product  | 99.99 | Test description  |
    When I request the product by its ID
    Then the response status code should be 200
    And I should receive the correct product details

  Scenario: Update a product
    Given there is an existing product:
      | name          | price | description        |
      | Test Product  | 99.99 | Test description  |
    When I update the product with the following details:
      | name              | price  | description            |
      | Updated Product   | 149.99 | Updated description   |
    Then the response status code should be 200
    And the product should be updated successfully

  Scenario: Delete a product
    Given there is an existing product:
      | name          | price | description        |
      | Test Product  | 99.99 | Test description  |
    When I delete the product
    Then the response status code should be 204
