import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setGridDimensions, 
  registerBoxes, 
} from '../actions/elements';

import Grid from '../components/Grid';

export class Level extends Component {
  constructor(props) {
    super(props);
    this.boxes = this.generateBoxes();
    this.props.dispatch(setGridDimensions(this.getDimensions(this.boxes)));
    this.props.dispatch(registerBoxes(this.boxes));
  }

  getDimensions(boxes) {
    const sideWidth = this.props.width / (boxes[0].length + 2);
    const sideHeight = this.props.height / (boxes.length + 2);
    const side = Math.min(sideWidth, sideHeight);

    const grid_width = side * boxes[0].length;
    const grid_height = side * boxes.length;

    return {
      side,
      padding: {
        top: (this.props.height - grid_height) / 2,
        left: (this.props.width - grid_width) / 2
      }
    };
  }

  generateBoxes() {
    const N = this.props.selected.length;
    let boxes = [];
    for (let row = 0; row < N; row++) {
      let newRow = [];
      boxes.push(newRow);
      for (let col = 0; col < N; col++) {
        newRow.push(this.generateBox(row, col));
      }
    }
    return boxes;
  }

  render() {
    return (
      <div className={this.constructor.name}>
        <Grid />
      </div>
    );
  }
}

const baseSelect = (state, ownProps) => {
  const { width, height } = state.app;
  const { selected } = state.elements;
  return { width, height, selected };
};

export function connectLevel(select) {
  if (select === undefined) {
    return connect();
  }
  const merged = (state, ownProps) => {
    let partialProps = baseSelect(state, ownProps);
    return Object.assign(partialProps, select(state, ownProps));
  }
  return connect(merged);
}
