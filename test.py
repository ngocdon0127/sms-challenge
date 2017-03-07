def custom_weights(data):
	print '=========='
	print data
	print '++++++++++'
	return data

from sklearn import neighbors
knn = neighbors.KNeighborsClassifier(n_neighbors=3, weights=custom_weights)

knn.fit([[1, 2], [1, 3], [7, 8], [10, 11]], [10, 15, 25, 40])

predict =  knn.predict([1, 4])