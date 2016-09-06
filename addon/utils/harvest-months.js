export default [{
  abbr: 'Jan',
  name: 'January',
  days: 31
}, {
  abbr: 'Feb',
  name: 'February',
  days(year) {
    year = parseInt(year, 10);

    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28;
  }
},{
  abbr: 'Mar',
  name: 'March',
  days: 31
}, {
  abbr: 'Apr',
  name: 'April',
  days: 30
},{
  abbr: 'May',
  name: 'May',
  days: 31
}, {
  abbr: 'Jun',
  name: 'June',
  days: 30
},{
  abbr: 'Jul',
  name: 'July',
  days: 31
}, {
  abbr: 'Aug',
  name: 'August',
  days: 31
},{
  abbr: 'Sep',
  name: 'September',
  days: 30
}, {
  abbr: 'Oct',
  name: 'October',
  days: 31
},{
  abbr: 'Nov',
  name: 'November',
  days: 30
}, {
  abbr: 'Dec',
  name: 'December',
  days: 31
}];
