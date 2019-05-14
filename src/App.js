import React from 'react';
import logo from './logo.svg';
import './App.css';
const questionData = require('./questionData.json');
console.log(questionData);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          nodeId: 0
        }
      ],
      stepNumber: 0
    };
  }

  render() {
      const history = this.state.history;
      const currentNodeId = history[this.state.stepNumber].nodeId;
      const currentQuestion = questionData.filter(function(item){
          return item.id===0;
      })[0];

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {currentQuestion.question}
          </p>
          {currentQuestion.possible_answers.map((item, i) => (
            <button>{item.text}</button>)
    )}
        </header>
      </div>
    );
  }
}

export default App;
