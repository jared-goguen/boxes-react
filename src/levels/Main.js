import '../styles/Main.scss';

import React from 'react';
import { connectLevel, Level } from './Level';
import {  
  toggleColor, 
  shakeUnselected,
  transitionMain
} from '../actions/elements';

import {
  loadNextLevel
} from '../actions/app';

import Grid from '../components/Grid';


class Main extends Level {
  constructor(props) {
    super(props);
    this.mainClick = this.mainClick.bind(this);
    this.mainButton = React.createRef();
  }

  generateBoxes() {
    return [this.props.colors.map((color, index) => ({
      row: 0,
      col: index,
      color: color,
      side: this.props.side,
      onBoxClick: this.onBoxClick,
      gridRow: 0,
      gridCol: index
    }))];
  }

  onBoxClick(box, grid, dispatch) {
    this.toggleClass('selected');
  }

  mainClick(event) {
    let selected = 0;
    for (let rowBoxes of this.props.grid.boxes) {
      for (let box of rowBoxes) {
        if (box.hasClass('selected')) {
          selected += 1;
        }
      }
    }
    if (selected > 2) {
      this.mainButton.current.classList.add('MainFade')
      this.props.dispatch(transitionMain(500, 750));
    } else {
      this.props.dispatch(shakeUnselected(1000, 100));
    }
  }

  render() {
    return (
      <div className='Main'>
        <Grid />
        <div className='MainButtonWrapper' ref={this.mainButton}>
          <button className='MainButton' onClick={this.mainClick} />
        </div>
      </div>
    );
  }
}

const select = (state) => {
  const { colors, grid } = state.elements;
  return { colors, grid };
};

export default connectLevel(select)(Main);
