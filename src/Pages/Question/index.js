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
import { fetchQuestionById, deleteQuestion, closeQuestion } from "../../store/actions/questionActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "underscore";
import Chip from "@material-ui/core/Chip";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloseIcon from '@material-ui/icons/Close';


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
});

class Question extends Component {
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
        name: "Title",
        label: "Title",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (question, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1ac6ff" }}>
                <Tooltip placement="right" title="View Question" aria-label="add">
                  <Link to={"/App/ViewQuestion"} onClick={() => { this.props.fetchQuestionById(question[1]) }} style={{ color: "#1ac6ff" }}>
                    {question[0]}
                  </Link>
                </Tooltip>
              </span>
            );
          }
        },
      },
      {
        name: "Votes",
        label: "Votes",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Status",
        label: "Status",
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
          customBodyRender: (questionId, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1e9ff2" }}>
                <Tooltip title="Delete Question">
                  <IconButton size="small" onClick={() => { this.props.deleteQuestion(questionId) }}>
                    <DeleteOutlineOutlinedIcon
                      style={{ color: "#F44336" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close Question">
                  <IconButton size="small" onClick={() => { this.props.closeQuestion(questionId) }}>
                    <CloseIcon
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
        filename: "AllEvents.csv",
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
          search: "Search by Question Id",
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
              <Typography variant="h5">All Questions</Typography>
            </div>
          </div>

          <MUIDataTable
            data={this.props.allQuestions.map((question) => {
              return {
                "Title": [question.title, question._id],
                "Votes": question.votes,
                "Status": question.status,
                "Actions": question._id
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
Question.propTypes = {
  allQuestions: PropTypes.array,
  fetchQuestionById: PropTypes.func,
  deleteQuestion: PropTypes.func,
  closeQuestion: PropTypes.func
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  allQuestions: state.question.allQuestions,
});

export default connect(mapStateToProps, { fetchQuestionById, deleteQuestion, closeQuestion })(
  withStyles(styles)(Question)
);
