import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const CardContainer = styled(Flex)`
  border: 1px solid red;
  padding: 25px;
  box-shadow: 10px 10px 3px 0px #cccccc;
  border-radius: 5px;
  background-color: white;
`;

const Card = ({ children }) => (
  <CardContainer flexDirection="column">
    {children}
  </CardContainer>
);

export default Card;
