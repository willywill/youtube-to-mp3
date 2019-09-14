import React from 'react';
import styled from 'styled-components';

const LoadingIndicatorStyled = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  margin: 10px 0px;
  
  & .path {
    stroke: ${props => props.color};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const LoadingIndicator = ({ color }) => (
  <LoadingIndicatorStyled viewBox="0 0 50 50" color={color || 'white'}>
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </LoadingIndicatorStyled>
);

export default LoadingIndicator;
