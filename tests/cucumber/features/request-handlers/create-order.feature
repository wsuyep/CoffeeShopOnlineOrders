Feature: Create orders for shop
    Scenario: Create new orders
        Given Database is connected
        Given A test shop is in the database
        When I send a valid createOrder request
        Then I get a successful response