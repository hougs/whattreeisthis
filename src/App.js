import React from 'react';
import './App.css';
import FloatingResetButton from './components/FloatingResetButton'
import ItemCard from './components/ItemCard'
import Question from './components/Question'
import TabContainer from './components/TabContainer'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import questionData from './questionData.json'
import styles from './styles.js'
import Card from '@material-ui/core/Card';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#81c784',
    },
    secondary: {
      main: '#ffab00',
    },
    type: 'light',
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 20,
  },
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionHistory: [
        {
          nodeId: 0
        }
      ],
      stepNumber: 0,
      value: 0,
      hasNextQuestion: true,
      idedTree: null
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      hasNextQuestion: true
    });
  }

  handleClick(i) {
    const questionHistory = this.state.questionHistory.slice(0, this.state.stepNumber + 1);
    const currentQuestion = this.getByNodeId(questionHistory[this.state.stepNumber].nodeId);
    const next_q = currentQuestion.possible_answers[i].next_q

    if (next_q!== null){
        this.setState({
        questionHistory: questionHistory.concat([{
          nodeId: currentQuestion.possible_answers[i].next_q
        }
      ]),
        stepNumber: questionHistory.length
      });
    } else {
      this.setState({
        idedTree: currentQuestion.possible_answers[i].answer,
        stepNumber: questionHistory.length,
        hasNextQuestion: false
      });

  }
  }

  getByNodeId(nodeId) {
    return( questionData.filter(function(item){
        return item.id===nodeId;
    })[0]);
  }

  renderQuestion(props) {
    const questionHistory = this.state.questionHistory;
    let currentQuestion = this.getByNodeId(questionHistory[this.state.stepNumber].nodeId);
    return (<Question
    question_text={currentQuestion.question}
    possible_answers={currentQuestion.possible_answers}
    onClick={i => this.handleClick(i)}/>);
  }

  getTreeImagePath(treeName) {
    return (process.env.PUBLIC_URL + `/img/${treeName}/full.jpg`.replace(' ', '-'));
  }

  render() {
      const { classes } = this.props;
      const { value } = this.state;
      let candidateItems = [];
      const questionHistory = this.state.questionHistory;
      if (this.state.hasNextQuestion ) {
        getCandidateItems(questionHistory[this.state.stepNumber].nodeId, candidateItems);
        candidateItems = [... new Set(candidateItems)]
      }
      const floatingButton = <FloatingResetButton handleClick={() => this.jumpTo(0)}/>
      return (
        <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Questions" />
              <Tab label="Candidate Trees" />
            </Tabs>
          </AppBar>
          {value === 0 && this.state.hasNextQuestion &&
            <TabContainer>{this.renderQuestion(this.props)}</TabContainer>
          }
          {value === 0 && !this.state.hasNextQuestion &&
            <ItemCard
            imgPath={this.getTreeImagePath(this.state.idedTree)}
            name={this.state.idedTree}></ItemCard>}
          {value === 1 && <TabContainer>
            {candidateItems.map(item =>
              <ItemCard
              imgPath={this.getTreeImagePath(item)}
              name={item}></ItemCard>
            )}
            </TabContainer>}
            {floatingButton}
        </div>
        </MuiThemeProvider>
      );
  }
}

function getCandidateItems(i, candidates) {
  let question = questionData.filter(function(item){
      return item.id===i;
  })[0];

  for(let i = 0; i < question.possible_answers.length; i++){
    let possible_answer = question.possible_answers[i];
    if (possible_answer.next_q !== null) {
      getCandidateItems(possible_answer.next_q, candidates)
    } else if (possible_answer.next_q === "TBD") {
      break
    } else {
      candidates.push(possible_answer.answer)
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
