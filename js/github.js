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
    pattern: /^\/github\/(\w+)\/(\w+)\/([^\/]+)/,
    init: function(_arg) {
      var args, el, query, repo, spinner, theme, user;
      el = _arg.el, args = _arg.args, query = _arg.query;
      theme = args[0], user = args[1], repo = args[2];
      el.className += ' github';
      el.innerHTML = "<div class=\"label-wrap-outermost\">\n  <div class=\"label-wrap-outer\">\n    <div class=\"label-wrap\">\n      <div class=\"label\">\n        Star " + (query.name || repo) + " on Github\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"odometer-wrap-outermost\">\n  <div class=\"odometer-wrap-outer\">\n    <div class=\"odometer-wrap\">\n      <div class=\"odometer\">0</div>\n    </div>\n  </div>\n</div>";
      spinner = el.querySelector('.odometer');
      el.addEventListener('click', function(e) {
        e.preventDefault();
        return window.open("https://github.com/" + user + "/" + repo, 'github');
      });
      return init(spinner, user, repo);
    }
  });

}).call(this);
