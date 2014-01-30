path = document.location.pathname

if /\/404\.html$/.test(path)
  path = '/github/spin/hubspot/tether'

query = {}
for kv in document.location.search.toString().substr(1).split('&')
  [k, v] = kv.split('=')
  query[decodeURIComponent k] = decodeURIComponent v

HubStars =
  addSource: ({pattern, init}) ->
    if matches = pattern.exec path
      el = document.querySelector '.content'

      init {
        el
        query
        args: matches[1..]
      }

window.HubStars = HubStars
