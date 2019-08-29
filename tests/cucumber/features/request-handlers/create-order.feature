Feature: Create orders for shop
    Scenario: Create new orders
        Given Database is connected
        Given A test shop is in the database
        When I send a valid createOrder request
        Then I get a successful response
    
    Scenario: Target shop is not in database
        Given Database is connected
        When I send a valid createOrder request
        Then I get an error response with message: 'no records found for shopName: testShop'

    Scenario: Receiving invalid requests
        Given Database is connected
        When I send an invalid createOrder request
        Then I get an error response with message: 'Missing parameters'