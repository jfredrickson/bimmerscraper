# bimmerscraper

Node module that scrapes your latest production order status.

## Usage

This module provides just one method:

`bimmerscraper.check(productionCode, username, password)`

* `productionCode`: The car's production number, on the dealer's vehicle inquiry report that details the order
* `username`: My Garage username
* `password`: My Garage password

### Example

```javascript
const bimmerscraper = require("bimmerscraper")

bimmerscraper
  .check("1234567", "driver@example.com", "abc123")
  .then((vehicles) => {
    vehicles.forEach((vehicle) => {
      console.log("Status code: " + vehicle.orderStatusCode)
    })
  })
```
