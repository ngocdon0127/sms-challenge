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


# print training_vector[0]
# sys.exit(0)

# def custom_weights(data):
# 	print '=========='
# 	print data
# 	print '++++++++++'
# 	return data

from sklearn import neighbors

k_fold = 10
size = len(vector) / k_fold

err = 0.0

for i in range(k_fold):
	knn = None
	knn = neighbors.KNeighborsClassifier(n_neighbors=10, weights='distance')
	training_vector = vector[0:(i * size)] + vector[((i + 1) * size):]
	training_label = label[0:(i * size)] + label[((i + 1) * size):]
	test_vector = vector[(i * size):((i + 1) * size)]
	test_label = label[(i * size):((i + 1) * size)]

	knn.fit(training_vector, training_label)

	# predict =  knn.predict(test_vector)

	# print 'predict'
	# print predict
	# print 'real'
	# print test_label
	score = knn.score(test_vector, test_label)

	err += score

	# print 'fold %d: length %d, score %f' % (i, len(test_vector), score)

print '\n\n==================== KNN ====================\n\n'


knn = neighbors.KNeighborsClassifier(n_neighbors=10, weights='distance')
knn.fit(vector, label)

with open('predictVector.json') as raw_json:
	test_vector = json.load(raw_json)

result = knn.predict(test_vector)

predict_sms = []

with open('predict.json') as raw_json:
	predict_sms = json.load(raw_json)

for i in range(len(result)):
	print '%d %s' % (result[i], predict_sms[i]['content'])
print '%d folds, %d vectors in each fold: average score = %f' % (k_fold, size, err / k_fold)
print '\n\n==================== KNN ====================\n\n'