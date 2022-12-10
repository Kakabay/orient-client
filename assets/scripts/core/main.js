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

class AssignEvent {
  identifier;
  eventType;
  actionType;
  addedClass = "active";
  target = "self";
  isActive = true;
  /**
   * ID or class of an HTML element
   * @param {string} identifier
   * Event type on which action is executed
   * @param {string} eventType
   * Type of action
   * @param {"add" | "remove" | "toggle"} actionType
   * Added classname
   * @param {string} addedClass
   * Target element identifier
   * @param {string} target
   *
   */
  constructor(identifier, eventType, actionType, addedClass, target) {
    this.identifier = identifier;
    this.eventType = eventType;
    this.actionType = actionType;
    this.addedClass = addedClass;
    this.target = target;
  }

  listen(customFunction) {
    const element = new Select(this.identifier).select();
    let target;
    if (this.target === "self") {
      target = element;
    } else {
      target = new Select(this.target).select();
    }
    element.addEventListener(this.eventType, () => {
      switch (this.actionType) {
        case "add":
          target.classList.add(this.addedClass);
          customFunction ? customFunction(true) : null;
          this.isActive = true;
          break;
        case "remove":
          target.classList.remove(this.addedClass);
          customFunction ? customFunction(false) : null;
          this.isActive = false;
          break;
        case "toggle":
          target.classList.toggle(this.addedClass);
          customFunction ? customFunction(this.isActive) : null;
          this.isActive = !this.isActive;
          break;
        default:
          throw new Error("Bad action type!");
      }
    });
    return [element, target];
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

const videoSwiper = new Swiper(".videoSwiper", {
  slidesPerView: 3,
  spaceBetween: 60,
  lazyLoading: true,
  navigation: {
    prevEl: ".video-prev",
    nextEl: ".video-next",
  },
});

const photoSwiper = new Swiper(".photoSwiper", {
  slidesPerView: 3,
  spaceBetween: 60,
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
  loop: true,
  navigation: {
    prevEl: ".partner-prev",
    nextEl: ".partner-next",
  },
});

// Burger
const burgerPair = new AssignEvent(
  ".header-burger",
  "click",
  "add",
  "active",
  ".burger-wrapper",
  () => {
    document.body.style.overflowY = "hidden";
  }
).listen();

const burgerClosePair = new AssignEvent(
  ".burger-close",
  "click",
  "remove",
  "active",
  ".burger-wrapper",
  () => {
    document.body.style.overflowY = "auto";
  }
).listen();

const burgerNewsPair = new AssignEvent(
  ".burger-news",
  "click",
  "toggle",
  "active",
  ".burger-news-items"
).listen();

const burgerAffichePair = new AssignEvent(
  ".burger-affiche",
  "click",
  "toggle",
  "active",
  ".burger-affiche-items"
).listen();

const bodyScrollHandler = (state) => {
  state
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
};

const mobileAside = new AssignEvent(
  ".aside-mobile-open",
  "click",
  "toggle",
  "active",
  ".aside-mobile"
).listen(bodyScrollHandler);

const mobileAsideCloser = new AssignEvent(
  ".aside-mobile-out",
  "click",
  "remove",
  "active",
  ".aside-mobile"
).listen(bodyScrollHandler);
