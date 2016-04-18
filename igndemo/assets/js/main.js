(function() {
  var articles, videos;
  var articlesIndex = 0;
  var videosIndex = 0;

  apiRequest = function(contentType, startIndex, count) {
    var script = document.createElement('script');
    script.src = 'http://ign-apis.herokuapp.com/' + contentType + '?startIndex=' + startIndex + '&count=' + count + '&callback='+ contentType + 'Callback';

    document.body.appendChild(script);
    script.remove();
  }

  articlesCallback = function(json) {

    makeLinks(json.data, 'articles')

    if (articlesIndex > 200) {
      document.getElementById('more-articles').remove();
    }
  }

  videosCallback = function(json) {
    makeLinks(json.data, 'videos')

    if (videosIndex > 200) {
      document.getElementById('more-videos').remove();
    }
  }

  function makeLinks(objects, type) {
    var target = document.getElementById(type + '-content');

    for (var i = 0; i < objects.length; i++) {
      var link = document.createElement('a');
      var item = document.createElement('li');
      var digit = document.createElement('div');
      var text = document.createElement('div');
      var top = document.createElement('div');
      var bottom = document.createElement('div');
      var duration = document.createElement('div');
      var num;

      item.className = 'group';
      item.style.backgroundImage = "url(" + objects[i].thumbnail + ")";
      digit.className = 'digit';
      text.className = "text";
      top.className = "top";
      bottom.className = "bottom";
      duration.className = "duration";


      if (type === 'articles') {
         num = i + articlesIndex + 1;
         top.textContent = objects[i].metadata.headline;
         bottom.textContent = objects[i].metadata.subHeadline;
        //  ADD URL TO LINK HERE - Currently not in the API
      } else {
         num = i + videosIndex + 1;
         top.textContent = objects[i].metadata.longTitle;
         bottom.textContent = objects[i].metadata.title;
         duration.textContent = parseTime(objects[i].metadata.duration);
         link.href = objects[i].metadata.url;
      }

      if (num < 10) {
        digit.textContent = "0" + num;
      } else {
        digit.textContent = "" + num;
      }

      text.appendChild(top);
      text.appendChild(bottom);
      item.appendChild(digit);
      item.appendChild(text);
      item.appendChild(duration);
      link.appendChild(item);
      target.appendChild(link);
    }

    type === 'articles' ? articlesIndex += 10 : videosIndex += 10;
  }

  function parseTime(time) {
    var result = "";

    var hrs = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = time % 60;

    if (hrs > 0) {
      result += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    result += "" + mins + ":" + (secs < 10 ? "0" : "");
    result += "" + secs;
    return result;
  }

  document.querySelector('.articles-toggle').addEventListener('click', function() {
    if (!this.classList.contains('active')) {
      this.classList.add('active');
      document.querySelector('.videos-toggle').classList.remove('active');
      document.querySelector('.videos-container').classList.add('hidden');
      document.querySelector('.articles-container').classList.remove('hidden');
    }
  });

  document.querySelector('.videos-toggle').addEventListener('click', function() {
    if (!this.classList.contains('active')) {
      this.classList.add('active');
      document.querySelector('.articles-toggle').classList.remove('active');
      document.querySelector('.articles-container').classList.add('hidden');
      document.querySelector('.videos-container').classList.remove('hidden');
    }
  });

  document.getElementById('more-articles').addEventListener('click', function() {
    apiRequest('articles', articlesIndex, 10);
  });

  document.getElementById('more-videos').addEventListener('click', function() {
    apiRequest('videos', videosIndex, 10);
  })

  apiRequest('articles', articlesIndex, 10);
  apiRequest('videos', videosIndex, 10);
})();
