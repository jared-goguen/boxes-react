import { connect } from 'react-redux';

import Box from './Box';


class MainBox extends Box {
  render() {
    const classNames = ['BoxInner'];
    if (this.props.colors[this.props.color]) {
      classNames.push('bubble');
    }
    return this.getBox(classNames);
  }
}

const select = (state) => {
  console.log(state)
  return {
    padding: state.elements.padding,
    colors: state.elements.colors
  };
}

export default connect(select)(MainBox);
