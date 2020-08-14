import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import { updateProfile, fetchEmployeeById } from "../../store/actions/adminActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import _ from "underscore";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

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
  SubmitBtn: {
    marginRight: "1%",
  },
});

class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      employeeId: "",
      adminAccess: false
    };
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      empId: nextProps.employeeData._id,
      FirstName: nextProps.employeeData.firstName,
      LastName: nextProps.employeeData.lastName,
      Email: nextProps.employeeData.email,
      Mobile: nextProps.employeeData.mobile,
      employeeId: nextProps.employeeData.employeeId,
      ...nextProps.employeeData.ACL,
    });
  }

  onChange = (event) => {
    if (event.target.name === "ACL") {
      if (event.target.value === "AdminAccess") {
        this.setState({
          adminAccess: true,
          hodAccess: false,
          employeeAccess: false,
        });
      } else if (event.target.value === "HODAccess") {
        this.setState({
          adminAccess: false,
          hodAccess: true,
          employeeAccess: false,
        });
      } else if (event.target.value === "EmployeeAccess") {
        this.setState({
          adminAccess: false,
          hodAccess: false,
          employeeAccess: true,
        });
      }
    } else if (event.target.name === "employeeId") {
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
    });
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    const employee = {
      _id: this.state.empId,
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      email: this.state.Email,
      mobile: this.state.Mobile,
      employeeId: this.state.employeeId
    };
    this.props.updateProfile(employee);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={0} className={classes.Paper} variant="outlined">
          <form onSubmit={this.SubmitForm}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid className={classes.Grid} xs={12} item>
                    <Toolbar className={classes.toolbar}>
                      <div className={classes.df}>
                        <Typography color="secondary" variant="h5">
                          Employee Update Form
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
                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        variant="standard"
                        value={this.state.FirstName}
                        id="FirstName"
                        type="text"
                        label="First Name"
                        name="FirstName"
                        onChange={this.onChange}
                        size="small"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.LastName}
                        id="LastName"
                        type="text"
                        label="Last Name"
                        name="LastName"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
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

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
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
                        InputLabelProps={{
                          shrink: true,
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
                        value={this.state.employeeId}
                        id="employeeId"
                        label="Employee Id"
                        name="employeeId"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 3,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Access Control Logic
                      </FormLabel>
                      <RadioGroup
                        aria-label="ACL"
                        name="ACL"
                        value={
                          this.state.adminAccess
                            ? "AdminAccess"
                            : this.state.hodAccess
                              ? "HODAccess"
                              : this.state.employeeAccess
                                ? "EmployeeAccess"
                                : "EmployeeAccess"
                        }
                        onChange={this.onChange}
                      >
                        <FormControlLabel
                          disabled={false}
                          value="AdminAccess"
                          control={<Radio />}
                          label="Admin Access"
                        />
                        <FormControlLabel
                          disabled={true}
                          value="HODAccess"
                          control={<Radio />}
                          label="HOD Access"
                        />
                        <FormControlLabel
                          disabled={true}
                          value="EmployeeAccess"
                          control={<Radio />}
                          label="Employee Access"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllEmployees">
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
EditEmployee.propTypes = {
  fetchEmployeeById: PropTypes.func,
  updateProfile: PropTypes.func,
  employeeData: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  employeeData: state.admin.employee,
});

export default connect(mapStateToProps, {
  fetchEmployeeById,
  updateProfile,
})(withStyles(styles)(EditEmployee));
