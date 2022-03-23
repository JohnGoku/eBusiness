import apiCalls as ac


def checkIfAvailable():
    stockAvail = (ac.apiCall(ac.stockAPI,"FRA").status_code == 200)
    tsdAvail = (ac.apiCall(ac.tsdAPI,"FRA").status_code == 200)
    print("Stockname available? " + str(stockAvail))
    print("TimeSeriesDaily available? " + str(tsdAvail))

checkIfAvailable()