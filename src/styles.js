const styles = theme => ({
  media: {
      height: 10,
      paddingTop: '10%' // 16:9
   },
   card: {
      position: 'relative',
       display: 'block',
       transitionDuration: '0.3s',
       height: '80vw',
       minHeight: "600vw"
   },
   overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',
      backgroundColor: 'white'
   },
   fab: {
     position: 'absolute',
     bottom: theme.spacing.unit * 2,
     right: theme.spacing.unit * 2,
  },
});
