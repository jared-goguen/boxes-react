import '../styles/Mixed.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';

import { 
  setGridPadding, 
  registerBoxes,
  addRandomClass,
  deleteRandomClass,
  shuffleGrid,
  pause
} from '../actions/elements';

import Box from '../components/Box';
import Grid from '../components/Grid';


class Mixed extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setGridPadding(this.getPadding()));

    const N = this.props.selected.length;
    this.boxes = [];
    for (let row = 0; row < N; row++) {
      let newRow = [];
      this.boxes.push(newRow);
      for (let col = 0; col < N; col++) {
        newRow.push({
          row,
          col,
          color: this.props.selected[col],
          side: this.props.side,
          partialOnClick: this.partialOnClick,
          classNames: new Set(['fade'])
        });
      }
    }
    this.props.dispatch(registerBoxes(this.boxes));
  }

  componentDidMount() {
    const timeoutLength = 250 / this.props.selected.length ** 2;
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', timeoutLength));
    this.props.dispatch(shuffleGrid(500));
  }

  getPadding() {
    const grid_width = this.props.side * this.props.selected.length;
    const grid_height = this.props.side * this.props.selected.length;
    return {
      top: (this.props.height - grid_height) / 2,
      left: (this.props.width - grid_width) / 2,
    };
  }

  partialOnClick(event) {
    this.toggleClass('selected');
  }

  render() {
    return (
      <div className='Mixed'>
        <Grid />
      </div>
    );
  }
}

const select = (state) => {
  const { width, height } = state.app;
  const { selected, grid } = state.elements;
  const side = Math.min(width, height) / (selected.length + 2);
  return { width, height, selected, grid, side };
};

export default connect(select)(Mixed);
