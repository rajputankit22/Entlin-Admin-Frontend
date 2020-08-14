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
import CircularProgress from "@material-ui/core/CircularProgress";
import BorderColorOutlinedIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fetchStudentById } from "../../store/actions/studentActions";
import { switchNavStudent } from "../../store/actions/uiAction";



const styles = theme => ({
    Paper: {
        boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
        padding: "6% 8%"
    },
    TopBar: {
        padding: "2% 0",
        display: "flex",
        "& div": {
            display: "flex",
            flex: 1,
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

class ViewEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: false,
        };
    }

    getMuiTheme = () =>
        createMuiTheme({
            palette: {
                primary: {
                    light: "#63CCFF",
                    main: "#1ac6ff",
                    contrastText: "#fff",
                },
                secondary: {
                    main: "#075065",
                },
            },
            overrides: {
                MuiPaper: {
                    elevation4: {
                        boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
                        padding: "2% 3% 4% 2%",
                    },
                },
                MuiToolbar: {
                    root: {
                        paddingLeft: "0px !important",
                        paddingRight: "0px !important",
                    },
                },
                MUIDataTableBodyCell: {
                    root: {
                        textAlign: "left",
                        color: "#6b6f82",
                        borderBottom: "1px solid #d5f2fb",
                    },
                },
                MUIDataTableHeadCell: {
                    data: {
                        color: "#6b6f82",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                    },
                },
                MuiTableCell: {
                    root: {
                        borderBottom: "1px solid #d5f2fb",
                    },
                },
                MUIDataTableToolbar: {
                    icon: {
                        color: "#6b6f82",
                    },
                },
            },
        });

    render() {
        const { classes } = this.props;
        const columns = [
            {
                name: "Name",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (student, tableMeta, updateValue) => {
                        return (
                            <span style={{ color: "#1ac6ff" }}>
                                <Link to={"/App/ViewStudent"} onClick={() => { this.props.fetchStudentById(student[1]); this.props.switchNavStudent() }} style={{ color: "#1ac6ff" }}>
                                    {student[0]}
                                </Link>
                            </span>
                        );
                    }
                },
            },
            {
                name: "Mobile",
                label: "Mobile",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "Email",
                label: "Email",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "Actions",
                label: "Actions",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <span style={{ color: "#1e9ff2" }}>
                                <Link to={"/App/EditStudent"} onClick={() => { this.props.fetchStudentById(value) }}>
                                    <Tooltip title="Update Profile">
                                        <IconButton size="small">
                                            <BorderColorOutlinedIcon
                                                style={{ color: "#1ac6ff" }}
                                                fontSize="inherit"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            </span>
                        );
                    }
                }
            }
        ];

        const options = {
            responsive: "stacked",
            rowHover: true,
            filter: true,
            viewColumns: true,
            selectableRows: "none",
            filterType: "dropdown",
            downloadOptions: {
                filename: "fetchAllStudents.csv",
                separator: ",",
            },
            textLabels: {
                // body: {
                //     noMatch: this.state.isLoading ? (
                //         <CircularProgress
                //             style={{ margin: "2%", color: "#f46523" }}
                //             size={50}
                //         />
                //     ) : (
                //             this.state.showMessage
                //         ),
                //     toolTip: "Sort",
                // },
                toolbar: {
                    search: "Search by Student Id",
                    downloadCsv: "Download CSV file",
                    print: "Print",
                    viewColumns: "View Columns",
                    filterTable: "Filter Table",
                },
            },
            rowsPerPage: 10,
            pagination: true,
        };
        return (
            <div>
                <Paper elevation={0} className={classes.Paper} variant="outlined">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid className={classes.TitleGrid} xs={12} item>
                                    <div>
                                        <PersonOutlineIcon />
                                        <Typography color="secondary" variant="subtitle1"> Event Details </Typography>
                                    </div>
                                    <hr />
                                </Grid>

                                <Grid className={classes.Grid} sm={8} xs={12} item>
                                    <FormControl fullWidth margin="normal">
                                        <div className={classes.fields}>
                                            <Typography variant="h5">
                                                {this.props.event.title}
                                            </Typography>
                                        </div>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <div className={classes.fields}>
                                            <Typography variant="body1">Event Details</Typography>
                                            <Typography className={classes.desc} variant="h6">
                                                {this.props.event.description}
                                            </Typography>
                                        </div>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <div className={classes.fields}>
                                            <Typography variant="body1">Creater Details</Typography>
                                            <Typography className={classes.desc} variant="h6">
                                                {this.props.event.createrDetails}
                                            </Typography>
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
                                            subheader={this.props.event.createdBy}
                                            title="Created By"
                                        />
                                        <Divider />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <MoneyIcon
                                                        style={{ color: "#439805" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={this.props.event.price}
                                            title="Points"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <AttachMoneyIcon
                                                        style={{ color: "#439805" }}
                                                    />
                                                </Avatar>
                                            }
                                            subheader={this.props.event.points}
                                            title="Price"
                                        />
                                        <Divider />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <EventIcon style={{ color: "#075065" }} />
                                                </Avatar>
                                            }
                                            subheader={moment(this.props.event.startTime).format('L HH:MM')}
                                            title="Date & Time"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <ScheduleIcon style={{ color: "#075065" }} />
                                                </Avatar>
                                            }
                                            subheader={this.props.event.duration}
                                            title="Duration"
                                        />
                                        <Divider />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                                </Avatar>
                                            }
                                            subheader={moment(this.props.event.createdAt).format('L HH:MM')}
                                            title="Created At"
                                        />
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.statusAvatar} >
                                                    <EventAvailableOutlinedIcon style={{ color: "#075065" }} />
                                                </Avatar>
                                            }
                                            subheader={moment(this.props.event.updatedAt).format('L HH:MM')}
                                            title="Updated At"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <div>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <div className={classes.TopBar}>
                            <div>
                                <Typography variant="h5">Registered Students</Typography>
                            </div>
                        </div>

                        <MUIDataTable
                            data={this.props.registrations.map((student) => {
                                return {
                                    "Name": [student.studentId.studentName, student.studentId._id],
                                    "Mobile": student.studentId.mobile,
                                    "Email": student.studentId.email,
                                    "Actions": student.studentId._id
                                };
                            })}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

// Typechecking With PropTypes
ViewEvent.propTypes = {
    event: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = state => ({
    event: state.event.event,
    registrations: state.event.registrations,
});

export default connect(mapStateToProps, { fetchStudentById, switchNavStudent })(withStyles(styles)(ViewEvent));