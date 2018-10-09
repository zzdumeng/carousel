var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)


function Carousel(q, imgs, opts) {
  var container = $(q)
  var frag = document.createDocumentFragment()
  var size = imgs.length
  //create indicator
  var ind = document.createElement('div')

  this.container = container
  this.timer = 0
  this.index = opts ? opts.index : 0
  this.opts = opts ? opts : {}
  this.size = size

  ind.className = 'indicator'
  var indicatorItems = [];
  for (var i = 0; i < size; i++) {
    var item = document.createElement('div')
    item.className = 'indicator-item'
    indicatorItems.push(item);
    ind.appendChild(item)
  }
  frag.appendChild(ind)
  // create nav button
  var prev = document.createElement('div')
  prev.className = 'carousel-prev'

  var next = document.createElement('div')
  next.className = 'carousel-next'

  frag.appendChild(prev)
  frag.appendChild(next)
  // add images
  var carouselItems = [];
  imgs.forEach(function(img) {
    var a = document.createElement('a')
    a.href="#";
    // a.className
    var ele = document.createElement('img')
    ele.src = img;
    a.appendChild(ele)
    carouselItems.push(a);
    frag.appendChild(a)
  })

  container.appendChild(frag)

  // add event listener
  this.container.onmouseover = this.stop.bind(this)
  this.container.onmouseout = this.play.bind(this)

  // prev and next
  prev.onclick = this.switchToPrev.bind(this)
  next.onclick = this.switchToNext.bind(this)


  this.indicatorItems = indicatorItems;
  this.carouselItems = carouselItems;
}

Carousel.prototype.switchTo = function(n) {
  if (n >= this.size) n = 0
  if (n < 0) n = this.size - 1

  //TODO:
// fade away current
this.carouselItems[this.index].style.opacity = 1.0;
  var t0 = createjs.Tween.get(this.carouselItems[this.index])
    .to({opacity: 0}, 500)
    .to({left: })
// fade in target
this.carouselItems[n].style.opacity = 0.0;
  var t0 = createjs.Tween.get(this.carouselItems[n])
    .to({opacity: 1.0}, 500)
    .to
  
  this.index = n;
  this.updateIndicator();
}

Carousel.prototype.updateIndicator = function() {
  this.indicatorItems.forEach(function(i) {
    i.classList.remove('active');
  })
  this.indicatorItems[this.index].classList.add('active');
}

Carousel.prototype.switchToNext = function() {
  this.switchTo(this.index + 1)
}
Carousel.prototype.switchToPrev = function(n) {
  this.switchTo(this.index - 1)
}

Carousel.prototype.play = function() {
  this.timer = setInterval(
    this.switchToNext.bind(this),
    this.opts.duration || 1500
  )
}

Carousel.prototype.stop = function() {
  clearInterval(this.timer)
}

Carousel.prototype.setEffect = function() {}

Carousel.Effect = {}
Carousel.Effect.Fade = function() {}

// main
function main() {
  createjs.CSSPlugin.install();
  var carousel = new Carousel('.ca')
  carousel.play()
}

main()
