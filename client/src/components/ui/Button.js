import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  outline: none;
  padding: 10px 25px;
  border-radius: 3px;
  font-size: 15px;
  background-color: ${props => props.color || 'red'};
  color: ${props => props.textColor || 'white'};
  margin: 10px;
  margin-top: ${props => props.mt || '10px'};
  text-transform: uppercase;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0,0,0,.12);
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,.12);
  }
`;

export default Button;
