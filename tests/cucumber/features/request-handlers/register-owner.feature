Feature: Register Shop Owner
    Scenario: Shop Owner Registration
        Given Database is connected
        When I send a valid register request
        Then I get a successful response