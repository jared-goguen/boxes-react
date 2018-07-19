import '../styles/Simon.scss';

import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import { 
  deleteRandomClass,
  shuffleGrid,
  updateGrid
} from '../actions/elements';


class Simon extends Level {
  generateBox(row, col) {
    return {
      row,
      col,
      color: this.props.selected[col],
      onBoxClick: this.onBoxClick,
      classNames: new Set(['fade', 'hidden']),
      gridRow: row,
      gridCol: col
    };
  }

  componentDidMount() {
    const timeoutLength = 250 / this.props.selected.length ** 2;
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', timeoutLength));
    this.props.dispatch(shuffleGrid(500));
  }

  onBoxClick(box, grid, dispatch) {
    this.toggleClass('hidden');
    this.toggleClass('selected');
  }
}

const select = (state) => ({});

export default connectLevel(select)(Simon);
