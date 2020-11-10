import {
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  FETCH_ALL_DOCUMENTS,
  FETCH_DOCUMENT_BY_ID,
  PUBLISH_DOCUMENT,
  UNPUBLISH_DOCUMENT,
  DELETE_DOCUMENT
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Post a new document.
export const addDocument = (document) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/documents/postDocument", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: document,
  })
    .then((response) => {
      dispatch({
        type: ADD_DOCUMENT,
        payload: response,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Document Successfully Added!");
    })
    .catch((err) => {
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

// Fetch single document through documentId.
export const fetchDocumentById = (documentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/documents/fetchDocument/" + documentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_DOCUMENT_BY_ID,
        payload: response.data.document,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
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

// Update document
export const updateDocument = (document, documentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/documents/updateDocument/" + documentId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: document,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: UPDATE_DOCUMENT,
        payload: response.data.document,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Document Successfully Updated!");
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

// Fetch All documents as a list. 
export const fetchAllDocuments = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/documents/fetchAllDocuments", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_DOCUMENTS,
        payload: response.data.documents,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
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

// // Upload a video
// export const uploadVideo = (videoId) => (dispatch) => {
//   axios(config.DOMAIN + "/documents/uploadVideo/" + videoId, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Authorization: authenticate(),
//     },
//   })
//     .then((response) => {
//       dispatch({
//         type: UPLOAD_VIDEO,
//         payload: response.data,
//       });
//       toast.success(response.data.message);
//     })
//     .catch((err) => {
//       if (err.response.status === 403) {
//         dispatch({
//           type: SESSION_EXPIRED,
//         });
//       } else {
//         if (err.response.data.error) {
//           toast.error(err.response.data.error);
//         } else if (err.response.data.errors.length > 0) {
//           err.response.data.errors.map((msg) => {
//             toast.error(msg.msg);
//           });
//         } else {
//           toast.error("Server is not connected!");
//         }
//       }
//     });
// };

// // UnUpload a video
// export const unUploadVideo = (videoId) => (dispatch) => {
//   axios(config.DOMAIN + "/documents/unUploadVideo/" + videoId, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Authorization: authenticate(),
//     },
//   })
//     .then((response) => {
//       dispatch({
//         type: UNUPLOAD_VIDEO,
//         payload: response.data,
//       });
//       toast.success(response.data.message);
//     })
//     .catch((err) => {
//       if (err.response.status === 403) {
//         dispatch({
//           type: SESSION_EXPIRED,
//         });
//       } else {
//         if (err.response.data.error) {
//           toast.error(err.response.data.error);
//         } else if (err.response.data.errors.length > 0) {
//           err.response.data.errors.map((msg) => {
//             toast.error(msg.msg);
//           });
//         } else {
//           toast.error("Server is not connected!");
//         }
//       }
//     });
// };

// Publish a document
export const publishDocument = (documentId) => (dispatch) => {
  axios(config.DOMAIN + "/documents/publishDocument/" + documentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: PUBLISH_DOCUMENT,
        payload: response.data,
      });
      toast.success(response.data.message);
    })
    .catch((err) => {
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

// UnPublish a document
export const unPublishDocument = (documentId) => (dispatch) => {
  axios(config.DOMAIN + "/documents/unPublishDocument/" + documentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: UNPUBLISH_DOCUMENT,
        payload: response.data,
      });
      toast.success(response.data.message);
    })
    .catch((err) => {
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

// Delete a document
export const deleteDocument = (documentId) => (dispatch) => {
  axios(config.DOMAIN + "/documents/deleteDocument/" + documentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE_DOCUMENT,
        payload: response.data
      });
      toast.success(response.data.message);
    })
    .catch((err) => {
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
