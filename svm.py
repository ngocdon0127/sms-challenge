import json
import sys

vector = []
label = []

training_vector = []
training_label = []

test_vector = []
test_label = []


with open('Vector.json') as raw_json:
	vector = json.load(raw_json)
with open('Label.json') as raw_json:
	label = json.load(raw_json)
# with open('testVector.json') as raw_json:
# 	test_vector = json.load(raw_json)
# with open('testLabel.json') as raw_json:
# 	test_label = json.load(raw_json)

# print training_vector[0]
# sys.exit(0)

# def custom_weights(data):
# 	print '=========='
# 	print data
# 	print '++++++++++'
# 	return data

from sklearn import svm



k_fold = 20
size = len(vector) / k_fold

err = 0.0

for i in range(k_fold):
	clf = None
	clf = svm.SVC(gamma=0.001, C=100., kernel='linear')
	
	training_vector = vector[0:(i * size)] + vector[((i + 1) * size):]
	training_label = label[0:(i * size)] + label[((i + 1) * size):]
	test_vector = vector[(i * size):((i + 1) * size)]
	test_label = label[(i * size):((i + 1) * size)]

	clf.fit(training_vector, training_label)

	# predict =  knn.predict(test_vector)

	# print 'predict'
	# print predict
	# print 'real'
	# print test_label
	score = clf.score(test_vector, test_label)

	err += score

	print 'fold %d: score %f' % (i, score)

print 'average in %d fold: %f' % (k_fold, err / k_fold)