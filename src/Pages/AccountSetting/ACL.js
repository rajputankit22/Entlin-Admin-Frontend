import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { fetchAllEmployees } from "../../store/actions/employeeActions";
import {
  updateEmployeeACL,
  stopRefresh
} from "../../store/actions/employeeActions";
import Switch from "@material-ui/core/Switch";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

const styles = theme => ({
  TopBar: {
    padding: "2% 0",
    display: "flex",
    "& div": {
      display: "flex",
      flex: 1
    },
    "& h5": {
      color: "#464855",
      padding: "6px 24px 8px 0",
      margin: "0 24px 0 0",
      letterSpacing: "1px",
      borderRight: "1px solid #E4E5EC"
    },
    "& h6": {
      margin: "1% 0",
      fontWeight: "400",
      color: "rgb(30, 159, 242)"
    }
  }
});

class ACL extends Component {
  state = {
    show: false,
    confirm: false,
    employee: {
      adminId: "",
      adminAccess: false
    }
  };

  componentDidMount() {
    this.props.fetchAllEmployees();
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh) {
      this.props.fetchAllEmployees();
      this.props.stopRefresh();
    }
  }

  handleChange = id => event => {
    this.setState({
      show: true,
      employee: {
        adminId: id,
        adminAccess: event.target.checked
      }
    });
  };

  getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          light: "#63CCFF",
          main: "#1ac6ff",
          dark: "#006DB3",
          contrastText: "#fff"
        }
      },
      overrides: {
        MuiPaper: {
          elevation4: {
            boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
            padding: "2% 3% 4% 2%"
          }
        },
        MuiToolbar: {
          root: {
            paddingLeft: "0px !important",
            paddingRight: "0px !important"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            textAlign: "left",
            color: "#6b6f82",
            borderBottom: "1px solid #d5f2fb"
          }
        },
        MUIDataTableHeadCell: {
          data: {
            color: "#6b6f82",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }
        },
        MuiTableCell: {
          root: {
            borderBottom: "1px solid #d5f2fb"
          }
        },
        MUIDataTableToolbar: {
          icon: {
            color: "#6b6f82"
          }
        }
      }
    });

  render() {
    const { classes } = this.props;
    const columns = [
      {
        name: "ID",
        label: "ID",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return <span style={{ color: "#1e9ff2" }}>{value}</span>;
          }
        }
      },
      {
        name: "Email",
        label: "Email",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Mobile",
        label: "Mobile",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "ACL",
        label: "Turn ON/OFF",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <span>
                <Switch
                  color="primary"
                  checked={value.ACL === "true" ? true : false}
                  onChange={this.handleChange(value.id)}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </span>
            );
          }
        }
      }
    ];

    const options = {
      responsive: "stacked",
      rowHover: true,
      filter: false,
      print: false,
      download: false,
      viewColumns: false,
      selectableRows: "none",
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
          toolTip: "Sort"
        },
        toolbar: {
          search: "Search Employee"
        }
      },
      rowsPerPage: 10,
      pagination: true
    };
    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <div className={classes.TopBar}>
            <div>
              <SweetAlert
                show={this.state.show}
                showCancelButton
                title="Are you sure?"
                text="You want to give administrative rights to this user"
                onConfirm={() => {
                  this.setState({
                    show: false
                  });
                  this.props.updateEmployeeACL(this.state.employee);
                }}
                onCancel={() => {
                  this.setState({ show: false });
                }}
              />
              <Typography variant="h5">Manage Access Control Logic</Typography>
              <Typography variant="subtitle1">
                Total ({this.props.allEmployees.length})
              </Typography>
            </div>
            <Link to="/Admin/AddEmployee">
              <Tooltip placement="left" title="Add Employee" aria-label="add">
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Link>
          </div>
          <MUIDataTable
            data={this.props.allEmployees.map((emp, index) => {
              return {
                ID: emp.employeeId,
                Name: emp.firstName + " " + emp.lastName,
                Email: emp.email,
                Mobile: emp.mobile,
                ACL: {
                  ACL: emp.ACL.adminAccess.toString(),
                  id: emp._id
                }
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

ACL.propTypes = {};

const mapStateToProps = state => ({
  allEmployees: state.employee.allEmployees,
  refresh: state.employee.refresh
});

export default connect(mapStateToProps, {
  fetchAllEmployees,
  updateEmployeeACL,
  stopRefresh
})(withStyles(styles)(ACL));
