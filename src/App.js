import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import ZoomBox from './ZoomBox';

import './Boxes.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
    this.state = {
      elements: [],
      count: 0
    }
  }

  initialClick = (event) => {
    console.log(this);
  }

  componentDidMount() {
    let width = this.ref.current.clientWidth;
    let height = this.ref.current.clientHeight;

    const initialProps = {
      onClick: this.initialClick,
      side: Math.min(width, height)/10,
      px: width/2,
      py: height/2,
      vx: Math.random(0, 1),
      vy: Math.random(0, 1),
    }

    const initialElement = <ZoomBox key={0} {...initialProps} />;

    this.setState({
      width: width,
      height: height,
      elements: [initialElement]
    });

    // setInterval(this.update, 15);
  }

  update = () => {
    for (let element of this.state.elements) {
      element.update();
    }
  }

  render() {
    return (
      <div className="App" ref={this.ref}>
        {this.state.elements}
      </div>
    );
  }
}

export default hot(module)(App);

