import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {

  const [tweets, setTweets] = useState([]);

  const getTweets = async (category) => {
    console.log(category)
    const response = await axios.get('http://127.0.0.1:8000/tweets/', { "category": "sport" });
    console.log(response)
    setTweets(response.data.tweets)
  }

  const handleSport = (e) => {
    e.preventDefault()
    getTweets("sport")
  }

  const handlePolitic = (e) => {
    e.preventDefault()
    getTweets("politic")
  }

  const handlePersonal = (e) => {
    e.preventDefault()
    getTweets("personal")
  }

  const tweetsList = tweets.map((tweet)=>{  
    tweet = JSON.parse(tweet)
    return <div><div>{tweet.text}</div><div>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      </div></div>;   
  });   

  return (
    <div className="">
  
      <button type="submit" className="form_button" onClick={handleSport}>Sport</button>
      <button type="submit" className="form_button" onClick={handlePolitic}>Politic</button>
      <button type="submit" className="form_button" onClick={handlePersonal}>Personal</button>
      
      <ul> {tweetsList} </ul>,   
    </div>
  );
}

export default App;
