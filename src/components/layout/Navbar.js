import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1
  }
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link style={{ color: 'white' }} to='/'>
              AJ's Blog
            </Link>
          </Typography>
          {props.loggedIn ? (
            <SignedInLinks profile={props.profile} />
          ) : (
            <SignedOutLinks />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: !state.firebase.auth.isEmpty,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ButtonAppBar);
