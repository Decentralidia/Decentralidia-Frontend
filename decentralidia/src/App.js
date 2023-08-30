import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './images/logo.png';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import sport from './images/sport.png';
import trip from './images/trip.png';
import tech from './images/tech.png';

function App() {

  const [tweets, setTweets] = useState([]);
  const [selectedTweets, setSelectedTweets] = useState({0:-1, 1:-1, 2:-1, 3:-1, 4:-1, 5:-1, 6:-1, 7:-1, 8:-1, 9:-1, 10:-1, 11:-1, 12:-1, 13:-1, 14:-1});
  const [tweetId, setTweetId] = useState(0);
  const [color, setColor] = useState(1);
  const [start, setStart] = useState(0);
  const [err, setErr] = useState(0);
  const [err2, setErr2] = useState(0);
  const [err3, setErr3] = useState(0);
  const [selectedVote, setSelectedVote] = useState(-1);
  const [voteErr, setVoteErr] = useState(0);
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState(0);
  const [isBack, setIsBack] = useState(0);

  const [selectedLike, setSelectedLike] = useState("");
  const [selectedLikes, setSelectedLikes] = useState({0:"", 1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"", 8:"", 9:"", 10:"", 11:"", 12:"", 13:"", 14:""});
  
  

  const getTweets = async (category, fn, age) => {
    console.log("age")
    console.log(age)
    const response = await axios.get('http://127.0.0.1:8000/tweets/', {
      params: {category: category, fullname: fn, age:age, gender:"other"}
    });
    console.log(response.data.tweets)
    setTweets(response.data.tweets)
  }

  useEffect(() => {
    if (start != 0 && selectedVote != -1 && isBack != 1) {
      document.getElementById('next').click();
    }
    setIsBack(0);
}, [selectedVote]);

  const handleSelectedItem = (item, like) => {
    var b = document.getElementById('vote1');
    if (item == 1) {
      b.className = "votes vote1 selected-button";
    } else {
      b.className = "votes vote1";
    }

    b = document.getElementById('vote2');
    if (item == 2) {
      b.className = "votes vote2 selected-button";
    } else {
      b.className = "votes vote2";
    }

    b = document.getElementById('vote3');
    if (item == 3) {
      b.className = "votes vote3 selected-button";
    } else {
      b.className = "votes vote3";
    }

    b = document.getElementById('vote4');
    if (item == 4) {
      b.className = "votes vote4 selected-button";
    } else {
      b.className = "votes vote4";
    }

    b = document.getElementById('vote5');
    if (item == 5) {
      b.className = "votes vote5 selected-button";
    } else {
      b.className = "votes vote5";
    }

    console.log(selectedLike)
    if (like == "like") {
      document.getElementById('like-container').className = 'like-container-selected';
      document.getElementById('dislike-container').className = 'like-container';
      setSelectedLike("like")
    } else if (like == "dislike") {
      document.getElementById('like-container').className = 'like-container';
      document.getElementById('dislike-container').className = 'like-container-selected';
      setSelectedLike("dislike")
    }
  }

  const handleNext = async (e) => {
    console.log(selectedVote)

    if (selectedVote === -1 && start === 1) {
      setVoteErr(1)
      return;
    }

    if (start === 0) {
      // document.getElementById('tweet-box').className = 'tweet-box backgroundAnimated-green';
      // var fullname = document.getElementById('name').value;
      if (document.querySelector('input[name="cat"]:checked') !== null && document.getElementById('fullname').value != '' && document.getElementById('age').value != '') {
        var category = document.querySelector('input[name="cat"]:checked').id;
        console.log(category)
        setStart(1);

        const fn = document.getElementById('fullname').value.toLowerCase();
        setFullname(fn)

        const age = document.getElementById('age').value.toLowerCase();
        setAge(age)
        getTweets(category, fn, age)

        document.getElementById('back').className = 'back';
        setVoteErr(0)
        return;
      } 

     

      if (document.querySelector('input[name="cat"]:checked') === null) {
        setErr(1);
      } else {
        setErr(0);
      }
      if (document.getElementById('fullname').value === '') {
        setErr2(1);
      } else {
        setErr2(0);
      }
      if (document.getElementById('age').value === '') {
        setErr3(1);
      } else {
        setErr3(0);
      }
      
      return;
    }
    e.preventDefault()
    if(tweetId < tweets.length) {
      setSelectedLike("")
      document.getElementById('like-container').className = 'like-container';
      document.getElementById('dislike-container').className = 'like-container';
      
      if (color === 0) {
        document.getElementById('tweetContainer').className = 'tweetContainer backgroundAnimated-red';
      } else if (color === 1) {
        document.getElementById('tweetContainer').className = 'tweetContainer backgroundAnimated-grey';
      } else if (color === 2) {
        document.getElementById('tweetContainer').className = 'tweetContainer backgroundAnimated-green';
      }
      setTweetId(tweetId+1)
      handleSelectedItem(selectedTweets[tweetId+1], selectedLikes[tweetId+1])
      setSelectedVote(-1)
      setVoteErr(0)

      const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:selectedVote, fullname:fullname, like_dislike:selectedLike});
    } 
  }

  const handleBack = (e) => {
    e.preventDefault()
    console.log("Backkkk")
    setIsBack(1);
    if(0 < tweetId) {
      setTweetId(tweetId-1)
      console.log("id", tweetId-1)
      handleSelectedItem(selectedTweets[tweetId-1], selectedLikes[tweetId-1])
      setSelectedVote(selectedTweets[tweetId-1])
    }
  }

  const thanksUser = () => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: <strong>Thanks For Your Participation!</strong>,
      html: <i>It would help us a lot during our study process.</i>,
      icon: 'success',
      confirmButtonText: 'Continue with New Tweets',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href = "http://104.234.1.53:3000";
      } 
    })
  }

  const handleVote1 = async (e) => {
    e.preventDefault()
    setSelectedVote(1)
    if (tweetId == tweets.length-1) {
      const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:1, fullname:fullname, like_dislike:selectedLike});
      thanksUser();
    }
    setColor(0);
    setSelectedTweets({...selectedTweets, [tweetId]: 1})
    // const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:1});
    handleSelectedItem(1, selectedLike)
    // document.getElementById('next').click();
  }

  const handleVote2 = async (e) => {
    e.preventDefault()
    setSelectedVote(2)
    if (tweetId == tweets.length-1) {
      thanksUser();
    }
    setColor(0);
    setSelectedTweets({...selectedTweets, [tweetId]: 2})
    // const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:2});
    handleSelectedItem(2, selectedLike)
    // document.getElementById('next').click();
  }

  const handleVote3 = async (e) => {
    e.preventDefault()
    setSelectedVote(3)
    if (tweetId == tweets.length-1) {
      thanksUser();
    }
    setColor(1);
    setSelectedTweets({...selectedTweets, [tweetId]: 3})
    // const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:3});
    handleSelectedItem(3, selectedLike)
    // document.getElementById('next').click();
  }

  const handleVote4 = async (e) => {
    e.preventDefault()
    setSelectedVote(4)
    if (tweetId == tweets.length-1) {
      thanksUser();
    }
    setColor(2);
    setSelectedTweets({...selectedTweets, [tweetId]: 4})
    // const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:4});
    handleSelectedItem(4, selectedLike)
    // document.getElementById('next').click();
  }

  const handleVote5 = async (e) => {
    e.preventDefault()
    setSelectedVote(5, selectedLike)
    if (tweetId == tweets.length-1) {
      thanksUser();
    }
    setColor(2);
    setSelectedTweets({...selectedTweets, [tweetId]: 5})
    // const response = await axios.post('http://127.0.0.1:8000/tweets/', {tweet_id:JSON.parse(tweets[tweetId]).id , vote:5});
    handleSelectedItem(5, selectedLike)
    // document.getElementById('next').click();
  }

  const handleLike = (e) => {
    e.preventDefault()
    document.getElementById('like-container').className = 'like-container-selected';
    document.getElementById('dislike-container').className = 'like-container';
    setSelectedLike("like")
    setSelectedLikes({...selectedLikes, [tweetId]: "like"})
  }

  const handleDislike = (e) => {
    e.preventDefault()
    document.getElementById('like-container').className = 'like-container';
    document.getElementById('dislike-container').className = 'like-container-selected';
    setSelectedLike("dislike")
    setSelectedLikes({...selectedLikes, [tweetId]: "dislike"})
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
//     <div className="pageContainer">
//     <div className="">
  
//       <button type="submit" className="form_button" onClick={handleSport}>Sport</button>
//       <button type="submit" className="form_button" onClick={handlePolitic}>Politic</button>
//       <button type="submit" className="form_button" onClick={handlePersonal}>Personal</button>
      
//       <ul> {tweetsList} </ul>,   
//     </div>

  
//     <div className='tweetContainer'>
//     <h4>
//     Coivd are you Joking me?
//     </h4>
//         <div className='buttonsContainer'>
//         <div className='remove'></div>

//       <button className='votes vote1'></button>
//       <button className='votes vote2'></button>
//       <button className='votes vote3'></button>
//       <button className='votes vote4'></button>
//       <button className='votes vote5'></button>

//       <div className='remain'></div>
//         </div>
//     </div>

//     <div class="container">

// <div class="task-progress">
//   <p>Tweets
//   <span>1/15</span>
//   </p>
//   <progress class="progress progress--task3" max="15" value="1"></progress>
// </div>
  

// </div>

// <div id="js-prev1" class="swiper-button-prev"></div>
//   <div id="js-next1" class="swiper-button-next"></div>
    
//     </div>

<div>
<div className='header-container'>
    <img src={logo} width={80}  />
</div>

<div className='page-container'>

    <div className='left-side'>
      <div className='box-container'>

      </div>
    </div>



    <div className='center-side'>
      <p className='header-text'>
      "Please rate this tweet. A rating of <p className='green-text'>5</p> indicates that it's acceptable and it will be <p className='green-text'>Remained</p>, while a rating of <p className='red-text'>1</p> implies it should be <p className='red-text'>removed</p>.<br/><br/> Also, you can <p className='blue-text'>Like or dislike</p> a tweet, which is just identified that you like tweet or not and <p className='blue-text'>not related to removing the tweet.</p> Kindly please rate 15 tweets."
      </p>

      {
        start !== 0?
        <div className="task-progress">
  <p>Tweets
  <span>{tweetId>=tweets.length?tweetId:tweetId}/{tweets.length}</span>
  </p>
  <progress className="progress progress--task3" max={tweets.length} value={tweetId}></progress>
      </div>
      :
      <div className='box'></div>
      }

    <div className={start==0?'tweet-box-2':'tweet-box'} id='tweet-box'>
      

      <button className='back disable-button' id="back" onClick={handleBack}></button>
    {start == 0
      ?
      <div>
        <div className='centered'>
    <p className='centered'>Please enter your name and age. Then click on the topic which is more interested to you to see the relevant tweets in the experiment.{err2 == 0? <div></div> :<div className='error'>Please enter your fullname.</div>}{err3 == 0? <div></div> :<div className='error'>Please enter your age.</div>}{err == 0? <div></div> :<div className='error'>Please select one of them!</div>}</p>
    <div className='inputs-container'>
    <input id="fullname" class="name-input" type="text" placeholder="Full Name" />
<div>
<input id="age" class="name-input" type="text" placeholder="Age" /></div>
    </div>
   
    
    <div class="radio-buttons">
    <label class="custom-radio">
      <input type="radio" name="cat" id="sport"/>
      <span class="radio-btn"><i class="las la-check"></i>
        <div class="hobbies-icon">
          <img src={sport} />
          <h3 class="">Sport</h3>
        </div>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" name="cat" id="entertainment" />
      <span class="radio-btn"><i class="las la-check"></i>
        <div class="hobbies-icon">
                       <img src={trip} />
          <h3 class="">Entertain</h3>
        </div>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" name="cat" id='tech'/>
      <span class="radio-btn"><i class="las la-check"></i>
        <div class="hobbies-icon">
          <img src={tech} />
          <h3 class="">Tech</h3>
        </div>
      </span>
    </label>

    {/* <label class="custom-radio">
      <input type="radio" name="radio" />
      <span class="radio-btn"><i class="las la-check"></i>
        <div class="hobbies-icon">
           <img src="https://img.freepik.com/free-vector/chemist-concept-illustration_114360-10142.jpg?size=626&ext=jpg" />
          <h3 class="">Science</h3>
        </div>
      </span>
    </label> */}
    
  </div>
  </div>
      </div>
      :
      <div className='tweetContainer' id='tweetContainer'>
    <p className='tweet-content'>
    {tweets.length>0?tweetId==tweets.length?<div>Thanks for Your Time!</div>:JSON.parse(tweets[tweetId]).text:<div>There are no available tweets!</div>}
    {voteErr !== 1? <div></div> :<div className='error'>Please vote tweet by one of the following scores 1 to 5!</div>}
    </p>
    
    <div className='like-box'>
      <div id="like-container" className='like-container'>
        <button className=' like' id='like' onClick={handleLike} ></button>
      </div>
      <div id="dislike-container" className='like-container'>
        <button className=' dislike' id='dislike' onClick={handleDislike} ></button>
      </div>
    </div>
    </div>
    }
    <button className='next' id="next" onClick={handleNext}></button>
    </div>

    {
      start !== 0?
      <div className='vote-container'>
    <div className='remove-box'></div>
    <div className='box'>
    <p className='header-text'>
    Should we remove this tweet?
    </p>
    <div className='buttonsContainer'>
        <div className='remove'></div>

      <button className='votes vote1' id='vote1' onClick={handleVote1}></button>
      <button className='votes vote2' id='vote2' onClick={handleVote2}></button>
      <button className='votes vote3' id='vote3' onClick={handleVote3}></button>
      <button className='votes vote4' id='vote4' onClick={handleVote4}></button>
      <button className='votes vote5' id='vote5' onClick={handleVote5}></button>

      <button className='remain'></button>
        </div>
    </div>
    <div className='remain-box'></div>
    </div>
    :
    <div></div>
    }
    
  </div>



  <div className='right-side'>
  <div className='box-container'>

</div>
  </div>
</div>

</div>
  );
}

export default App;
