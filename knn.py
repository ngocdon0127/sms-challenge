import json

training_vector = []
training_label = []

predict_vector = []
predict_label = []


# def parseJSON(filename, object):
# 	with open(filename) as raw_json:
# 		object = json.load(raw_json)

# parseJSON('trainingVector.json', training_vector)
# parseJSON('trainingLabel.json', training_label)
# parseJSON('predictVector.json', predict_vector)
# parseJSON('predictLabel.json', predict_label)

# print predict_label
# print training_vector



with open('trainingVector.json') as raw_json:
	training_vector = json.load(raw_json)
with open('trainingLabel.json') as raw_json:
	training_label = json.load(raw_json)
with open('predictVector.json') as raw_json:
	predict_vector = json.load(raw_json)
with open('predictLabel.json') as raw_json:
	predict_label = json.load(raw_json)


from sklearn import neighbors
knn = neighbors.KNeighborsClassifier(20)

knn.fit(training_vector, training_label)

print knn.predict(predict_vector)
print predict_label