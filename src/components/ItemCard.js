import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';

function ItemCard(props) {
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

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard)
