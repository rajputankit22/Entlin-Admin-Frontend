import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BorderColorOutlinedIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { subscriptionPayment, createSubscription, deleteSubscription } from "../../store/actions/subscriptionActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "underscore";
import Chip from "@material-ui/core/Chip";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PaymentIcon from '@material-ui/icons/Payment';
import moment from "moment";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = (theme) => ({
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
  EmpCard: {
    cursor: "pointer",
    position: "relative",
    padding: "14% 0%",
    "& h6": {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#075065",
    },
    "&:hover": {
      boxShadow:
        "0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)",
    },
  },
  avatar: {
    marginBottom: "5%",
    backgroundColor: "#1ac6ff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  EditBtn: {
    color: "#1ac6ff",
    position: "absolute",
    top: "5px",
    right: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200,
  }
});

class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      access: false,
      type: ""
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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
        name: "Subscription Id",
        label: "Subscription Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Type",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Start Time",
        label: "Start Time",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "End Time",
        label: "End Time",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Paid",
        label: "Paid",
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
          customBodyRender: (subscriptionId, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1e9ff2" }}>
                <Tooltip title="Paid Subscription">
                  <IconButton size="small" onClick={() => { this.props.subscriptionPayment(subscriptionId) }}>
                    <PaymentIcon
                      style={{ color: "#439805" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Subscription">
                  <IconButton size="small" onClick={() => { this.props.deleteSubscription(subscriptionId) }}>
                    <DeleteOutlineOutlinedIcon
                      style={{ color: "#F44336" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Tooltip>
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
        filename: "Subscriptions.csv",
        separator: ",",
      },
      textLabels: {
        body: {
          noMatch: this.state.isLoading ? (
            <CircularProgress
              style={{ margin: "2%", color: "#f46523" }}
              size={50}
            />
          ) : (
              this.state.showMessage
            ),
          toolTip: "Sort",
        },
        toolbar: {
          search: "Search by Subscription Id",
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
        <MuiThemeProvider theme={this.getMuiTheme()}>

          <div className={classes.TopBar}>
            <div>
              <Typography variant="h5">All Subscriptions</Typography>
            </div>

            {this.props.nav === "student" && (
              <>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="type"
                    id="type"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                    placement="left"
                  >
                    <MenuItem value="none" disabled>
                      Select Subscription Type
                    </MenuItem>
                    <MenuItem value={'monthly'}>Monthly</MenuItem>
                    <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                    <MenuItem value={'yearly'}>Yearly</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip placement="left" title="Create Subscription" aria-label="add" onClick={() => { this.props.createSubscription(this.state.type, this.props.student._id) }}>
                  <Fab size="small" color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </>
            )}
          </div>
          <MUIDataTable
            data={this.props.allSubscriptions.map((subscription) => {
              return {
                "Subscription Id": subscription._id,
                "Type": subscription.subscriptionType,
                "Start Time": moment(subscription.paid_timestamp).format('YYYY-MM-DD'),
                "End Time": moment(subscription.end_timestamp).format("YYYY-MM-DD"),
                "Paid": subscription._paid ? < span style={{ color: "#439805" }
                }> Yes </span> : <span style={{ color: "#F44336" }}> No</span>,
                "Actions": subscription._id
              };
            })}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

// Typechecking With PropTypes
Subscription.propTypes = {
  allSubscriptions: PropTypes.array,
  subscriptionPayment: PropTypes.func,
  deleteSubscription: PropTypes.func,
  createSubscription: PropTypes.func,
  student: PropTypes.object,
  nav: PropTypes.string,
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  allSubscriptions: state.subscription.allSubscriptions,
  student: state.student.student,
  nav: state.ui.nav,
});

export default connect(mapStateToProps, { subscriptionPayment, createSubscription, deleteSubscription })(
  withStyles(styles)(Subscription)
);
