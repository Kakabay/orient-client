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
class AssignYear {
  element;
  /**
   * @param {string} id
   * ID of an element
   */
  constructor(id) {
    this.element = new Select(id).select();
  }
  /**
   * @returns `current year`
   */
  assign() {
    const year = new Date().getFullYear();
    this.element.innerText = year;
    return year;
  }
}

// Year
const displayedYear = new AssignYear("#year").assign();

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
const articleSwiper = new Swiper(".articleSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    prevEl: ".article-prev",
    nextEl: ".article-next",
  },
});

const articleBottomSwiper = new Swiper(".articleBottomSwiper", {
  slidesPerView: 2,
  spaceBetween: 50,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    prevEl: ".article-bottom-prev",
    nextEl: ".article-bottom-next",
  },
});
