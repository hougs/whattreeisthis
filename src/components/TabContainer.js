import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();


function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(defaultTheme)(TabContainer);
