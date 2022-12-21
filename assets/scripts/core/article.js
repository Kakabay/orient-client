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
const bodyScrollHandler = (state) => {
  state
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
};

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
const articleSwiper = new Swiper(".articleSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
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

// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================
// LATEST CHANGES =====================================================

const numeratedNavSectionList = new Numerator(
  ".nav-section-span",
  "nav-section-span"
).numerate();

const numeratedNavDropdownList = new Numerator(
  ".nav-section-dropdown",
  "nav-section-dropdown"
).numerate();

const nav = new Select(".nav").select();

numeratedNavSectionList.forEach((element) => {
  element.addEventListener("click", () => {
    if (!element.classList.contains("active")) {
      number = element.classList.toString().split("-").pop();
      numeratedNavSectionList.forEach((element) =>
        element.classList.remove("active")
      );
      numeratedNavDropdownList.forEach((element) =>
        element.classList.remove("active")
      );
      element.classList.add("active");
      numeratedNavDropdownList[number - 1].classList.add("active");
    }
  });
});

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
