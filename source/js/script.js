document.addEventListener('DOMContentLoaded', function () {
  AOS.init()

  const lightTheme = document.getElementById('light')
  const lamp = document.querySelector('.beam')
  const site = document.querySelector('.wrapper')

  lightTheme.addEventListener('click', () => {
    const hasLightClass = site.classList.toggle('light')
    if (hasLightClass) {
      lamp.classList.remove('open')
    } else {
      lamp.classList.add('open')
    }
  })

  const burger = document.querySelectorAll('.burger')
  const menu = document.querySelectorAll('.header__top')

  burger.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('burger__active')
      menu.forEach((item) => {
        item.classList.toggle('header__top--open')
      })
    })
  })

  menu.forEach((item) => {
    item.addEventListener('click', () => {
      burger.forEach((item) => {
        item.classList.remove('burger__active')
      })
      menu.forEach((item) => {
        item.classList.remove('header__top--open')
      })
    })
  })

  const items = document.querySelectorAll('.section__skills-items')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percent = entry.target
            .querySelector('.skills__info')
            .textContent.trim()
          animateSkills(entry.target, percent)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  items.forEach((item) => {
    observer.observe(item)
  })

  function animateSkills(element, percent) {
    const infoElement = element.querySelector('.skills__info')
    const initialHeight = parseFloat(getComputedStyle(element).height)
    const targetHeight = parseFloat(percent)
    let currentHeight = initialHeight
    let start = null

    function step(timestamp) {
      if (!start) start = timestamp
      const progress = timestamp - start
      const animationProgress = progress / 1000

      currentHeight =
        initialHeight + (targetHeight - initialHeight) * animationProgress
      element.style.height = currentHeight + '%'

      if (animationProgress < 1) {
        requestAnimationFrame(step)
      } else {
        element.style.height = percent + '%'
        element.classList.add('animate')
      }
    }

    requestAnimationFrame(step)
  }
})
