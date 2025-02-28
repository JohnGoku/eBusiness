// test/server.js
//import loadSymbolData from '../JavaScript/API_Aufruf.js'; 
//var loadSymbolData = require('../JavaScript/API_Aufruf');

var expect = require("chai").expect;
var request = require("request");
var should = require("should");

describe("Communication with APIS", function () {

    describe("running symbol search with input FRA", function () {
        var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=FRA&apikey=QQQLXZK291FP2Z1O"
        it("returns status 200", function () {
            request.get(url, function (error, response, body) {
                response.statusCode.should.equal(200);

            });
        });
        it("Contains Fraport", function () {
            request.get(url, function (error, response, body) {
                expect(body).
                to.include("Fraport");
                //to.include()
            });
        });
    });

    describe("running Time Series Daily", function () {
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FRA&apikey=QQQLXZK291FP2Z1O"
        it("returns status 200", function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });
        it("Contains necessary information for graphics", function () {
            request.get(url, function (error, response, body) {
                expect(body).to.include("open");
                expect(body).to.include("high");
                expect(body).to.include("low");
                expect(body).to.include("close");
                expect(body).to.include("volume");
                //to.include()
            });
        });
    });

    /*describe("running Symbol Data", function () {
        it("API runs successful", function () {
            expect(loadSymbolData("FRA.FRK")).to.equal(0);
        });
    });*/
});
