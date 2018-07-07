import '../styles/Grid.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Grid extends Component {
  getStyle = () => {
    return this.props.padding;
  }

  render() {
    return (
      <div className='Grid' style={this.getStyle()}>
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