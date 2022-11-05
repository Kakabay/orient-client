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

// Year
const displayedYear = new AssignYear("#year").assign();
