/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // hide error message label and to top button div at start
  $("#error-message").hide();
  $('.to-top-button').hide();
  
  //scroll to tweet input button, will open tweet input if stowed away
  //shows when ~600 pixels down the screen
  $(document).scroll(function() {
    if ($(this).scrollTop() > 600) {
      $(".to-top-button").fadeIn();
    } else {
      $('.to-top-button').fadeOut();
    }
  });

  $('.to-top-button').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    $(".new-tweet").slideDown(1000);
  });

  //toggle tweet input box
  $(".downward-arrow-button").click(function() {
    $(".new-tweet").slideToggle("slow");
  });

  //submit handler & post request
  //validation of content length results in the display of the appropriate error
  $("#form-tweet").submit(function(event) {
    event.preventDefault();
    const contentLength = $("#tweet-text").val().length;
    const content = $("#form-tweet").serialize();
    const warningSign = '<i class="fas fa-exclamation-triangle"></i>';

    if (contentLength <= 0) {
      $("#error-message").html(`<h4> ${warningSign} Tweet is too short! ${warningSign} </h4>`);
      $("#error-message").css("color", "black");
      $("#error-message").show("slow");
    } else if (contentLength > 140) {
      $("#error-message").html(`<h4> ${warningSign} Tweet is too long! ${warningSign} </h4>`);
      $("#error-message").css("color", "black");
      $("#error-message").show("slow");
    } else {
      $("#error-message").slideUp("slow");
      $("#error-message").css("color", "transparent");
      $.post("http://localhost:8080/tweets", content, function() {
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweet();
      });
    }
  });

  //load tweet
  const loadTweet = function() {
    $.get("http://localhost:8080/tweets")
      .done(function(data) {
        renderTweets(data);
      });
  };

  loadTweet();
});

// escape function
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//construct tweet format via template
const createTweetElement = function(tweet) {

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
};

// render tweet made from createTweetElement.
// empties initial tweets from newton and descartes from future first tweets
const renderTweets = function(tweets) {
  const $tweetContainer = $('.posted-tweets');
  $tweetContainer.empty();
  for (const tweet of tweets) {
    const $result = createTweetElement(tweet);
    $tweetContainer.prepend($result);
  }
};
