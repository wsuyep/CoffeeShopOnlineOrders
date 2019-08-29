Feature: Get orders for shop
    Scenario: search for all available orders for the sop
        Given Database is connected
        Given A test shop is in the database
        Given An order is created in the database
        When I send a valid getOrders request
        Then I get a successful response
        Then The result has exactly 1 record
    
    Scenario: shop has no orders
        Given Database is connected
        Given A test shop is in the database
        When I send a valid getOrders request
        Then I get a successful response
        Then The result has exactly 0 record

    Scenario: shop does not exist, no shopId and apiToken is passed in
        Given Database is connected
        When I send a valid getOrders request
        Then I get an error response with message: 'Missing parameters'
    
     Scenario: receiving invalid requests
        Given Database is connected
        When I send an invalid getOrders request
        Then I get an error response with message: 'Missing parameters'