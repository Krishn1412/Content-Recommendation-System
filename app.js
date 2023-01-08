const _ = require('underscore');
const Vector = require('vector-object');
const sw = require('stopwords');
const natural =require('natural');
const { object } = require('underscore');

var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

const {TfIdf,PorterStemmer,Ngram} = natural;

class recommender {

    train(documents){

        // step 1: Data preprocesing
        const preprodoc = this.__preprocess(documents);

        //step 2 : Create vecrtors from documents.
        const dVectors = this.__vectorization(preprodoc);

        //step 3: Find cosine similarities.
        const data = this.__cosineSimilarity(dVectors);
        return data;

    }



    __preprocess(documents){
        const formatted = documents.map(l =>{
            let tokens = this.__preprocess2(l.content);
            return {
                id:l.id,
                tokens
            };
        });
       
        return formatted;
    }


    __preprocess2(content){
        content = content.toLowerCase();
        const final = this.__remove_stopwords(content);
        //console.log(final);
        return final;
    }


    __remove_stopwords(str) {
        var res = []
        var words = str.split(' ')
        for(let i=0;i<words.length;i++) {
           var word_clean = words[i].split(".").join("")
           if(!stopwords.includes(word_clean)) {
               res.push(word_clean)
           }
        }
        return(res.join(' '))
    }

    __vectorization(documents){
        const tfidf = new TfIdf();

        documents.forEach(doc =>{
            tfidf.addDocument(doc.tokens);
        });
        
        const docVector = [];
        for(let i=0;i<documents.length;i++){
            const currDoc = documents[i];
            const obj = {};

            const items = tfidf.listTerms(i);
            for(let j=0;j<items.length;j++){
                obj[items[j].term] = items[j].tfidf;
            }
            
            const currDocVector = {
                id: currDoc.id,
                vector: new Vector(obj)
            };

            docVector.push(currDocVector);
        }
        //console.log(docVector);
        return docVector;
    }


    __cosineSimilarity(documents){
        const MAX_SIMILAR = 20;
        const MIN_SCORE = 0.1;
        const data = {};

        for (let i = 0; i < documents.length; i += 1) {
            const { id } = documents[i];
            data[id] = [];
        }

        for(let i=0;i<documents.length;i++){
            
            for(let j=0;j<i;j++){
                const idA = documents[i].id;
                const vA = documents[i].vector;
                const idB = documents[j].id;
                const vB = documents[j].vector;

                const similarity = vA.getCosineSimilarity(vB);
                
                if(similarity>MIN_SCORE){
                    data[idA].push({
                        id:idB,
                        score:similarity,
                    });
                    data[idB].push({
                        id:idA,
                        score:similarity,
                    });
                }
            }
        }
        Object.keys(data).forEach(id => {
            data[id].sort((a, b) => b.score - a.score);
        
            if (data[id].length > MAX_SIMILAR) {
              data[id] = data[id].slice(0, MAX_SIMILAR);
            }
        });
        return data;
    }
    getSimilarDocuments(id, data){
        let similarDocuments = data[id];
      
        if (similarDocuments === undefined) {
          return [];
        }
      
        return similarDocuments;
      };
}

const documents = [
    { id: '1000001', content: 'Why studying javascript is fun?' },
    { id: '1000002', content: 'The trend for javascript in machine learning' },
    { id: '1000003', content: 'The most insightful stories about JavaScript' },
    { id: '1000004', content: 'Introduction to Machine Learning' },
    { id: '1000005', content: 'Machine learning and its application' },
    { id: '1000006', content: 'Python vs Javascript, which is better?' },
    { id: '1000007', content: 'How Python saved my life?' },
    { id: '1000008', content: 'The future of Bitcoin technology' },
    { id: '1000009', content: 'Is it possible to use javascript for machine learning?' }
  ];

  const algo = new recommender();
  const data = algo.train(documents);
  const ans = algo.getSimilarDocuments('1000004',data);
  console.log(ans);
