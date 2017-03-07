# Additionally, three more tokens are generated based on
# the number of dollar signs ($), the number of numeric strings,
# and the overall number of characters in the message


# Going through the extracted
# tokens, we removed the ones with less than five and more
# than 500 times frequency in the dataset, since those tokens
# are either too rare or too common, and do not contribute to
# the content of the messages.

int digits.data[1797][64]
int digits.target[1797]

# === knn ===
from sklearn import neighbors
knn = neighbors.KNeighborsClassifier(10)
# clf = neighbors.KNeighborsClassifier(n_neighbors, weights=weights)
knn.fit(digits.data[:-1], digits.target[:-1])

knn.predict([digits.data[-1:]])
