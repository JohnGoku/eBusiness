import requests
import json


stockAPI = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="
tsdAPI = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
apiKey = "QQQLXZK291FP2Z1O"


def getStockName(name):
    response = requests.get(stockAPI+name+"&apikey=" + apiKey)
    response_dict = response.json()
    print("input: " + name)
    for i in range(0,9):
        print(response_dict['bestMatches'][i]['2. name'])



def getTimeSeriesDaily(name):
    response = requests.get(tsdAPI + name + "&apikey=" + apiKey)
    print(response.json())

def apiCall(api,name):
    response = requests.get(api+name+"&apikey=" + apiKey)
    return response