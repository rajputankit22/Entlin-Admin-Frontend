import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import {
  closePopup,
  updateOwnPassword,
} from "../../store/actions/employeeActions";
import { FormControl, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SimpleReactValidator from "simple-react-validator";

const MyTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderColor: "#54505d"
    },
    "& label": {
      color: "#2b335e"
    },
    "& input": {
      color: "#000"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #cacfe7"
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  Content: {
    padding: "9% 9% 9% 9% !important"
  },
  Action: {
    padding: "0% 9% 9% 9%"
  },
  Title: {
    "& h5": {
      color: "rgba(44, 52, 59, 0.8509803921568627)",
      fontWeight: "600",
      marginBottom: "2%"
    },
    "& span": {
      color: "#8a8f94",
      fontWeight: "600"
    }
  }
}));


function ChangePasswordAdmin(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleClose = () => {
    props.closePopup();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const SubmitForm = () => {
    var data = {
      password: values.oldPassword,
      newPassword: values.newPassword
    };
    props.updateOwnPassword(data);
  };

  return (
    <div>
      <Dialog open={props.openPasswordPopup} onClose={handleClose}>
        <DialogContent className={classes.Content}>
          <div className={classes.Title}>
            <Typography variant="h5">Change your password</Typography>
            <Typography variant="caption">
              Use at least eight characters with a mix of numbers, uppercase &
              lowercase letters and special characters.
            </Typography>
          </div>
          <div>
            <form>
              <FormControl fullWidth margin="normal">
                <MyTextField
                  variant="standard"
                  required
                  value={values.oldPassword}
                  id="oldPassword"
                  type="password"
                  label="Current Password"
                  name="oldPassword"
                  onChange={handleChange("oldPassword")}
                  size="small"
                  inputProps={{
                    maxLength: 50
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <MyTextField
                  variant="standard"
                  required
                  type="password"
                  value={values.newPassword}
                  id="newPassword"
                  label="New Password"
                  name="oldPassword"
                  onChange={handleChange("newPassword")}
                  size="small"
                  inputProps={{
                    maxLength: 50
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <MyTextField
                  variant="standard"
                  required
                  type="password"
                  value={values.confirmNewPassword}
                  id="confirmNewPassword"
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  onChange={handleChange("confirmNewPassword")}
                  size="small"
                  inputProps={{
                    maxLength: 50
                  }}
                />
              </FormControl>
            </form>
          </div>
        </DialogContent>
        <DialogActions className={classes.Action}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
          <Button
            onClick={SubmitForm}
            variant="contained"
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


// Typechecking With PropTypes
ChangePasswordAdmin.propTypes = {
  updateOwnPassword: PropTypes.func,
  closePopup: PropTypes.func,
  openPasswordPopup: PropTypes.bool
};

// Map reducer's state as props
const mapStateToProps = (state) => ({
  openPasswordPopup: state.employee.openPasswordPopup,
});

export default connect(mapStateToProps, { closePopup, updateOwnPassword })(
  ChangePasswordAdmin
);