import React from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import questionData from './questionData.json'

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

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#f50057',
      },
    },
  },
});

var cardStyle = {
   display: 'block',
   transitionDuration: '0.3s',
   height: '20vw'
}

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
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick(i) {
    const questionHistory = this.state.questionHistory.slice(0, this.state.stepNumber + 1);
    const currentQuestion = this.getByNodeId(questionHistory[this.state.stepNumber].nodeId);

    this.setState({
      questionHistory: questionHistory.concat([{
        nodeId: currentQuestion.possible_answers[i].next_q
      }
    ]),
      stepNumber: questionHistory.length
    });
  }

  getByNodeId(nodeId) {
    return( questionData.filter(function(item){
        return item.id===nodeId;
    })[0]);
  }

  render() {
      const { classes } = this.props;
      const { value } = this.state;
      const questionHistory = this.state.questionHistory;
      const currentQuestion = this.getByNodeId(questionHistory[this.state.stepNumber].nodeId);
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Questions" />
              <Tab label="Candidate Trees" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>
            <Question
            question_text={currentQuestion.question}
            possible_answers={currentQuestion.possible_answers}
            onClick={i => this.handleClick(i)}/>
            </TabContainer>}
          {value === 1 && <TabContainer>Candidate Trees TODO: render candidate trees</TabContainer>}
        </div>
      );
  }
}

class Question extends React.Component {
  renderQuestionResponse(i) {
    return (
      <Card
      className="QuestionResponse"
      onClick={() => this.props.onClick(i)}
      key={this.props.possible_answers[i].text}
      style={cardStyle}>
        {this.props.possible_answers[i].text}

      </Card>
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
