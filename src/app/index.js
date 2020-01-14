import '../style/app.sass';

function createFirstSlider() {
  const slider = document.querySelector('.intro__slider');
  const slides = document.querySelectorAll('li.intro__slide');
  slides[0].classList.add('active__intro__slide');
  let activeIntroSlide = slider.querySelector('.active__intro__slide');
  let introContent = activeIntroSlide.querySelector('.intro__content');
  let widthSlider = 0;
  const indicators = document.createElement('ul');
  for (let i = 0; i < slides.length; i += 1) {
    const dot = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('slider__button');
    button.setAttribute('data-index', i);
    button.addEventListener('click', showSlider);
    dot.appendChild(button);
    dot.classList.add('slider__dot');
    indicators.appendChild(dot);
  }

  const buttons = indicators.querySelectorAll('button.slider__button');

  function findWidth() {
    for (let i = 0; i < slides.length; i += 1) {
      widthSlider += slides[i].offsetWidth;
      console.log(widthSlider);
    }
    slider.style.width = widthSlider + 'px';
    widthSlider = 0;
  }

  findWidth();

  function showSlider() {
    activeIntroSlide = slider.querySelector('.active__intro__slide');
    introContent = activeIntroSlide.querySelector('.intro__content');
    for (let i = 0; i < slides.length; i += 1) {
      if (this.getAttribute('data-index') === slides[i].getAttribute('data-number')) {
        slider.style.left = -slides[i].offsetWidth * i + 'px';
        slides[i].classList.add('active__intro__slide');
        buttons[i].classList.add('active__button');
      } else {
        buttons[i].classList.remove('active__button');
        slides[i].classList.remove('active__intro__slide');
      }
    }
    activeIntroSlide = slider.querySelector('.active__intro__slide');
    introContent = activeIntroSlide.querySelector('.intro__content');
    introContent.appendChild(indicators);
  }

  function showDots() {
    activeIntroSlide = slider.querySelector('li.active__intro__slide');
    introContent = activeIntroSlide.querySelector('div.intro__content');
    indicators.classList.add('slider__dots');
    introContent.appendChild(indicators);
    const buttons = document.querySelectorAll('button.slider__button');
    buttons[0].classList.add('active__button');
  }

  showDots();
}

createFirstSlider();

//------------------------second slider--------------------------

function createSecondSlider() {
  const slider = document.querySelector('.videoplayer__list');
  let slides = slider.querySelectorAll('li.videoplayer__item');
  const buttons = document.querySelectorAll('.videoplayer__name');
  let currentPosition = 3;
  let currentLeft = slides[0].offsetWidth / 2;
  console.log(currentLeft);
  let widthOneSlide = slides[0].offsetWidth;
  let setupTranslate = 25;
  let currentSlide = 0;
  slider.style.width = `${slides.length * widthOneSlide}px`;
  slider.style.left = `-${currentLeft}px`;
  function showSlider() {
    /*const newSlide = slides[currentSlide].cloneNode(true);
    currentSlide += 1;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    newSlide.querySelector('.videoplayer__name').addEventListener('click', showSlider);
    slider.appendChild(newSlide);
    this.removeEventListener('click', showSlider);

    let currentIndex = Number(this.dataset.index) + 1;
    if (currentIndex == 5) currentIndex = 0;
    buttons[currentIndex].addEventListener('click', showSlider);
    slider.removeChild(slider.firstElementChild);
    slider.style.transform = `translateX(${setupTranslate + widthOneSlide})`;
    children[0].offsetParent;
    //++currentPosition;
    let animation = slider.animate(
      [
        { transform: `translateX(-25%)` },
        { transform: `translateX(-${widthOneSlide + setupTranslate}%)` },
      ],
      1000
    );

    //slider.style.transform = `translateX(-${currentPosition * widthOneSlide + setupTranslate}%)`;

    slider.style.transform = `translateX(-25%)`;*/

    currentPosition++;
    slider.style.transition = null;

    if (currentPosition > slides.length - 1) {
      slider.style.left = -currentLeft + 'px';
      const newSlide = slides[currentSlide].cloneNode(true);
      newSlide.querySelector('.videoplayer__name').addEventListener('click', showSlider);
      currentSlide += 1;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      slider.appendChild(newSlide);
      slider.removeChild(slider.firstElementChild);
      this.removeEventListener('click', showSlider);
      currentPosition -= 1;
      //currentPosition--;
      // console.log(currentPosition);
    }

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        slider.style.transition = 'left 0.6s ease-in-out';
        slider.style.left = -(widthOneSlide + currentLeft) + 'px';
      });
    });

    let currentIndex = Number(this.dataset.index) + 1;
    if (currentIndex == 5) currentIndex = 0;
    buttons[currentIndex].addEventListener('click', showSlider);
    console.log('done');
  }
  buttons[2].addEventListener('click', showSlider);
}
createSecondSlider();

//------thirdSlider---

function createThirdSlider() {
  const slider = document.querySelector('ul.life__list');
  const slides = document.querySelectorAll('li.life__item');
  const prevBtn = document.querySelector('button.slider__prev');
  const nextBtn = document.querySelector('button.slider__next');
  let slidesToShow = 5;
  let currentPosition = 0;
  let widthSlide = 20; //percent

  const images = document.querySelectorAll('img.life__image');
  const picture = document.querySelector('img.life__picture');
  picture.src = images[0].src;
  images[0].classList.add('active__slide');

  function prevSlider() {
    if (currentPosition > 0) {
      --currentPosition;
      console.log(currentPosition);
      slider.style.transform = `translateX(-${currentPosition * widthSlide}%)`;
    }
  }

  function nextSlider() {
    if (slides.length - slidesToShow <= currentPosition) {
      currentPosition = 0;
    } else {
      ++currentPosition;
    }

    slider.style.transform = `translateX(-${currentPosition * widthSlide}%)`;
  }

  prevBtn.addEventListener('click', prevSlider);
  nextBtn.addEventListener('click', nextSlider);

  function enlargeImage() {
    for (let i = 0; i < images.length; i += 1) {
      images[i].classList.remove('active__slide');
    }
    picture.src = this.src;
    this.classList.add('active__slide');
  }
  for (let i = 0; i < images.length; i += 1) {
    images[i].addEventListener('click', enlargeImage);
  }
}

createThirdSlider();
