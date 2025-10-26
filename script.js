const quoteArea = document.querySelector(".quote-area");
const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".name");
const newQuoteBtn = document.getElementById("new-quote");

// Share buttons
const twitterBtn = document.querySelector(".twitter");
const facebookBtn = document.querySelector(".facebook");
const likeBtn = document.querySelector(".like");

let likeCount = 0;

// Custom quotes as fallback
const customQuotes = [
  { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" }
];

// Function to fetch random quote (API + custom quotes)
async function randomQuote(){
  quoteArea.classList.remove("fade-in");

  setTimeout(async () => {
    let randomIndex = Math.floor(Math.random() * customQuotes.length);
    let selected = customQuotes[randomIndex];

    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const apiQuote = data[Math.floor(Math.random() * data.length)];

      quoteText.innerText = `"${apiQuote.text}"`;
      authorName.innerText = apiQuote.author ? apiQuote.author : "Unknown";

    } catch (err) {
      quoteText.innerText = `"${selected.quote}"`;
      authorName.innerText = selected.author;
    }

    quoteArea.classList.add("fade-in");
  }, 200);
}

// Event listeners
newQuoteBtn.addEventListener("click", randomQuote);

// Twitter share
twitterBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText + " — " + authorName.innerText)}`;
  window.open(tweetUrl, "_blank");
});

// Facebook share
facebookBtn.addEventListener("click", () => {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quoteText.innerText + " — " + authorName.innerText)}`;
  window.open(fbUrl, "_blank");
});

// Like button
likeBtn.addEventListener("click", () => {
  likeCount++;
  likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${likeCount}`;
});
