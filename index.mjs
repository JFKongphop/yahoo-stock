import axios from 'axios';
import fs from 'fs';
import { convertArrayToCSV } from 'convert-array-to-csv'

const convertTimestamp = (number) => {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(number * 1000);
}

const localaString = (number) => {
  if (number) {
    return number.toLocaleString();
  }
  return '';
}

const createArrayCSV = async (stock) => {
  const stockURL = `https://query1.finance.yahoo.com/v8/finance/chart/${stock}.BK?formatted=true&crumb=8XK9lcEB2DB&lang=en-US&region=US&includeAdjustedClose=true&interval=1mo&period1=1567296000&period2=1693526400&events=capitalGain%7Cdiv%7Csplit&useYfid=true&corsDomain=finance.yahoo.com`;
  const { data } = await axios.get(stockURL);

  const timestamps = data.chart.result[0].timestamp;
  const close = data.chart.result[0].indicators.quote[0].close;

  const arrayCSV = [];
  for (let i = 0; i < close.length; i++) {
    arrayCSV.push([convertTimestamp(timestamps[i]), localaString(close[i])])
  }

  return arrayCSV;
}


const createCSV = (arrayCSV, stock) => {
  const csvFile = convertArrayToCSV(arrayCSV, {
    header: ['Date', 'Close'],
    separator: ','
  });
  
  fs.writeFile(`${stock}.csv`, csvFile, (err) => {
    if (err) throw err;
    console.log('done', stock);
  });
}



(async () => {
  const stocks = ['KTB','TTB', 'MEGA', 'CPALL', 'CENTEL', 'MINT', 'ADVANC', 'HANA', 'PTTEP', 'OSP', '^SET']
  // 1 sep 1693526400
  // 1 aug 1690822800

  for (const stock of stocks) {
    try {
      const arrayCSV = await createArrayCSV(stock);
      createCSV(arrayCSV ,stock)
    }
    catch (e) {
      console.log(e)
    }
  }

})();