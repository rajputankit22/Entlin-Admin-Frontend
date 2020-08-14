import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { connect } from "react-redux";
import { switchNavMain } from "../store/actions/uiAction";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import PortraitOutlinedIcon from "@material-ui/icons/PortraitOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import BallotOutlinedIcon from "@material-ui/icons/BallotOutlined";
import EventIcon from '@material-ui/icons/Event';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import CastForEducationOutlinedIcon from '@material-ui/icons/CastForEducationOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { fetchAllCourses } from "../store/actions/courseActions";
import { fetchAllStudents } from "../store/actions/studentActions";
import { fetchAllMentors } from "../store/actions/mentorActions";
import { fetchAllEmployees } from "../store/actions/adminActions";
import { fetchAllVideos } from "../store/actions/videoActions";
import { fetchAllEvents } from "../store/actions/eventActions";
import { fetchAllQuestions, fetchSingleStudentQuestions } from "../store/actions/questionActions";
import { fetchAllAnswers, fetchSingleStudentAnswers, fetchSingleMentorAnswers } from "../store/actions/answerActions";



const useStyles = makeStyles((theme) => ({
  NavList: {
    transition: "all 0.3s ease",
    margin: "0px",
    "& a": {
      "& .MuiListItemIcon-root": {
        minWidth: "38px",
      },
      "& svg": {
        transition: "all 0.3s ease",
      },
      "& span": {
        whiteSpace: "nowrap",
        transition: "all 0.3s ease",
      },
      textDecoration: "none",
      "&:hover": {
        "& .MuiListItem-root": {
          background: "transparent",
        },
        textDecoration: "none",
        "& svg": {
          marginLeft: "5px",
        },
        "& span": {
          marginLeft: "5px",
        },
      },
    },
    "& .MuiListItem-root": {
      margin: "3% 0%",
      transition: "all 0.3s ease",
      borderRadius: "0px",
    },
    "& .Mui-selected": {
      background: "#075065",
      borderRadius: "0px",
      "& span": {
        color: "#fff",
        fontWeight: "700",
      },
      "& svg": {
        color: "#fff",
        fontWeight: "700",
      },
      "&:hover": {
        background: "#075065 !important",
        "& svg": {
          marginLeft: "0px",
        },
        "& span": {
          marginLeft: "0px",
        },
      },
    },
  },
}));

function NavList(props) {
  const classes = useStyles();

  const switchToLoanNav = () => {
    props.switchNavLoan();
  };

  return (
    <>
      {props.nav === "main" && (
        <List className={classes.NavList}>

          <Link to="/App/Dashboard">
            <ListItem selected={props.pathname === "/App/Dashboard" ? true : false} button >
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllStudents() }} to="/App/AllStudents">
            <ListItem selected={props.pathname === "/App/AllStudents" ? true : false} button >
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllMentors() }} to="/App/AllMentors">
            <ListItem selected={props.pathname === "/App/AllMentors" ? true : false} button >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Mentors" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllEvents() }} to="/App/AllEvents">
            <ListItem selected={props.pathname === "/App/AllEvents" ? true : false} button >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllVideos() }} to="/App/AllVideos">
            <ListItem selected={props.pathname === "/App/AllVideos" ? true : false} button >
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllCourses() }} to="/App/AllCourses" >
            <ListItem selected={props.pathname === "/App/AllCourses" ? true : false} button >
              <ListItemIcon>
                <CastForEducationOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllAnswers() }} to="/App/AllAnswers">
            <ListItem selected={props.pathname === "/App/AllAnswers" ? true : false} button >
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Answers" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllQuestions() }} to="/App/AllQuestions">
            <ListItem selected={props.pathname === "/App/AllQuestions" ? true : false} button >
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchAllEmployees() }} to="/App/AllEmployees">
            <ListItem selected={props.pathname === "/App/AllEmployees" ? true : false} button >
              <ListItemIcon>
                <GroupAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
          </Link>

        </List>
      )}

      {props.nav === "student" && (
        <List className={classes.NavList}>
          <Link onClick={() => { props.switchNavMain() }} to="/App/Dashboard">
            <ListItem button>
              <ListItemIcon>
                <ArrowBackOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Back" />
            </ListItem>
          </Link>

          <Link to="/App/ViewStudent">
            <ListItem selected={props.pathname === "/App/ViewStudent" ? true : false} button >
              <ListItemIcon>
                <BallotOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchSingleStudentQuestions(props.student._id) }} to="/App/AllQuestions">
            <ListItem selected={props.pathname === "/App/AllQuestions" ? true : false} button >
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchSingleStudentAnswers(props.student._id) }} to="/App/AllAnswers">
            <ListItem selected={props.pathname === "/App/AllAnswers" ? true : false} button >
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Answers" />
            </ListItem>
          </Link>
        </List>
      )}

      {props.nav === "mentor" && (
        <List className={classes.NavList}>
          <Link onClick={() => { props.switchNavMain() }} to="/App/Dashboard">
            <ListItem button>
              <ListItemIcon>
                <ArrowBackOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Back" />
            </ListItem>
          </Link>

          <Link to="/App/ViewMentor">
            <ListItem selected={props.pathname === "/App/ViewMentor" ? true : false} button >
              <ListItemIcon>
                <BallotOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Mentor Details" />
            </ListItem>
          </Link>

          <Link onClick={() => { props.fetchSingleMentorAnswers(props.mentor._id) }} to="/App/AllAnswers">
            <ListItem selected={props.pathname === "/App/AllAnswers" ? true : false} button >
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Answers" />
            </ListItem>
          </Link>
        </List>
      )}
    </>
  );
}

// Typechecking With PropTypes
NavList.propTypes = {
  nav: PropTypes.string,
  student: PropTypes.object,
  mentor: PropTypes.object,
  switchNavMain: PropTypes.func,
  fetchAllCourses: PropTypes.func,
  fetchAllStudents: PropTypes.func,
  fetchAllMentors: PropTypes.func,
  fetchAllEmployees: PropTypes.func,
  fetchAllVideos: PropTypes.func,
  fetchAllEvents: PropTypes.func,
  fetchAllQuestions: PropTypes.func,
  fetchSingleStudentQuestions: PropTypes.func,
  fetchAllAnswers: PropTypes.func,
  fetchSingleStudentAnswers: PropTypes.func,
  fetchSingleMentorAnswers: PropTypes.func
};


// Map reducer's state as props
const mapStateToProps = (state) => ({
  nav: state.ui.nav,
  student: state.student.student,
  mentor: state.mentor.mentor
});

export default connect(mapStateToProps, { switchNavMain, fetchAllCourses, fetchAllStudents, fetchAllMentors, fetchAllEmployees, fetchAllVideos, fetchAllEvents, fetchAllQuestions, fetchSingleStudentQuestions, fetchAllAnswers, fetchSingleStudentAnswers, fetchSingleMentorAnswers })(NavList);
