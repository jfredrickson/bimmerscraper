# bimmerscraper

Node module that scrapes your latest production order status.

## Usage

This module provides just one method:

`bimmerscraper.check(username, password)`

* `username`: My Garage username
* `password`: My Garage password

### Example

```javascript
const bimmerscraper = require("bimmerscraper")

bimmerscraper
  .check("driver@example.com", "abc123")
  .then((vehicles) => {
    vehicles.forEach((vehicle) => {
      console.log("Status code: " + vehicle.orderStatusCode)
    })
  })
```
