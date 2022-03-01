Document.prototype.createEasyElement = function(tagName = 'div', classes = [], id = '', text = '') {
    const newElement = document.createElement(tagName);
    newElement.classList.add(...classes);
    newElement.id = id;
    newElement.innerText = text;
    return newElement;
}

Object.prototype.changeKey = function(oldKey, newKey){
    this[newKey] = this[oldKey];
    delete this[oldKey];
}