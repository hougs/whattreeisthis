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

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentQuestion = this.getByNodeId(history[this.state.stepNumber].nodeId);

    this.setState({
      history: history.concat([{
        nodeId: currentQuestion.possible_answers[i].next_q
      }
    ]),
      stepNumber: history.length
    });
  }

  getByNodeId(nodeId) {
    return( questionData.filter(function(item){
        return item.id===nodeId;
    })[0]);
  }

  render() {
      const history = this.state.history;
      const currentQuestion = this.getByNodeId(history[this.state.stepNumber].nodeId);
      console.log("history is " + JSON.stringify(this.state.history));
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </header>
        <Question
        question_text={currentQuestion.question}
        possible_answers={currentQuestion.possible_answers}
        onClick={i => this.handleClick(i)}/>
      </div>
    );
  }
}

class Question extends React.Component {
  renderQuestionResponse(i) {
    return (
      <button
      className="QuestionResponse"
      onClick={() => this.props.onClick(i)}
      key={this.props.possible_answers[i].text}>
        {this.props.possible_answers[i].text}
      </button>
    );
  }

  render() {
    return(
      <div>
        <div className="question-text">
          {this.props.question_text}
        </div>
        {this.props.possible_answers.map((item, i) => (
          this.renderQuestionResponse(i))
        )}
      </div>)
  }

}


export default App;
