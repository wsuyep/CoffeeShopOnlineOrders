Feature: Complete existing orders
    Scenario: Customer completes the order
        Given Database is connected
        Given A test shop is in the database
        Given An order is created in the database
        Given Customer does not have the shops apiToken
        When I send a valid deleteOrder request
        Then I get a successful response

    Scenario: Shop owner completes the order
        Given Database is connected
        Given A test shop is in the database
        Given An order is created in the database
        When I send a valid deleteOrder request
        Then I get a successful response
    
    Scenario: Trying to close an order that is already closed
        Given Database is connected
        Given A test shop is in the database
        Given An order is created in the database
        When I send a valid deleteOrder request
        Then I get a successful response
        When I send another valid deleteOrder request
        Then I get an error response with message: 'no records found for order_id'