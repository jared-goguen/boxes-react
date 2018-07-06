import '../styles/Main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from '../components/Box';
import Grid from '../components/Grid';


const colors = [
  '#eaff7b',
  '#00ffab',
  '#29bdc1',
  '#d84242',
  '#913f92',
];

const N = colors.length;


class Main extends Component {

  render() {

    const elements = [colors.map((color, index) => (
      <Box 
        key={index} 
        color={color}
        side={this.props.side} 
        row={0} 
        col={index} 
        onClick={null} 
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
  const side = Math.min(width, height) / (N + 2);
  return { width, height, side };
};

export default connect(select)(Main);
