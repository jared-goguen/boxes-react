import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import { 
  addRandomClass,
  deleteRandomClass,
  shuffleGridAnimation,
  pause
} from '../actions/animations';

import {
  setMax,
  toggleUser,
  clearUserAnimation,
  resetUserAnimation,
  resetClearedAnimation,
  incrementTries,
  resetTries,
  transition
} from '../actions/memory';


class Memory extends Level {
  constructor(props) {
    super(props);
    this.N = this.props.selected.length;
    this.props.dispatch(setMax(1));
    this.timeoutLength = 500 / this.props.selected.length ** 2;
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
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', this.timeoutLength));
    this.props.dispatch(shuffleGridAnimation(1000));
    this.props.dispatch(addRandomClass(this.boxes, 'hidden', this.timeoutLength));
  }

  handleClick(reactBox, row, col, color) {
    if (this.props.user.size == 0 || color == this.props.user.toJS()[0].color) {
      reactBox.toggleClass('hidden');
      reactBox.toggleClass('selected');
      this.props.dispatch(toggleUser(row, col, color));

      if (this.props.user.size == this.N - 1) {
        this.props.dispatch(pause(250));
        this.props.dispatch(clearUserAnimation(500));

        if (this.props.cleared.size == this.N - 1) {
          this.props.dispatch(transition(500));
        } else {
          this.props.dispatch(deleteRandomClass(this.boxes, 'hidden', this.timeoutLength));
          this.props.dispatch(shuffleGridAnimation(1000));
          this.props.dispatch(addRandomClass(this.boxes, 'hidden', this.timeoutLength));
        }
      }
    } else {
      this.props.dispatch(resetUserAnimation(500, 100, 500));

      let tries = this.props.tries + 1;
      if (tries >= this.props.maxTries) {
        let faded = this.props.cleared.size > 0;
        this.props.dispatch(resetClearedAnimation(250, faded));
        this.props.dispatch(deleteRandomClass(this.boxes, 'hidden', this.timeoutLength));
        this.props.dispatch(shuffleGridAnimation(1000));
        this.props.dispatch(addRandomClass(this.boxes, 'hidden', this.timeoutLength));
        this.props.dispatch(resetTries());
      } else {
        this.props.dispatch(incrementTries());
      }
    }

  }

  onBoxClick(handler) {
    return function(box, grid, dispatch) {
      handler(this, this.props.box.row, this.props.box.col, this.props.box.color);
    }
  }
}

const select = (state) => {
  return { ...state.memory };
};

export default connectLevel(select)(Memory);
