import React from 'react';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import PropTypes from 'prop-types';
import RestoreIcon from '@material-ui/icons/Restore'


function FloatingResetButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="secondary"
      aria-label="Reset"
      className={classes.fab}
      style={styles.fab}
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
