Feature: Register Shop Owner
    Scenario: Shop Owner Registration
        Given Database is connected
        When I send a valid register request
        Then I get a successful response
    
    Scenario: Duplicate registration
        Given Database is connected
        Given A test shop is in the database
        When I send a valid register request
        Then I get an error response with message: 'shop name is already registered'
    
    Scenario: Receiving invalid requests
        Given Database is connected
        When I send an invalid register request
        Then I get an error response with message: 'Missing parameters'