import './styles/App.scss';

import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux';
import { setWindowSize } from './actions/app';


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
    let contents = this.props.instantiated ? 
      this.props.levels[this.props.index] : null;

    return (
      <div className='App' ref={this.ref}>
        {contents}
      </div>
    );
  }
}

const select = (state) => ({
  instantiated: state.app.instantiated,
  levels: state.app.levels,
  index: state.app.index
});

export default hot(module)(connect(select)(App));
