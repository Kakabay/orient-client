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
const bodyScrollHandler = (state) => {
  state
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
};
class SelectAll extends Select {
  super(className) {
    this.classname = className;
  }

  select(all) {
    if (all) {
      return document.querySelectorAll(this.classname);
    } else {
      return document.querySelectors(this.classname);
    }
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
class Numerator {
  className;
  givenClassName;

  constructor(className, givenClassName) {
    this.className = className;
    this.givenClassName = givenClassName;
  }

  numerate() {
    // try {
    const elementNodeList = new SelectAll(this.className).select(true);
    elementNodeList.forEach((element, index) => {
      element.classList.add(`${this.givenClassName}-${index + 1}`);
    });
    return elementNodeList;
    // } catch (_err) {
    //   throw new Error("Bad classname!");
    // }
  }
}

class AssignEvent {
  identifier;
  eventType;
  actionType;
  addedClass = "active";
  target = "self";
  customBehaviour;
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
   * @param {() => void} customBehaviour
   */
  constructor(
    identifier,
    eventType,
    actionType,
    addedClass,
    target,
    customBehaviour
  ) {
    this.identifier = identifier;
    this.eventType = eventType;
    this.actionType = actionType;
    this.addedClass = addedClass;
    this.target = target;
    this.customBehaviour = customBehaviour;
  }

  listen() {
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
          break;
        case "remove":
          target.classList.remove(this.addedClass);
          break;
        case "toggle":
          target.classList.toggle(this.addedClass);
          break;
        default:
          throw new Error("Bad action type!");
      }
      if (this.customBehaviour) {
        this.customBehaviour();
      }
    });
    return [element, target];
  }
}

// Year
const displayedYear = new AssignYear("#year").assign();

// Burger
const burgerPair = new AssignEvent(
  ".header-burger",
  "click",
  "add",
  "active",
  ".burger-wrapper"
).listen(bodyScrollHandler);

const burgerClosePair = new AssignEvent(
  ".burger-close",
  "click",
  "remove",
  "active",
  ".burger-wrapper"
).listen(bodyScrollHandler);

const burgerListLi = new Numerator(".burger-list", "burger-list").numerate();

burgerListLi.forEach((burgerLi) => {
  burgerLi.addEventListener("click", () => {
    burgerLi.classList.toggle("active");
  });
});

const buttonLocal = new NewsBtn(".news-local").createBtn();
const runBtns = new NewsBtn(".news-global").activateSwitch(
  buttonLocal,
  "active",
  {
    local: new Select(".aside-content.local").select(),
    global: new Select(".aside-content.global").select(),
  }
);

// const mobileAside = new AssignEvent(
//   ".aside-mobile-open",
//   "click",
//   "toggle",
//   "active",
//   ".aside-mobile"
// ).listen(bodyScrollHandler);

// const mobileAsideCloser = new AssignEvent(
//   ".aside-mobile-out",
//   "click",
//   "remove",
//   "active",
//   ".aside-mobile"
// ).listen(bodyScrollHandler);

// Mobile search
try {
  const mobileSearch = new AssignEvent(
    ".header-search-icon",
    "click",
    "add",
    "active",
    ".mobile-search"
  ).listen(bodyScrollHandler);

  const mobileSearchCloser = new AssignEvent(
    ".mobile-search-closer",
    "click",
    "remove",
    "active",
    ".mobile-search"
  ).listen(bodyScrollHandler);
} catch (_) {}

const afficheSwiper = new Swiper(".afficheSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    prevEl: ".affiche-prev",
    nextEl: ".affiche-next",
  },
  loop: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

if (afficheSwiper.slides.length < 2) {
  document.querySelector(".affiche-prev").style.display = "none";
  document.querySelector(".affiche-next").style.display = "none";
  afficheSwiper.disable();
}
