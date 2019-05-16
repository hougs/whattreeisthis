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
  media: {
      height: 10,
      paddingTop: '10%' // 16:9
   },
   card: {
      position: 'relative',
   },
   overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',
      backgroundColor: 'white'
   }
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
          nodeId: 7
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

  render() {
      const { classes } = this.props;
      const { value } = this.state;
      let imagePath = process.env.PUBLIC_URL + `/img/${this.state.idedTree}/full.jpg`.replace(' ', '-');
      return (
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
            imgPath={imagePath}
            name={this.state.idedTree}></IdentifiedItem>}
          {value === 1 && <TabContainer>Candidate Trees TODO: render candidate trees</TabContainer>}

        </div>
      );
  }
}

function IdentifiedItem(props) {
  return(
    <Card style={styles.card}>
    <CardContent>
    <h1>{props.name}</h1>
    <CardMedia
        style={styles.media}
        image={props.imgPath}
        title={props.name}
      />
      </CardContent>
    </Card>
  );
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
