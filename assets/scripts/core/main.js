/**
 * Query selector class
 * @usage const ITEM_NAME =  new Select(ITEM_CLASSNAME).select();
 */
class Select {
  classname = "";
  /**
   * @param {string} classname
   */
  constructor(classname) {
    this.classname = classname;
  }
  select() {
    return document.querySelector(this.classname);
  }
}

/**
 * News switcher button class
 */
class NewsBtn {
  classname = "";
  /**
   * @param {string} classname
   * @param {HTMLButtonElement} previousBtn
   */
  constructor(classname) {
    this.classname = classname;
  }
  /**
   * @returns HTMLButtonElement
   */
  createBtn() {
    return new Select(this.classname).select();
  }

  /**
   * @param {HTMLButtonElement} previousBtn
   * @param {string} switchedClass
   * @param {{local: HTMLElement, global: HTMLElement} | undefined} customActivity
   * @usage Activate to hop the `switchedClass` between buttons
   */

  activateSwitch(previousBtn, switchedClass, customActivity) {
    const btn = this.createBtn(this.classname);
    if (previousBtn) {
      btn.addEventListener("click", () => {
        if (customActivity) {
          customActivity.local.classList.remove("active");
          customActivity.global.classList.add("active");
        }
        btn.classList.add(switchedClass);
        previousBtn.classList.remove(switchedClass);
      });
      previousBtn.addEventListener("click", () => {
        if (customActivity) {
          customActivity.global.classList.remove("active");
          customActivity.local.classList.add("active");
        }
        previousBtn.classList.add(switchedClass);
        btn.classList.remove(switchedClass);
      });
    }
  }

  /**
   * @param {HTMLButtonElement} button
   * @usage Removes the event listener
   */

  abortSwitch(button) {
    button.removeEventListener("click");
  }
}

const buttonLocal = new NewsBtn(".news-local").createBtn();
const runBtns = new NewsBtn(".news-global").activateSwitch(
  buttonLocal,
  "active",
  {
    local: new Select(".aside-content.local").select(),
    global: new Select(".aside-content.global").select(),
  }
);

// Swiper

const videoSwiper = new Swiper(".videoSwiper", {
  slidesPerView: 3,
  spaceBetween: 60,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  loop: true,
  navigation: {
    prevEl: ".video-prev",
    nextEl: ".video-next",
  },
});

const photoSwiper = new Swiper(".photoSwiper", {
  slidesPerView: 3,
  spaceBetween: 60,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  loop: true,
  navigation: {
    prevEl: ".photo-prev",
    nextEl: ".photo-next",
  },
});

const partnerSwiper = new Swiper(".partnerSwiper", {
  slidesPerView: 5,
  spaceBetween: 60,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  loop: true,
  navigation: {
    prevEl: ".partner-prev",
    nextEl: ".partner-next",
  },
});
