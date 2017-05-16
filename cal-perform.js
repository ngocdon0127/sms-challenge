var fs = require('fs')
var expected = JSON.parse(fs.readFileSync('expected-result.json'));
var predicted = JSON.parse(fs.readFileSync('run-result.json'));
var sms = fs.readFileSync('test.txt').toString().split('\r');
console.log(sms.length);
let total = expected.length;
let sum = 0;
for(let i = 0; i < total; i++){
	if (expected[i] == predicted[i]){
		sum++
	}
	else {
		console.log(sms[i]);
	}
}

console.log('performance: ' + sum + ' / ' + total + ' = ' + (sum / total * 100) + '%');