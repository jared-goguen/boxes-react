import '../styles/Box.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import constructClass from 'classnames';

import { addBoxClass, deleteBoxClass, toggleBoxClass } from '../actions/elements';


class Box extends Component {
  constructor(props) {
    super(props);
    this.onBoxClick = this.props.box.onBoxClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let { box, grid, dispatch, onBoxClick } = this.props;
    if (!this.props.isProcessing()) {
      this.onBoxClick(box, grid, dispatch);
    } else {
      console.log('Cannot click while processing...');
    }
  }

  addClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props.box)) {
      this.props.dispatch(addBoxClass(this.props.box.row, this.props.box.col, name));
    }
  }

  deleteClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props)) {
      this.props.dispatch(deleteBoxClass(this.props.box.row, this.props.box.col, name));
    }
  }

  toggleClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props)) {
      this.props.dispatch(toggleBoxClass(this.props.box.row, this.props.box.col, name));
    }
  }

  getStyle() {
    return {
      width: this.props.side,
      height:this.props.side,
      top: this.props.padding.top + this.props.box.row * this.props.side,
      left: this.props.padding.left + this.props.box.col * this.props.side,
    }
  }

  getInnerStyle() {
    return {
      background: this.props.box.color,
    }
  }

  render() {
    return (
      <div className='Box' style={this.getStyle()}>
        <div 
          className={constructClass(this.props.box.classNames.toArray())} 
          style={this.getInnerStyle()}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export const select = (state, ownProps) => {
  const { padding, side, grid } = state.elements;
  const box = state.elements.grid.getInGrid(ownProps.gridRow, ownProps.gridCol);
  const { isProcessing } = state.queueReducer;
  return { padding, side, grid, box, isProcessing }
};

export default connect(select)(Box);
