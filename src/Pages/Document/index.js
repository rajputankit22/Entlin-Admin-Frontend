import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BorderColorOutlinedIcon from "@material-ui/icons/Edit";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { publishDocument, unPublishDocument, deleteDocument, fetchDocumentById } from "../../store/actions/documentActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "underscore";
import Chip from "@material-ui/core/Chip";

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

class Document extends Component {
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
          search: true,
          filter: true,
          sort: true,
          customBodyRender: (document, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1ac6ff" }}>
                <Tooltip placement="right" title="View Document" aria-label="add">
                  <Link to={"/App/ViewDocument"} onClick={() => { this.props.fetchDocumentById(document[1]) }} style={{ color: "#1ac6ff" }}>
                    {document[0]}
                  </Link>
                </Tooltip>
              </span>
            );
          }
        },
      },
      {
        name: "Published",
        label: "Published",
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
          customBodyRender: (documentId, tableMeta, updateValue) => {
            return (
              <span style={{ color: "#1e9ff2" }}>
                <Link to={"/App/UpdateDocument"} onClick={() => { this.props.fetchDocumentById(documentId) }}>
                  <Tooltip title="Update Document">
                    <IconButton size="small">
                      <BorderColorOutlinedIcon
                        style={{ color: "#1ac6ff" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Publish Document">
                  <IconButton size="small" onClick={() => { this.props.publishDocument(documentId) }}>
                    <CloudUploadOutlinedIcon
                      style={{ color: "#439805" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="UnPublish Document">
                  <IconButton size="small" onClick={() => { this.props.unPublishDocument(documentId) }}>
                    <CloudDownloadOutlinedIcon
                      style={{ color: "#ffc854" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Document">
                  <IconButton size="small" onClick={() => { this.props.deleteDocument(documentId) }}>
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
          search: "Search by Loan Id",
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
              <Typography variant="h5">All Documents</Typography>
            </div>
            <Link to="/App/AddDocument">
              <Tooltip placement="left" title="Post Document" aria-label="add">
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Link>
          </div>

          <MUIDataTable
            data={this.props.allDocuments.map((document) => {
              // console.log(video.publish)
              return {
                "Title": [document.title, document._id],
                "Published": document.publish ? 'Yes' : 'No',
                "Actions": document._id
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
Document.propTypes = {
  allDocuments: PropTypes.array,
  publishDocument: PropTypes.func,
  unPublishDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  deleteDocument: PropTypes.func
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  allDocuments: state.document.allDocuments,
});

export default connect(mapStateToProps, { publishDocument, unPublishDocument, deleteDocument, fetchDocumentById })(
  withStyles(styles)(Document)
);
