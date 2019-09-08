import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LinkInput extends Component {
  constructor() {
    super()

    this.state = { youtubeLink: '' }
  }

  handleChange = event => {
    this.setState({ youtubeLink: event.target.value })
  }

  render() {
    const textField = { width: '50vw', height: '8vh', color: '#282828', border: '1px solid #aaaaaa', borderRadius: 2 }

    return (
      <div className=''>
        <form className='' noValidate autoComplete='off'>
          <input
            id='youtubeLink'
            style={textField}
            value={this.state.youtubeLink}
            onChange={this.handleChange}
            margin='normal'
          />
        </form>
      </div>
    )
  }
}

LinkInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default LinkInput
