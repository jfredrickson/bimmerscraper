const puppeteer = require("puppeteer")

const url = "https://mygarage.bmwusa.com/"

exports.check = function (username, password, connect_options = {}) {
  return new Promise(async (resolve, reject) => {
    let browser = {}
    if (Object.keys(connect_options).length > 0) {
      browser = await puppeteer.connect(connect_options)
    } else {
      browser = await puppeteer.launch()
    }
    const page = await browser.newPage()

    // Instead of scraping the web page, let the page make its request to its API, then
    // intercept the JSON response from the API.
    page.on("response", (response) => {
      if (response.url().includes("getGarageVehiclesByGroupId")) {
        response.text().then((responseBody) => {
          const prodVehicles = JSON.parse(responseBody).dataContent.ProdVehicleDetails
          resolve(prodVehicles)
        })
      }
    })

    try {
      await page.goto(url)
      await page.waitForNavigation()
      await page.type("input#loginEmailAddressInput", username)
      await page.type("input#loginPasswordInput", password)
      await page.click("#loginBtn")
      // Allow the garage page to load; this is when the page will make the API request.
      await page.waitForSelector("a.track-vehicle")
      // By now, the API response should have been intercepted.
    } catch (e) {
      reject("Unable to parse the My Garage website.")
    } finally {
      browser.close()
    }
  })
}
