class Select {
  classname = "";
  /**
   * @param {string} classname
   */
  constructor(classname) {
    this.classname = classname;
  }
  select(all) {
    return all
      ? document.querySelectorAll(this.classname)
      : document.querySelector(this.classname);
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

  // assign(customFunction){
  //   const element = new Select(this.identifier).select();
  //   switch (this.actionType) {
  //     case "add":

  //       break;
  //     case "remove":

  //       break;
  //     case "toggle":

  //       break;
  //     default:
  //       throw new Error("Bad action type!");
  //   }
  // }
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

const mainNewsSwiper = new Swiper(".mainNewsSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  lazyLoading: true,
  loop: true,
  navigation: {
    prevEl: ".main-news-prev",
    nextEl: ".main-news-next",
  },
});

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
  navigation: {
    prevEl: ".photo-prev",
    nextEl: ".photo-next",
  },
});

const photoScrollerSwiper = new Swiper(".photoScrollerSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    prevEl: ".photo-scroller-prev",
    nextEl: ".photo-scroller-next",
  },
});

const bannerSwiper = new Swiper(".bannerSwiper", {
  slidesPerView: 2,
  spaceBetween: 25,
  // effect: "fade",
  loop: true,
  autoplay: {
    delay: "5000",
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

const bodyScrollHandler = (state) => {
  state
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
};

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

// const burgerNewsPair = new AssignEvent(

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

const photoList = new Numerator(".photo", "photo").numerate();
const photoItemFolder = new Numerator(
  ".photo-item-folder",
  "photo-item-folder"
).numerate();
const photoScroller = new Select(".photo-scroller").select();
const photoScrollerWrapper = new Select(
  ".photo-scroller .swiper-wrapper"
).select();

const transferContent = (from, to) => {
  to.innerHTML = from.innerHTML;
  photoScrollerSwiper.setProgress(0, 200);
};

photoList.forEach((photoItem, index) => {
  photoItem.addEventListener("click", () => {
    transferContent(photoItemFolder[index], photoScrollerWrapper);
    photoScroller.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Latest

const photoScrollerContainer = new Select(".photo-scroller").select();

photoScrollerContainer.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("photo-scroller-next") &&
    !e.target.classList.contains("photo-scroller-prev")
  ) {
    photoScroller.classList.remove("active");
    document.body.style.overflow = "visible";
  }
});

const trendingSwiper = new Swiper(".trendingSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: "5000",
  },
});
