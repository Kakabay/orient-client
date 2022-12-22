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
const bodyScrollHandler = (state) => {
  state
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
};
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

// Dang

const photoScrollerSwiper = new Swiper(".photoScrollerSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    prevEl: ".photo-scroller-prev",
    nextEl: ".photo-scroller-next",
  },
});

try {
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
} catch (_) {}
