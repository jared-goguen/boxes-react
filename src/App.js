import './styles/App.scss';

import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux';
import { setWindowSize } from './actions/app';

import Main from './screens/Main'


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
    let contents = this.props.instantiated ? <Main /> : null;

    return (
      <div className='App' ref={this.ref}>
        {contents}
      </div>
    );
  }
}

const select = (state) => ({
  instantiated: state.app.instantiated
});

export default hot(module)(connect(select)(App));
