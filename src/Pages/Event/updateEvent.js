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
import { updateEvent } from "../../store/actions/eventActions";
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
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MoneyIcon from '@material-ui/icons/Money';
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

class UpdateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "",
      type: "",
      types: ['Webinar', 'Live Talk'],
      title: "",
      description: "",
      createdBy: "",
      createrDetails: "",
      startTime: "",
      duration: "",
      points: "",
      price: ""
    };
    this.validator = new SimpleReactValidator();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    console.log("event", nextProps)
    this.setState({
      eventId: nextProps.event._id,
      type: nextProps.event.type,
      title: nextProps.event.title,
      description: nextProps.event.description,
      createdBy: nextProps.event.createdBy,
      createrDetails: nextProps.event.createrDetails,
      startTime: moment(nextProps.event.startTime).format("YYYY-MM-DDTHH:MM"),
      duration: nextProps.event.duration,
      points: nextProps.event.points,
      price: nextProps.event.price
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  ResetForm = () => {
    this.setState({
      eventId: "",
      type: "",
      title: "",
      description: "",
      createdBy: "",
      createrDetails: "",
      startTime: "",
      duration: "",
      points: "",
      price: ""
    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const event = {
        title: this.state.title,
        type: this.state.type,
        description: this.state.description,
        createdBy: this.state.createdBy,
        createrDetails: this.state.createrDetails,
        startTime: this.state.startTime,
        duration: this.state.duration,
        points: this.state.points,
        price: this.state.price
      };
      this.props.updateEvent(event, this.state.eventId);
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
                          Update Event
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
                      <EventNoteIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Event Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl required fullWidth margin="none">
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Event Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="type"
                        name="type"
                        value={this.state.type}
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                      >
                        {this.state.types.map(name => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.title}
                        id="title"
                        required
                        label="Title"
                        name="title"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          minLength: 2,
                          maxLength: 100,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event Title",
                          this.state.title,
                          "required|min:2|max:100"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.description}
                        id="description"
                        label="Event Description"
                        required
                        multiline
                        rows="5"
                        name="description"
                        onChange={this.onChange}
                        size="small"
                        variant="outlined"
                        inputProps={{
                          minLength: 2,
                          maxLength: 2000
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event Description",
                          this.state.description,
                          "required|min:2|max:2000"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <ScheduleIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Time Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.startTime}
                        id="startTime"
                        required
                        type="datetime-local"
                        label="Start time"
                        name="startTime"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          max: "2022-01-01",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event Start time",
                          this.state.startTime,
                          "required"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.duration}
                        id="duration"
                        required
                        label="Duration"
                        name="duration"
                        type='number'
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          min: 2,
                          max: 120,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event duration",
                          this.state.duration,
                          "required|min:2,num|max:120,num"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <MoneyIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Point Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>

                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.points}
                        id="points"
                        required
                        label="Points"
                        name="points"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          min: 10,
                          max: 1000,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event points",
                          this.state.points,
                          "required|min:10,num|max:1000,num"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.price}
                        id="price"
                        required
                        label="Price"
                        name="price"
                        type="number"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          min: 0,
                          max: 1000,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Event price",
                          this.state.price,
                          "required|min:0,num|max:1000,num"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid className={classes.TitleGrid} xs={12} item>
                    <div>
                      <PersonOutlineIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Creator Details
                      </Typography>
                    </div>
                    <hr />
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.createdBy}
                        required
                        id="createdBy"
                        label="Created By"
                        name="createdBy"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        inputProps={{
                          minLength: 2,
                          maxLength: 100,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Created By",
                          this.state.createdBy,
                          "required|min:2|max:100|alpha_space"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.createrDetails}
                        id="createrDetails"
                        label="Creater Details"
                        required
                        multiline
                        rows="5"
                        name="createrDetails"
                        onChange={this.onChange}
                        size="small"
                        variant="outlined"
                        inputProps={{
                          minLength: 2,
                          maxLength: 2000
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "Creater Details",
                          this.state.createrDetails,
                          "required|min:2|max:2000"
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllEvents">
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
UpdateEvent.propTypes = {
  updateEvent: PropTypes.func,
  event: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  event: state.event.event,
});

export default connect(mapStateToProps, { updateEvent })(withStyles(styles)(UpdateEvent));
