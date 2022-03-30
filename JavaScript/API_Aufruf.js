function fenster(irgendwas) {
    window.alert('Hallo Welt!'+irgendwas);
}

function loadSymbolData(symbolInput) {

    // alert(symbolInput);

    if (symbolInput != '') {
//ab hier ins Script
        $.ajax({
            type: "GET",
            url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbolInput + "&apikey=" + apiKey,
            beforeSend: function () {
                $('#symbolDetails').empty();
                $('#diagrams').empty();
            },
            success: function (data) {

                if (data['Meta Data']) {

                    console.log(data);

                    metadata = data['Meta Data'];
                    $("#symbolDetails").append('<div class="card" style=""><div class="card-body"><div style="float:left;"><h5 class="card-title">📉 ' + metadata['2. Symbol'] + '</h5><h6 class="card-subtitle mb-2 text-muted">ℹ️ ' + metadata['1. Information'] + '</h6></div><div style="float:right;"><h6>Aktualisiert <span class="badge bg-secondary">' + metadata['3. Last Refreshed'] + '</span></h6><h6>Zeitzone <span class="badge bg-secondary">' + metadata['5. Time Zone'] + '</span></h6></div></div></div>');

                    timeSeries = data['Time Series (Daily)'];
                    createChart(timeSeries);

                    // createChart(data);

                } else {
                    alert(JSON.stringify(data));
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
            complete: function (data) {

            },
            dataType: "json"
        }); //bis hier ins Script

    } else {

        $("#symbolDetails").html('<div class="alert alert-danger" role="alert">Du musst zuerst nach einer Aktie suchen!</div>');

    }

}

function loadSuggestions(symbolInput){

        removeAllItemsFromSearchList();

        if (symbolInput != '') {

            //enableSearchInput(false);

            // API Suche nach Unternehmen:
            // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo
            $.ajax({
                type: "GET",
                url: "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbolInput + "&apikey=" + apiKey,
                beforeSend: function () {
                    removeAllItemsFromSearchList();
                },
                success: function (data) {

                    // console.log(data);

                    if (data['bestMatches']) {

                        console.log(data['bestMatches']);

                        data['bestMatches'].forEach(function (item) {

                            // console.log(item);
                            //console.log(item['2. name'] + " // " + item['1. symbol']);

                            $("#datalistOptions").append('<option class="searchResultItem" value="' + item['1. symbol'] + '">' + item['2. name'] + ' // ' + item['4. region'] + '</option>');

                        });

                    } else {
                        alert(JSON.stringify(data));
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.status);
                },
                complete: function (data) {
                    //enableSearchInput(true);
                    // alert($("#datalistOptions option:selected").text());
                },
                dataType: "json",
            });

        }
 }

