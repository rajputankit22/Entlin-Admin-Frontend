import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Typography, InputAdornment, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "../Footer/Copyright";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  resetPassword,
  resetPasswordFields
} from "../../store/actions/studentActions";
import LOGO from "../../Assets/images/entlinlogo.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from 'classnames'

const useStyles = theme => ({
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
    marginTop: "8px"
  },
  submit: {
    margin: "24px 0px 16px"
  },
  Bg: {
    backgroundColor: "#f4f5fa"
  },
  title: {
    color: "#075065",
  }
});

class EnterNewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      newPassword: "",
      confirmPassword: "",
      error: false,
      errorMsg: "",
      key: ""
    };
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.restPasswordFields) {
      this.setState({
        newPassword: "",
        confirmPassword: ""
      });
      this.props.resetPasswordFields();
    }
  }

  componentDidMount() {
    this.setState({
      key: this.props.match.params.key
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmPassword) {
      var data = {
        key: this.state.key,
        newPassword: this.state.newPassword
      };
      this.props.resetPassword(data);
    } else {
      this.setState({
        error: true,
        errorMsg: "Password does not match!"
      });
    }
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const { classes } = this.props;
    const btnClass = classNames(classes.paper, classes.title)
    if (this.props.passwordResetSuccessMsg) {
      return (
        <div class="alert alert-success">
          <Typography className={btnClass} component="h1" variant="h5">
            {this.props.passwordResetSuccessMsg} <br />
          </Typography>
        </div>
      )
    } else {

      return (
        <section className={classes.Bg}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <img alt="logo mobile" width={150} src={LOGO} />
              <br />
              <Typography className={classes.title} component="h1" variant="h5">
                Please enter your new password..
            </Typography>

              <form className={classes.form} onSubmit={this.onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  value={this.state.newPassword}
                  label="New Password"
                  type={this.state.showPassword ? "text" : "password"}
                  id="newPassword"
                  InputLabelProps={{ shrink: true }}
                  onChange={this.onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                              <VisibilityOff />
                            )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  error={this.state.error}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  label="Confirm Password"
                  type={this.state.showPassword ? "text" : "password"}
                  id="confirmPassword"
                  helperText={this.state.errorMsg}
                  InputLabelProps={{ shrink: true }}
                  onChange={this.onChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
              </Button>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </section>
      );
    }
  }
}

EnterNewPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  resetPasswordFields: PropTypes.func.isRequired,
  restPasswordFields: PropTypes.bool,
  passwordResetSuccessMsg: PropTypes.string
};

const mapStateToProps = state => ({
  passwordResetSuccessMsg: state.student.passwordResetSuccessMsg,
  restPasswordFields: state.student.restPasswordFields
});

export default connect(mapStateToProps, {
  resetPassword,
  resetPasswordFields
})(withStyles(useStyles)(EnterNewPassword));
