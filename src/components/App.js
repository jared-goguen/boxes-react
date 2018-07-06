import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux';
import { setWindowSize } from '../actions/app';


class App extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    let width = this.ref.current.clientWidth;
    let height = this.ref.current.clientHeight;
    this.props.dispatch(setWindowSize(width, height));
  }

  render() {
    return (
      <div className="App" ref={this.ref}>
        {this.props.boxes}
      </div>
    );
  }
}

const select = (state) => ({
  boxes: state.elements.boxes
});

export default hot(module)(connect(select)(App));
