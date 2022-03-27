// test/server.js

var expect = require("chai").expect;
var request = require("request");

describe("Communication with APIS", function () {

    describe("running symbol search", function () {
        var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=FRA&apikey=QQQLXZK291FP2Z1O"
        it("returns status 200", function () { });
        it("returns the Blackrock", function () { });
    });

    describe("running Time Series Daily", function () {
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FRA&apikey=QQQLXZK291FP2Z1O"
        it("returns status 200", function () { });
        it("returns the TSD-JSON", function () { });
    });

});