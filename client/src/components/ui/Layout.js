import styled from 'styled-components';
import waves from '../../waves.svg';

const Layout = styled.div`
  background: url("${waves}") no-repeat;
  background-size: 100%;
  background-position: bottom;
  background-color: white;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
`;

export default Layout;
