import ToDo from './todo';

export default class Project {
    #Element;
    #name;
    #toDoList = [];

  constructor(name) {
    this.#name = name;
    this.#setElement();
  }

  /**
   * @param {string} newName
   */
  set name(newName) {
    this.#name = newName;
    this.#Element.querySelector(".sidebar-item-text-name").innerText = this.#name;
  }

  #setElement() {
    this.#Element = document
      .querySelector("[user-project-template]")
      .content.cloneNode(true)
      .querySelector(".sidebar-item");

    this.#Element.querySelector(".sidebar-item-text-name").innerText = this.#name;
    this.#Element.querySelector(".sidebar-item-text-number").innerText = this.#toDoList.length;
  }

  addToDo(param) {
    this.#toDoList.push(new ToDo(param));
    this.#Element.querySelector(".sidebar-item-text-number").innerText = this.#toDoList.length;
  }

  deleteToDo() {
      
  }

  render(parentEl) {
    parentEl.appendChild(this.#Element);
  }
}
