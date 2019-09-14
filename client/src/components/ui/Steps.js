import React from 'react';
// import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StepProgress = styled.ul`
  counter-reset: step;
`;

const Step = styled.li`
  list-style-type: none;
  float: left;
  position: relative;
  text-align: center;
  color: ${props => props.active ? 'red' : 'black'};
  font-size: 10px;
  padding-left: 65px;
  padding-right: 65px;

  &::before {
    content: counter(step);
    counter-increment: step;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 2px solid ${props => props.active ? 'red' : 'black'};
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${props => props.activeIndex ? 'red' : 'black'};
    top: 15px;
    left: -50%;
    z-index: -1;
  }

  &:first-child:after {
    content: none;
  }
`;

/**
 * Generates a horizontal step progress bar with an unlimited number of steps
 * 
 * @param {React.Props} steps - Array of steps in a flow
 */
class Steps extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeStepIndex: 0 };
  }

  render() {
    const { steps } = this.props;
    const { activeStepIndex } = this.state;

    return (
      <Flex width="100%" style={{ zIndex: 0 }}>
        <StepProgress>
          {steps && steps.map((step, index) => (
            <Step key={step} active={activeStepIndex === index} activeIndex={(activeStepIndex + 1) === index}>
              {step}
            </Step>
          ))}
        </StepProgress>
      </Flex>
    );
  }
}

// Steps.propTypes = {
//   steps: arrayOf(string).isRequired,
// };

export default Steps;
