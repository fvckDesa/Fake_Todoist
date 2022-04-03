export default class ToDo {
  #Element;
  #title;
  #description;
  #dueDate;

  constructor({ title, description, dueDate }) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#setElement();
  }

  /**
   * @param {string} newTitle
   */
  set title(newTitle) {
    this.#title = newTitle;
    this.#Element.querySelector(".todo-title").innerText = this.#title;
  }

  /**
   * @param {string} newDescription
   */
  set description(newDescription) {
    this.#description = newDescription;
    this.#Element.querySelector(".todo-description").innerText = this.#description;
  }

  set dueDate(newDueDate) {
    this.#dueDate = newDueDate;
    this.#Element.querySelector(".todo-due-date-text").innerText = this.#dueDate;
  }

  #setElement() {
    this.#Element = document
      .querySelector("[todo-template]")
      .content.cloneNode(true)
      .querySelector(".todo-container");

    this.#Element.querySelector(".todo-title").innerText = this.#title;
    this.#Element.querySelector(".todo-description").innerText = this.#description;
    this.#Element.querySelector(".todo-due-date-text").innerText = this.#dueDate;
  }

  render(parentEl) {
    parentEl.appendChild(this.#Element);
  }

  remove() {
    this.#Element.remove();
  }
}
