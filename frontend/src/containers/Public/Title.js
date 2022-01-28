import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useBody } from '../../hooks/useBody';

const Wrapper = styled.div`
margin: auto;
width: 55%;
height: 48px;
postion: relative;
display: flex;
flex-direction: column;
background-color: white;
`;

const title_arr = {
  GaborTransform: "Time-Frequency Analysis: Gabor Transform",
  SpeedAdjustment: "Speed Adjustment",
  NoiseReductionEnhancement: "Noise Reduction/Enhancement"
}

export default function Title() {
  const { currFunc } = useBody();

  return (
    <Wrapper>
      <div style={{position:"relative", top: "5px", fontSize:"24px",fontFamily: "Comic Sans MS, Comic Sans, cursive", 
              textAlign: "center", border: "dashed #002296", verticalAlign: "middle", display: "inline-block"}}>
        {title_arr[currFunc]}
      </div>
    </Wrapper>
  );
}
