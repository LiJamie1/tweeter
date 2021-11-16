$(document).ready(function() {
  console.log("ready");
  // event handler to textarea form inside new-tweet
  $("#tweet-text").on("input", function() {
    const charLength = $(this).val().length;
    const $tweetForm = $(this).closest("form");
    const $counter = $tweetForm.find(".counter");
    // edits the html to update character limit
    $counter.html(140 - charLength);
    if (charLength === 140) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "#545149");
    }
  });
});

