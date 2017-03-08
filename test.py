# def custom_weights(data):
# 	print '=========='
# 	print data
# 	print '++++++++++'
# 	return data

# from sklearn import neighbors
# knn = neighbors.KNeighborsClassifier(n_neighbors=3, weights=custom_weights)

# knn.fit([[1, 2], [1, 3], [7, 8], [10, 11]], [10, 15, 25, 40])

# predict =  knn.predict([1, 4])

from sklearn import svm
import json

training_vector = []
training_label = []

test_vector = []
test_label = []


with open('Vector.json') as raw_json:
	training_vector = json.load(raw_json)
with open('Label.json') as raw_json:
	training_label = json.load(raw_json)

with open('predictVector.json') as raw_json:
	test_vector = json.load(raw_json)
with open('predictLabel.json') as raw_json:
	test_label = json.load(raw_json)

clf = svm.SVC(gamma=0.01, C=100., kernel='rbf')
clf.fit(training_vector, training_label)

print clf.score(test_vector, test_label)