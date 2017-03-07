var fs = require('fs');

var messages = JSON.parse(fs.readFileSync('training.txt').toString());
// console.log(messages);

var spam = {}
var ham = {}
var dic = {}

for(let sms of messages){

	// if (sms.label == -1){
	// 	let words = sms.content.split(' ')
	// 	for(w of words){
	// 		if (w in spam){
	// 			spam[w]++;
	// 		}
	// 		else {
	// 			spam[w] = 1
	// 		}
	// 	}
	// }
	// else {
	// 	let words = sms.content.split(' ')
	// 	for(w of words){
	// 		if (w in ham){
	// 			ham[w]++;
	// 		}
	// 		else {
	// 			ham[w] = 1
	// 		}
	// 	}
	// }

	let words = sms.content.split(' ')
	for(w of words){
		if (w in dic){
			dic[w]++;
		}
		else {
			dic[w] = 1
		}
	}
}

// console.log(spam);
// var result = {}
// result.spamMin = 1000;
// result.spamMax = 0;
// result.wordMin = '';
// result.wordMax = ''
// for(key in spam){
// 	if (spam[key] > result.spamMax){
// 		result.spamMax = spam[key];
// 		result.wordMax = key;
// 	}
// 	if (spam[key] < result.spamMin){
// 		result.spamMin = spam[key];
// 		result.wordMin = key;
// 	}
// }
// console.log(Object.keys(spam).length);
// console.log(result);

// console.log(dic);
var dicLen = Object.keys(dic).length
console.log();

var wordIndex = {};
var wordMap = Object.keys(dic);
wordMap.map((key, index) => {
	wordIndex[key] = index
})

// console.log(wordIndex);

function extract(sms) {
	let words = sms.split(' ');
	var result = {}
	for(w of words){
		if (w in result){
			result[w]++;
		}
		else {
			result[w] = 1
		}
	}
	return result
}

// console.log(extract(messages[4].content));

var trainingVector = []
var trainingLabel = []

for(var index = 0; index < messages.length; index++){
	var sms = messages[index]
	var arr = [];
	for(var i = 0; i < dicLen; i++){
		arr.push(0);
	}

	var extractedInfo = extract(sms.content);

	for(var info in extractedInfo){
		arr[wordIndex[info]] = extractedInfo[info];
	}

	trainingVector.push(arr);
	trainingLabel.push(sms.label)
}



var predictVector = trainingVector.slice(trainingVector.length - 10)
var predictLabel = trainingLabel.slice(trainingLabel.length - 10)

trainingVector = trainingVector.slice(0, trainingVector.length - 10)
trainingLabel = trainingLabel.slice(0, trainingLabel.length - 10)

fs.writeFileSync('trainingVector.json', JSON.stringify(trainingVector, null, 2))
fs.writeFileSync('trainingLabel.json', JSON.stringify(trainingLabel))

fs.writeFileSync('predictVector.json', JSON.stringify(predictVector, null, 2))
fs.writeFileSync('predictLabel.json', JSON.stringify(predictLabel))

console.log(trainingVector.length);

console.log(trainingLabel.length)