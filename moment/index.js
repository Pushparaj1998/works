const moment = require('moment');
const date = new Date(Date.now())
console.log("date-------------------------->", date)
const data = moment(date).add(1, 'M')
console.log("data---------------------------->", data)
