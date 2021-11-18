/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //load tweet
  const loadTweet = function() {
    $.ajax("http://localhost:8080/tweets", {method: "GET"})
      .done(function(data) {
        renderTweets(data)
      })
  }

  //submit handler & post request
  $("#form-tweet").submit(function( event ) {
    event.preventDefault();
    const content = $("#form-tweet").serialize()
    $.post("http://localhost:8080/tweets", content, function() {
      console.log("posted")
      loadTweet();
    })
  })
  
  //construct tweet format
  const createTweetElement = function(tweet) {
  
    const timeCreated = timeago.format(tweet.created_at);
  
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
    `);
  
    return $tweet;
  }

  // render tweet made from createTweetElement
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.posted-tweets') ;
    for (const tweet of tweets) {
      const $result = createTweetElement(tweet);
      $tweetContainer.prepend($result);
    }
  }

});



