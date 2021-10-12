
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

// Fim da consulta
const endpoint = "https://graphql.bitquery.io/";

// Buscando dados da API
async function fetchData()
{  
  const [response,response2] = await Promise.all ([
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
    })]);  

  const data = await response.json(); 
  const data2 = await response2.json(); 

  //Chart1 BRT
  const chart = LightweightCharts.createChart(document.body, { width: 600, height: 400 });
  
  const lineSeries = chart.addLineSeries();
  
  lineSeries.applyOptions({
    color: '#27AE60',
    lineWidth: 3,
  });

  chart.applyOptions({
    watermark: {
        color: '#F4D03F',
        visible: true,
        text: 'Preço BNB',
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
    },    
  })
  
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


// Dados das linhas



lineSeries.setData([
  { time:'	2021-01-12	', value: data2.data.ethereum.dexTrades[	199	].median_price },
  { time:'	2021-01-13	', value: data2.data.ethereum.dexTrades[	198	].median_price },
  { time:'	2021-01-14	', value: data2.data.ethereum.dexTrades[	197	].median_price },
  { time:'	2021-01-15	', value: data2.data.ethereum.dexTrades[	196	].median_price },
  { time:'	2021-01-16	', value: data2.data.ethereum.dexTrades[	195	].median_price },
  { time:'	2021-01-17	', value: data2.data.ethereum.dexTrades[	194	].median_price },
  { time:'	2021-01-18	', value: data2.data.ethereum.dexTrades[	193	].median_price },
  { time:'	2021-01-19	', value: data2.data.ethereum.dexTrades[	192	].median_price },
  { time:'	2021-01-20	', value: data2.data.ethereum.dexTrades[	191	].median_price },
  { time:'	2021-01-21	', value: data2.data.ethereum.dexTrades[	190	].median_price },
  { time:'	2021-01-22	', value: data2.data.ethereum.dexTrades[	189	].median_price },
  { time:'	2021-01-23	', value: data2.data.ethereum.dexTrades[	188	].median_price },
  { time:'	2021-01-24	', value: data2.data.ethereum.dexTrades[	187	].median_price },
  { time:'	2021-01-25	', value: data2.data.ethereum.dexTrades[	186	].median_price },
  { time:'	2021-01-26	', value: data2.data.ethereum.dexTrades[	185	].median_price },
  { time:'	2021-01-27	', value: data2.data.ethereum.dexTrades[	184	].median_price },
  { time:'	2021-01-28	', value: data2.data.ethereum.dexTrades[	183	].median_price },
  { time:'	2021-01-29	', value: data2.data.ethereum.dexTrades[	182	].median_price },
  { time:'	2021-01-30	', value: data2.data.ethereum.dexTrades[	181	].median_price },
  { time:'	2021-01-31	', value: data2.data.ethereum.dexTrades[	180	].median_price },
  { time:'	2021-02-01	', value: data2.data.ethereum.dexTrades[	179	].median_price },
  { time:'	2021-02-02	', value: data2.data.ethereum.dexTrades[	178	].median_price },
  { time:'	2021-02-03	', value: data2.data.ethereum.dexTrades[	177	].median_price },
  { time:'	2021-02-04	', value: data2.data.ethereum.dexTrades[	176	].median_price },
  { time:'	2021-02-05	', value: data2.data.ethereum.dexTrades[	175	].median_price },
  { time:'	2021-02-06	', value: data2.data.ethereum.dexTrades[	174	].median_price },
  { time:'	2021-02-07	', value: data2.data.ethereum.dexTrades[	173	].median_price },
  { time:'	2021-02-08	', value: data2.data.ethereum.dexTrades[	172	].median_price },
  { time:'	2021-02-09	', value: data2.data.ethereum.dexTrades[	171	].median_price },
  { time:'	2021-02-10	', value: data2.data.ethereum.dexTrades[	170	].median_price },
  { time:'	2021-02-11	', value: data2.data.ethereum.dexTrades[	169	].median_price },
  { time:'	2021-02-12	', value: data2.data.ethereum.dexTrades[	168	].median_price },
  { time:'	2021-02-13	', value: data2.data.ethereum.dexTrades[	167	].median_price },
  { time:'	2021-02-14	', value: data2.data.ethereum.dexTrades[	166	].median_price },
  { time:'	2021-02-15	', value: data2.data.ethereum.dexTrades[	165	].median_price },
  { time:'	2021-02-16	', value: data2.data.ethereum.dexTrades[	164	].median_price },
  { time:'	2021-02-17	', value: data2.data.ethereum.dexTrades[	163	].median_price },
  { time:'	2021-02-18	', value: data2.data.ethereum.dexTrades[	162	].median_price },
  { time:'	2021-02-19	', value: data2.data.ethereum.dexTrades[	161	].median_price },
  { time:'	2021-02-20	', value: data2.data.ethereum.dexTrades[	160	].median_price },
  { time:'	2021-02-21	', value: data2.data.ethereum.dexTrades[	159	].median_price },
  { time:'	2021-02-22	', value: data2.data.ethereum.dexTrades[	158	].median_price },
  { time:'	2021-02-23	', value: data2.data.ethereum.dexTrades[	157	].median_price },
  { time:'	2021-02-24	', value: data2.data.ethereum.dexTrades[	156	].median_price },
  { time:'	2021-02-25	', value: data2.data.ethereum.dexTrades[	155	].median_price },
  { time:'	2021-02-26	', value: data2.data.ethereum.dexTrades[	154	].median_price },
  { time:'	2021-02-27	', value: data2.data.ethereum.dexTrades[	153	].median_price },
  { time:'	2021-02-28	', value: data2.data.ethereum.dexTrades[	152	].median_price },
  { time:'	2021-03-01	', value: data2.data.ethereum.dexTrades[	151	].median_price },
  { time:'	2021-03-02	', value: data2.data.ethereum.dexTrades[	150	].median_price },
  { time:'	2021-03-03	', value: data2.data.ethereum.dexTrades[	149	].median_price },
  { time:'	2021-03-04	', value: data2.data.ethereum.dexTrades[	148	].median_price },
  { time:'	2021-03-05	', value: data2.data.ethereum.dexTrades[	147	].median_price },
  { time:'	2021-03-06	', value: data2.data.ethereum.dexTrades[	146	].median_price },
  { time:'	2021-03-07	', value: data2.data.ethereum.dexTrades[	145	].median_price },
  { time:'	2021-03-08	', value: data2.data.ethereum.dexTrades[	144	].median_price },
  { time:'	2021-03-09	', value: data2.data.ethereum.dexTrades[	143	].median_price },
  { time:'	2021-03-10	', value: data2.data.ethereum.dexTrades[	142	].median_price },
  { time:'	2021-03-11	', value: data2.data.ethereum.dexTrades[	141	].median_price },
  { time:'	2021-03-12	', value: data2.data.ethereum.dexTrades[	140	].median_price },
  { time:'	2021-03-13	', value: data2.data.ethereum.dexTrades[	139	].median_price },
  { time:'	2021-03-14	', value: data2.data.ethereum.dexTrades[	138	].median_price },
  { time:'	2021-03-15	', value: data2.data.ethereum.dexTrades[	137	].median_price },
  { time:'	2021-03-16	', value: data2.data.ethereum.dexTrades[	136	].median_price },
  { time:'	2021-03-17	', value: data2.data.ethereum.dexTrades[	135	].median_price },
  { time:'	2021-03-18	', value: data2.data.ethereum.dexTrades[	134	].median_price },
  { time:'	2021-03-19	', value: data2.data.ethereum.dexTrades[	133	].median_price },
  { time:'	2021-03-20	', value: data2.data.ethereum.dexTrades[	132	].median_price },
  { time:'	2021-03-21	', value: data2.data.ethereum.dexTrades[	131	].median_price },
  { time:'	2021-03-22	', value: data2.data.ethereum.dexTrades[	130	].median_price },
  { time:'	2021-03-23	', value: data2.data.ethereum.dexTrades[	129	].median_price },
  { time:'	2021-03-24	', value: data2.data.ethereum.dexTrades[	128	].median_price },
  { time:'	2021-03-25	', value: data2.data.ethereum.dexTrades[	127	].median_price },
  { time:'	2021-03-26	', value: data2.data.ethereum.dexTrades[	126	].median_price },
  { time:'	2021-03-27	', value: data2.data.ethereum.dexTrades[	125	].median_price },
  { time:'	2021-03-28	', value: data2.data.ethereum.dexTrades[	124	].median_price },
  { time:'	2021-03-29	', value: data2.data.ethereum.dexTrades[	123	].median_price },
  { time:'	2021-03-30	', value: data2.data.ethereum.dexTrades[	122	].median_price },
  { time:'	2021-03-31	', value: data2.data.ethereum.dexTrades[	121	].median_price },
  { time:'	2021-04-01	', value: data2.data.ethereum.dexTrades[	120	].median_price },
  { time:'	2021-04-02	', value: data2.data.ethereum.dexTrades[	119	].median_price },
  { time:'	2021-04-03	', value: data2.data.ethereum.dexTrades[	118	].median_price },
  { time:'	2021-04-04	', value: data2.data.ethereum.dexTrades[	117	].median_price },
  { time:'	2021-04-05	', value: data2.data.ethereum.dexTrades[	116	].median_price },
  { time:'	2021-04-06	', value: data2.data.ethereum.dexTrades[	115	].median_price },
  { time:'	2021-04-07	', value: data2.data.ethereum.dexTrades[	114	].median_price },
  { time:'	2021-04-08	', value: data2.data.ethereum.dexTrades[	113	].median_price },
  { time:'	2021-04-09	', value: data2.data.ethereum.dexTrades[	112	].median_price },
  { time:'	2021-04-10	', value: data2.data.ethereum.dexTrades[	111	].median_price },
  { time:'	2021-04-11	', value: data2.data.ethereum.dexTrades[	110	].median_price },
  { time:'	2021-04-12	', value: data2.data.ethereum.dexTrades[	109	].median_price },
  { time:'	2021-04-13	', value: data2.data.ethereum.dexTrades[	108	].median_price },
  { time:'	2021-04-14	', value: data2.data.ethereum.dexTrades[	107	].median_price },
  { time:'	2021-04-15	', value: data2.data.ethereum.dexTrades[	106	].median_price },
  { time:'	2021-04-16	', value: data2.data.ethereum.dexTrades[	105	].median_price },
  { time:'	2021-04-17	', value: data2.data.ethereum.dexTrades[	104	].median_price },
  { time:'	2021-04-18	', value: data2.data.ethereum.dexTrades[	103	].median_price },
  { time:'	2021-04-19	', value: data2.data.ethereum.dexTrades[	102	].median_price },
  { time:'	2021-04-20	', value: data2.data.ethereum.dexTrades[	101	].median_price },
  { time:'	2021-04-21	', value: data2.data.ethereum.dexTrades[	100	].median_price },
  { time:'	2021-04-22	', value: data2.data.ethereum.dexTrades[	99	].median_price },
  { time:'	2021-04-23	', value: data2.data.ethereum.dexTrades[	98	].median_price },
  { time:'	2021-04-24	', value: data2.data.ethereum.dexTrades[	97	].median_price },
  { time:'	2021-04-25	', value: data2.data.ethereum.dexTrades[	96	].median_price },
  { time:'	2021-04-26	', value: data2.data.ethereum.dexTrades[	95	].median_price },
  { time:'	2021-04-27	', value: data2.data.ethereum.dexTrades[	94	].median_price },
  { time:'	2021-04-28	', value: data2.data.ethereum.dexTrades[	93	].median_price },
  { time:'	2021-04-29	', value: data2.data.ethereum.dexTrades[	92	].median_price },
  { time:'	2021-04-30	', value: data2.data.ethereum.dexTrades[	91	].median_price },
  { time:'	2021-05-01	', value: data2.data.ethereum.dexTrades[	90	].median_price },
  { time:'	2021-05-02	', value: data2.data.ethereum.dexTrades[	89	].median_price },
  { time:'	2021-05-03	', value: data2.data.ethereum.dexTrades[	88	].median_price },
  { time:'	2021-05-04	', value: data2.data.ethereum.dexTrades[	87	].median_price },
  { time:'	2021-05-05	', value: data2.data.ethereum.dexTrades[	86	].median_price },
  { time:'	2021-05-06	', value: data2.data.ethereum.dexTrades[	85	].median_price },
  { time:'	2021-05-07	', value: data2.data.ethereum.dexTrades[	84	].median_price },
  { time:'	2021-05-08	', value: data2.data.ethereum.dexTrades[	83	].median_price },
  { time:'	2021-05-09	', value: data2.data.ethereum.dexTrades[	82	].median_price },
  { time:'	2021-05-10	', value: data2.data.ethereum.dexTrades[	81	].median_price },
  { time:'	2021-05-11	', value: data2.data.ethereum.dexTrades[	80	].median_price },
  { time:'	2021-05-12	', value: data2.data.ethereum.dexTrades[	79	].median_price },
  { time:'	2021-05-13	', value: data2.data.ethereum.dexTrades[	78	].median_price },
  { time:'	2021-05-14	', value: data2.data.ethereum.dexTrades[	77	].median_price },
  { time:'	2021-05-15	', value: data2.data.ethereum.dexTrades[	76	].median_price },
  { time:'	2021-05-16	', value: data2.data.ethereum.dexTrades[	75	].median_price },
  { time:'	2021-05-17	', value: data2.data.ethereum.dexTrades[	74	].median_price },
  { time:'	2021-05-18	', value: data2.data.ethereum.dexTrades[	73	].median_price },
  { time:'	2021-05-19	', value: data2.data.ethereum.dexTrades[	72	].median_price },
  { time:'	2021-05-20	', value: data2.data.ethereum.dexTrades[	71	].median_price },
  { time:'	2021-05-21	', value: data2.data.ethereum.dexTrades[	70	].median_price },
  { time:'	2021-05-22	', value: data2.data.ethereum.dexTrades[	69	].median_price },
  { time:'	2021-05-23	', value: data2.data.ethereum.dexTrades[	68	].median_price },
  { time:'	2021-05-24	', value: data2.data.ethereum.dexTrades[	67	].median_price },
  { time:'	2021-05-25	', value: data2.data.ethereum.dexTrades[	66	].median_price },
  { time:'	2021-05-26	', value: data2.data.ethereum.dexTrades[	65	].median_price },
  { time:'	2021-05-27	', value: data2.data.ethereum.dexTrades[	64	].median_price },
  { time:'	2021-05-28	', value: data2.data.ethereum.dexTrades[	63	].median_price },
  { time:'	2021-05-29	', value: data2.data.ethereum.dexTrades[	62	].median_price },
  { time:'	2021-05-30	', value: data2.data.ethereum.dexTrades[	61	].median_price },
  { time:'	2021-05-31	', value: data2.data.ethereum.dexTrades[	60	].median_price },
  { time:'	2021-06-01	', value: data2.data.ethereum.dexTrades[	59	].median_price },
  { time:'	2021-06-02	', value: data2.data.ethereum.dexTrades[	58	].median_price },
  { time:'	2021-06-03	', value: data2.data.ethereum.dexTrades[	57	].median_price },
  { time:'	2021-06-04	', value: data2.data.ethereum.dexTrades[	56	].median_price },
  { time:'	2021-06-05	', value: data2.data.ethereum.dexTrades[	55	].median_price },
  { time:'	2021-06-06	', value: data2.data.ethereum.dexTrades[	54	].median_price },
  { time:'	2021-06-07	', value: data2.data.ethereum.dexTrades[	53	].median_price },
  { time:'	2021-06-08	', value: data2.data.ethereum.dexTrades[	52	].median_price },
  { time:'	2021-06-09	', value: data2.data.ethereum.dexTrades[	51	].median_price },
  { time:'	2021-06-10	', value: data2.data.ethereum.dexTrades[	50	].median_price },
  { time:'	2021-06-11	', value: data2.data.ethereum.dexTrades[	49	].median_price },
  { time:'	2021-06-12	', value: data2.data.ethereum.dexTrades[	48	].median_price },
  { time:'	2021-06-13	', value: data2.data.ethereum.dexTrades[	47	].median_price },
  { time:'	2021-06-14	', value: data2.data.ethereum.dexTrades[	46	].median_price },
  { time:'	2021-06-15	', value: data2.data.ethereum.dexTrades[	45	].median_price },
  { time:'	2021-06-16	', value: data2.data.ethereum.dexTrades[	44	].median_price },
  { time:'	2021-06-17	', value: data2.data.ethereum.dexTrades[	43	].median_price },
  { time:'	2021-06-18	', value: data2.data.ethereum.dexTrades[	42	].median_price },
  { time:'	2021-06-19	', value: data2.data.ethereum.dexTrades[	41	].median_price },
  { time:'	2021-06-20	', value: data2.data.ethereum.dexTrades[	40	].median_price },
  { time:'	2021-06-21	', value: data2.data.ethereum.dexTrades[	39	].median_price },
  { time:'	2021-06-22	', value: data2.data.ethereum.dexTrades[	38	].median_price },
  { time:'	2021-06-23	', value: data2.data.ethereum.dexTrades[	37	].median_price },
  { time:'	2021-06-24	', value: data2.data.ethereum.dexTrades[	36	].median_price },
  { time:'	2021-06-25	', value: data2.data.ethereum.dexTrades[	35	].median_price },
  { time:'	2021-06-26	', value: data2.data.ethereum.dexTrades[	34	].median_price },
  { time:'	2021-06-27	', value: data2.data.ethereum.dexTrades[	33	].median_price },
  { time:'	2021-06-28	', value: data2.data.ethereum.dexTrades[	32	].median_price },
  { time:'	2021-06-29	', value: data2.data.ethereum.dexTrades[	31	].median_price },
  { time:'	2021-06-30	', value: data2.data.ethereum.dexTrades[	30	].median_price },
  { time:'	2021-07-01	', value: data2.data.ethereum.dexTrades[	29	].median_price },
  { time:'	2021-07-02	', value: data2.data.ethereum.dexTrades[	28	].median_price },
  { time:'	2021-07-03	', value: data2.data.ethereum.dexTrades[	27	].median_price },
  { time:'	2021-07-04	', value: data2.data.ethereum.dexTrades[	26	].median_price },
  { time:'	2021-07-05	', value: data2.data.ethereum.dexTrades[	25	].median_price },
  { time:'	2021-07-06	', value: data2.data.ethereum.dexTrades[	24	].median_price },
  { time:'	2021-07-07	', value: data2.data.ethereum.dexTrades[	23	].median_price },
  { time:'	2021-07-08	', value: data2.data.ethereum.dexTrades[	22	].median_price },
  { time:'	2021-07-09	', value: data2.data.ethereum.dexTrades[	21	].median_price },
  { time:'	2021-07-10	', value: data2.data.ethereum.dexTrades[	20	].median_price },
  { time:'	2021-07-11	', value: data2.data.ethereum.dexTrades[	19	].median_price },
  { time:'	2021-07-12	', value: data2.data.ethereum.dexTrades[	18	].median_price },
  { time:'	2021-07-13	', value: data2.data.ethereum.dexTrades[	17	].median_price },
  { time:'	2021-07-14	', value: data2.data.ethereum.dexTrades[	16	].median_price },
  { time:'	2021-07-15	', value: data2.data.ethereum.dexTrades[	15	].median_price },
  { time:'	2021-07-16	', value: data2.data.ethereum.dexTrades[	14	].median_price },
  { time:'	2021-07-17	', value: data2.data.ethereum.dexTrades[	13	].median_price },
  { time:'	2021-07-18	', value: data2.data.ethereum.dexTrades[	12	].median_price },
  { time:'	2021-07-19	', value: data2.data.ethereum.dexTrades[	11	].median_price },
  { time:'	2021-07-20	', value: data2.data.ethereum.dexTrades[	10	].median_price },
  { time:'	2021-07-21	', value: data2.data.ethereum.dexTrades[	9	].median_price },
  { time:'	2021-07-22	', value: data2.data.ethereum.dexTrades[	8	].median_price },
  { time:'	2021-07-23	', value: data2.data.ethereum.dexTrades[	7	].median_price },
  { time:'	2021-07-24	', value: data2.data.ethereum.dexTrades[	6	].median_price },
  { time:'	2021-07-25	', value: data2.data.ethereum.dexTrades[	5	].median_price },
  { time:'	2021-07-26	', value: data2.data.ethereum.dexTrades[	4	].median_price },
  { time:'	2021-07-27	', value: data2.data.ethereum.dexTrades[	3	].median_price },
  { time:'	2021-07-28	', value: data2.data.ethereum.dexTrades[	2	].median_price },
  { time:'	2021-07-29	', value: data2.data.ethereum.dexTrades[	1	].median_price },
  { time:'	2021-07-30	', value: data2.data.ethereum.dexTrades[ 0 ].median_price }]);

  lineSeries2.setData([
    { time:'	2021-01-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[199].median_price)},
    { time:'	2021-01-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[198].median_price)},
    { time:'	2021-01-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[197].median_price)},
    { time:'	2021-01-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[196].median_price)},
    { time:'	2021-01-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[195].median_price)},
    { time:'	2021-01-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[194].median_price)},
    { time:'	2021-01-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[193].median_price)},
    { time:'	2021-01-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[192].median_price)},
    { time:'	2021-01-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[191].median_price)},
    { time:'	2021-01-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[190].median_price)},
    { time:'	2021-01-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[189].median_price)},
    { time:'	2021-01-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[188].median_price)},
    { time:'	2021-01-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[187].median_price)},
    { time:'	2021-01-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[186].median_price)},
    { time:'	2021-01-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[185].median_price)},
    { time:'	2021-01-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[184].median_price)},
    { time:'	2021-01-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[183].median_price)},
    { time:'	2021-01-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[182].median_price)},
    { time:'	2021-01-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[181].median_price)},
    { time:'	2021-01-31	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[180].median_price)},
    { time:'	2021-02-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[179].median_price)},
    { time:'	2021-02-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[178].median_price)},
    { time:'	2021-02-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[177].median_price)},
    { time:'	2021-02-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[176].median_price)},
    { time:'	2021-02-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[175].median_price)},
    { time:'	2021-02-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[174].median_price)},
    { time:'	2021-02-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[173].median_price)},
    { time:'	2021-02-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[172].median_price)},
    { time:'	2021-02-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[171].median_price)},
    { time:'	2021-02-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[170].median_price)},
    { time:'	2021-02-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[169].median_price)},
    { time:'	2021-02-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[168].median_price)},
    { time:'	2021-02-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[167].median_price)},
    { time:'	2021-02-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[166].median_price)},
    { time:'	2021-02-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[165].median_price)},
    { time:'	2021-02-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[164].median_price)},
    { time:'	2021-02-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[163].median_price)},
    { time:'	2021-02-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[162].median_price)},
    { time:'	2021-02-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[161].median_price)},
    { time:'	2021-02-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[160].median_price)},
    { time:'	2021-02-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[159].median_price)},
    { time:'	2021-02-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[158].median_price)},
    { time:'	2021-02-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[157].median_price)},
    { time:'	2021-02-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[156].median_price)},
    { time:'	2021-02-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[155].median_price)},
    { time:'	2021-02-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[154].median_price)},
    { time:'	2021-02-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[153].median_price)},
    { time:'	2021-02-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[152].median_price)},
    { time:'	2021-03-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[151].median_price)},
    { time:'	2021-03-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[150].median_price)},
    { time:'	2021-03-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[149].median_price)},
    { time:'	2021-03-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[148].median_price)},
    { time:'	2021-03-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[147].median_price)},
    { time:'	2021-03-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[146].median_price)},
    { time:'	2021-03-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[145].median_price)},
    { time:'	2021-03-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[144].median_price)},
    { time:'	2021-03-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[143].median_price)},
    { time:'	2021-03-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[142].median_price)},
    { time:'	2021-03-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[141].median_price)},
    { time:'	2021-03-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[140].median_price)},
    { time:'	2021-03-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[139].median_price)},
    { time:'	2021-03-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[138].median_price)},
    { time:'	2021-03-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[137].median_price)},
    { time:'	2021-03-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[136].median_price)},
    { time:'	2021-03-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[135].median_price)},
    { time:'	2021-03-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[134].median_price)},
    { time:'	2021-03-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[133].median_price)},
    { time:'	2021-03-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[132].median_price)},
    { time:'	2021-03-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[131].median_price)},
    { time:'	2021-03-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[130].median_price)},
    { time:'	2021-03-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[129].median_price)},
    { time:'	2021-03-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[128].median_price)},
    { time:'	2021-03-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[127].median_price)},
    { time:'	2021-03-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[126].median_price)},
    { time:'	2021-03-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[125].median_price)},
    { time:'	2021-03-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[124].median_price)},
    { time:'	2021-03-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[123].median_price)},
    { time:'	2021-03-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[122].median_price)},
    { time:'	2021-03-31	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[121].median_price)},
    { time:'	2021-04-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[120].median_price)},
    { time:'	2021-04-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[119].median_price)},
    { time:'	2021-04-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[118].median_price)},
    { time:'	2021-04-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[117].median_price)},
    { time:'	2021-04-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[116].median_price)},
    { time:'	2021-04-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[115].median_price)},
    { time:'	2021-04-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[114].median_price)},
    { time:'	2021-04-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[113].median_price)},
    { time:'	2021-04-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[112].median_price)},
    { time:'	2021-04-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[111].median_price)},
    { time:'	2021-04-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[110].median_price)},
    { time:'	2021-04-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[109].median_price)},
    { time:'	2021-04-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[108].median_price)},
    { time:'	2021-04-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[107].median_price)},
    { time:'	2021-04-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[106].median_price)},
    { time:'	2021-04-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[105].median_price)},
    { time:'	2021-04-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[104].median_price)},
    { time:'	2021-04-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[103].median_price)},
    { time:'	2021-04-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[102].median_price)},
    { time:'	2021-04-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[101].median_price)},
    { time:'	2021-04-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[100].median_price)},
    { time:'	2021-04-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[99 ].median_price)},
    { time:'	2021-04-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[98 ].median_price)},
    { time:'	2021-04-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[97 ].median_price)},
    { time:'	2021-04-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[96 ].median_price)},
    { time:'	2021-04-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[95 ].median_price)},
    { time:'	2021-04-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[94 ].median_price)},
    { time:'	2021-04-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[93 ].median_price)},
    { time:'	2021-04-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[92 ].median_price)},
    { time:'	2021-04-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[91 ].median_price)},
    { time:'	2021-05-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[90 ].median_price)},
    { time:'	2021-05-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[89 ].median_price)},
    { time:'	2021-05-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[88 ].median_price)},
    { time:'	2021-05-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[87 ].median_price)},
    { time:'	2021-05-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[86 ].median_price)},
    { time:'	2021-05-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[85 ].median_price)},
    { time:'	2021-05-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[84 ].median_price)},
    { time:'	2021-05-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[83 ].median_price)},
    { time:'	2021-05-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[82 ].median_price)},
    { time:'	2021-05-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[81 ].median_price)},
    { time:'	2021-05-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[80 ].median_price)},
    { time:'	2021-05-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[79 ].median_price)},
    { time:'	2021-05-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[78 ].median_price)},
    { time:'	2021-05-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[77 ].median_price)},
    { time:'	2021-05-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[76 ].median_price)},
    { time:'	2021-05-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[75 ].median_price)},
    { time:'	2021-05-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[74 ].median_price)},
    { time:'	2021-05-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[73 ].median_price)},
    { time:'	2021-05-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[72 ].median_price)},
    { time:'	2021-05-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[71 ].median_price)},
    { time:'	2021-05-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[70 ].median_price)},
    { time:'	2021-05-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[69 ].median_price)},
    { time:'	2021-05-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[68 ].median_price)},
    { time:'	2021-05-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[67 ].median_price)},
    { time:'	2021-05-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[66 ].median_price)},
    { time:'	2021-05-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[65 ].median_price)},
    { time:'	2021-05-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[64 ].median_price)},
    { time:'	2021-05-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[63 ].median_price)},
    { time:'	2021-05-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[62 ].median_price)},
    { time:'	2021-05-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[61 ].median_price)},
    { time:'	2021-05-31	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[60 ].median_price)},
    { time:'	2021-06-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[59 ].median_price)},
    { time:'	2021-06-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[58 ].median_price)},
    { time:'	2021-06-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[57 ].median_price)},
    { time:'	2021-06-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[56 ].median_price)},
    { time:'	2021-06-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[55 ].median_price)},
    { time:'	2021-06-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[54 ].median_price)},
    { time:'	2021-06-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[53 ].median_price)},
    { time:'	2021-06-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[52 ].median_price)},
    { time:'	2021-06-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[51 ].median_price)},
    { time:'	2021-06-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[50 ].median_price)},
    { time:'	2021-06-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[49 ].median_price)},
    { time:'	2021-06-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[48 ].median_price)},
    { time:'	2021-06-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[47 ].median_price)},
    { time:'	2021-06-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[46 ].median_price)},
    { time:'	2021-06-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[45 ].median_price)},
    { time:'	2021-06-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[44 ].median_price)},
    { time:'	2021-06-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[43 ].median_price)},
    { time:'	2021-06-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[42 ].median_price)},
    { time:'	2021-06-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[41 ].median_price)},
    { time:'	2021-06-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[40 ].median_price)},
    { time:'	2021-06-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[39 ].median_price)},
    { time:'	2021-06-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[38 ].median_price)},
    { time:'	2021-06-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[37 ].median_price)},
    { time:'	2021-06-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[36 ].median_price)},
    { time:'	2021-06-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[35 ].median_price)},
    { time:'	2021-06-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[34 ].median_price)},
    { time:'	2021-06-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[33 ].median_price)},
    { time:'	2021-06-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[32 ].median_price)},
    { time:'	2021-06-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[31 ].median_price)},
    { time:'	2021-06-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[30 ].median_price)},
    { time:'	2021-07-01	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[29 ].median_price)},
    { time:'	2021-07-02	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[28 ].median_price)},
    { time:'	2021-07-03	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[27 ].median_price)},
    { time:'	2021-07-04	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[26 ].median_price)},
    { time:'	2021-07-05	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[25 ].median_price)},
    { time:'	2021-07-06	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[24 ].median_price)},
    { time:'	2021-07-07	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[23 ].median_price)},
    { time:'	2021-07-08	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[22 ].median_price)},
    { time:'	2021-07-09	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[21 ].median_price)},
    { time:'	2021-07-10	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[20 ].median_price)},
    { time:'	2021-07-11	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[19 ].median_price)},
    { time:'	2021-07-12	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[18 ].median_price)},
    { time:'	2021-07-13	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[17 ].median_price)},
    { time:'	2021-07-14	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[16 ].median_price)},
    { time:'	2021-07-15	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[15 ].median_price)},
    { time:'	2021-07-16	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[14 ].median_price)},
    { time:'	2021-07-17	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[13 ].median_price)},
    { time:'	2021-07-18	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[12 ].median_price)},
    { time:'	2021-07-19	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[11 ].median_price)},
    { time:'	2021-07-20	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[10 ].median_price)},
    { time:'	2021-07-21	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[9  ].median_price)},
    { time:'	2021-07-22	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[8  ].median_price)},
    { time:'	2021-07-23	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[7  ].median_price)},
    { time:'	2021-07-24	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[6  ].median_price)},
    { time:'	2021-07-25	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[5  ].median_price)},
    { time:'	2021-07-26	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[4  ].median_price)},
    { time:'	2021-07-27	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[3  ].median_price)},
    { time:'	2021-07-28	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[2  ].median_price)},
    { time:'	2021-07-29	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[1  ].median_price)},
    { time:'	2021-07-30	', value: (data.data.d2.dexTrades[0].median_price*data.data.ethereum.dexTrades[0  ].median_price)}]);


chart.resize(640, 400);  
chart2.resize(680, 400);  
}


fetchData()
