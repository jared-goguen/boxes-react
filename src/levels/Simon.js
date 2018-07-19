import '../styles/Simon.scss';

import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import { 
  deleteRandomClass,
  shuffleGrid,
  updateGrid,
  shakeUnselected,
  unselectSelected,
  hideSelected
} from '../actions/elements';


class Simon extends Level {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    }
  }

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

  gridIsValid() {
    let currentColor;
    for (let box of this.props.grid.flatten()) {
      if (box.classNames.has('selected')) {
        if (currentColor === undefined) {
          currentColor = box.color;
        } else {
          if (box.color !== currentColor) {
            return false;
          }
        }
      }
    }
    return true;
  }

  componentDidUpdate() {
    if (!this.state.processing && !this.gridIsValid()) {
      this.setState({
        processing: true
      }, () => {
        this.props.dispatch(hideSelected(500, undefined, 'temp1')); 
        this.props.dispatch(unselectSelected(500, undefined, 'temp2'));
        this.props.dispatch(shakeUnselected(1000, 100));
        setTimeout(() => {
          this.setState({
            processing: false
          });
        }, 1100);
      })
    }
  }


}

const select = (state) => ({});

export default connectLevel(select)(Simon);
