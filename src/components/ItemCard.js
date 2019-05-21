import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';

const styles = {
  card: {
    maxWidth: '90vw',
  },
  media: {
    height: '20vh'
  },
};


function ItemCard(props) {
  const { classes } = props;
  return(
    <Card className={classes.card}>
    <CardMedia
        className={classes.media}
        image={props.imgPath}
        title={props.name}
      />
    <CardContent>
    <h1>{props.name}</h1>
    </CardContent>
    </Card>
  );
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard)
