import '../styles/Grid.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from './Box';

class Grid extends Component {
  render() {
    return (
      <div className='Grid'>
        {this.props.elements.map((row_elements, row) => (
          <div key={row}>
            {row_elements}
          </div>
        ))}
      </div>
    );
  }
}

const select = (state) => ({

});

export default connect(select)(Grid);