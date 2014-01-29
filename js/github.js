(function() {
  var init;

  init = function(el, user, repo) {
    var odometer, update;
    odometer = new Odometer({
      el: el,
      theme: 'minimal',
      value: 0
    });
    odometer.render();
    update = function() {
      var done, req;
      req = new XMLHttpRequest;
      done = function() {
        var remaining;
        remaining = req.getResponseHeader('X-RateLimit-Remaining');
        return setTimeout(update, 1000 * (4 + Math.pow(1.1, 60 - remaining)));
      };
      req.onload = function() {
        var body;
        try {
          body = JSON.parse(req.responseText);
        } catch (_error) {
          return;
        }
        odometer.update(body.watchers_count);
        return done();
      };
      req.onerror = done;
      req.open('GET', "https://api.github.com/repos/" + user + "/" + repo + "?_=" + (Math.random()), true);
      return req.send();
    };
    return setTimeout(update, 1000);
  };

  HubStars.addSource({
    pattern: /^\/github\/(\w+)\/(\w+)\/(\w+)/,
    init: function(el, theme, user, repo) {
      var spinner;
      el.className += ' github';
      el.innerHTML = "<div class=\"label\">Star on Github</div><div class=\"odometer\">0</div>";
      spinner = el.querySelector('.odometer');
      el.addEventListener('click', function(e) {
        e.preventDefault();
        return document.location = "https://github.com/" + user + "/" + repo;
      });
      return init(spinner, user, repo);
    }
  });

}).call(this);
