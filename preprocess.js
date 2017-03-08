var fs = require('fs')

var config = JSON.parse(fs.readFileSync('config.json'));

var trainingRawFiles = config.originalTrainingSMS;

deduplicate(trainingRawFiles)

function deduplicate(files) {
	for(let file of files){
		var data = fs.readFileSync(file.fileName).toString().replace(/\n+/g, '\r').replace(/ {2,}/g, ' ').split('\r')
		console.log('===== ' + file.fileName + ' =====');
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
}

String.prototype.myTrim = function() {
	var s = this.trim();
	s = s.replace(/\r+\n+/g, ' ');
	s = s.replace(/ {2,}/g, ' ');
	return s;
}

String.prototype.vi2en = function() {
	var str = this.myTrim();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"); 
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"); 
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i"); 
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"); 
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"); 
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"); 
	str = str.replace(/đ/g, "d"); 
	return str;
}

var rawData = ''

var onlyLowerCase = config.onlyLowerCase;
var extraTrainingSMS = config.extraTrainingSMS;

for(let file of config.originalTrainingSMS){
	rawData += '\r';
	var sms_ = fs.readFileSync(file.fileName).toString();
	sms_ = sms_.replace(/\n+/g, '\r');
	rawData += sms_;
}

if (extraTrainingSMS){
	var files = config.extraSMS;
	deduplicate(files)
	for(let file of files){
		rawData += '\r';
		var sms_ = fs.readFileSync(file.fileName).toString();
		// console.log(sms_);
		sms_ = sms_.replace(/\n+/g, '\r');
		rawData += sms_;
	}
}

if (onlyLowerCase){
	rawData = rawData.toLowerCase();
}

rawData = rawData.split('\r');

rawData.map((line, index) => {
	var l = line.vi2en();
	if (l.length < 1){
		rawData[index] = '';
	}
	else {
		rawData[index] = l;
	}
})

var d = rawData.filter((line) => {
	return line.length > 0

});

console.log('Total: ' + d.length + ' messages.');
// console.log(d[100]);
// console.log(d[101]);
// console.log(d[d.length - 1]);

// prune
d = d.slice(0, Math.floor(d.length / 10) * 10)
console.log('Take: ' + d.length + ' messages.');

var data = [];

d.map((element, index) => {
	let parts = element.split(' ');
	let label = parseInt(parts[0]);
	let e = {}
	switch (label){
		case -1: 
		case 1:
			e.id = index
			e.label = label;
			e.content = parts.slice(1).join(' ');
			break;
		default:
			console.log(element)
			break;
	}
	if (e){
		data.push(e)
	}
})

// console.log(data.length)

fs.writeFileSync('training.txt', JSON.stringify(data, null, 4))

var predictRawSMS = ''

for(let file of config.predictSMS){
	predictRawSMS += '\r';
	
	var data = fs.readFileSync(file.fileName).toString().replace(/\n+/g, '\r').replace(/ {2,}/g, ' ');
	if (onlyLowerCase){
		data = data.toLowerCase();
	}
	data = data.vi2en();
	predictRawSMS += data;
}

var predictSMS = predictRawSMS.split('\r').filter((sms, index) => {
	return sms.length > 0
})

data = []

predictSMS.map((sms, index) => {
	data.push({
		id: index,
		content: sms
	})
})

fs.writeFileSync('predict.json', JSON.stringify(data, null, 4))