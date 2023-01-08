# Content-Recommendation-System
This is a simple content-based recommender implemented in javascript to illustrate the concept of content-based recommendation. Content-based recommender is a popular recommendation technique to show similar items to users, especially useful to websites for e-commerce, news content, etc.

After the recommender is trained by an array of documents, it can tell the list of documents which are more similar to the input document.

The training process involves 3 main steps:
* content pre-processing, such as html tag stripping, [stopwords](http://xpo6.com/list-of-english-stop-words/) removal and [stemming](http://9ol.es/porter_js_demo.html)
* document vectors formation using [tf-idf](https://lizrush.gitbooks.io/algorithms-for-webdevs-ebook/content/chapters/tf-idf.html)
* find the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) scores between all document vectors
