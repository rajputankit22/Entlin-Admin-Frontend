import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { FormControl, Typography, Divider, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import PersonOutlineIcon from "@material-ui/icons/AssignmentOutlined";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { CardHeader, Fab } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import moment from "moment";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import { fetchAllEmployeesList } from "../../store/actions/employeeActions";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import _ from "underscore";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventIcon from '@material-ui/icons/Event';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyIcon from '@material-ui/icons/Money';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const styles = theme => ({
    Paper: {
        boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
        padding: "6% 8%"
    },
    Grid: {
        padding: "15px 24px !important"
    },
    title: {
        fontWeight: "bold"
    },
    TitleGrid: {
        padding: "40px 24px 0px 24px !important",
        "& div": {
            display: "inline-flex"
        },
        "& svg": {
            color: "#2c343b",
            marginRight: "10%"
        },
        "& h6": {
            color: "#075065",
            whiteSpace: "nowrap",
            fontWeight: "bold"
        }
    },
    df: {
        flex: "auto",
        "& h5": {
            color: "rgba(44, 52, 59, 0.8509803921568627)",
            fontWeight: "600",
            marginBottom: "2%"
        },
        "& span": {
            color: "#1ac6ff",
            fontWeight: "600"
        }
    },
    toolbar: {
        paddingLeft: "0",
        paddingRight: "0"
    },
    SubmitBtn: {
        marginRight: "1%",
        flex: 1
    },
    AssignBtn: {
        marginLeft: "1%",
        boxShadow: "none",
        "& svg": {
            color: "#fff"
        }
    },
    EscalateBtn: {
        boxShadow: "none",
        marginLeft: "1%",
        color: "#fff",
        backgroundColor: "#ff8f00",
        borderColor: "#ff8f00",
        "&:hover": {
            backgroundColor: "#ff8f00",
            borderColor: "#ff8f00"
        },
        "&:active": {
            backgroundColor: "#ff8f00",
            borderColor: "#ff8f00"
        },
        "& svg": {
            color: "#fff"
        }
    },
    CompleteBtn: {
        boxShadow: "none",
        marginLeft: "1%",
        color: "#fff",
        backgroundColor: "#439805",
        borderColor: "#439805",
        "&:hover": {
            backgroundColor: "#439805",
            borderColor: "#439805"
        },
        "&:active": {
            backgroundColor: "#439805",
            borderColor: "#439805"
        },
        "& svg": {
            color: "#fff"
        }
    },
    DeleteBtn: {
        width: "30px",
        height: "30px",
        minHeight: "30px",
        borderRadius: "5px",
        boxShadow: "none",
        marginLeft: "1%",
        color: "#fff",
        backgroundColor: "#F44336",
        borderColor: "#F44336",
        "& .MuiButton-startIcon": {
            marginRight: "0px !important"
        },
        "&:hover": {
            backgroundColor: "#F44336",
            borderColor: "#F44336"
        },
        "&:active": {
            backgroundColor: "#F44336",
            borderColor: "#F44336"
        },
        "& svg": {
            fontSize: "1rem",
            color: "#fff",
            marginRight: 0
        }
    },
    flex: {
        display: "flex"
    },
    vote: {
        paddingBottom: "2%",
        color: "#075065",
        marginRight: "3%"
    },
    table: {
        "& thead": {
            "& th": {
                fontSize: "16px",
                fontWeight: "600",
                paddingBottom: "2%",
                color: "rgba(44, 52, 59, 0.67)"
            }
        }
    },
    sideDetails: {
        paddingTop: "12%",
        "& .MuiCardHeader-title": {
            color: "#075065",
            fontSize: "0.8rem",
            marginTop: "3%"
        },
        "& .MuiCardHeader-subheader": {
            fontSize: "1rem",
            color: "#1ac6ff",
            marginBottom: "3%"
        },
        "& .MuiCardHeader-root": {
            padding: "0%"
        },
        "& hr": {
            margin: "5% 0"
        }
    },
    avatar: {
        width: "33px",
        height: "33px"
    },
    statusAvatar: {
        backgroundColor: "#fff",
        width: "33px",
        height: "33px"
    },
    ToolbarButtons: {
        margin: "2% 0%",
        display: "block !important"
    },
    fields: {
        "& h5": {
            color: "#075065",
            fontWeight: "bold"
        },
        "& p": {
            fontSize: "1rem",
            color: "#075065",
            fontWeight: "bold"
        },
        "& h6": {
            fontSize: "0.9rem",
            color: "#a2a1a1"
        }
    },
    desc: {
        marginTop: "1%",
        backgroundColor: "rgba(224, 224, 224, 0.25)",
        minHeight: "91px",
        padding: "1%",
        borderRadius: "5px"
    },
    autoCreationSwitch: {
        marginTop: "2%",
        marginLeft: "1%",
        "& .MuiTypography-root": {
            color: "#1ac6ff",
            fontSize: "14px"
        }
    },
    AssignedToCardChip: {
        margin: "2% 1% 1% 0%"
    },
    AttachmentCardChip: {
        cursor: "pointer",
        margin: "2% 1% 0% 0%"
    }
});

class ViewQuestion extends Component {
    constructor(props) {
        super(props)
    }

    answersList = () => (
        _.isArray(this.props.answers)
            ? this.props.answers.map((answer) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ color: "#ff9900", marginRight: "5%", fontWeight: "bold" }}> {answer.votes} </Typography> <Typography style={{ color: "#ff9900", marginRight: "5%", fontWeight: "bold" }}>{answer.studentId.studentName}</Typography> <Typography>{(answer.answer).slice(0, 20)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {answer.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )
            ) : <h1>There is no answer!</h1>
    )



    render() {
        const student = { ...this.props.question.studentId }
        const { classes } = this.props;
        return (
            <Paper elevation={0} className={classes.Paper} variant="outlined">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Grid container spacing={6}>
                            <Grid className={classes.TitleGrid} xs={12} item>
                                <div>
                                    <PersonOutlineIcon />
                                    <Typography color="secondary" variant="subtitle1"> Question Details </Typography>
                                </div>
                                <hr />
                            </Grid>

                            <Grid className={classes.Grid} sm={8} xs={12} item>
                                <FormControl fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="h5">
                                            {this.props.question.title}
                                        </Typography>
                                    </div>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Question Description</Typography>
                                        <Typography className={classes.desc} variant="h6">
                                            {this.props.question.detail}
                                        </Typography>
                                    </div>
                                </FormControl>

                                <FormControl required fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Answers</Typography>
                                    </div>
                                    <div>
                                        {this.answersList()}
                                    </div>
                                </FormControl>

                            </Grid>

                            <Grid className={classes.Grid} sm={4} xs={12} item>
                                <div className={classes.sideDetails}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="recipe"
                                                className={classes.avatar}
                                                src="https://image.flaticon.com/icons/svg/727/727399.svg"
                                            ></Avatar>
                                        }
                                        subheader={student.studentName}
                                        title="Created By"
                                    />
                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="recipe"
                                                className={classes.avatar}
                                                src="https://image.flaticon.com/icons/svg/727/727399.svg"
                                            ></Avatar>
                                        }
                                        subheader={
                                            this.props.question.tags &&
                                                this.props.question.tags !== 0
                                                ? this.props.question.tags.map((tag, index) => (
                                                    <Chip
                                                        className={classes.AssignedToCardChip}
                                                        key={index}
                                                        size="small"
                                                        label={tag}
                                                    />
                                                ))
                                                : "No Tags"
                                        }
                                        title="Tags"
                                    />

                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <ThumbUpIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={this.props.question.votes}
                                        title="Votes"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <ScheduleIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={this.props.question.status}
                                        title="Status"
                                    />
                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={moment(this.props.question.createdAt).format('L HH:MM')}
                                        title="Created At"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={moment(this.props.question.updatedAt).format('L HH:MM')}
                                        title="Updated At"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

// Typechecking With PropTypes
ViewQuestion.propTypes = {
    question: PropTypes.object,
    answers: PropTypes.array
};

// Map reducer's state as props
const mapStateToProps = state => ({
    question: state.question.question,
    answers: state.question.answers,
});

export default connect(mapStateToProps, {})(withStyles(styles)(ViewQuestion));