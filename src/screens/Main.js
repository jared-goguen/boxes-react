import '../styles/Main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGridPadding, toggleColor } from '../actions/elements';

import MainBox from '../components/MainBox';
import Grid from '../components/Grid';


class Main extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setGridPadding(this.getPadding()));
  }

  getPadding = () => {
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

  render() {
    const elements = [Object.keys(this.props.colors).map((color, index) => (
      <MainBox 
        key={index} 
        color={color}
        side={this.props.side} 
        row={0} 
        col={index} 
        partialOnClick={this.partialOnClick} 
      />
    ))];

    return (
      <div className='Main'>
        <Grid rows={1} elements={elements} />
      </div>
    );
  }
}

const select = (state) => {
  const { width, height } = state.app;
  const { colors } = state.elements;
  const side = Math.min(width, height) / (Object.keys(colors).length + 2);
  return { width, height, colors, side };
};

export default connect(select)(Main);
