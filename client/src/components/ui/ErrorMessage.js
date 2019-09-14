import React from 'react';
import styled from 'styled-components';

const ErrorStyled = styled.p`
  color: red;
  font-size: 10px;
`;

const ErrorMessage = ({ error }) => (
  <ErrorStyled>
    ⚠️ ERROR: {error}
  </ErrorStyled>
);

export default ErrorMessage;
