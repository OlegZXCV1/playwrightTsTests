Feature: Weather Forecast

  Scenario: Viewing the weather forecast
    Given I am on the weather website
    When I search for "New York"
    Then I should see the weather forecast for "New York"
