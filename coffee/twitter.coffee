init = (el) ->
  odometer = new Odometer
    el: el
    theme: 'minimal'
    value: 0

  odometer.render()

  tag = document.createElement 'script'
  document.body.appendChild tag

  HubStars.Twitter =
    set: (data) ->
      odometer.update data.count

  update = ->
    tag.src = "https://cdn.api.twitter.com/1/urls/count.json?callback=HubStars.Twitter.set?&url=#{ document.location.toString().split('?')[0] }&_=#{ Math.random() }"

    setTimeout update, 10000

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
    subtitle.innerHTML = "<a href='https://twitter.com/intent/tweet#{ document.location.search }'>Tweet Now</a>"

    spinner = el.querySelector '.odometer'

    init spinner
