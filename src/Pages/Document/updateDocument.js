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
import { updateDocument } from "../../store/actions/documentActions";
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
import { getPreSignedUrl } from "../../store/actions/incubationActions";


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

class UpdateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentId: "",
      title: "",
      description: "",
      originalFileName: "",
      fileName: "",
      file: ""
    };
    this.validator = new SimpleReactValidator();
  }

  // Get pre signed Url
  getPreSignedUrl = (fileName) => () => {
    this.props.getPreSignedUrl(fileName);
  };

  handleFileRead = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const base64 = await this.convertBase64(file)
      const remeovedTypeBase64 = base64.replace(/^data:[/a-z]+;base64,/, "")
      this.setState({
        originalFileName: file.name,
        file: remeovedTypeBase64,
      });
    } else {
      alert("Please select file.")
      this.setState({
        originalFileName: this.state.originalFileNameOld,
        fileName: this.state.fileNameOld
      });
    }
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      documentId: nextProps.document._id,
      title: nextProps.document.title,
      description: nextProps.document.description,
      originalFileName: nextProps.document.originalFileName,
      fileName: nextProps.document.fileName,
      originalFileNameOld: nextProps.document.originalFileName,
      fileNameOld: nextProps.document.fileName,
      file: ""
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  ResetForm = () => {
    this.setState({
      documentId: "",
      title: "",
      description: "",
      originalFileName: "",
      fileName: "",
      file: ""
    });
  };

  SubmitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const document = {
        title: this.state.title,
        description: this.state.description,
        originalFileName: this.state.originalFileName,
        fileName: this.state.fileName,
      };
      if (this.state.file) document.file = this.state.file;
      this.props.updateDocument(document, this.state.documentId);
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
                          Update Document
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
                        Document Details
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
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <FormControl fullWidth margin="none">
                      <MyTextField
                        id="originalFileName"
                        type="file"
                        inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                        label="Document"
                        name="originalFileName"
                        onChange={e => this.handleFileRead(e)}
                        size="small"
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.Grid} sm={12} xs={12} item>
                    <div className={classes.fields}>
                      <Typography variant="body1">File</Typography>
                      <Typography variant="h6" >
                        <Link onClick={this.getPreSignedUrl(this.state.fileNameOld)}> {this.state.originalFileNameOld} </Link>
                      </Typography>
                    </div>
                  </Grid>
                  <Grid align="right" className={classes.Grid} xs={12} item>
                    <Link className={classes.SubmitBtn} to="/App/AllDocuments">
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
UpdateDocument.propTypes = {
  updateDocument: PropTypes.func,
  getPreSignedUrl: PropTypes.func,
  document: PropTypes.object
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  document: state.document.document,
});

export default connect(mapStateToProps, { updateDocument, getPreSignedUrl })(withStyles(styles)(UpdateDocument));
