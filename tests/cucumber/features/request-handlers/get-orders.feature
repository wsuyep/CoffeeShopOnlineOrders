Feature: Get orders for shop
    Scenario: search for all available orders for the sop
        Given Database is connected
        Given A test shop is in the database
        Given An order is created in the database
        When I send a valid getOrders request
        Then I get a successful response
        Then The result has exactly 1 record