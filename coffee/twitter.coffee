loc = window.parent.location || document.location

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
    tag.src = "https://cdn.api.twitter.com/1/urls/count.json?callback=HubStars.Twitter.set?&url=#{ loc.toString().split('?')[0] }&_=#{ Math.random() }"

    setTimeout update, 10000

  setTimeout update, 1000

HubStars.addSource
  pattern: /^\/twitter\/(\w+)/

  init: (el, theme) ->
    el.className += ' twitter'

    el.innerHTML = """
      <div class="label">Tweets</div><div class="odometer">0</div>
      <div class="subtitle"></div>
    """

    subtitle = el.querySelector '.subtitle'
    subtitle.innerHTML = "<a target='_blank' href>Tweet Now</a>"

    subtitle.addEventListener 'click', (e) ->
      e.preventDefault()
      
      url = "https://twitter.com/intent/tweet#{ document.location.search }"

      left = screen.width / 2 - 550 / 2
      top = screen.height / 2 - 420 / 2

      window.open url, 'intent', "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=#{ left|0 },top=#{ top|0 }"

    spinner = el.querySelector '.odometer'

    init spinner
