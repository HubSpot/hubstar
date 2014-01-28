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

  (function() {
    var matches, re, spinner, subtitle;
    re = /^\/(\w+)\/(\w+)\/(\w+)/;
    matches = re.exec(document.location.pathname);
    if (!matches) {
      document.write("Path not understood, please double check the URL (try '/spin/HubSpot/stars')");
      return;
    }
    spinner = document.querySelector('.odometer');
    subtitle = document.querySelector('.subtitle');
    subtitle.innerHTML = "<a href='http://github.com/" + matches[2] + "/" + matches[3] + "'>\nStar " + matches[3] + "</a> on GitHub to save.";
    return init(spinner, matches[2], matches[3]);
  })();

}).call(this);
