import React, { Component } from "react";
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
import { connect } from "react-redux";
import { fetchEmployeeById } from "../../store/actions/adminActions";
import { updateEmployeeProfile } from "../../store/actions/employeeActions";

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
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  RadioLabel: {
    color: "#0e6dd2",
  },
});

class EditProfileAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      empId: "",
    };
  }

  componentDidMount() {
    var admin = JSON.parse(localStorage.getItem("User_data"));
    this.props.fetchEmployeeById(admin._id);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    console.log(nextProps.employee_data);
    this.setState({
      _id: nextProps.employee_data._id,
      FirstName: nextProps.employee_data.firstName,
      LastName: nextProps.employee_data.lastName,
      Email: nextProps.employee_data.email,
      Mobile: nextProps.employee_data.mobile,
      empId: nextProps.employee_data.employeeId,
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  ResetForm = () => {
    this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      empId: "",
    });
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      email: this.state.Email,
      mobile: this.state.Mobile,
    };
    this.props.updateEmployeeProfile(user);
    // this.fetchEmployee();
  };

  // fetchEmployee = () => {
  //   var admin = JSON.parse(localStorage.getItem("User_data"));
  //   this.props.fetchEmployeeById(admin._id);
  // };

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
                    <div className={classes.df}>
                      <Typography color="secondary" variant="h5">
                        Update Your Profile
                      </Typography>
                      {/* <Typography variant="caption">
                          The color of the component. It supports those theme
                          colors that make sense for this component.
                        </Typography> */}
                    </div>
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
                      <CallOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Employment Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.empId}
                        id="empId"
                        label="Employee Id"
                        name="empId"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
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

EditProfileAdmin.propTypes = {};

const mapStateToProps = (state) => ({
  employee_data: state.admin.employee,
});

export default connect(mapStateToProps, {
  fetchEmployeeById,
  updateEmployeeProfile,
})(withStyles(styles)(EditProfileAdmin));
