import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import { updateIncubation } from "../../store/actions/incubationActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import _ from "underscore";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SimpleReactValidator from "simple-react-validator";
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import moment from 'moment'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MyTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderColor: "#54505d",
    },
    "& label": {
      color: "#2b335e",
    },
    "& input": {
      color: "#000",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #cacfe7",
    },
  },
})(TextField);

const styles = (theme) => ({
  Paper: {
    boxShadow: "0 2px 18px 1px rgba(49,53,72,.1)",
    padding: "6% 8%",
  },
  Grid: {
    padding: "15px 24px !important",
  },
  title: {
    fontWeight: "bold",
  },
  TitleGrid: {
    padding: "50px 24px 0px 24px !important",
    "& div": {
      display: "inline-flex",
    },
    "& svg": {
      color: "#2c343b",
      marginRight: "10%",
    },
    "& h6": {
      color: "#2c343b",
      whiteSpace: "nowrap",
    },
  },
  df: {
    flex: "auto",
    "& h5": {
      color: "rgba(44, 52, 59, 0.8509803921568627)",
      fontWeight: "600",
      marginBottom: "2%",
    },
    "& span": {
      color: "#8a8f94",
      fontWeight: "600",
    },
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  SubmitBtn: {
    marginRight: "1%",
  },
});

class UpdateIncubation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'incubationId': "",
      "startupName": "",
      "typeOfRegistrationsList": ['Sole Proprietor', 'LLP', 'Partnership', 'Private Limited'],
      "typeOfRegistration": "",
      "yaerOfRegistration": "",
      "startupStage": "",
      "startupStagesList": ['Idea', 'Product Development', 'Pre-revenue(Just Launched)', 'Revenue Stage'],
      "startWorkingOnIdea": "",
      "currentMonthlyRevenue": "",
      "currentMonthlyRevenuesList": ['0', 'Under 1 lac', '1-5 Lac', 'Above 5 lac'],
      "problemYouAreSolving": "",
      "productDescription": "",
      "numberOfFounders": '',
      "numberOfFoundersList": [1, 2, 3, 4, 5]
    };
    this.validator = new SimpleReactValidator();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    console.log(nextProps)
    this.setState({
      incubationId: nextProps.incubation._id,
      startupName: nextProps.incubation.startupName,
      typeOfRegistration: nextProps.incubation.typeOfRegistration,
      yaerOfRegistration: nextProps.incubation.yaerOfRegistration,
      startupStage: nextProps.incubation.startupStage,
      startWorkingOnIdea: moment(nextProps.incubation.startWorkingOnIdea).format("YYYY-MM-DD"),
      currentMonthlyRevenue: nextProps.incubation.currentMonthlyRevenue,
      problemYouAreSolving: nextProps.incubation.problemYouAreSolving,
      productDescription: nextProps.incubation.productDescription,
      numberOfFounders: nextProps.incubation.numberOfFounders
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  ResetForm = () => {
    this.setState({
      "incubationId": "",
      "startupName": "",
      "typeOfRegistration": "",
      "yaerOfRegistration": "",
      "startupStage": "",
      "startWorkingOnIdea": "",
      "currentMonthlyRevenue": "",
      "problemYouAreSolving": "",
      "productDescription": "",
      "numberOfFounders": ''
    });
  };

  // handleDateChange = (date) => {
  //   this.setState({
  //     selectedDate: date,
  //   });
  // };

  SubmitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const incubation = {
        "typeOfRegistration": this.state.typeOfRegistration,
        "yaerOfRegistration": this.state.yaerOfRegistration,
        "startupStage": this.state.startupStage,
        "startWorkingOnIdea": this.state.startWorkingOnIdea,
        "currentMonthlyRevenue": this.state.currentMonthlyRevenue,
        "problemYouAreSolving": this.state.problemYouAreSolving,
        "productDescription": this.state.productDescription,
        "numberOfFounders": this.state.numberOfFounders
      };
      this.props.updateIncubation(incubation, this.state.incubationId);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={0} className={classes.Paper} variant="outlined">
          <form onSubmit={this.SubmitForm}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid className={classes.Grid} xs={12} item>
                    <Toolbar className={classes.toolbar}>
                      <div className={classes.df}>
                        <Typography color="secondary" variant="h5">
                          Update Incubation
                        </Typography>
                      </div>
                      <Tooltip title="Reset Form">
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          size="medium"
                          onClick={this.ResetForm}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Toolbar>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.startupName}
                        id="startupName"
                        required
                        label="Startup Name"
                        name="startupName"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          minLength: 1,
                          maxLength: 100,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Startup Name",
                          this.state.startupName,
                          "required|min:1|max:100"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.productDescription}
                        id="productDescription"
                        label="Product Description"
                        required
                        multiline
                        rows="5"
                        name="productDescription"
                        onChange={this.onChange}
                        size="small"
                        variant="outlined"
                        inputProps={{
                          minLength: 1,
                          maxLength: 100
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Product Description",
                          this.state.productDescription,
                          "required|min:1|max:100"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.problemYouAreSolving}
                        required
                        id="problemYouAreSolving"
                        label="Problem You Are Solving"
                        name="problemYouAreSolving"
                        onChange={this.onChange}
                        size="small"
                        multiline
                        rows="5"
                        variant="outlined"
                        inputProps={{
                          minLength: 2,
                          maxLength: 100,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Problem You Are Solving",
                          this.state.problemYouAreSolving,
                          "required|min:2|max:2000"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <CallOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Professional Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Type Of Registration
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="typeOfRegistration"
                        name="typeOfRegistration"
                        value={this.state.typeOfRegistration}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.typeOfRegistrationsList.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>


                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Startup Stage
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="startupStage"
                        name="startupStage"
                        value={this.state.startupStage}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.startupStagesList.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.startWorkingOnIdea}
                        id="startWorkingOnIdea"
                        type="date"
                        label="Start Working On Idea"
                        name="startWorkingOnIdea"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          max: "2020-01-01",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Start Working On Idea",
                          this.state.startWorkingOnIdea,
                          "required"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.yaerOfRegistration}
                        id="yaerOfRegistration"
                        required
                        label="Yaer Of Registration"
                        name="yaerOfRegistration"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          minLength: 4,
                          maxLength: 4,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Yaer Of Registration",
                          this.state.yaerOfRegistration,
                          "required|min:1900,num|max:2025,num"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Current Monthly Revenue
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="currentMonthlyRevenue"
                        name="currentMonthlyRevenue"
                        value={this.state.currentMonthlyRevenue}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.currentMonthlyRevenuesList.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Number Of Founders
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="numberOfFounders"
                        name="numberOfFounders"
                        value={this.state.numberOfFounders}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.numberOfFoundersList.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllIncubations">
                      <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button color="primary" type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

// Typechecking With PropTypes
UpdateIncubation.propTypes = {
  updateIncubation: PropTypes.func,
  incubation: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  incubation: state.incubation.incubation,
});

export default connect(mapStateToProps, { updateIncubation })(withStyles(styles)(UpdateIncubation));
