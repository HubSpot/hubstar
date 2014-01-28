init = (el, user, repo) ->
  odometer = new Odometer
    el: el
    theme: 'minimal'
    value: 0

  odometer.render()

  i = 0
  update = ->
    req = new XMLHttpRequest

    done = ->
      remaining = req.getResponseHeader 'X-RateLimit-Remaining'

      setTimeout update, 1000 * (4 + Math.pow(1.1, (60 - remaining)))

    req.onload = ->
      try
        body = JSON.parse req.responseText
      catch
        return

      odometer.update body.watchers_count

      done()

    req.onerror = done

    req.open 'GET', "https://api.github.com/repos/#{ user }/#{ repo }?_=#{ Math.random() }", true
    req.send()

  setTimeout update, 1000

do ->
  re = /^\/(\w+)\/(\w+)\/(\w+)/

  matches = re.exec document.location.pathname

  if not matches
    document.write "Path not understood, please double check the URL (try '/spin/HubSpot/stars')"
    return

  spinner = document.querySelector '.odometer'

  subtitle = document.querySelector '.subtitle'
  subtitle.innerHTML = """<a href='http://github.com/#{ matches[2] }/#{ matches[3] }'>
    Star #{ matches[3] }</a> on GitHub for your next project.
  """

  init spinner, matches[2], matches[3]
