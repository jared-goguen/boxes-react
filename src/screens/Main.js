import '../styles/Main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setGridPadding, 
  toggleColor, 
  registerBoxes, 
  shakeUnselected,
  unloadMain 
} from '../actions/elements';

import Box from '../components/Box';
import Grid from '../components/Grid';


class Main extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setGridPadding(this.getPadding()));
    this.boxes = [this.props.colors.map((color, index) => ({
      row: 0,
      col: index,
      color: color,
      side: this.props.side,
      partialOnClick: this.partialOnClick
    }))];
    this.props.dispatch(registerBoxes(this.boxes));
    this.mainClick = this.mainClick.bind(this);
  }

  getPadding() {
    const grid_width = this.props.side * this.props.colors.length;
    const grid_height = this.props.side;
    return {
      top: (this.props.height - grid_height) / 2,
      left: (this.props.width - grid_width) / 2,
    };
  }

  partialOnClick(event) {
    this.toggleClass('selected');
  }

  mainClick(event) {

  }

  render() {
    return (
      <div className='Main'>
        <Grid />
        <div className='MainButtonWrapper'>
          <button className='MainButton' onClick={this.mainClick} />
        </div>
      </div>
    );
  }
}

const select = (state) => {
  const { width, height } = state.app;
  const { colors } = state.elements;
  const side = width / (colors.length + 6);
  return { width, height, colors, side };
};

export default connect(select)(Main);
