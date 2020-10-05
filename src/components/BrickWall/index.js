import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
import './style.css'

function BrickWall(props) {
  const smAndUp = useMediaQuery(json2mq({ minWidth: 600 }));
  const mdAndUp = useMediaQuery(json2mq({ minWidth: 960 }));
  const lgAndUp = useMediaQuery(json2mq({ minWidth: 1280 }));
  const xlAndUp = useMediaQuery(json2mq({ minWidth: 1920 }));
  const [maxBricks, setMaxBricks] = useState(0);

  useEffect(() => {
    if (xlAndUp) {
      setMaxBricks(props.xl);
    }
    else if (lgAndUp) {
      setMaxBricks(props.lg);
    }
    else if (mdAndUp) {
      setMaxBricks(props.md);
    }
    else if (smAndUp) {
      setMaxBricks(props.sm);
    }
    else {
      setMaxBricks(props.xs);
    }
  }, [xlAndUp, lgAndUp, mdAndUp, smAndUp, props.xl, props.lg, props.md, props.sm, props.xs]);

  function renderRow(items, twoRowNumber, twoRowLength, max, isMaxRow) {
    console.log(`rendering ${isMaxRow===true?"max":"alt"} row ${twoRowNumber} with length ${twoRowLength}`)
    const startIndex = twoRowNumber * twoRowLength + (isMaxRow === true ? 0 : max);
    const endIndex = startIndex + (isMaxRow === true ? max : max - 1);
    const brickRowArray = [];

    console.log(`row is ${isMaxRow === true ? "max" : "alt"}`);
    console.log(`generating bricks ${startIndex} to ${endIndex}`);

    for (let brickIndex = startIndex; brickIndex < endIndex; brickIndex++) {
      // add invisible stubs
      if (brickIndex > items.length - 1) {
        brickRowArray.push(
          <Grid className="invisible mui-containers-brick-wall" item xs={2}></Grid>
        )
      }
      else {
        brickRowArray.unshift(
          <Grid className="brick mui-containers-brick-wall" item xs={2} data-index={brickIndex} >{items[brickIndex]}</Grid>
        )
      }
      
    }
    

    return (
      <Grid className="brickRow" container direction="row" justify="center" alignItems="center" spacing={props.spacing}>
        {
          brickRowArray
        }
      </Grid>
    )
  }  

  function renderRows(items,max) {
    if (max <= 0) return null;
    const twoRowLength = max + max - 1;
    const remainder = items.length % twoRowLength;
    const numTwoRows = (items.length - remainder) / twoRowLength;
    const brickLayers = [];
    let twoRowNumber = 0;

    console.log({twoRowLength});
    console.log({remainder});
    console.log({numTwoRows});
    console.log(`number of two row sets: ${numTwoRows}`);

    let isMax = true;

      for (let brickIndex = 0; brickIndex < items.length; brickIndex+=(isMax === true ? max : max-1)) {
        console.log(`............brickIndex: ${brickIndex} max: ${max} max-1: ${max-1}`);
        if (brickIndex > 20) break;
        brickLayers.unshift(renderRow(items, twoRowNumber, twoRowLength, max, isMax));
        if (!isMax) twoRowNumber++;
        isMax = !isMax;
        // brickIndex += (isMax === true ? max : max-1)
      }

    // for (let twoRowNumber = 0; twoRowNumber < numTwoRows; twoRowNumber++) {
    //   console.log(`generating bricks row set ${twoRowNumber} / ${numTwoRows}`);
    //   brickLayers.unshift(renderRow(items, twoRowNumber, twoRowLength, max, true));
    //   brickLayers.unshift(renderRow(items, twoRowNumber, twoRowLength, max, false));
    // }
    return brickLayers;
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={props.spacing} >
      {/* <Grid item>{`smAndUp: ${smAndUp}`}</Grid>
      <Grid item>{`mdAndUp: ${mdAndUp}`}</Grid>
      <Grid item>{`lgAndUp: ${lgAndUp}`}</Grid>
      <Grid item>{`xlAndUp: ${xlAndUp}`}</Grid> */}
      <Grid item>{`maxBricks: ${maxBricks}`}</Grid>
      {
        renderRows(props.children, maxBricks)
      }
    </Grid>
  )
}

export default BrickWall;
