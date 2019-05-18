import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

export const createTheme = () => {
  return createMuiTheme({
    overrides: {
      MuiCardHeader: {
        root: {
          marginTop: 2 * defaultTheme.spacing.unit,
        },
      },
      MuiCardContent: {
        root: {
          marginBottom: 2 * defaultTheme.spacing.unit,
        },
      },
    },
  });
};


class Question extends React.Component {
  renderQuestionResponse(i) {
    return (
      <MuiThemeProvider theme={createTheme}>
      <Card
        onClick={() => this.props.onClick(i)}
        key={this.props.possible_answers[i].text}
      >
        {this.props.possible_answers[i].text}
      </Card>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div className="question">
        <div className="question-text">{this.props.question_text}</div>
        {this.props.possible_answers.map((item, i) =>
          this.renderQuestionResponse(i)
        )}
      </div>
    );
  }
}

export default withStyles(createTheme)(Question);
