# flight-data
[![Build Status](https://travis-ci.com/bbialke/flight-data.svg?branch=master)](https://travis-ci.com/bbialke/flight-data)

Flight-data is an easy to implement flight tracking API for Node.js that uses data from [aviationstack](https://aviationstack.com/) to quickly get data on any flight- past, present, or future. But it doesn't stop at flights. Use the airports feature to quickly get highly detailed information on any airport.

## Features
#### Flights

- Real time flight lookup (multiple flights at a time)
- Historical flight data
- Upcoming flight data
- Detailed departure and arrival information (including gate numbers, runways, and baggage claim areas)
- Real-time flight data, including current latitude/longitude, heading, and elevation (only available on certain flights)
- Full support for both IATA and ICAO codes
#### Airports
- **6400+ airports**
- Airport lookup (multiple lookups at a time)
- Lookup by airport-specific codes or by country/city
- Returns exact latitude/longitude position, timezone, and even airport contact information (available on certain airports)

## Installing

```bash
npm install flight-data
```
## API Token
Head to [aviationstack](https://aviationstack.com/) and obtain a free API token by creating an account.  
With a free account, you can make a maximum of 500 API calls per month. You can check your usage from their dashboard.
## Usage
Since the API token is private, it's recommended to keep it in a separate configuration file or use it as an environment variable.  
Each example uses:
```js
const flightdata = require('flight-data');
```
### Real-time flight lookup
```js
// Get the real-time flight information for flight 2102 to Seattle (SEA)
flightdata.flights(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    flight_number: '2102',
    arr_iata: 'SEA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Airport lookup
```js
// Get full airport information for Seattle-Tacoma International (SEA)
flightdata.airports(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    icao_code: 'KSEA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Historical/Future flight lookup
```js
// Get the flight information for flight 2102 to Seattle (SEA) on May 25th, 2020
flightdata.flights(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    flight_number: '2102',
    flight_date: '2020-05-25',
    arr_iata: 'SEA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Using results
```js
// Get the departure gate for flight 2102 to Seattle (SEA)
flightdata.flights(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    flight_number: '2102',
    arr_iata: 'SEA'
  }
})
.then(response => {
    response.data.forEach(element => {
      console.log(element.departure['gate'])
    })
  })
.catch(error => {
    ...
});
```
#### A couple notes for dealing with flight lookup results:
The flight lookup module returns a JSON array with this structure:
```js
{
  count: 1,
  data: [
    {
      flight_date: '2020-05-04',
      flight_status: 'cancelled',
      departure: [Object],
      arrival: [Object],
      airline: [Object],
      flight: [Object],
      aircraft: null,
      live: null
    }
  ]
}
```
This format of return means that to access the flight data, you'll need to use `response.data` instead of just using `response`. You can access the count of responses returned by using `response.count`.  
The information returned in some areas of the `data` section is contained in other arrays. To access this information, use `response.data.SECTION['ELEMENT']`. For example, to get the departure gate, use `response.data.departure['gate']`
#### Airport lookup results structure
The airport lookup module similarly returns a JSON array, but getting results from the array is a slightly different process:
```js
{
  count: 1,
  data: [
    {
      gmt: '-8',
      iata_code: 'SEA',
      city_iata_code: 'SEA',
      icao_code: 'KSEA',
      country_iso2: 'US',
      geoname_id: '5809876',
      latitude: '47.44384',
      longitude: '-122.301735',
      airport_name: 'Seattle-Tacoma International',
      country_name: 'United States',
      phone_number: '206-787-5388',
      timezone: 'America/Los_Angeles'
    }
  ]
}
```
Results can be accessed from this array through `response.data[INDEX].ELEMENT`. For example, to get the airport name from this result, use `response.data[0].airport_name`.
## Contributing
#### Want to contribute? That's great!  
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Disclaimer
All data gathered comes from the [aviationstack](https://aviationstack.com/) API. They could choose to modify their terms of service at any time. Please see their [website](https://aviationstack.com/) and [documentation](https://aviationstack.com/documentation) for the most accurate information about their service.

## License
[MIT](https://choosealicense.com/licenses/mit/)
