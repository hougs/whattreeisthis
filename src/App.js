import React from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import questionData from './questionData.json'
import styles from './styles.js'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      }
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
            <IdentifiedItem
            imgPath={this.getTreeImagePath(this.state.idedTree)}
            name={this.state.idedTree}></IdentifiedItem>}
          {value === 1 && <TabContainer>
            {candidateItems.map(item =>
              <IdentifiedItem
              imgPath={this.getTreeImagePath(item)}
              name={item}></IdentifiedItem>
            )}
            </TabContainer>}

        </div>
        </MuiThemeProvider>
      );
  }
}

function IdentifiedItem(props) {
  return(
    <Card style={styles.card}>
    <CardContent>
    <h1>{props.name}</h1>
    <CardMedia
        style={styles.card}
        image={props.imgPath}
        title={props.name}
      />
      <img src={props.imgPath}/>
      </CardContent>
    </Card>
  );
}

class Question extends React.Component {
  renderQuestionResponse(i) {
    return (
      <Card
      onClick={() => this.props.onClick(i)}
      key={this.props.possible_answers[i].text}
      style={styles.card}>
        {this.props.possible_answers[i].text}
      </Card>
    );
  }

  render() {
    return(
      <div className="question">
        <div className="question-text">
          {this.props.question_text}
        </div>
        {this.props.possible_answers.map((item, i) => (
          this.renderQuestionResponse(i))
        )}
      </div>)
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
