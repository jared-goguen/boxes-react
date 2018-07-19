import Immutable, { Record, Set, List, Map } from 'immutable';

import { shuffle } from '../actions/utils';

function generateKey(row, col) {
  return `${row}-${col}`; 
}


const baseBox = Record({
  classNames: new Set(),
  color: undefined,
  row: undefined,
  col: undefined,
  onBoxClick: undefined,
  gridRow: undefined,
  gridCol: undefined
}, 'Box');

export class Box extends baseBox {
  getKey() {
    return generateKey(this.row, this.col);
  }

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

  move(row, col) {
    return this.merge({ row, col });
  }

  moveLeft() {
    let col = this.col - 1;
    return this.merge({ col });
  }
}


const baseGrid = Record({
  boxes: List([List()]),
  mapping: Map()
}, 'Grid');

export class Grid extends baseGrid {
  iterate(elements, func, condition) {
    let boxes = [];
    let mapping = {};
    for (let rowElement of elements) {
      let newRow = [];
      boxes.push(newRow);
      for (let element of rowElement) {
        if (condition === undefined || condition(element)) {
          element = func(element);
        }
        mapping[element.getKey()] = element;
        newRow.push(element);
      }
    }
    boxes = Immutable.fromJS(boxes);
    mapping = Immutable.fromJS(mapping);
    return this.merge({ boxes, mapping });
  }

  apply(row, col, func, condition) {
    const box = this.getBox(row, col);
    if (condition === undefined || condition(box)) {
      return this.setBox(row, col, func(box));
    }
    return this;
  }

  setBoxes(jsBoxes) {
    return this.iterate(jsBoxes, (info) => new Box(info));
  }

  getInGrid(gridRow, gridCol) {
    return this.boxes.getIn([gridRow, gridCol]);
  }

  setInGrid(gridRow, gridCol, box) {
    const boxes = this.boxes.setIn([gridRow, gridCol], box);
    const mapping = this.mapping.set(generateKey(box.row, box.col), box);
    return this.merge({ boxes, mapping });
  }

  getBox(row, col) {
    return this.mapping.get(generateKey(row, col));
  }

  setBox(row, col, box) {
    const originalBox = this.getBox(row, col);
    const { gridRow, gridCol } = originalBox;
    return this.setInGrid(gridRow, gridCol, box);
  }

  updateBox(box) {
    return this.setBox(box.row, box.col, box);
  }

  hasClass(row, col, name) {
    const box = this.getBox(row, col);
    return box.hasClass(name);
  }

  addClass(row, col, name, condition) {
    return this.apply(row, col, (box) => box.addClass(name), condition);
  }

  deleteClass(row, col, name, condition) {
    return this.apply(row, col, (box) => box.deleteClass(name), condition);
  }

  toggleClass(row, col, name, condition) {
    return this.apply(row, col, (box) => box.toggleClass(name), condition);
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

  shuffle() {
    let flatBoxes = [].concat.apply([], this.boxes.toJS());
    shuffle(flatBoxes);
    let shuffled = [];
    for (let rowElement of this.boxes) {
      let newRow = [];
      shuffled.push(newRow);
      for (let box of rowElement) {
        newRow.push(flatBoxes.pop());
      }
    }

    let mapping = {};
    let boxes = [];
    for (let row = 0; row < shuffled.length; row++) {
      let newRow = [];
      boxes.push(newRow);
      let rowElement = shuffled[row];
      for (let col = 0; col < rowElement.length; col++) {
        let box = this.boxes.get(row).get(col);
        let updatedBox = shuffled[row][col];
        box = box.move(updatedBox.row, updatedBox.col);
        newRow.push(box);
        mapping[generateKey(updatedBox.row, updatedBox.col)] = box;
      }
    }

    boxes = Immutable.fromJS(boxes);
    mapping = Immutable.fromJS(mapping);
    return this.merge({ boxes, mapping });
  }
}
