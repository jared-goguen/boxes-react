import '../styles/Box.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import constructClass from 'classnames';

import { addBoxClass, removeBoxClass, toggleBoxClass } from '../actions/elements';


class Box extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.props.partialOnClick.bind(this);
  }

  addClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props)) {
      this.props.dispatch(addBoxClass(this.props.row, this.props.col, name));
    }
  }

  removeClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props)) {
      this.props.dispatch(removeBoxClass(this.props.row, this.props.col, name));
    }
  }

  toggleClass(name, condition) {
    if (typeof condition !== 'function' || condition(this.props)) {
      this.props.dispatch(toggleBoxClass(this.props.row, this.props.col, name));
    }
  }

  getStyle() {
    return {
      width: this.props.side,
      height:this.props.side,
      top: this.props.padding.top + this.props.row * this.props.side,
      left: this.props.padding.left + this.props.col * this.props.side,
    }
  }

  getInnerStyle() {
    return {
      background: this.props.color,
    }
  }

  render() {
    return (
      <div className='Box' style={this.getStyle()}>
        <div 
          className={constructClass(this.props.classNames.toArray())} 
          style={this.getInnerStyle()}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export const select = (state, ownProps) => ({
  padding: state.elements.padding,
  classNames: state.elements.boxClasses[ownProps.row][ownProps.col]
});

export default connect(select)(Box);
