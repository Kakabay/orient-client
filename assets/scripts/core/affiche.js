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
