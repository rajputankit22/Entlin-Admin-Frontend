import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { addEmployee } from "../../store/actions/adminActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import _ from "underscore";
import FormHelperText from "@material-ui/core/FormHelperText";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MyTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderColor: "#54505d",
    },
    "& label": {
      color: "#2b335e",
    },
    "& input": {
      color: "#000",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #cacfe7",
    },
  },
})(TextField);

const styles = (theme) => ({
  Paper: {
    boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
    padding: "6% 8%",
  },
  Grid: {
    padding: "15px 24px !important",
  },
  title: {
    fontWeight: "bold",
  },
  TitleGrid: {
    padding: "50px 24px 0px 24px !important",
    "& div": {
      display: "inline-flex",
    },
    "& svg": {
      color: "#2c343b",
      marginRight: "10%",
    },
    "& h6": {
      color: "#2c343b",
      whiteSpace: "nowrap",
    },
  },
  df: {
    flex: "auto",
    "& h5": {
      color: "rgba(44, 52, 59, 0.8509803921568627)",
      fontWeight: "600",
      marginBottom: "2%",
    },
    "& span": {
      color: "#8a8f94",
      fontWeight: "600",
    },
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  RadioLabel: {
    color: "#0e6dd2",
  },
  CancelBtn: {
    marginRight: "1%",
  },
});

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Password: "",
      employeeId: "",
      ConfirmPassword: "",
    };
  }

  componentDidMount() {
    var admin = JSON.parse(localStorage.getItem("User_data"));
    if (admin) {
      this.setState({
        oneAllow: admin.ACL.adminAccess,
        twoAllow: admin.ACL.hodAccess,
        threeAllow: admin.ACL.employeeAccess,
      });
    }
  }

  onChange = (event) => {
    if (event.target.name === "employeeId") {
      if (event.target.value.length < 4) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  ResetForm = () => {
    this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Password: "",
      employeeId: "",
      ConfirmPassword: "",
      passError: false,
      passErrorText: "",
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.ConfirmPassword !== this.state.Password) {
      this.setState({
        passError: true,
        passErrorText: "Password does not match!",
      });
    } else {
      const user = {
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        email: this.state.Email,
        password: this.state.Password,
        employeeId: this.state.employeeId,
        mobile: this.state.Mobile,
      };
      this.props.addEmployee(user);
      this.ResetForm();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={0} className={classes.Paper} variant="outlined">
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid className={classes.Grid} xs={12} item>
                    <Toolbar className={classes.toolbar}>
                      <div className={classes.df}>
                        <Typography color="secondary" variant="h5">
                          Employee Registration Form
                        </Typography>
                      </div>
                      <Tooltip title="Reset Form">
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          size="medium"
                          onClick={this.ResetForm}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Toolbar>
                  </Grid>
                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <PersonOutlineIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Personal Info
                      </Typography>
                    </div>
                    <hr />
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        variant="standard"
                        required
                        value={this.state.FirstName}
                        id="FirstName"
                        label="First Name"
                        name="FirstName"
                        onChange={this.onChange}
                        size="small"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        required
                        value={this.state.LastName}
                        id="LastName"
                        label="Last Name"
                        name="LastName"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <CallOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Contact Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        required
                        value={this.state.Email}
                        id="Email"
                        label="Email Id"
                        name="Email"
                        type="email"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        required
                        value={this.state.Mobile}
                        id="Mobile"
                        label="Mobile Number"
                        name="Mobile"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 10,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <FeaturedPlayListOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Onboarding Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        required
                        value={this.state.employeeId}
                        id="employeeId"
                        label="Employee Id"
                        type="number"
                        name="employeeId"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          min: 0,
                          max: 999,
                          pattern: "d*",
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <LockOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Password Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        required
                        value={this.state.Password}
                        id="Password"
                        label="Password"
                        name="Password"
                        type="password"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        error={this.state.passError}
                        required
                        value={this.state.ConfirmPassword}
                        id="ConfirmPassword"
                        label="Confirm Password"
                        name="ConfirmPassword"
                        type="password"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        helperText={this.state.passErrorText}
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.CancelBtn} to="/App/AllEmployees">
                      <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button color="primary" type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

// Typechecking With PropTypes
AddEmployee.propTypes = {
  addEmployee: PropTypes.func
};

// Map reducer's state as props
const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { addEmployee })(
  withStyles(styles)(AddEmployee)
);
