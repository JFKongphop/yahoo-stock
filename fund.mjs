import fund1AmGem from './1AM-GEM.mjs';
import { createCSV } from './yahoo-stock.mjs';

const checkDigit = (number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number.toString();
}

const formatDate = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6)

  const convertDate = new Date(`${year}-${month}-${day}`)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(convertDate);

  return formattedDate;
}

(() => {
  const arrayCSV = []
  for (let i = 2019; i < 2024; i++) {
    for (let j = 1; j < 13; j++) {
      if (
        Number(`${i}${checkDigit(j)}01`) >= 20190901 
        && Number(`${i}${checkDigit(j)}01`) <= 20230901
      ) {
        arrayCSV.push(`${i}${checkDigit(j)}01`);
      }
    }
  }
  const filteredArray = fund1AmGem.filter(item => arrayCSV.includes(item.NAVDate));

  const data = filteredArray.map((d) => {
    return [formatDate(d.NAVDate), d.NAV]
  })

  createCSV(data, 'fund', '1AM-GEM');
})()