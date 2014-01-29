init = (el) ->
  odometer = new Odometer
    el: el
    theme: 'minimal'
    value: 0

  odometer.render()

  done = ->
    setTimeout update, 10000

  update = ->
    req = new XMLHttpRequest

    req.onload = ->
      try
        body = JSON.parse req.responseText
      catch
        return

      odometer.update body.count

      done()

    req.onerror = done

    req.open 'GET', "https://cdn.api.twitter.com/1/urls/count.json?callback=?&url=#{ document.location.toString().split('?')[0] }", true
    req.send()

  setTimeout update, 1000


HubStars.addSource
  pattern: /^\/twitter\/(\w+)\//

  init: (el, theme) ->
    el.className += ' twitter'

    el.innerHTML = """
      <div class="label">Tweets</div><div class="odometer">0</div>
      <div class="subtitle"></div>
    """

    subtitle = el.querySelector '.subtitle'
    subtitle.innerHTML = "<a href='https://twitter.com/intent/tweet#{ document.location.query }'>Tweet Now</a>"

    spinner = el.querySelector '.odometer'

    init spinner
