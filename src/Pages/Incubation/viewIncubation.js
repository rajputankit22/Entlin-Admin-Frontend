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
import { getPreSignedUrl } from "../../store/actions/incubationActions";
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
import ChipInput from "material-ui-chip-input";
import HomeIcon from '@material-ui/icons/Home';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';

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

class ViewIncubation extends Component {
    // Get pre signed Url
    getPreSignedUrl = (fileName) => () => {
        this.props.getPreSignedUrl(fileName);
    };

    founderList = () => (
        _.isArray(this.props.incubation.foundersDetails)
            ? this.props.incubation.foundersDetails.map((founder) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{founder.founderName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {"Role - "} {founder.founderRole}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Typography>
                            {"Currently In - "} {founder.founderCurrentlyIn}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Typography>
                            {"Skills - "} {founder.founderSkills}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )
            ) : <h1>There is no Founder</h1>
    )

    render() {
        const address = { ...this.props.incubation.address }
        const contactsDetails = { ...this.props.incubation.contactsDetails }
        const pitchDeck = { ...this.props.incubation.pitchDeck }
        const financialPlan = { ...this.props.incubation.financialPlan }
        const student = { ...this.props.incubation.studentId }
        const { classes } = this.props;
        return (
            <Paper elevation={0} className={classes.Paper} variant="outlined">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Grid container spacing={6}>
                            <Grid className={classes.TitleGrid} xs={12} item>
                                <div>
                                    <PersonOutlineIcon />
                                    <Typography color="secondary" variant="subtitle1"> Incubation Details </Typography>
                                </div>
                                <hr />
                            </Grid>

                            <Grid className={classes.Grid} sm={8} xs={12} item>
                                <FormControl fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="h5">
                                            {this.props.incubation.startupName}
                                        </Typography>
                                    </div>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Incubation Details</Typography>
                                        <Typography className={classes.desc} variant="h6">
                                            {this.props.incubation.problemYouAreSolving}
                                        </Typography>
                                    </div>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Product Description</Typography>
                                        <Typography className={classes.desc} variant="h6">
                                            {this.props.incubation.productDescription}
                                        </Typography>
                                    </div>
                                </FormControl>

                                <FormControl required fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Financial Plan</Typography>
                                        <Typography variant="h6" >
                                            <Link onClick={this.getPreSignedUrl(financialPlan.s3FileName)}> {financialPlan.originalFileName} </Link>
                                        </Typography>
                                    </div>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Pitch Deck</Typography>
                                        <Typography variant="h6">
                                            <Link onClick={this.getPreSignedUrl(pitchDeck.s3FileName)}>   {pitchDeck.originalFileName} </Link>
                                        </Typography>
                                    </div>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <Typography variant="body1">Address</Typography>
                                    <div className={classes.address}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <HomeIcon
                                                        style={{ color: "#075065" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={address.address}
                                            title="Address"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <LocationCityIcon
                                                        style={{ color: "#075065" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={address.city}
                                            title="City"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <PinDropIcon
                                                        style={{ color: "#075065" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={address.state}
                                            title="State"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <PinDropIcon
                                                        style={{ color: "#075065" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={address.pin}
                                            title="Pincode"
                                        />

                                    </div>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <div className={classes.fields}>
                                        <Typography variant="body1">Founders' List</Typography>
                                    </div>
                                    <div>
                                        {this.founderList()}
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
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <PersonIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={contactsDetails.name}
                                        title="Contact Person Name"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EmailIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={contactsDetails.role}
                                        title="Role"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EmailIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={contactsDetails.email}
                                        title="Email Id"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <PhoneIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={contactsDetails.mobile}
                                        title="Mobile"
                                    />
                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EmailIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={this.props.incubation.typeOfRegistration}
                                        title="Type Of Registration"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <ScheduleIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={this.props.incubation.yaerOfRegistration}
                                        title="Yaer Of Registration"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EmailIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={this.props.incubation.startupStage}
                                        title="Startup Stage"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <ScheduleIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={moment(this.props.incubation.startWorkingOnIdea).format('L HH:MM')}
                                        title="startWorkingOnIdea"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <PhoneIcon
                                                    style={{ color: "#075065" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={this.props.incubation.currentMonthlyRevenue}
                                        title="currentMonthlyRevenue"
                                    />
                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <CloudUploadOutlinedIcon
                                                    style={{ color: "#439805" }}
                                                />
                                            </Avatar>
                                        }
                                        subheader={this.props.incubation.registered ? 'Yes' : 'No'}
                                        title="Registered"
                                    />
                                    <Divider />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={moment(this.props.incubation.createdAt).format('L HH:MM')}
                                        title="Created At"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                            </Avatar>
                                        }
                                        subheader={moment(this.props.incubation.updatedAt).format('L HH:MM')}
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
ViewIncubation.propTypes = {
    incubation: PropTypes.object,
    getPreSignedUrl: PropTypes.func
};

// Map reducer's state as props
const mapStateToProps = state => ({
    incubation: state.incubation.incubation,
});

export default connect(mapStateToProps, { getPreSignedUrl })(withStyles(styles)(ViewIncubation));