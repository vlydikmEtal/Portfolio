document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    defaults: {
      duration: 0.6,
    },
  })

  tl.from('.header__body-info', {
    x: 100,
    opacity: 0,
    delay: 0.8,
    scrollTrigger: {
      trigger: '.header__body-info',
      start: 'top 80%',
    },
  })

  tl.from('.header__body-hero', {
    x: -100,
    opacity: 0,
    delay: 0.8,
    scrollTrigger: {
      trigger: '.header__body-hero',
    },
  })

  tl.from('.header__top-inner', {
    y: 100,
    opacity: 0,
    delay: 0.3,
    scrollTrigger: {
      trigger: '.header__top-inner',
    },
  })

  let stepAnimation = () => {
    const tlStep = gsap.timeline({
      defaults: { duration: .6 },
      repeat: -1,
      repeatDelay: 1.5,
    })
  
    tlStep
      .to('.section__technologies-item--active', {
        y: -30,
      })
      .to('.section__technologies-item--active', {
        ease: "bounce.out",
        y: 0,
      })
      return tlStep
  }

  let animation = stepAnimation()

  const firstStep = document.querySelectorAll('.section__technologies-item')

  firstStep.forEach((item) => {
    item.addEventListener('mouseover', () => {
      animation.pause()
    })

    item.addEventListener('mouseout', () => {
      animation.play()
    })
  })

  gsap.from('.section__about-img', {
    x: -100, opacity: 0, delay: 0.2, scrollTrigger: {
      trigger: '.section__about-img', duration: 1.3
    }
  })
  
  gsap.from('.section__about-info', {
    y: 100, opacity: 0, delay: 0.2, scrollTrigger: {
      trigger: '.section__about-info', duration: 1.3
    }
  })



  let btnAnimation = () => {
    const btnStep = gsap.timeline({
      defaults: { duration: .6 },
      repeat: -1,
      repeatDelay: 1.5,
    })
  
    btnStep
      .to('.button--color', {
        y: -15,
      })
      .to('.button--color', {
        ease: "bounce.out",
        y: 0,
      })
      return btnStep
  }

  let animationBtn = btnAnimation()

  const btnStep = document.querySelectorAll('.button--color')

  btnStep.forEach((item) => {
    item.addEventListener('mouseover', () => {
      animationBtn.pause()
    })

    item.addEventListener('mouseout', () => {
      animationBtn.play()
    })
  })
  
})
