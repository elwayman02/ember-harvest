export default [{
  name: 'January',
  days: 31
}, {
  name: 'February',
  days(year) {
    year = parseInt(year, 10);

    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28;
  }
},{
  name: 'March',
  days: 31
}, {
  name: 'April',
  days: 30
},{
  name: 'May',
  days: 31
}, {
  name: 'June',
  days: 30
},{
  name: 'July',
  days: 31
}, {
  name: 'August',
  days: 31
},{
  name: 'September',
  days: 30
}, {
  name: 'October',
  days: 31
},{
  name: 'November',
  days: 30
}, {
  name: 'December',
  days: 31
}];
