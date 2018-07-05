import React from 'react';
import Element from './Element';
import classNames from 'classnames';

class ZoomBox extends Element {
  constructor(props) {
    super(props)
    this.classNames = this.classNames.concat(['bubble', 'zoom']);
  }

  getStyle = () => {
    let partial = super.getStyle()
    return {
      left: this.props.px - this.props.side/2,
      top: this.props.py - this.props.side/2,
      ...partial
    };
  }

  update = () => {
    super.update()
  }
}

export default ZoomBox;
