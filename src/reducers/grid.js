import Immutable, { Record, Set, List } from 'immutable';


const baseBox = Record({
  classNames: new Set(),
  color: undefined,
  row: undefined,
  col: undefined,
  side: 0,
  partialOnClick: undefined
}, 'Box');

export class Box extends baseBox {

  hasClass(name) {
    return this.classNames.has(name);
  }

  addClass(name) {
    const classNames = this.classNames.add(name)
    return this.merge({ classNames });
  }

  deleteClass(name) {
    const classNames = this.classNames.delete(name)
    return this.merge({ classNames });
  }

  toggleClass(name) {
    if (this.hasClass(name)) {
      return this.deleteClass(name);
    } else {
      return this.addClass(name);
    }
  }
}


const baseGrid = Record({
  boxes: List(List())
}, 'Grid');

export class Grid extends baseGrid {
  iterate(elements, func, condition) {
    let boxes = [];
    for (let row = 0; row < elements.length; row++) {
      const rowElement = elements[row];
      const newRow = [];
      boxes.push(newRow);
      for (let col = 0; col < rowElement.length; col++) {
        let element = rowElement[col];
        if (condition === undefined || condition(element)) {
          element = func(element);
        }
        newRow.push(element);
      }
    }
    boxes = Immutable.fromJS(boxes);
    return this.merge({ boxes });
  }

  applyF(row, col, func, condition) {
    const box = this.getBox(row, col);
    if (condition === undefined || condition(box)) {
      return this.setBox(row, col, func(box));
    }
    return this;
  }

  setBoxes(jsBoxes) {
    return this.iterate(jsBoxes, (info) => new Box(info));
  }

  getBox(row, col) {
    return this.boxes.getIn([row, col]);
  }

  setBox(row, col, box) {
    const boxes = this.boxes.setIn([row, col], box);
    return this.merge({ boxes });
  }

  hasClass(row, col, name) {
    const box = this.getBox(row, col);
    return box.hasClass(name);
  }

  addClass(row, col, name, condition) {
    return this.applyF(row, col, (box) => box.addClass(name), condition);
  }

  deleteClass(row, col, name, condition) {
    return this.applyF(row, col, (box) => box.deleteClass(name), condition);
  }

  toggleClass(row, col, name, condition) {
    return this.applyF(row, col, (box) => box.toggleClass(name), condition);
  }

  addAllClass(name, condition) {
    return this.iterate(this.boxes, (box) => box.addClass(name), condition);
  }

  deleteAllClass(name, condition) {
    return this.iterate(this.boxes, (box) => box.deleteClass(name), condition);
  }

  toggleAllClass(name, condition) {
    return this.iterate(this.boxes, (box) => box.toggleClass(name), condition);
  }
}
