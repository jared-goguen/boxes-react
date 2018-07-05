import React, { Component } from 'react';
import classNames from 'classnames';


class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      px: this.props.px,
      py: this.props.py,
      vx: this.props.vx,
      vy: this.props.vy
    };
    this.classNames = ['box'];
  }

  getStyle() {
    return {
      width: this.props.side,
      height: this.props.side,
    };
  }

  update() {
    let newPosition = {
      px: this.state.px + this.state.vx,
      py: this.state.py + this.state.vy
    };
    this.setState(newPosition);
  }

  render() {
    return (
      <div 
        style={this.getStyle()}
        className={classNames(this.classNames)} 
        onClick={this.props.onClick} 
      />
    );
  }
}

export default Element;

