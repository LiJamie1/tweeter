/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // hide error message to start with it hidden
  $("#error-message").hide("slow")

  //div-button
  
  
  //submit handler & post request
  $("#form-tweet").submit(function (event) {
    event.preventDefault();
    const contentLength = $("#tweet-text").val().length;
    const content = $("#form-tweet").serialize();

    if (contentLength <= 0) {
      $("#error-message").html(`<h4> <i class="fas fa-exclamation-triangle"></i> Tweet is too short! <i class="fas fa-exclamation-triangle"></i> </h4>`)
      $("#error-message").css("color", "black")
      $("#error-message").show("slow")
    } else if (contentLength > 140) {
      $("#error-message").html(`<h4> <i class="fas fa-exclamation-triangle"></i> Tweet is too long! <i class="fas fa-exclamation-triangle"></i> </h4>`)
      $("#error-message").css("color", "black")
      $("#error-message").show("slow")
    } else {
      $("#error-message").slideUp("slow")
      $("#error-message").css("color", "transparent")
      $.post("http://localhost:8080/tweets", content, function () {
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweet();
      })
    }
  })

  //load tweet
  const loadTweet = function () {
    $.get("http://localhost:8080/tweets")
      .done(function (data) {
        renderTweets(data)
      })
  }

  loadTweet();
});

// escape function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//construct tweet format
const createTweetElement = function (tweet) {

  const timeCreated = timeago.format(tweet.created_at);
  const content = escape(tweet.content.text);

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
      <p class="posted-tweet-body">${content}</p>
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

// render tweet made from createTweetElement // empties initial tweets from newton and descartes from future first tweets
const renderTweets = function (tweets) {
  const $tweetContainer = $('.posted-tweets');
  $tweetContainer.empty();
  for (const tweet of tweets) {
    const $result = createTweetElement(tweet);
    $tweetContainer.prepend($result);
  }
}
