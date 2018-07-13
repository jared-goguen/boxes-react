import '../styles/Grid.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from './Box';

class Grid extends Component {

  render() {
    console.log(this.props);
    const { boxes } = this.props.grid;
    const rows = [];
    boxes.forEach((rowElements, row) => {
      let newRow = [];
      rows.push(newRow);
      rowElements.forEach((boxInfo, col) => {
        newRow.push(<Box key={col} row={row} col={col} />)
      });
    });

    return (
      <div className='Grid'>
        {rows.map((rowElements, row) => (
          <div key={row}>
            {rowElements}
          </div>
        ))}
      </div>
    );
  }
}

const select = (state) => ({
  grid: state.elements.grid
});

export default connect(select)(Grid);