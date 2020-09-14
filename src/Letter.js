import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = (letter, picked, onClick) => (
  <button onClick={() => onClick(letter)} className={`letter ${picked && 'picked'}`}>{letter}</button>
)

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  picked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Letter