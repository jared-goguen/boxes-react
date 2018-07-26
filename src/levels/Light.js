import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import {
  setBoxColor
} from '../actions/elements';

import { 
  deleteAllClassAnimation,
  pause
} from '../actions/animations';

import {
  initializeLight,
  setTracker,
  transition
} from '../actions/light';


class Light extends Level {
  constructor(props) {
    super(props);
    this.props.dispatch(initializeLight(this.props.index, this.props.selected.length));
    this.pairs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];
  }

  generateBox(row, col) {
    return {
      row,
      col,
      color: this.props.startColor,
      onBoxClick: this.onBoxClick(this.handleClick.bind(this)),
      classNames: new Set(['fade']),
      gridRow: row,
      gridCol: col
    };
  }

  componentDidMount() {
    this.props.dispatch(pause(250));
    this.props.dispatch(deleteAllClassAnimation('fade', undefined, 500));
    setTimeout(() => {
      this.simulateClicks(50);
    }, 750);
  }

  simulateClicks(count) {
    console.log(this.props);
    let tracker = this.props.tracker.map(row => row.slice());
    let i = 0;
    let context = this;

    let lightIntervalID = setInterval(()=> {
      if (++i === count) {
        window.clearInterval(lightIntervalID);
      }  
      let row = context.randomIndex();
      let col = context.randomIndex();
      tracker = context.basicClick(row, col, tracker);
      this.props.dispatch(setTracker(tracker));
    }, 50);
  }

  basicClick(row, col, tracker) {
    for (let [dR, dC] of this.pairs) {
      let newRow = row + dR;
      let newCol = col + dC;

      if (newRow < 0 || newRow >= this.props.selected.length) {
        continue;
      }

      if (newCol < 0 || newCol >= this.props.selected.length) {
        continue;
      }

      let nextIndex = (tracker[newRow][newCol] + 1) % this.props.selected.length;
      let nextColor = this.props.selected[nextIndex];

      tracker[newRow][newCol] = nextIndex;
      this.props.dispatch(setBoxColor(newRow, newCol, nextColor));
    }

    return tracker;
  }

  handleClick(reactBox, row, col) {
    let tracker = this.props.tracker.map(row => row.slice());

    tracker = this.basicClick(row, col, tracker)
    this.props.dispatch(setTracker(tracker));
    this.props.dispatch(pause(250));

    let index = tracker[0][0];

    for (let row = 0; row < tracker.length; row++) {
      for (let col = 0; col < tracker[row].length; col++) {
        if (tracker[row][col] !== index) {
          return;
        }
      }
    }

    this.props.dispatch(transition(this.boxes, 500, 500));
  }

  onBoxClick(handler) {
    return function(box, grid, dispatch) {
      handler(this, this.props.box.row, this.props.box.col);
    }
  }
}

const select = (state) => {
  let index = Math.floor(Math.random() * state.elements.selected.length);
  let startColor = state.elements.selected[index];
  return { index, startColor, ...state.light };
};

export default connectLevel(select)(Light);
