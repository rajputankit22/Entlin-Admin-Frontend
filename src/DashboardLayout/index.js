import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LOGO from "../Assets/images/entlinlogoSmall.png";
// import LOGO from "../Assets/images/entlinlogo.png";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link, Switch, Redirect } from "react-router-dom";
import AllEmployees from "../Pages/Employees";
import AllQuestions from "../Pages/Question";
import AllSubscriptions from "../Pages/Subscription";
import AllAnswers from "../Pages/Answer";
import AllMentors from "../Pages/Mentor";
import AllEvents from "../Pages/Event";
import AllVideos from "../Pages/Video";
import AllCourses from "../Pages/Courses";
import AddEvent from "../Pages/Event/addEvent";
import AddVideo from "../Pages/Video/addVideo";
import AddCourse from "../Pages/Courses/addCourse";
import ViewVideo from "../Pages/Video/viewVideo";
import ViewMentor from "../Pages/Mentor/viewMentor";
import ViewStudent from "../Pages/Student/viewStudent";
import ViewCourse from "../Pages/Courses/viewCourse";
import ViewEvent from "../Pages/Event/viewEvent";
import ViewQuestion from "../Pages/Question/viewQuestion";
import ViewAnswer from "../Pages/Answer/viewAnswer";
import UpdateVideo from "../Pages/Video/updateVideo";
import AddEmployee from "../Pages/Employees/addEmployee";
import ViewEmployee from "../Pages/Employees/viewEmployee";
import Dashboard from "../Pages/Dashboard";
import UpdateEmployee from "../Pages/Employees/updateEmployee";
import UpdateEvent from "../Pages/Event/updateEvent";
import EditMentor from "../Pages/Mentor/updateMentor";
import EditStudent from "../Pages/Student/updateStudent";
import AddMentor from "../Pages/Mentor/addMentor";
import AccountSetting from "../Pages/AccountSetting";
import EditProfileAdmin from "../Pages/AccountSetting/EditProfileAdmin";
import AllStudents from "../Pages/Student";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import PrivateRoute from "../helper/privateRoutes";
import Hidden from "@material-ui/core/Hidden";
import { signOut } from "../store/actions/employeeActions";
import NavList from "./navList";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { loadEmployee, refreshToken } from "../store/actions/employeeActions";
import { fetchHomeDetails } from "../store/actions/homeAction";
import { Footer } from "../Components/Footer/Footer";


const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#075065",
    color: "#000",
    boxShadow: "0 2px 30px 2px rgba(0,0,0,.1)",
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 30px 2px",
    backgroundColor: "#fff",
    width: drawerWidth,
    borderRight: "none",
    zIndex: "1000",
    "& svg": {
      color: "#075065",
    },
    "& span": {
      color: "#075065",
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },

  logo: {
    transform: "translateY(5%)",
    width: 45,
  },
  logoMobile: {
    transform: "translateY(11%)",
    margin: "6px 9px 3px 9px",
  },
  flex: {
    flexGrow: 1,
  },
  ProfileButton: {
    borderRadius: "10px",
    "& h6": {
      marginRight: "10%",
      color: "#fff",
      fontWeight: "700",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  avatar: {
    width: "30px",
    height: "30px",
    backgroundColor: "#1ac6ff",
  },
  Menu: {
    "& .MuiList-root": {
      padding: 0,
    },
    "& .MuiMenuItem-root": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
    "& .MuiListItem-root": {
      "&:hover": {
        "& svg": {
          color: "#1ac6ff",
        },
      },
    },
    "& svg": {
      marginRight: "10px",
      marginTop: "-1px",
    },
  },
  padding: {
    minHeight: "85vh",
  },
  Pages: {
    padding: theme.spacing(3),
    overflow: "auto",
    paddingBottom: "78px !important",
  },
  Footer: {
    borderTop: "1px solid #E4E7ED",
    backgroundColor: "#fff",
    boxShadow: "1px 0 20px rgba(0,0,0,.1)",
    padding: theme.spacing(2, 3),
    "& h6": {
      color: "#57656d",
    },
    "& a": {
      color: "#075065",
      fontWeight: "600",
    },
  },
  Links: {
    color: "#000",
  },
});

class PermanentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileOpen: false,
      navbarName: "",
      navbarInitial: "",
      mail: "",
    };
  }

  async componentDidMount() {
    await this.props.loadEmployee();
    await this.props.fetchHomeDetails();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    let employee = JSON.parse(localStorage.getItem("User_data"));
    if (employee) {
      this.setState({
        navbarName: employee.firstName + " " + employee.lastName,
        navbarInitial: employee.firstName.charAt(0).toUpperCase(),
        mail: employee.email,
      });
    }
    if (
      nextProps.tokenExpired &&
      nextProps.tokenExpired !== this.props.tokenExpired
    ) {
      this.props.refreshToken();
    }
  }

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  SignOut = () => {
    this.props.signOut();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Hidden className={classes.flex} xsDown implementation="css">
              <Typography variant="h6" noWrap style={{ marginLeft: 50 }}>
                <img alt="logo" className={classes.logo} src={LOGO} />
              </Typography>
            </Hidden>
            <Hidden className={classes.flex} smUp implementation="css">
              <Typography variant="h6" noWrap>
                <img
                  alt="logo mobile"
                  className={classes.logoMobile}
                  width={80}
                  src={LOGO}
                />
              </Typography>
            </Hidden>
            <Hidden xsDown implementation="css">
              <div>
                <IconButton
                  className={classes.ProfileButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  size="medium"
                >
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {this.state.navbarInitial}
                  </Avatar>
                </IconButton>
              </div>
            </Hidden>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className={classes.Menu}
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {this.state.navbarInitial}
                  </Avatar>
                }
                title={this.state.navbarName}
                subheader={this.state.mail}
              />
              <Divider />
              <Link className={classes.Links} to="/App/AccountSetting">
                <MenuItem
                  selected={
                    window.location.pathname === "/App/AccountSetting"
                      ? true
                      : false
                  }
                  onClick={this.handleClose}
                >
                  <AccountCircleOutlinedIcon fontSize="inherit" /> Account
                  Setting
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem onClick={this.SignOut}>
                <PowerSettingsNewIcon fontSize="inherit" /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              variant="temporary"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
              ModalProps={{
                keepMounted: true,
              }}
            >
              <NavList pathname={window.location.pathname} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div
                style={{
                  background: "#075065",
                  boxShadow: "0 2px 30px 2px rgba(0,0,0,.1)",
                }}
                align="center"
                className={classes.toolbar}
              >
                <img alt="logo" className={classes.logo} src={LOGO} />
              </div>
              <NavList pathname={window.location.pathname} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.padding}>
            <div className={classes.Pages}>
              <Switch>
                <PrivateRoute path="/App/Dashboard" component={Dashboard} />
                <PrivateRoute path="/App/AllEmployees" component={AllEmployees} />
                <PrivateRoute path="/App/AllQuestions" component={AllQuestions} />
                <PrivateRoute path="/App/AllSubscriptions" component={AllSubscriptions} />
                <PrivateRoute path="/App/AllAnswers" component={AllAnswers} />
                <PrivateRoute path="/App/AllMentors" component={AllMentors} />
                <PrivateRoute path="/App/AllEvents" component={AllEvents} />
                <PrivateRoute path="/App/AllVideos" component={AllVideos} />
                <PrivateRoute path="/App/AllCourses" component={AllCourses} />
                <PrivateRoute path="/App/AddEvent" component={AddEvent} />
                <PrivateRoute path="/App/AddVideo" component={AddVideo} />
                <PrivateRoute path="/App/AddCourse" component={AddCourse} />
                <PrivateRoute path="/App/UpdateVideo" component={UpdateVideo} />
                <PrivateRoute path="/App/ViewVideo" component={ViewVideo} />
                <PrivateRoute path="/App/ViewEmployee" component={ViewEmployee} />
                <PrivateRoute path="/App/ViewEvent" component={ViewEvent} />
                <PrivateRoute path="/App/ViewQuestion" component={ViewQuestion} />
                <PrivateRoute path="/App/ViewAnswer" component={ViewAnswer} />
                <PrivateRoute path="/App/ViewCourse" component={ViewCourse} />
                <PrivateRoute path="/App/ViewMentor" component={ViewMentor} />
                <PrivateRoute path="/App/ViewStudent" component={ViewStudent} />
                <PrivateRoute path="/App/AddEmployee" component={AddEmployee} />
                <PrivateRoute path="/App/AccountSetting" component={AccountSetting} />
                <PrivateRoute path="/App/EditProfileAdmin" component={EditProfileAdmin} />
                <PrivateRoute path="/App/UpdateEmployee" component={UpdateEmployee} />
                <PrivateRoute path="/App/EditMentor" component={EditMentor} />
                <PrivateRoute path="/App/EditStudent" component={EditStudent} />
                <PrivateRoute path="/App/UpdateEvent" component={UpdateEvent} />
                <PrivateRoute path="/App/AddMentor" component={AddMentor} />
                <PrivateRoute path="/App/AllStudents" component={() => <AllStudents title={`All Students`} />} />
                <PrivateRoute path="/App/TopStudents" component={() => <AllStudents title={`Top Students`} />} />
                <PrivateRoute path="/App/History" component={History} />
              </Switch>
            </div>
          </div>

          <div className={classes.Footer}>
            <Footer />
          </div>
        </main>
        {!this.props.isAuthenticated && <Redirect to="/" />}
      </div>
    );
  }
}

// Typechecking With PropTypes
PermanentDrawerLeft.propTypes = {
  isLoading: PropTypes.bool,
};

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
const mapStateToProps = (state) => ({
  isLoading: state.employee.isLoading,
  isAuthenticated: state.employee.isAuthenticated,
  tokenExpired: state.employee.tokenExpired,
});

export default connect(mapStateToProps, {
  signOut,
  loadEmployee,
  refreshToken,
  fetchHomeDetails,
})(withStyles(styles)(PermanentDrawerLeft));
