(function () {

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const LOAD_AMT = 10;

  var articleCount = 0;
  var moreArticles = true;
  var loading = false;

  function apiCall(limit, offset) {
    loading = true;

    $.get("http://www.stellarbiotechnologies.com/media/press-releases/json?"
    + "limit=" + limit + "&offset=" + offset, function (json) {
      if (json.news.length > 1) {
        displayArticles(json.news);
        loading = false;
      } else {
        moreArticles = false;
      }
    });
  }

  function displayArticles(articles) {
    var dateObj, li, title, date, month, day, year;
    var target = $('.articles');

    $.each(articles, function(i, article) {
      dateObj = new Date(article.published.replace(/-/g,'/'));
      month = MONTHS[dateObj.getMonth()];
      day = dateObj.getDay();
      year = dateObj.getFullYear();

      title = $("<div/>").addClass("title").text(article.title);
      date = $("<div/>")
        .addClass("date")
        .text(month + " " + day + ", " + year);

      li = $("<li/>").addClass("group").append(title, date);
      target.append(li);
    });

    articleCount += articles.length;
  }

  $(document).on('scroll mousewheel DOMMouseScroll MozMousePixelScroll', function() {
    if(moreArticles && !loading && $(window).scrollTop() == $(document).height() - $(window).height()) {
      apiCall(LOAD_AMT, articleCount);
    }
  });

  apiCall(LOAD_AMT, 0);
})();
