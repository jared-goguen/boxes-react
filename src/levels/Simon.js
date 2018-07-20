import '../styles/Simon.scss';

import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import { 
  deleteRandomClass,
  shuffleGrid,
  shakeUnselected,
  pause
} from '../actions/elements';

import {
  enqueueReset,
  resetAnimation,
  addCorrectAnimation,
  incrementTries,
  redisplayCorrect,
  updateUser,
  transitionSimon,
  setSimonMax
} from '../actions/simon';

import {
  partialArrayMatch
} from '../actions/utils';


class Simon extends Level {
  constructor(props) {
    super(props);
    this.N = this.props.selected.length * 2;
    this.props.dispatch(setSimonMax(this.props.selected.length));
  }

  generateBox(row, col) {
    return {
      row,
      col,
      color: this.props.selected[col],
      onBoxClick: this.onBoxClick(this.handleClick.bind(this)),
      classNames: new Set(['fade', 'hidden']),
      gridRow: row,
      gridCol: col
    };
  }

  setClicks() {
    this.props.dispatch(enqueueReset());
    this.props.dispatch(pause(250));

    for (let n = 0; n < this.N; n++) {
      let row = Math.floor(Math.random() * this.props.selected.length);
      let col = Math.floor(Math.random() * this.props.selected.length);
      this.props.dispatch(addCorrectAnimation(row, col, 250));
    }

    this.props.dispatch(pause(500));
    this.props.dispatch(resetAnimation(500));
  }

  componentDidMount() {
    const timeoutLength = 500 / this.props.selected.length ** 2;
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', timeoutLength));
    this.props.dispatch(shuffleGrid(500));
    this.setClicks();
  }

  handleClick(reactBox, row, col) {
    let clicks = this.props.user.slice();
    clicks.push({ row, col });

    let match = partialArrayMatch(this.props.correct, clicks);

    if (!match.valid) {
      this.props.dispatch(shakeUnselected(500, 100));
      this.props.dispatch(resetAnimation(500));

      let tries = this.props.tries + 1;
      if (tries >= this.props.maxTries) {
        this.props.dispatch(shuffleGrid(1000));
        this.setClicks();
      } else {
        this.props.dispatch(incrementTries());
        this.props.dispatch(redisplayCorrect(this.props.correct, 250));
      }
    } else {
      reactBox.toggleClass('hidden');
      reactBox.toggleClass('selected');
      this.props.dispatch(updateUser(clicks));
    }

    if (match.complete) {
      this.props.dispatch(transitionSimon(500, 750, 250));
    }
  }

  onBoxClick(handler) {
    return function(box, grid, dispatch) {
      handler(this, this.props.box.row, this.props.box.col);
    }
  }
}

const select = (state) => {
  return { ...state.simon };
};

export default connectLevel(select)(Simon);
