import sg from './1SG-LTF-NT.mjs';
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

  const data = sg.map((d) => {
    return [formatDate(d.NAVDate), d.NAV]
  })

  createCSV(data, 'fund', '1SG-LTF-NT');
})()