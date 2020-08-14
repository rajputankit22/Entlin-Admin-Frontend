import {
  FETCH_SINGLE_BORROWER,
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  SUBMIT_BORROWER_BUSINESS_PROFILE,
  SUBMIT_BORROWER_OWNER_PROFILE,
  REMOVE_BORROWER_DOCUMENT,
  CLOSE_REMOVE_BORROWER_DOCUMENT_DIALOG,
  OPEN_BORROWER_DOCUMENT,
  UPDATE_BORROWER_BANK_STATEMENT,
  UPDATE_BORROWER_BALANCE_SHEET,
  UPDATE_BORROWER_PNL_STATEMENT,
  UPDATE_BORROWER_CAPITAL_ACCOUNT_STATEMENT,
  UPDATE_BORROWER_GST_RETURN,
  UPDATE_BORROWER_ITR,
  UPDATE_BORROWER_COMPANY_PAN,
  UPDATE_BORROWER_COMPANY_ADDRESS_PROOF,
  UPDATE_BORROWER_DIRECTOR_PAN,
  FETCH_ALL_BORROWER,
  FETCH_ALL_STUDENT,
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

export const fetchSingleBorrower = (borrowerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/fetchBorrowerDetails/" + borrowerId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_SINGLE_BORROWER,
        payload: response.data,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const fetchAllBorrower = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/students/fetchAllStudents", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_ALL_BORROWER,
        payload: response.data.students,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const updateBorrowerBusinessProfile = (data, BorrowerId) => (
  dispatch
) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateBusinessProfile/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: SUBMIT_BORROWER_BUSINESS_PROFILE,
        payload: response,
      });
      toast.success("Business Information Submitted Successfully!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerOwnerProfile = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateOwnerProfile/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: SUBMIT_BORROWER_OWNER_PROFILE,
        payload: response,
      });
      toast.success("Owner Details Submitted Successfully!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const RemoveBorrowerDocument = (borrowerId, type, fileId, fileName) => (
  dispatch
) => {
  axios(
    config.DOMAIN +
    "/borrowers/removeFile/" +
    borrowerId +
    "/" +
    type +
    "/" +
    fileId +
    "/" +
    fileName,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: authenticate(),
      },
    }
  )
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: CLOSE_REMOVE_BORROWER_DOCUMENT_DIALOG,
      });
      dispatch({
        type: REMOVE_BORROWER_DOCUMENT,
      });

      dispatch(fetchSingleBorrower(borrowerId));
      dispatch({
        type: LOADED,
      });
      toast.success("File Successfully Removed!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: CLOSE_REMOVE_BORROWER_DOCUMENT_DIALOG,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const openBorrowerDocument = (fileName, oldName) => (dispatch) => {
  axios(
    config.DOMAIN +
    "/borrowers/getSignedUrlForFile/" +
    fileName +
    "/" +
    oldName,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: authenticate(),
      },
    }
  )
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        window.open(response.data.url, "_blank");
      }
      dispatch({
        type: OPEN_BORROWER_DOCUMENT,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const updateBorrowerBankStatement = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateBankStatement/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_BANK_STATEMENT,
        payload: response,
      });
      toast.success("Bank Statement Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerBalanceSheet = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateBalanceSheet/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_BALANCE_SHEET,
        payload: response,
      });
      toast.success("Balance Sheet Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerPnlStatement = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updatePnlStatement/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_PNL_STATEMENT,
        payload: response,
      });
      toast.success("Profit & Loss Statments Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerCapitalAccountStatement = (data, BorrowerId) => (
  dispatch
) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(
    config.DOMAIN + "/borrowers/updateCapitalAccountStatement/" + BorrowerId,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: authenticate(),
      },
      data: data,
    }
  )
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_CAPITAL_ACCOUNT_STATEMENT,
        payload: response,
      });
      toast.success("Capital Account Statments Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerGstReturn = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateGstReturn/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_GST_RETURN,
        payload: response,
      });
      toast.success("GST Return Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerItr = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateItr/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_ITR,
        payload: response,
      });
      toast.success("ITR Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerCompanyPan = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateCompanyPan/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_COMPANY_PAN,
        payload: response,
      });
      toast.success("Company Pan Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerCompanyAddressProof = (data, BorrowerId) => (
  dispatch
) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateCompanyAddressProof/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_COMPANY_ADDRESS_PROOF,
        payload: response,
      });
      toast.success("Company Address Proof Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const updateBorrowerDirectorPan = (data, BorrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateDirectorPan/" + BorrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: UPDATE_BORROWER_DIRECTOR_PAN,
        payload: response,
      });
      toast.success("Director Pan Uploaded!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
    });
};

export const changeFiLimit = (data, borrowerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateFiCreditLimit/" + borrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch(fetchSingleBorrower(borrowerId));
      dispatch({
        type: LOADED,
      });
      toast.success("FI Credit Limit Updated!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const changePaymateLimit = (data, borrowerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updatePayMateCreditLimit/" + borrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch(fetchSingleBorrower(borrowerId));
      dispatch({
        type: LOADED,
      });
      toast.success("Paymate Credit Limit Updated!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const changeTermLimit = (data, borrowerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/updateTermLoanLimit/" + borrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch(fetchSingleBorrower(borrowerId));
      dispatch({
        type: LOADED,
      });
      toast.success("Term Loan Limit Updated!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const changeBorrowerInterest = (data, borrowerId) => (dispatch) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/borrowers/changeIntrest/" + borrowerId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch(fetchSingleBorrower(borrowerId));
      dispatch({
        type: LOADED,
      });
      toast.success("Interest Rate Changed!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};
