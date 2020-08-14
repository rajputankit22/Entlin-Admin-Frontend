import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import "react-circular-progressbar/dist/styles.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import EventIcon from '@material-ui/icons/Event';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CastForEducationOutlinedIcon from '@material-ui/icons/CastForEducationOutlined';
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Avatar, CardHeader, Button } from "@material-ui/core";
import classNames from "classnames";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import CountUp from "react-countup";
import _ from "underscore";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import { FaRupeeSign } from "react-icons/fa";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';


const styles = (theme) => ({
  TopBar: {
    padding: "2% 0",
    display: "flex",
    "& div": {
      display: "flex",
      flex: 1,
    },
    "& button": {
      borderRadius: "50px",
    },
    "& h5": {
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#464855",
      padding: "6px 24px 8px 0",
      margin: "0 24px 0 0",
    },
    "& h6": {
      margin: "1% 0",
      fontWeight: "400",
      color: "rgb(30, 159, 242)",
    },
  },
  red: {
    backgroundColor: "#ff7158",
  },
  orange: {
    backgroundColor: "#ffb346",
  },
  blue: {
    backgroundColor: "#1ac6ff",
  },
  blue2: {
    backgroundColor: "#1167b0",
  },
  darkblue: {
    backgroundColor: "#075065",
  },
  green: {
    backgroundColor: "#089a08",
  },
  tile: {
    padding: "0%",
    "& .MuiCardHeader-title": {
      color: "#fff",
      fontSize: "1.2rem",
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "2.5rem",
      lineHeight: "1.1",
      color: "#fff",
      fontWeight: "bold",
    },
  },
  avatar: {
    width: "auto",
    height: "auto",
    background: "transparent",
    "& svg": {
      color: "#fff",
      fontSize: "5.5rem",
    },
  },
  tile2: {
    padding: "8% 9%",
    "& h6": {
      color: "#467e94",
      fontSize: "1.2rem",
    },
    "& h4": {
      fontSize: "2.5rem",
      lineHeight: "1.1",
      color: "#6ba1b7",
      fontWeight: "bold",
    },
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: {
        answersCount: 0,
        coursesCount: 0,
        employeesCount: 0,
        eventsCount: 0,
        mentorsCount: 0,
        questionsCount: 0,
        registrationsCount: 0,
        studentsCount: 0,
        videosCount: 0
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.dashboardData);
    this.setState({
      dashboardData: { ...nextProps.dashboardData },
    });
  }

  render() {
    // console.log({{ this.state.dashboardData.studentsCount }})
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.TopBar}>
          <div>
            <Typography variant="h5">Dashboard</Typography>
          </div>
        </div>
        <Grid container spacing={3}>
          {/* First Row */}
          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <PeopleOutlineIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.studentsCount === "undefined" ? 0 : this.state.dashboardData.studentsCount}
                  />
                }
                title="Students"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue2)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <PeopleAltOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.mentorsCount === "undefined" ? 0 : this.state.dashboardData.mentorsCount}
                  />
                }
                title="Mentors"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.red)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <GroupAddOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.employeesCount === "undefined" ? 0 : this.state.dashboardData.employeesCount}
                  />
                }
                title="Employees"
              />
            </Paper>
          </Grid>
          {/* Second Row */}
          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.red)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <CastForEducationOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.coursesCount === "undefined" ? 0 : this.state.dashboardData.coursesCount}
                  />
                }
                title="Courses"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <VideoLibraryIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.videosCount === "undefined" ? 0 : this.state.dashboardData.videosCount}
                  />
                }
                title="Videos"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue2)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <QuestionAnswerOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.questionsCount === "undefined" ? 0 : this.state.dashboardData.questionsCount}
                  />
                }
                title="Questions"
              />
            </Paper>
          </Grid>
          {/* Third Row */}
          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue2)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <EventIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.eventsCount === "undefined" ? 0 : this.state.dashboardData.eventsCount}
                  />
                }
                title="Events"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.red)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <EventSeatOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.registrationsCount === "undefined" ? 0 : this.state.dashboardData.registrationsCount}
                  />
                }
                title="Registrations"
              />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={8}
              className={classNames(classes.tile, classes.blue)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <QuestionAnswerOutlinedIcon />
                  </Avatar>
                }
                subheader={
                  <CountUp
                    duration={10}
                    start={0}
                    end={typeof this.state.dashboardData.answersCount === "undefined" ? 0 : this.state.dashboardData.answersCount}
                  />
                }
                title="Answers"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Typechecking With PropTypes
Dashboard.propTypes = {
  dashboardData: PropTypes.object
};

const mapStateToProps = (state) => ({
  dashboardData: state.home.dashboardDetails.counts,
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
