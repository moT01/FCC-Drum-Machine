import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Display';
import DrumPad from './DrumPad';
import './index.css';

const pads = [
  {
    letter: "Q",
    sound: "clap"
  },{
    letter: "W",
    sound: "hihat"
  },{
    letter: "E",
    sound: "kick"
  },{
    letter: "A",
    sound: "openhat"
  },{
    letter: "S",
    sound: "boom"
  },{
    letter: "D",
    sound: "ride"
  },{
    letter: "Z",
    sound: "snare"
  },{
    letter: "X",
    sound: "tom"
  },{
    letter: "C",
    sound: "tink"
  }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.drumClick = this.drumClick.bind(this);
    this.playSound = this.playSound.bind(this);
    this.state = {
      display: "Drum Machine"
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  playSound(element) {
    element.currentTime = 0;
    element.play();
    element.parentElement.classList.add('playing');
    document.getElementById('display').classList.add('playing2');
    setTimeout(function() {
      element.parentElement.classList.remove('playing');
      document.getElementById('display').classList.remove('playing2');
    }, 100);
    this.setState({
      display: element.parentElement.id
    });
  }

  onKeyDown(e) {
    if(e.key === "q" || e.key === "w" || e.key === "e" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "z" || e.key === "x" || e.key === "c") {
      this.playSound(document.getElementById(e.key.toUpperCase()));
    }
  }

  drumClick(letter) {
    this.playSound(document.getElementById(letter));
  }

  render() {
    return (
      <div id="drum-machine">
        <Display display={this.state.display} />
        <div id="drum-pad-wrap">
          {pads.map((pad, index) =>
            <DrumPad pad={pad} drumClick={this.drumClick} key={index} />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
