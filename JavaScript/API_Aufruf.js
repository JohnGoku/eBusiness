function loadSymbolData(symbolInput) {

    // alert(symbolInput);

    if (symbolInput != '') {

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
        });

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

 function createChart(rueckgabeAPI) {

    console.log(rueckgabeAPI);

    // Split timestamp and data into separate arrays
    var labels = [], openData = [], highData = [], lowData = [], closeData = [], volumeData = [];

    // https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
    jQuery.each(rueckgabeAPI, function (index, value) {

        labels.push(index);
        openData.push(parseFloat(value["1. open"]));
        highData.push(parseFloat(value["2. high"]));
        lowData.push(parseFloat(value["3. low"]));
        closeData.push(parseFloat(value["4. close"]));
        volumeData.push(parseFloat(value["5. volume"]));

    });

    // reverse data
    labels.reverse();
    openData.reverse();
    highData.reverse();
    lowData.reverse();
    closeData.reverse();
    volumeData.reverse();

    // log data
    console.log(labels);
    console.log(openData);
    console.log(highData);
    console.log(lowData);
    console.log(closeData);
    console.log(volumeData);

    const data = {
        // datasets: [{
        //     label: 'My First dataset',
        //     backgroundColor: 'rgb(255, 99, 132)',
        //     borderColor: 'rgb(255, 99, 132)',
        //     data: [0, 10, 5, 2, 20, 30, 45],
        // }],
        // datasets: [{
        //     data: rueckgabeAPI
        // }]
        labels: labels,
        datasets: [
            {
                label: 'open',
                data: openData,
                fill: false,
                yAxisID: 'y',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
            },
            {
                label: 'high',
                data: highData,
                fill: false,
                yAxisID: 'y',
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
            },
            {
                label: 'low',
                data: lowData,
                fill: false,
                yAxisID: 'y',
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
            },
            {
                label: 'close',
                data: closeData,
                fill: false,
                yAxisID: 'y',
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
            },
            {
                label: 'volume',
                data: volumeData,
                fill: true,
                yAxisID: 'y1',
                type: 'bar',
                backgroundColor: [
                    'rgba(153, 102, 255, 0.6)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
            },
        ]

    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    // stacked: true,
                    title: {
                        display: true,
                        text: 'Datum'
                    },
                },
                y: {
                    // stacked: true
                    title: {
                        display: true,
                        text: 'Täglicher Wert'
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Volume'
                    },
                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }
            },
        }
    };

    $('#diagrams').html('<canvas id="myChart"></canvas>');

    // if(typeof myChart !== 'undefined') {
    //     myChart.destroy();
    // }

    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

