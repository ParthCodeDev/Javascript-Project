const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
const twitterApiUrl = "https://twitter.com/intent/tweet?";

// Get Quotes from API
let apiQuotes = [];

// Show new Quote
function showNewQuote() {
    // Pick a random Quotes from apiQuotes Array
    showLoading();
    return;
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author === null ? 'Unknow' : quote.author;

    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
       quoteText.classList.remove('long-quote');
    }
    hideLoading();
    quoteText.textContent = quote.text;
    console.log(quote);
}

async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch(error) {
        // You can handle error
    }
}

// Show loading
function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show loading
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;   
}


// Tweet Quote 
function tweetQuote() {
    const tweet = `${twitterApiUrl}text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweet, '_blank')
}

// Twitter Event Listener
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();