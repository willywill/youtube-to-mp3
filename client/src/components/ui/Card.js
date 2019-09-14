import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const CardContainer = styled(Flex)`
  border: 1px solid #ddd;
  padding: 25px 40px;
  border-radius: 5px;
  background-color: white;
`;

const Card = ({ children }) => (
  <CardContainer flexDirection="column">
    {children}
  </CardContainer>
);

export default Card;
