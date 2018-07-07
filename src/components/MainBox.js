import { connect } from 'react-redux';

import Box, { selectBox } from './Box';


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
  return {
    colors: state.elements.colors,
    ...selectBox(state)
  };
}

export default connect(select)(MainBox);
