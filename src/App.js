import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

const DICTIONARY = [
  'BROUETTE',
  'TASSE',
  'CHAUSSETTE',
  'STYLO',
  'VIOLON',
  'FAUTEUIL',
  'TELEPHONE',
  'ECRAN',
]

const DEFAULT_STATE = {
  wordToGuess: "",
  guesses: 0,
  usedLetters: [],
}

const MYSTERY_CHAR = "_"

const LETTERS_FIRST_ROW = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
]

const LETTERS_SECOND_ROW = [
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

class App extends Component {
  state = {
    wordToGuess: this.pickWord(),
    guesses: 0,
    usedLetters: []
  }

  pickWord() {
    return DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]
  }

  computeDisplay(word, usedLetters) {
    return word.replace(/\w/g, (letter) => (usedLetters.includes(letter) ? letter : MYSTERY_CHAR))
  }

  // arrow declaration to fix 'this' reference
  handleLetter = (letter) => {
    this.setState((prevState) => ({
      usedLetters: [...prevState.usedLetters, letter],
      guesses: prevState.guesses + 1,
    }))
  }

  // arrow declaration to fix 'this' reference
  handleKeyPress = (event) => {
    this.handleLetter(event.key.toUpperCase());
  }

  isPicked(letter) {
    return this.state.usedLetters.includes(letter)
  }

  resetGame = () => {
    this.setState(DEFAULT_STATE)
    this.setState({wordToGuess: this.pickWord()})
  }

  render() {
    const { wordToGuess, guesses, usedLetters } = this.state
    const wordToDisplay = this.computeDisplay(wordToGuess, usedLetters)
    const won = !wordToDisplay.match(/_/g)

    return (
      <div className="app">
        <header className="app-header">
          <img src="defi.png" className="app-logo" alt="logo" />
          <p>
            Jeu du pendu
          </p>
        </header>
        <div className="word-to-guess">{wordToDisplay}</div>
        <div>Nombre d'essais : {guesses}</div>
        
          {won && <div className="buttons-container"><button onClick={this.resetGame}>Rejouer</button></div>}
          {!won && <div className="buttons-container">
          <div className="letters">
            {LETTERS_FIRST_ROW.map(letter => (
              <button 
                key={letter} 
                onClick={() => this.handleLetter(letter)} 
                className={`letter ${this.isPicked(letter) && 'picked' || ''}`}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="letters">
            {LETTERS_SECOND_ROW.map(letter => (
              <button 
              key={letter} 
              onClick={() => this.handleLetter(letter)} 
              className={`letter ${this.isPicked(letter) && 'picked' || ''}`}
            >
              {letter}
            </button>
            ))}
          </div>
          </div>}
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress, false);
  }
}

export default App;
