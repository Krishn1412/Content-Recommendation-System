var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

function __preprocess(documents){
    // console.log(value);
    // console.log(documents[i]);
    const formatted = documents.map(l =>{
        let tokens = preprocess2(l.content);
        return {
            id:l.id,
            tokens
        };
    });
    return formatted;
}
function remove_stopwords(str) {
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
}
function preprocess2(content){
    content = content.toLowerCase();
    const final = remove_stopwords(content);
    //console.log(final);
    return final;
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
const preprodoc=__preprocess(documents);
console.log(preprodoc);