import '../styles/Box.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import constructClass from 'classnames';


class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classNames: ['BoxInner']
    };
    this.onClick = this.props.partialOnClick.bind(this);
  }

  addClassName(name) {
    const classNames = [ ...this.state.classNames, name ];
    this.setState({ classNames });
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

  getBox(classNames) {
    return (
      <div className='Box' style={this.getStyle()}>
        <div 
          className={constructClass(classNames)} 
          style={this.getInnerStyle()}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

const select = (state) => ({
  padding: state.elements.padding
});

export default Box;
