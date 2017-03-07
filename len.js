var fs = require('fs');

var data = fs.readFileSync('train.txt').toString();

// console.log(data)

data = data.split('\r').filter((e) => {
	return e.length > 0
});
console.log(data)

console.log(data.length);

// for()