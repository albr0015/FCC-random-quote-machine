import React, { useState, useEffect } from 'react';
import './App.scss';
import COLORS from './colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let gist = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
let tweetURL = encodeURI('https://twitter.com/intent/tweet?text=')

function App() {
  const [quote, setQuote] = useState("Life isn’t about getting and having, it’s about giving and being.")
  const [author, setAuthor] = useState("Kevin Kruse")
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(0)
  const [quotesArr, setQuotesArr] = useState(null)
  const [currentColor, setcurrentColor] = useState("#7c2727")

  const fetchJson = async (url) => {
    const response = await fetch(url)
    const parseJson = await response.json()
    setQuotesArr(parseJson)
  }
  useEffect(() => {
    fetchJson(gist)
  }, [gist])

  const buttonHandler = () => {
    setRandomQuoteIndex(Math.floor(Math.random() * quotesArr.length))
    setcurrentColor(COLORS[randomQuoteIndex])
    setQuote(quotesArr[randomQuoteIndex].quote);
    setAuthor(quotesArr[randomQuoteIndex].author)
  }
  return (
    <div className="App" >
      <header className="App-header" style={{ backgroundColor: currentColor, color: 'black' }}>

        <div id="quote-box">
          <p id="quote-text">
            "{quote}"
        </p>
          <p id="author">
            - {author}
          </p>
          
          <div className='btnTweet'>
            <a style={{ color: currentColor }} id="tweet-quote" href={tweetURL + quote + '   -' + author} target="_blank">
             
              <FontAwesomeIcon icon={faTwitter} />
        </a>
            <button style={{ backgroundColor: currentColor }} id="new-quote" onClick={() => { buttonHandler() }}>
              New Quote
        </button>
          </div>
        </div>

      </header>
    </div>
  );
}
<script src="https://kit.fontawesome.com/54a657a8de.js" crossorigin="anonymous"></script>
export default App;
