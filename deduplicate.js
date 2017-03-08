var fs = require('fs')

var files = [
	{
		fileName: 'spam.195.txt'
	},
	{
		fileName: 'spam.ViettelDV.txt'
	},
	{
		fileName: 'spam.ViettelQC.txt'
	},
	{
		fileName: 'ham.kean.txt'
	}
]

for(let file of files){
	var data = fs.readFileSync(file.fileName).toString().replace(/\n+/g, '\r').replace(/ {2,}/g, ' ').split('\r')
	console.log(file.fileName);
	console.log('before: ' + data.length + ' sms');
	var dic = {}
	for(let d of data){
		dic[d] = 1
	}
	data = Object.keys(dic)
	console.log('after: ' + data.length + ' sms');
	// console.log(data);
	fs.writeFileSync(file.fileName, data.join('\r'));

}

