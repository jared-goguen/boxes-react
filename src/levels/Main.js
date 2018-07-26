import '../styles/Main.scss';

import React from 'react';
import { connectLevel, Level } from './Level';
import { Set } from 'immutable';

import {  
  shakeUnselected,
  deleteRandomClass
} from '../actions/animations';

import {
  transitionMain
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
      classNames: new Set(['fade', 'hidden']),
      gridRow: 0,
      gridCol: index
    }))];
  }

  componentDidMount() {
    setTimeout(() => { 
      this.mainButton.current.classList.remove('MainFade')
    }, 250);
    const timeoutLength = 250 / this.props.selected.length;
    this.props.dispatch(deleteRandomClass(this.boxes, 'fade', timeoutLength));
    this.props.dispatch(deleteRandomClass(this.boxes, 'hidden', timeoutLength));
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
      this.props.dispatch(transitionMain(500, 500));
    } else {
      this.props.dispatch(shakeUnselected(500, 100));
    }
  }

  render() {
    return (
      <div className='Main'>
        <Grid />
        <div className='MainButtonWrapper MainFade' ref={this.mainButton}>
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
