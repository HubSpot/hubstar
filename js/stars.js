(function() {
  var HubStars, k, kv, path, query, v, _i, _len, _ref, _ref1;

  path = document.location.pathname;

  if (/\/404\.html$/.test(path)) {
    path = '/github/spin/hubspot/tether';
  }

  query = {};

  _ref = document.location.search.toString().substr(1).split('&');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    kv = _ref[_i];
    _ref1 = kv.split('='), k = _ref1[0], v = _ref1[1];
    query[decodeURIComponent(k)] = decodeURIComponent(v);
  }

  HubStars = {
    addSource: function(_arg) {
      var el, init, matches, pattern;
      pattern = _arg.pattern, init = _arg.init;
      if (matches = pattern.exec(path)) {
        el = document.querySelector('.content');
        return init({
          el: el,
          query: query,
          args: matches.slice(1)
        });
      }
    }
  };

  window.HubStars = HubStars;

}).call(this);
