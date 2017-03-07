String.prototype.myTrim = function() {
	var s = this.trim();
	s = s.replace(/\r+\n+/g, ' ');
	s = s.replace(/ {2,}/g, ' ');
	return s;
}

String.prototype.vi2en = function() {
	var str = this.myTrim();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g, "i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"); 
	str= str.replace(/đ/g, "d"); 
	return str;
}

var onlyLowerCase = false;

var fs = require('fs');

var rawData = fs.readFileSync('train.txt').toString();

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

// console.log(d)

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

console.log(data.length)

fs.writeFileSync('training.txt', JSON.stringify(data, null, 4))