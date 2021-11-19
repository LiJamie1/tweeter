$(document).ready(function() {
  // event handler to textarea form inside new-tweet
  $("#tweet-text").on("input", function() {
    const maxCharLength = 140;
    const charLength = $(this).val().length;
    const $tweetForm = $(this).closest("form");
    const $counter = $tweetForm.find(".counter");

    // edits the html to update character limit
    $counter.html(maxCharLength - charLength);
    
    if (charLength > maxCharLength) {
      $counter.css("color", "#d00000");
    } else {
      $counter.css("color", "#000000");
    }
  });
});

