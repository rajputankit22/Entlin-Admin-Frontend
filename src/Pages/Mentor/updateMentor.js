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
import { fetchMentorById, updateProfile } from "../../store/actions/mentorActions";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from 'moment'
import SimpleReactValidator from "simple-react-validator";


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

class EditMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "higerEducations": ["MCA", "MSC", "BSC"],
      "mentorId": "",
      "skills": [],
      "mentorName": "",
      "email": "",
      "mobile": "",
      "dob": "",
      "totalExperience": "",
      "higerEducation": "",
      "currentlyWorking": "",
      "aboutMe": "",
      "address": "",
      "city": "",
      "pin": "",
      "state": "",
      "dropKey": 0,
      "newSkills": ["Nodejs", "ReactJs", "Android", "Java", "Python"]
    };
    this.validator = new SimpleReactValidator();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    console.log("Employee", nextProps)
    this.setState({
      "mentorId": nextProps.mentor._id,
      "skills": nextProps.mentor.skills,
      "mentorName": nextProps.mentor.mentorName,
      "email": nextProps.mentor.email,
      "mobile": nextProps.mentor.mobile,
      "dob": moment(nextProps.mentor.dob).format("YYYY-MM-DD"),
      "totalExperience": nextProps.mentor.totalExperience,
      "higerEducation": nextProps.mentor.higerEducation,
      "currentlyWorking": nextProps.mentor.currentlyWorking,
      "aboutMe": nextProps.mentor.aboutMe,
      ...nextProps.mentor.address,
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  ResetForm = () => {
    this.setState({
      "mentorId": "",
      "skills": [],
      "mentorName": "",
      "email": "",
      "mobile": "",
      "dob": "",
      "totalExperience": "",
      "higerEducation": "",
      "currentlyWorking": "",
      "aboutMe": "",
      "address": "",
      "city": "",
      "pin": "",
      "state": "",
    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const mentor = {
        "skills": this.state.skills,
        "mentorName": this.state.mentorName,
        "email": this.state.email,
        "mobile": this.state.mobile,
        "dob": this.state.dob,
        "totalExperience": this.state.totalExperience,
        "higerEducation": this.state.higerEducation,
        "currentlyWorking": this.state.currentlyWorking,
        "aboutMe": this.state.aboutMe,
        "address": {
          "address": this.state.address,
          "city": this.state.city,
          "pin": this.state.pin,
          "state": this.state.state
        }
      };
      this.props.updateProfile(mentor, this.state.mentorId);
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
                          Mentor Update Form
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
                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <PersonOutlineIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Personal Info
                      </Typography>
                    </div>
                    <hr />
                  </Grid>
                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        variant="standard"
                        value={this.state.mentorName}
                        id="mentorName"
                        type="text"
                        label="Mentor Name"
                        name="mentorName"
                        onChange={this.onChange}
                        size="small"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Mentor Name",
                          this.state.mentorName,
                          "required|min:2|max:50|alpha_space"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.dob}
                        id="dob"
                        type="date"
                        label="Date of Birth"
                        name="dob"
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
                          "Date of Birth",
                          this.state.dob,
                          "required"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <CallOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Contact Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.email}
                        id="email"
                        label="Email Id"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Email",
                          this.state.email,
                          "required|min:2|max:100|email"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.mobile}
                        id="mobile"
                        label="Mobile Number"
                        name="mobile"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 10,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Phone Number",
                          this.state.mobile,
                          "required|phone|max:10"
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
                    <FormControl required fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Higer Education
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="higerEducation"
                        name="higerEducation"
                        value={this.state.higerEducation}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.higerEducations.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.currentlyWorking}
                        id="currentlyWorking"
                        label="Currently Working"
                        name="currentlyWorking"
                        type="currentlyWorking"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 50,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.Grid} xs={12} sm={6} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.totalExperience}
                        id="totalExperience"
                        label="Total Experience"
                        name="totalExperience"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          maxLength: 2,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Total Experience",
                          this.state.totalExperience,
                          "required|numeric|min:0,num|max:50,num"
                        )}
                      />
                    </FormControl>
                  </Grid>


                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <Autocomplete
                        multiple
                        id="skills"
                        name="skills"
                        value={this.state.skills}
                        loadingText="Loading…"
                        options={this.state.newSkills}
                        getOptionLabel={option => option}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            this.setState({
                              skills: []
                            });
                          } else {
                            this.setState({
                              skills: newValue
                            });
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Select Skills"
                            placeholder="Skills"
                          />
                        )}
                        helperText={this.validator.message(
                          "Skills",
                          this.state.skills,
                          "required|array"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <FeaturedPlayListOutlinedIcon />
                      <Typography color="secondary" variant="subtitle1">
                        About Mentor
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.aboutMe}
                        id="aboutMe"
                        multiline
                        rows="5"
                        name="aboutMe"
                        onChange={this.onChange}
                        size="small"
                        variant="outlined"
                        inputProps={{
                          maxLength: 2000
                        }}
                        helperText={this.validator.message(
                          "About Mentor",
                          this.state.aboutMe,
                          "required|min:2|max:2000"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllMentors">
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
EditMentor.propTypes = {
  fetchMentorById: PropTypes.func,
  updateProfile: PropTypes.func,
  mentor: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  mentor: state.mentor.mentor,
});

export default connect(mapStateToProps, {
  fetchMentorById,
  updateProfile,
})(withStyles(styles)(EditMentor));
