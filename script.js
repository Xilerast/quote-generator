let apiQuotes = new Array();

// Toggles loader to visible and quote container to hidden
function loading() {
    document.getElementById("loader").hidden = false;
    document.getElementById("quote-container").hidden = true;
}

// Toggles loader to hidden and quote container to visible
function loadingComplete() {
    document.getElementById("loader").hidden = true;
    document.getElementById("quote-container").hidden = false;
}

// Show new quote
function newQuote() {
    // Show loader
    loading();
    // Save a random number that is equal to or less than the length of the quotes array
    let rand = Math.floor(Math.random() * apiQuotes.length);

    // Update the page with the quote and the Author
    document.getElementById("quote").innerHTML = apiQuotes[rand].text;
    document.getElementById("author").innerHTML = (apiQuotes[rand].author) ? apiQuotes[rand].author : "Unknown";

    // Shrink the quote font size if the quote is too long
    if (apiQuotes[rand].text.length > 120) {
        document.getElementById("quote").classList.add("long-quote");
    } else {
        document.getElementById("quote").classList.remove("long-quote");
    }

    // Show the quote
    loadingComplete();
}

// Get quotes from API
async function getQuotes() {
    // Show loader
    loading();

    // Make a request to the quotes' site API
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (err) {
        alert(err);
    }
}

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=\"${document.getElementById("quote").textContent}\" - ${document.getElementById("author").textContent}`;
    window.open(twitterURL, '_blank');
}

// call getQuotes when page loads
document.onload = getQuotes();