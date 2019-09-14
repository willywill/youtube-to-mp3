import styled from 'styled-components';

const Text = styled.p`
  color: black;
  margin: 0px;
  font-size: ${props => props.small ? '12px' : 'inherit'};
`;

export default Text;
