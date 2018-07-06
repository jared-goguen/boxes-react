import '../styles/Box.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';


class Box extends Component {

  getStyle = () => ({
    background: this.props.color,
    width: this.props.side,
    height:this.props.side,
    top: this.props.row * this.props.side,
    left: this.props.col * this.props.side,
  })


  render() {
    return (
      <div className='Box' style={this.getStyle()} />
    );
  }
}

const select = (state) => ({

});

export default connect(select)(Box);
