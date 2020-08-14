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
import { addCourse } from "../../store/actions/courseActions";
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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toast } from "react-toastify";


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

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      createdBy: "",
      createrDetails: "",
      prefix: "",
      numberOfVideos: 1,
      videosList: [{ title: "", description: "" }]
    };
    this.validator = new SimpleReactValidator();
  }

  videosList = () => (
    this.state.videosList.map((x, i) => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <FormControl fullWidth margin="none">
            <MyTextField
              value={x.title}
              id="title"
              required
              label="Title"
              name="title"
              onChange={e => this.handleInputChange(e, i)}
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
                "Video Title",
                x.title,
                "required|min:2|max:100"
              )}
            />
          </FormControl>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="none">
            <MyTextField
              value={x.description}
              id="description"
              label="Video Description"
              required
              multiline
              rows="5"
              name="description"
              onChange={e => this.handleInputChange(e, i)}
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
                "Video Description",
                x.description,
                "required|min:2|max:2000"
              )}
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    ))
  )

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if ((event.target.name == 'numberOfVideos') && (event.target.value < 20)) {
      this.handleAddChange(event.target.value)
    } else if ((event.target.name == 'numberOfVideos')) {
      toast.success("Successfully UnPublished!");
      this.setState({
        numberOfVideos: 1,
      });
    }
  };

  // handle input change
  handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.videosList];
    list[index][name] = value;
    this.setState({
      videosList: list,
    });
  };

  // handle change event of the Add button
  handleAddChange = (number) => {
    let newVideosList = [...this.state.videosList]
    for (let index = 0; index < number - 1; index++) {
      newVideosList = [...newVideosList, { title: "", description: "" }]
    }
    this.setState({
      videosList: [...newVideosList],
    });
  };

  ResetForm = () => {
    this.setState({
      title: "",
      description: "",
      createdBy: "",
      createrDetails: "",
      prefix: "",
      numberOfVideos: 1,
      videosList: [{ title: "", description: "" }]

    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const course = {
        title: this.state.title,
        description: this.state.description,
        createdBy: this.state.createdBy,
        createrDetails: this.state.createrDetails,
        prefix: this.state.prefix,
        numberOfVideos: this.state.numberOfVideos,
        videosList: this.state.videosList,
      };
      this.props.addCourse(course);
      this.ResetForm();
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
                          Post Course
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
                      <OndemandVideoIcon />
                      <Typography color="secondary" variant="subtitle1">
                        Video Details
                      </Typography>
                    </div>
                    <hr />
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
                          "Video Title",
                          this.state.title,
                          "required|min:2|max:100"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.prefix}
                        id="prefix"
                        required
                        label="Video Prefix"
                        name="prefix"
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
                          "Video prefix",
                          this.state.prefix,
                          "required|min:1|max:100"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={6} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.numberOfVideos}
                        id="numberOfVideos"
                        required
                        label="Number Of Videos"
                        name="numberOfVideos"
                        onChange={this.onChange}
                        size="small"
                        variant="standard"
                        type="number"
                        inputProps={{
                          minLength: 1,
                          maxLength: 2,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={this.validator.message(
                          "NumberOfVideos",
                          this.state.numberOfVideos,
                          "required|min:1,num|max:20,num"
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        value={this.state.description}
                        id="description"
                        label="Video Description"
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
                          "Video Description",
                          this.state.description,
                          "required|min:2|max:2000"
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

                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      {this.videosList()}
                    </FormControl>
                  </Grid>

                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllCourses">
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
AddCourse.propTypes = {
  addCourse: PropTypes.func,
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  // video: state.video.video,
});

export default connect(mapStateToProps, { addCourse })(withStyles(styles)(AddCourse));
