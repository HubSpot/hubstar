(function() {
  var init;

  init = function(el, query) {
    var odometer, tag, update;
    odometer = new Odometer({
      el: el,
      theme: 'minimal',
      value: 0
    });
    odometer.render();
    tag = document.createElement('script');
    document.body.appendChild(tag);
    HubStars.Twitter = {
      set: function(data) {
        return odometer.update(data.count);
      }
    };
    update = function() {
      tag.src = "https://cdn.api.twitter.com/1/urls/count.json?callback=HubStars.Twitter.set?&url=" + query.url + "&_=" + (Math.random());
      return setTimeout(update, 10000);
    };
    return setTimeout(update, 1000);
  };

  HubStars.addSource({
    pattern: /^\/twitter\/(\w+)/,
    init: function(_arg) {
      var el, name, query, spinner;
      el = _arg.el, query = _arg.query;
      el.className += ' twitter';
      name = query.name || 'This';
      el.innerHTML = "<div class=\"label-wrap-outermost\">\n  <div class=\"label-wrap-outer\">\n    <div class=\"label-wrap\">\n      <div class=\"label\">\n        Tweet " + name + "\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"odometer-wrap-outermost\">\n  <div class=\"odometer-wrap-outer\">\n    <div class=\"odometer-wrap\">\n      <div class=\"odometer\">0</div>\n    </div>\n  </div>\n</div>";
      el.addEventListener('click', function(e) {
        var left, top, url;
        e.preventDefault();
        url = "https://twitter.com/intent/tweet" + document.location.search;
        left = screen.width / 2 - 550 / 2;
        top = screen.height / 2 - 420 / 2;
        return window.open(url, 'intent', "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + (left | 0) + ",top=" + (top | 0));
      });
      spinner = el.querySelector('.odometer');
      return init(spinner, query);
    }
  });

}).call(this);
