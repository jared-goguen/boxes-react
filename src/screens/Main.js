import '../styles/Main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setGridPadding, 
  toggleColor, 
  registerBoxes, 
  shakeBoxes,
  transitionToSimon 
} from '../actions/elements';

import MainBox from '../components/MainBox';
import Grid from '../components/Grid';


class Main extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setGridPadding(this.getPadding()));
    this.boxes = [Object.keys(this.props.colors).map((color, index) => (
      <MainBox 
        key={index} 
        color={color}
        side={this.props.side} 
        row={0} 
        col={index} 
        partialOnClick={this.partialOnClick}
      />
    ))];
    this.props.dispatch(registerBoxes(this.boxes));
    this.mainClick = this.mainClick.bind(this);
  }

  getPadding() {
    const grid_width = this.props.side * Object.keys(this.props.colors).length;
    const grid_height = this.props.side;
    return {
      top: (this.props.height - grid_height) / 2,
      left: (this.props.width - grid_width) / 2,
    };
  }

  partialOnClick(event) {
    this.props.dispatch(toggleColor(this.props.color));
  }

  mainClick(event) {
    const selected = [];
    for (let color in this.props.colors) {
      if (this.props.colors[color]) {
        selected.push(color);
      }
    }
    if (selected.length > 2) {
      this.props.dispatch(transitionToSimon());
    } else {
      this.props.dispatch(shakeBoxes());
    }
  }

  render() {
    return (
      <div className='Main'>
        <Grid rows={1} elements={this.boxes} />
        <div className='MainButtonWrapper'>
          <button className='MainButton' onClick={this.mainClick} />
        </div>
      </div>
    );
  }
}

const select = (state) => {
  const { width, height } = state.app;
  const { colors, boxes } = state.elements;
  const side = width / (Object.keys(colors).length + 6);
  return { width, height, colors, boxes, side };
};

export default connect(select)(Main);
