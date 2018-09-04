const puppeteer = require("puppeteer")

const url = "https://mygarage.bmwusa.com/"

exports.check = function (username, password) {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch()
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
      await page.click("input#loginEmailAddressInput")
      await page.keyboard.type(username)
      await page.click("input#loginPasswordInput")
      await page.keyboard.type(password)
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
