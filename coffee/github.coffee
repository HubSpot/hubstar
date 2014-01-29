init = (el, user, repo) ->
  odometer = new Odometer
    el: el
    theme: 'minimal'
    value: 0

  odometer.render()

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

HubStars.addSource
  pattern: /^\/github\/(\w+)\/(\w+)\/(\w+)/

  init: (el, theme, user, repo) ->
    el.className += ' github'

    el.innerHTML = """
      <div class="label">Star on Github</div><div class="odometer">0</div>
    """
    
    spinner = el.querySelector '.odometer'

    el.addEventListener 'click', (e) ->
      e.preventDefault()

      document.location = "https://github.com/#{ user }/#{ repo }"

    init spinner, user, repo
