import json
import sys

training_vector = []
training_label = []

test_vector = []
test_label = []


# def parseJSON(filename, object):
# 	with open(filename) as raw_json:
# 		object = json.load(raw_json)

# parseJSON('trainingVector.json', training_vector)
# parseJSON('trainingLabel.json', training_label)
# parseJSON('predictVector.json', test_vector)
# parseJSON('predictLabel.json', test_label)

# print test_label
# print training_vector



with open('trainingVector.json') as raw_json:
	training_vector = json.load(raw_json)
with open('trainingLabel.json') as raw_json:
	training_label = json.load(raw_json)
with open('testVector.json') as raw_json:
	test_vector = json.load(raw_json)
with open('testLabel.json') as raw_json:
	test_label = json.load(raw_json)

# print training_vector[0]
# sys.exit(0)

def custom_weights(data):
	print '=========='
	print data
	print '++++++++++'
	return data

from sklearn import neighbors
knn = neighbors.KNeighborsClassifier(n_neighbors=10, weights='distance')

knn.fit(training_vector, training_label)

predict =  knn.predict(test_vector)

print 'predict'
print predict
print 'real'
print test_label

# if (len(predict) == len(test_label)):
# 	print 'KNN:'
# 	total = len(predict)
# 	true = 0
# 	for x in range(total):
# 		if (predict[x] == test_label[x]):
# 			true += 1
# 	print '%d %d %f' % (true, total, float (true) / total)

print knn.score(test_vector, test_label)

#sys.exit(0)

from sklearn import svm

clf = svm.SVC(gamma=0.001, C=100., kernel='linear')
clf.fit(training_vector, training_label)

predictSVM = clf.predict(test_vector)
print 'predict'
print predictSVM
print 'real'
print test_label

# if (len(predictSVM) == len(test_label)):
# 	print 'SVM:'
# 	total = len(predictSVM)
# 	true = 0
# 	for x in range(total):
# 		if (predictSVM[x] == test_label[x]):
# 			true += 1
# 	print '%d %d %f' % (true, total, float (true) / total)

print clf.score(test_vector, test_label)