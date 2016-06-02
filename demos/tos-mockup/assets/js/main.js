(function() {
  var upFilter = false;
  var downFilter = false;
  var unknownFilter = false;

  $('.bosses > li').click(function(e) {
    e.preventDefault();
    $(this).find('.dropdown').toggle();
  })

  $('#search').on('input', function() {
    Array.prototype.slice.call($('.bosses > li')).forEach(function(el) {
      var seg = $(this).val().toLowerCase();
      var target = $(el).find('.boss').find('.name').text().toLowerCase();

      target.includes(seg) ? $(el).show() : $(el).hide();
    }.bind(this))
  })

  $("#up").click(function() {
    upFilter = !upFilter;

    if (upFilter) {
      $(this).css({backgroundColor: 'green'});
    } else {
      $(this).css({backgroundColor: 'whitesmoke'});
    }
  })

  $("#down").click(function() {
    downFilter = !downFilter;

    if (downFilter) {
      $(this).css({backgroundColor: 'darkred'});
    } else {
      $(this).css({backgroundColor: 'whitesmoke'});
    }
  })

  $("#unknown").click(function() {
    unknownFilter = !unknownFilter;

    if (unknownFilter) {
      $(this).css({backgroundColor: 'darkblue'});
    } else {
      $(this).css({backgroundColor: 'whitesmoke'});
    }
  })
})()
