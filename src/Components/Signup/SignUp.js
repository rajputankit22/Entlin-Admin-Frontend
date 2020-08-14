import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "../footer/Footer";
import { BrowserRouter as Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import validator from "validator";
import { toast } from "react-toastify";
import { isBoolean } from "util";

const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#f50057"
  },
  form: {
    width: "100%",
    marginTop: "24px"
  },
  submit: {
    margin: "24px 0px 16px"
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      firstName: "",
      lastName: "",
      username: "",
      mobile: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  stateValidator = state => {
    return validator.isAlpha(state.firstName)
      ? validator.isAlpha(state.lastName)
        ? validator.isEmail(state.username)
          ? validator.isMobilePhone(state.mobile, ["en-IN"])
            ? validator.isLength(state.password, { min: 8 })
              ? true
              : "Required valid Password!"
            : "Required valid Mobile!"
          : "Required valid Email!"
        : "Required valid Last name!"
      : "Required valid First name!";
  };

  onSubmit = event => {
    event.preventDefault();
    let msg = this.stateValidator(this.state);
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      mobile: this.state.mobile,
      password: this.state.password
    };
    if (isBoolean(msg)) {
      this.props.signUp(user);
    } else {
      toast.warning(msg);
    }

    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      mobile: "",
      password: ""
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />;
    }
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={
                      this.state.firstName.length < 2 &&
                      this.state.firstName.length > 0
                    }
                    helperText={
                      this.state.firstName.length < 2 &&
                      this.state.firstName.length > 0
                        ? "Required at least 2 Characters!"
                        : " "
                    }
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={
                      this.state.lastName.length < 2 &&
                      this.state.lastName.length > 0
                    }
                    helperText={
                      this.state.lastName.length < 2 &&
                      this.state.lastName.length > 0
                        ? "Required at least 2 Characters!"
                        : " "
                    }
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    autoComplete="lname"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      this.state.username.length < 10 &&
                      this.state.username.length > 0
                    }
                    helperText={
                      this.state.username.length < 10 &&
                      this.state.username.length > 0
                        ? "Required at least 10 Characters!"
                        : " "
                    }
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="username"
                    autoComplete="email"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      this.state.mobile.length !== 10 &&
                      this.state.mobile.length !== 0
                    }
                    helperText={
                      this.state.mobile.length !== 10 &&
                      this.state.mobile.length !== 0
                        ? "Required 10 Characters!"
                        : " "
                    }
                    variant="outlined"
                    required
                    fullWidth
                    id="mobile"
                    label="Mible"
                    name="mobile"
                    type="Number"
                    autoComplete="mobile"
                    value={this.state.mobile}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      this.state.username.length < 8 &&
                      this.state.username.length > 0
                    }
                    helperText={
                      this.state.password.length < 8 &&
                      this.state.username.length > 0
                        ? "Required at least 8 Characters!"
                        : " "
                    }
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.userss.isAuthenticated
});

export default connect(mapStateToProps)(withStyles(useStyles)(SignUp));
