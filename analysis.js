var fs = require('fs');

var messages = JSON.parse(fs.readFileSync('training.txt').toString());
// console.log(messages);

var spam = {}
var ham = {}
var dic = {}

var KGRAM = 3; // Khai báo sau hàm tokenizer thì trong hàm tokenizer, KGRAM = 0 => ko extract dc gram nào :))
var tokenizerFlag = 2;
var trainingSize = 100;
var generalize = true;

function tokenizer(string) {
	var words = [];
	switch (tokenizerFlag){
		case 1:
			// ========== Split single words ==========

			words = string.split(' ');

			// ========== Split single words ==========

			// ========== k-grams ==========
			break;
		case 2:
			var smsLen = string.length;
			// console.log(string);
			// console.log(string.length + ' ' + smsLen);
			for(let i = 0; i <= smsLen - KGRAM; i++){
				words.push(string.substring(i, i + KGRAM));
			}
			break;
	}
	// console.log(string);
	// console.log(words);

	// ========== k-grams ==========
	return words;
}

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

	var words = tokenizer(sms.content);
	// let words = []
	// console.log('36: ' + words.length);
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
console.log('dicLen: ' + dicLen);

var wordIndex = {};
var wordMap = Object.keys(dic);
wordMap.map((key, index) => {
	wordIndex[key] = index
})

// console.log(wordIndex);



function extract(sms) {
	
	let words = tokenizer(sms);

	var result = {}
	for(w of words){
		if (w in result){
			result[w]++;
		}
		else {
			result[w] = 1
		}
	}
	var http = 0;
	if (sms.indexOf('http') >= 0){
		http = 1;
	}
	return {
		core: result,
		noOfCharacters: sms.length,
		http: http
	}
}

// console.log(extract(messages[0].content));

var Vector = []
var Label = []

for(var index = 0; index < messages.length; index++){
	// continue;
	var sms = messages[index]
	var arr = [];
	for(var i = 0; i < dicLen; i++){
		arr.push(0);
	}

	var extractedInfo = extract(sms.content);
	var core = extractedInfo.core;
	if (extractedInfo.http == 1){
		console.log(sms.id);
		console.log(sms.content);
	}

	for(var info in core){
		arr[wordIndex[info]] = core[info];
	}

	// Number of Characters is a feature, too.
	arr.push(extractedInfo.noOfCharacters)

	// Contains 'http' or not.
	arr.push(extractedInfo.http)

	Vector.push(arr);
	Label.push(sms.label)
}

console.log('Vector: ' + Vector.length);
console.log('Vector[0]: ' + Vector[0].length);
// console.log('Label: ' + Label.length);

if (generalize){
	// var mean = Vector.slice(0, 1);
	// for(var i = 1; i < Vector.length; i++){
	// 	var vector = Vector[i];
	// 	for(var j = 0; j < vector.length; j++){
	// 		mean[j] += vector[j];
	// 	}
	// }
	// for(var i = 0; i < mean.length; i++){
	// 	mean[i] /= Vector.length;
	// }

	var max = [];
	for(var i = 0; i < Vector[0].length; i++){
		max.push(0);
	}

	console.log('max: ' + max.length);

	for(var i = 0; i < Vector.length; i++){
		var vector = Vector[i];
		for(var j = 0; j < vector.length; j++){
			max[j] = (max[j] < vector[j]) ? vector[j] : max[j];
		}
	}

	// console.log(max);

	for(var i = 0; i < Vector.length; i++){
		for(var j = 0; j < Vector[i].length; j++){
			if (max[j] != 0){
				Vector[i][j] /= max[j]
			}
			else {
				Vector[i][j] = 0;
			}
			// if (max[j] == 0){
			// 	console.log('dmm');
			// }
		}
	}

}

var trainingMessagesId = []
var testMessagesId = []


// for(let i = 0; i < trainingSize; i++){
// 	trainingMessagesId.push(i);
// }

// for(let i = trainingSize; i < messages.length; i++){
// 	testMessagesId.push(i);
// }

while (trainingMessagesId.length < trainingSize){
	var id = Math.floor(Math.random() * 100)
	if (trainingMessagesId.indexOf(id) < 0){
		trainingMessagesId.push(id);
	}
}

for(let i = 0; i < messages.length; i++){
	if (trainingMessagesId.indexOf(i) < 0){
		testMessagesId.push(i)
	}
}

console.log('trainingId: ' + trainingMessagesId.length);
console.log('testId: ' + testMessagesId.length);

//

// var testVector = Vector.slice(trainingSize)
// var testLabel = Label.slice(trainingSize)

// var trainingVector = Vector.slice(0, trainingSize)
// var trainingLabel = Label.slice(0, trainingSize)

var trainingVector = Vector.filter((vector, index) => {
	return trainingMessagesId.indexOf(index) >= 0
})
var trainingLabel = Label.filter((label, index) => {
	return trainingMessagesId.indexOf(index) >= 0
})

var testVector = Vector.filter((vector, index) => {
	return testMessagesId.indexOf(index) >= 0
})
var testLabel = Label.filter((label, index) => {
	return testMessagesId.indexOf(index) >= 0
})

fs.writeFileSync('trainingVector.json', JSON.stringify(trainingVector, null, 2))
fs.writeFileSync('trainingLabel.json', JSON.stringify(trainingLabel))

fs.writeFileSync('testVector.json', JSON.stringify(testVector, null, 2))
fs.writeFileSync('testLabel.json', JSON.stringify(testLabel))

console.log(trainingVector.length);

console.log(trainingLabel.length);



var trainingMessages = messages.filter((sms) => {
	return trainingMessagesId.indexOf(sms.id) >= 0
})

var testMessages = messages.filter((sms) => {
	return testMessagesId.indexOf(sms.id) >= 0
})

fs.writeFileSync('trainingSMS.txt', JSON.stringify(trainingMessages, null, 4));
fs.writeFileSync('testSMS.txt', JSON.stringify(testMessages, null, 4));