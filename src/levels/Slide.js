import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import { 
  deleteRandomClass,
  shuffleGridAnimation,
  nullifyBoxAnimation,
  swapBoxesAnimation
} from '../actions/animations';

import {
  setNullPosition,
  transition
} from '../actions/slide';


class Slide extends Level {
  constructor(props) {
    super(props);
  }

  generateBox(row, col) {
    return {
      row,
      col,
      color: this.props.selected[col],
      onBoxClick: this.onBoxClick(this.handleClick.bind(this)),
      classNames: new Set(['fade']),
      gridRow: row,
      gridCol: col
    };
  }


  componentDidMount() {
    const timeoutLength = 500 / this.props.selected.length ** 2;
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', timeoutLength));
    this.props.dispatch(shuffleGridAnimation(500));

    let row = this.randomIndex();
    let col = this.randomIndex();
    this.props.dispatch(setNullPosition(row, col));
    this.props.dispatch(nullifyBoxAnimation(row, col, 500));
  }

  handleClick(reactBox, row, col) {
    let dR = Math.abs(row - this.props.nullPosition.row);
    let dC = Math.abs(col - this.props.nullPosition.col);

    if ( !(dR === 1 && dC === 0) && !(dR === 0 && dC === 1) ){
      return;
    }

    let targetPosition = { row, col };
    this.props.dispatch(setNullPosition(row, col));
    this.props.dispatch(swapBoxesAnimation(targetPosition, this.props.nullPosition, 200));

    let updatedGrid = this.props.grid.swapBoxes(targetPosition, this.props.nullPosition);

    let rowCheck = true;
    for (let row = 0; row < this.props.selected.length; row++) {
      let color = updatedGrid.getBox(row, 0).color;
      for (let col = 1; col < this.props.selected.length; col++) {
        if (updatedGrid.getBox(row, col).color != color) {
          rowCheck = false;
        }
      }
    }

    let colCheck = true;
    for (let col = 0; col < this.props.selected.length; col++) {
      let color = updatedGrid.getBox(0, col).color;
      for (let row = 1; row < this.props.selected.length; row++) {
        if (updatedGrid.getBox(row, col).color != color) {
          colCheck = false;
        }
      }
    }

    if (rowCheck || colCheck) {
      this.props.dispatch(transition(500, 125, 500));
    }
  }

  onBoxClick(handler) {
    return function(box, grid, dispatch) {
      handler(this, this.props.box.row, this.props.box.col);
    }
  }
}

const select = (state) => {
  let { grid } = state.elements;
  return { grid, ...state.slide };
};

export default connectLevel(select)(Slide);
