import React, { Component } from 'react';
import styled, { keyframes }  from 'styled-components';

const Group = styled.div`
  position: relative; 
  margin-bottom: 25px; 
  margin-top: 20px;
`;

const TextInput = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  background: transparent;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
  outline: ${props => props.focussing ? 'none' :'hidden' };
`;

const Label = styled.label`
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  transition: 0.15s ease all; 
  color: ${props => props.focussing || props.used ? 'red' :'#999' }; 
  font-size: ${props => props.focussing || props.used ? 14 : 18 }px;
  top: ${props => props.focussing || props.used ? -20 : 10 }px; 
`;


const inputHighlighter = keyframes`
  from { background: red; }
  to { width: 0; background: transparent; }
`;

const Highlight = styled.span`
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
  animation: 0.15s ${ props => props.focussing ? inputHighlighter : undefined } ease-in; 
`;


const Bar = styled.span`
  position:relative; 
  display:block; 
`;

const BarBefore = styled(Bar)`
  content: '';
  height: 2px; 
  bottom: 1px; 
  position: absolute;
  background: red; 
  left: 50%;
  transition: 0.2s ease all; 
  width: ${props => props.focussing ? '50%' :0 };
`;

const BarAfter = styled(Bar)`
  content: '';
  height: 2px; 
  bottom: 1px; 
  position: absolute;
  background: red; 
  right: 50%; 
  transition: 0.2s ease all; 
  width: ${props => props.focussing ? '50%' :0 };
`;

class Input extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
      focussing: false,
      hasValue: !!props.value,
	  };
	}
	
	onFocusHandle = () => {
		this.setState({ focussing: true })
	}

	onBlurHandle = () => {
		this.setState({ focussing: false })
  }
  
  handleChange = (e) => {
    const { onChange } = this.props;

    const hasValue = !!e.target.value;

    this.setState({ hasValue });

    onChange(e);
  }

	render() {
		const { label, onChange } = this.props;
		const { focussing, hasValue } = this.state;
		return (
			<Group {...this.props}> 
        <TextInput 
          onFocus={this.onFocusHandle} 
          onBlur={this.onBlurHandle} 
          focussing={focussing} 
          onChange={this.handleChange} 
        /> 
        <Label focussing={focussing} used={hasValue}>
          {label}
        </Label>
			  <Highlight focussing={focussing} />
			  <BarBefore focussing={focussing} />
			  <Bar focussing={focussing} /> 
			  <BarAfter focussing={focussing} />
			</Group>
		);
	}
}

export default Input;