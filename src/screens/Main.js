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
    this.boxes = [this.props.colors.map((color, index) => (
      <Box 
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
    let selectedCount = 0;
    for (let classSet of this.props.boxClasses[0]) {
      if (classSet.has('selected')) {
        selectedCount += 1;
      }
    }
    if (selectedCount > 2) {
      this.props.dispatch(unloadMain);
    } else {
      this.props.dispatch(shakeUnselected);
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
  const { colors, boxClasses } = state.elements;
  const side = width / (colors.length + 6);
  return { width, height, colors, boxClasses, side };
};

export default connect(select)(Main);
