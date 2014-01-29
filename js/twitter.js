(function() {
  var init;

  init = function(el) {
    var done, odometer, update;
    odometer = new Odometer({
      el: el,
      theme: 'minimal',
      value: 0
    });
    odometer.render();
    done = function() {
      return setTimeout(update, 10000);
    };
    update = function() {
      var req;
      req = new XMLHttpRequest;
      req.onload = function() {
        var body;
        try {
          body = JSON.parse(req.responseText);
        } catch (_error) {
          return;
        }
        odometer.update(body.count);
        return done();
      };
      req.onerror = done;
      req.open('GET', "https://cdn.api.twitter.com/1/urls/count.json?callback=?&url=" + (document.location.toString().split('?')[0]), true);
      return req.send();
    };
    return setTimeout(update, 1000);
  };

  HubStars.addSource({
    pattern: /^\/twitter\/(\w+)\//,
    init: function(el, theme) {
      var spinner, subtitle;
      el.className += ' twitter';
      el.innerHTML = "<div class=\"label\">Tweets</div><div class=\"odometer\">0</div>\n<div class=\"subtitle\"></div>";
      subtitle = el.querySelector('.subtitle');
      subtitle.innerHTML = "<a href='https://twitter.com/intent/tweet" + document.location.query + "'>Tweet Now</a>";
      spinner = el.querySelector('.odometer');
      return init(spinner);
    }
  });

}).call(this);
