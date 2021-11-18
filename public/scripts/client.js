/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// fake/temp data
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
// renderTweets(data);

$(document).ready(function() {

  
  
  //construct tweet format
  const createTweetElement = function(tweet) {
  
    const timeCreated = timeago.format(tweet.created_at)
  
    const $tweet = $(`
    <article>
      <header class="article-header">
        <div class="tweet-profile">
          <img class="avatar" src="${tweet.user.avatars}"> 
          <h4 class="header-name">${tweet.user.name}</h4>
        </div>
        <div>
          <h4 class="username">${tweet.user.handle}</h4>
        </div>
      </header>
      <p class="posted-tweet-body">${tweet.content.text}</p>
      <footer class="article-footer">
        <span class="footer-content time-stamp">${timeCreated}</span>
        <span class="footer-content fas-footer">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `)
  
    return $tweet;
  }

  // render tweet made from createTweetElement
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.posted-tweets') 
    for (const tweet of tweets) {
      const $result = createTweetElement(tweet)
      $tweetContainer.prepend($result)
    }
  }

});



