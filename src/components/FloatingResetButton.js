import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import RestoreIcon from '@material-ui/icons/Restore'


function FloatingResetButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="secondary"
      aria-label="Reset"
      style={{
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
}}
      onClick={props.handleClick}>
        <RestoreIcon/>
      </Fab>
    </div>
  );
}

FloatingResetButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingResetButtons)
