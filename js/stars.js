(function() {
  var HubStars, path,
    __slice = [].slice;

  path = document.location.pathname;

  if (path === '/404.html') {
    path = '/github/spin/hubspot/tether';
  }

  HubStars = {
    addSource: function(_arg) {
      var el, init, matches, pattern;
      pattern = _arg.pattern, init = _arg.init;
      if (matches = pattern.exec(path)) {
        el = document.querySelector('.content');
        return init.apply(null, [el].concat(__slice.call(matches.slice(1))));
      }
    }
  };

  window.HubStars = HubStars;

}).call(this);
