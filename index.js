
// ---------------- BRT BITQUERY V03 - Aug01 ----------------------


const QUERY = ` 
{
  ethereum(network: bsc) {
    dexTrades(
    options: {limit: 200, desc: "timeInterval.minute"}
    exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
    baseCurrency: {is: "0xeb2d878dcc05c8f39411df483574907b4fb11990"}
    quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
    ) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      median_price: quotePrice(calculate: median)
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
    }
  }
d2:ethereum(network: bsc){
    dexTrades(
      options: {limit: 1, desc: "timeInterval.minute"}
      baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
      quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
    ) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      median_price: quotePrice(calculate: median)
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
      tradeAmount(in: USDT)
    }
  }
}
`;

const QUERY2 = ` 
{
  ethereum(network: bsc) {
    dexTrades(
      options: {limit: 200, desc: "timeInterval.minute"}
      baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
      quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
    ) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      median_price: quotePrice(calculate: median)
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
      tradeAmount(in: USDT)
    }
  }
}
`;

const QUERY3 = ` 
{
  ethereum(network: bsc) {
    address(address: {is: "0xeb2d878dcc05c8f39411df483574907b4fb11990"}) {
      smartContract {
        contractType
        attributes {
          name
          value
        }
      }
    }    
    dexTrades(
      options: {limit: 7, desc: "timeInterval.day"}
      baseCurrency: {is: "0xeb2d878dcc05c8f39411df483574907b4fb11990"}
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
    ) {
      timeInterval {
        day(count: 1)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      median_price: quotePrice(calculate: median)
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
      tradeAmount(in: USDT)
    }
  }
d2:ethereum(network: bsc){
    dexTrades(
      options: {limit: 7, desc: "timeInterval.day"}
      baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
      quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
    ) {
      timeInterval {
        day(count: 1)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      median_price: quotePrice(calculate: median)
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
      tradeAmount(in: USDT)
    }
  }
}
`;


// Fim da consulta
const endpoint = "https://graphql.bitquery.io/";

const endpoint2 = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xeb2d878dcc05c8f39411df483574907b4fb11990&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=1UD89Z9MIPW9D94N3SB4WEE488RXGRMD13";

// Buscando dados da API
async function fetchData()
{  
  const [response,response2,response3,response4] = await Promise.all ([
  fetch
      (
      endpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json",
      "X-API-KEY": "BQYmmxtkzuJhjpwC1pNY8fsLwh0ITkz8"},
      body: JSON.stringify({query: QUERY})
      }
      ),
      fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json",
            "X-API-KEY": "BQYmmxtkzuJhjpwC1pNY8fsLwh0ITkz8"},
        body: JSON.stringify({query: QUERY2})
      }
      ),


    fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json",
            "X-API-KEY": "BQYmmxtkzuJhjpwC1pNY8fsLwh0ITkz8"},
        body: JSON.stringify({query: QUERY3})
      }
      ),


      fetch(endpoint2, {
        method: "POST"
      }
      ),

    ]);  
    
  const data = await response.json(); 
  const data2 = await response2.json(); 
  const data3 = await response3.json(); 
  const data4 = await response4.json(); 

document.getElementById("dia-base").innerHTML = "Data de referência: " + 
data.data.d2.dexTrades[0].timeInterval.minute;    
  
  document.getElementById("bnb").innerHTML = "Valor Atual BNB: " + 
  data.data.d2.dexTrades[0].median_price;
  
  document.getElementById("brt").innerHTML = "Valor Atual BRT: " + 
    (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[0].median_price);
  
  document.getElementById("dead").innerHTML = "Dead Wallet BRT: " + data4.result;
  
  document.getElementById("cvol").innerHTML = "Volume em circulação: " + 
    (data3.data.ethereum.address[0].smartContract.attributes[10].value-data4.result);
  
  document.getElementById("mcap").innerHTML = "Marketcap: " + 
    ((data3.data.ethereum.address[0].smartContract.attributes[10].value-data4.result)
    *
    (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[0].median_price));
    
  document.getElementById("volume24h").innerHTML = "Volume 24h: " + data3.data.ethereum.dexTrades[0].tradeAmount;    

  document.getElementById("preco1h").innerHTML = "% Preço 1h: " + 
  (((data2.data.ethereum.dexTrades[199].median_price / data2.data.ethereum.dexTrades[187].median_price)
  *100)-100);

  document.getElementById("preco24h").innerHTML = "% Preço 24h: " + 
  ((
    (data3.data.ethereum.dexTrades[1].median_price
    / 
    data3.data.ethereum.dexTrades[0].median_price)
  *100)-100);

  document.getElementById("preco7d").innerHTML = "% Preço 7d: " + 
  ((
    (data3.data.ethereum.dexTrades[6].median_price
    / 
    data3.data.ethereum.dexTrades[0].median_price)
  *100)-100);


