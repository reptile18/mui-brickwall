import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import BrickWall from './components/BrickWall';

const styles = {
  brick: {
    backgroundColor: "red",
    color: "white"
  }
}

function renderChildren(number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push((
      <Grid key={i} style={styles.brick} container justify="center" alignItems="center">{i}</Grid>
    ))
  }
  return array;
}

function App() {
  return (
    <div className="App">
      <BrickWall xl={7} lg={6} md={5} sm={4} xs={3}>
        {
          renderChildren(22)
        }
      </BrickWall>
    </div>
  );
}

export default App;
