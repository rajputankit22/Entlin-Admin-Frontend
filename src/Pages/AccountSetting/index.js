import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { openPopup } from "../../store/actions/employeeActions";
import Avatar from "@material-ui/core/Avatar";
import PassWordIcon from "../../Assets/images/password.svg";
import ProfileIcon from "../../Assets/images/profile.svg";
import ChangePasswordPopup from "./ChangePasswordAdmin";

const styles = (theme) => ({
  Paper: {
    boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
    padding: "6% 8%",
  },
  orange: {
    color: theme.palette.getContrastText("#ff5722"),
    backgroundColor: "#1ac6ff",
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: "43px",
    marginBottom: "3%",
  },
  df: {
    "& h4": {
      marginBottom: "1%",
    },
    "& p": {
      color: "#6f6f6f",
    },
  },
  Tabs: {
    padding: "0 15%",
  },
  Card: {
    cursor: "pointer",
    marginBottom: "3%",
    display: "flex",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    padding: "16px",
    "& h6": {
      fontWeight: "500",
      color: "#000",
    },
    "& p": {
      color: "#5f6368",
    },
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  f1: {
    flex: "1",
  },
});

class EditProfileAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarName: "",
      navbarInitial: "",
    };
  }

  componentDidMount() {
    var admin = JSON.parse(localStorage.getItem("User_data"));
    if (admin) {
      this.setState({
        navbarName: admin.firstName + " " + admin.lastName,
        navbarInitial: admin.firstName.charAt(0).toUpperCase(),
      });
    }
  }

  handleOpenPopup = () => {
    this.props.openPopup();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ChangePasswordPopup />
        <Paper elevation={0} className={classes.Paper} variant="outlined">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid className={classes.Grid} xs={12} item>
                  <div align="center" className={classes.df}>
                    <Avatar className={classes.orange}>
                      {this.state.navbarInitial}
                    </Avatar>
                    <Typography color="secondary" variant="h4">
                      Welcome, {this.state.navbarName}
                    </Typography>
                    <Typography variant="body1">
                      Manage your info, privacy, and security in this section
                    </Typography>
                  </div>
                </Grid>
                <Grid sm={12} xs={12} item>
                  <div className={classes.Tabs}>
                    <Link to="/App/EditProfileAdmin">
                      <div className={classes.Card}>
                        <div className={classes.f1}>
                          <Typography variant="h6">Edit Profile</Typography>
                          <Typography variant="body2">
                            Basic info, like your name and photo, that you use
                            on <b>Entlin Admin</b>
                          </Typography>
                        </div>
                        <div>
                          <img alt="ProfileIcon" width={70} src={ProfileIcon} />
                        </div>
                      </div>
                    </Link>

                    <div
                      onClick={this.handleOpenPopup}
                      className={classes.Card}
                    >
                      <div className={classes.f1}>
                        <Typography variant="h6">Manage Password</Typography>
                        <Typography variant="body2">
                          Reset your password
                        </Typography>
                      </div>
                      <div>
                        <img alt="PassWordIcon" width={70} src={PassWordIcon} />
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

EditProfileAdmin.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { openPopup })(
  withStyles(styles)(EditProfileAdmin)
);