//Chart2 BNB
const chart2 = LightweightCharts.createChart(document.body, { width: 600, height: 400 });
const lineSeries2 = chart2.addLineSeries();


lineSeries2.applyOptions({
  color: '#27AE60',
  lineWidth: 3,
});

chart2.applyOptions({
  watermark: {
      color: '#F4D03F',
      visible: true,
      text: 'Preço BRT/USD',
      fontSize: 24,
      horzAlign: 'center',
      vertAlign: 'center',
  },
  priceFormat: {
    type: 'custom',
    minMove: '0.000001',
    formatter: (price) => {
        if (price < 0.000001) return parseFloat(price).toPrecision(8)
        else if (price >= 0.000001 && price < 1) return parseFloat(price).toPrecision(6)
        else return parseFloat(price).toPrecision(6)
    }
}, 
priceScale: {
    autoScale: true
},
localization: {
    locale: 'en-US',
    priceFormatter: (price) => {
    if (price < 0.000001) return parseFloat(price).toPrecision(6)
    else if (price >= 0.000001 && price < 1) return parseFloat(price).toPrecision(6)
    else return parseFloat(price).toPrecision(6)
    }
},
})

//Chart 3 BRT/BNB

const chart3 = LightweightCharts.createChart(document.body, { width: 600, height: 400 });
const lineSeries3 = chart3.addLineSeries();

lineSeries3.applyOptions({
  color: '#27AE60',
  lineWidth: 3,
});

chart3.applyOptions({
  watermark: {
      color: '#F4D03F',
      visible: true,
      text: 'Preço BRT/BNB',
      fontSize: 24,
      horzAlign: 'center',
      vertAlign: 'center',
  },
  priceFormat: {
    type: 'custom',
    minMove: '0.000001',
    formatter: (price) => {
        if (price < 0.000001) return parseFloat(price).toPrecision(8)
        else if (price >= 0.000001 && price < 1) return parseFloat(price).toPrecision(6)
        else return parseFloat(price).toPrecision(6)
    }
}, 
priceScale: {
    autoScale: true
},
localization: {
    locale: 'en-US',
    priceFormatter: (price) => {
    if (price < 0.000001) return parseFloat(price).toPrecision(6)
    else if (price >= 0.000001 && price < 1) return parseFloat(price).toPrecision(6)
    else return parseFloat(price).toPrecision(6)
    }
},
})
// Dados das linhas


linedata=[];  

var startingMoment = moment();
for (var x=199;x>=0;x--)
{ 
  linedata.push(
    { 
    time:startingMoment.format("YYYY-MM-DD"), 
    value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[x].median_price)
    });

    startingMoment.add(1, "days");
}

lineSeries2.setData(linedata);
  
linedata2=[];  

var startingMoment2 = moment();
for (var x=199;x>=0;x--)
{ 
  linedata2.push(
    { 
    time:startingMoment2.format("YYYY-MM-DD"), 
    value: (data.data.ethereum.dexTrades[x].median_price)
    });

    startingMoment2.add(1, "days");
}

lineSeries3.setData(linedata2);
    
chart2.resize(640, 400);  
chart3.resize(660, 400);  

}

fetchData()
