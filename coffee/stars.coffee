path = document.location.pathname

if path is '/404.html'
  path = '/twitter/spin/hubspot/tether'

HubStars =
  addSource: ({pattern, init}) ->
    if matches = pattern.exec path
      el = document.querySelector '.content'
      init el, matches[1..]...

window.HubStars = HubStars
