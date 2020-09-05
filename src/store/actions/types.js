// Aunthentication Types
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const ADMIN_LOADED = "ADMIN_LOADED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";    // Employee login type
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SESSION_EXPIRED = "SESSION_EXPIRED";
export const TOKEN_REFRESHED = "TOKEN_REFRESHED";
export const TOKEN_REFRESHED_FAIL = "TOKEN_REFRESHED_FAIL";

// For update admin
export const ADD_ADMIN = "ADD_ADMIN";
export const UPDATE_OWN_PASSWORD = "UPDATE_OWN_PASSWORD";
export const UPDATE_OWN_PROFILE = "UPDATE_OWN_PROFILE";
export const UPDATE_EMPLOYEE_PROFILE = "UPDATE_EMPLOYEE_PROFILE";
export const OPEN_POPUP_OWN_PASSWORD = "OPEN_POPUP_OWN_PASSWORD";
export const CLOSE_POPUP_OWN_PASSWORD = "CLOSE_POPUP_OWN_PASSWORD";
export const REFRESH_CANCEL = "REFRESH_CANCEL";

export const FETCH_DASHBOARD_COUNTS = "FETCH_DASHBOARD_COUNTS";

// Mentor Types
export const ADD_MENTOR = "ADD_MENTOR";
export const UPDATE_MENTOR_PROFILE = "UPDATE_MENTOR_PROFILE";
export const FETCH_ALL_MENTORS = "FETCH_ALL_MENTORS";
export const FETCH_MENTOR_BY_ID = "FETCH_MENTOR_BY_ID";

// Student Types
export const UPDATE_STUDENT_PROFILE = "UPDATE_STUDENT_PROFILE";
export const FETCH_ALL_STUDENTS = "FETCH_ALL_STUDENTS";
export const FETCH_STUDENT_BY_ID = "FETCH_STUDENT_BY_ID";

// Event Types
export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const FETCH_ALL_EVENTS = "FETCH_ALL_EVENTS";
export const FETCH_EVENT_BY_ID = "FETCH_EVENT_BY_ID";

// Question Types
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CLOSE_QUESTION = "CLOSE_QUESTION";
export const FETCH_ALL_QUESTIONS = "FETCH_ALL_QUESTIONS";
export const FETCH_QUESTION_BY_ID = "FETCH_QUESTION_BY_ID";
export const FETCH_STUDENT_QUESTION = "FETCH_STUDENT_QUESTION";

// Answer Types
export const DELETE_ANSWER = "DELETE_ANSWER";
export const FETCH_ALL_ANSWERS = "FETCH_ALL_ANSWERS";
export const FETCH_ANSWER_BY_ID = "FETCH_ANSWER_BY_ID";
export const FETCH_STUDENT_ANSWERS = "FETCH_STUDENT_ANSWERS";

// Video Types
export const ADD_VIDEO = "ADD_VIDEO";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const FETCH_ALL_VIDEOS = "FETCH_ALL_VIDEOS";
export const FETCH_VIDEO_BY_ID = "FETCH_VIDEO_BY_ID";
export const UPLOAD_VIDEO = "UPLOAD_VIDEO";
export const UNUPLOAD_VIDEO = "UNUPLOAD_VIDEO";
export const PUBLISH_VIDEO = "PUBLISH_VIDEO";
export const UNPUBLISH_VIDEO = "UNPUBLISH_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";

// Courses Types
export const ADD_COURSE = "ADD_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const FETCH_ALL_COURSES = "FETCH_ALL_COURSES";
export const FETCH_COURSE_BY_ID = "FETCH_COURSE_BY_ID";
export const UPLOAD_COURSE = "UPLOAD_COURSE";
export const UNUPLOAD_COURSE = "UNUPLOAD_COURSE";
export const PUBLISH_COURSE = "PUBLISH_COURSE";
export const UNPUBLISH_COURSE = "UNPUBLISH_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

// For user
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";

// For employees
export const FETCH_ALL_EMPLOYEES = "FETCH_ALL_EMPLOYEES";
export const FETCH_EMPLOYEE_BY_ID = "FETCH_EMPLOYEE_BY_ID";

// For Reset Password
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_FIELDS = "RESET_PASSWORD_FIELDS";

// For Loans
export const FETCH_SINGLE_LOAN = "FETCH_SINGLE_LOAN";
export const FETCH_PENDING_LOANS = "FETCH_PENDING_LOANS";
export const FETCH_APPROVED_LOANS = "FETCH_APPROVED_LOANS";
export const FETCH_REJECTED_LOANS = "FETCH_REJECTED_LOANS";
export const FETCH_DISBURSED_LOANS = "FETCH_DISBURSED_LOANS";
export const FETCH_COMPLETED_LOANS = "FETCH_COMPLETED_LOANS";
export const FETCH_PAID_EMIS = "FETCH_PAID_EMIS";
export const FETCH_RUNNING_EMIS = "FETCH_RUNNING_EMIS";
export const FETCH_WAITING_FOR_DISBURSAL = "FETCH_WAITING_FOR_DISBURSAL";
export const ASSIGN_LOAN_TO_LENDER = "ASSIGN_LOAN_TO_LENDER";
export const DECLINE_LOAN = "DECLINE_LOAN";
export const APPROVE_LOAN = "APPROVE_LOAN";
export const DISBURSE_LOAN = "DISBURSE_LOAN";
export const COMPLETE_LOAN = "COMPLETE_LOAN";

// For Borrower
export const FETCH_SINGLE_BORROWER = "FETCH_SINGLE_BORROWER";
export const FETCH_ALL_BORROWER = "FETCH_ALL_BORROWER";
export const FETCH_BORROWER_HISTORY = "FETCH_BORROWER_HISTORY";
export const SUBMIT_BORROWER_BUSINESS_PROFILE = "SUBMIT_BORROWER_BUSINESS_PROFILE";
export const SUBMIT_BORROWER_OWNER_PROFILE = "SUBMIT_BORROWER_OWNER_PROFILE";

//for Fees
export const ADD_FEES = "ADD_FEES";
export const ADD_ALL_BORROWER_FEES = "ADD_ALL_BORROWER_FEES";
export const FETCH_HOME_DETAILS = "FETCH_HOME_DETAILS";

// For Lender ,
export const FETCH_SINGLE_LENDER = "FETCH_SINGLE_LENDER";
export const FETCH_ALL_LENDER = "FETCH_ALL_LENDER";
export const UPDATE_LENDER_PROFILE = "UPDATE_LENDER_PROFILE";
export const MARK_FEES_PAID = "MARK_FEES_PAID";
export const DELETE_FEES = "DELETE_FEES";
export const REMOVE_BORROWER_DOCUMENT = "REMOVE_BORROWER_DOCUMENT";
export const OPEN_BORROWER_DOCUMENT = "OPEN_BORROWER_DOCUMENT";

export const UPDATE_BORROWER_BANK_STATEMENT = "UPDATE_BORROWER_BANK_STATEMENT";
export const UPDATE_BORROWER_BALANCE_SHEET = "UPDATE_BORROWER_BALANCE_SHEET";
export const UPDATE_BORROWER_PNL_STATEMENT = "UPDATE_BORROWER_PNL_STATEMENT";
export const UPDATE_BORROWER_CAPITAL_ACCOUNT_STATEMENT =
  "UPDATE_BORROWER_CAPITAL_ACCOUNT_STATEMENT";
export const UPDATE_BORROWER_GST_RETURN = "UPDATE_BORROWER_GST_RETURN";
export const UPDATE_BORROWER_ITR = "UPDATE_BORROWER_ITR";
export const UPDATE_BORROWER_COMPANY_PAN = "UPDATE_BORROWER_COMPANY_PAN";
export const UPDATE_BORROWER_COMPANY_ADDRESS_PROOF =
  "UPDATE_BORROWER_COMPANY_ADDRESS_PROOF";
export const UPDATE_BORROWER_DIRECTOR_PAN = "UPDATE_BORROWER_DIRECTOR_PAN";

// For ui
export const SWITCH_NAV_LOAN = "SWITCH_NAV_LOAN";
export const SWITCH_NAV_BORROWER = "SWITCH_NAV_BORROWER";
export const SWITCH_NAV_LENDER = "SWITCH_NAV_LENDER";
export const OPEN_DECLINE_LOAN_DIALOG = "OPEN_DECLINE_LOAN_DIALOG";
export const CLOSE_DECLINE_LOAN_DIALOG = "CLOSE_DECLINE_LOAN_DIALOG";
export const OPEN_LOAN_ASSIGN_TO_LENDER_DIALOG =
  "OPEN_LOAN_ASSIGN_TO_LENDER_DIALOG";
export const CLOSE_LOAN_ASSIGN_TO_LENDER_DIALOG =
  "CLOSE_LOAN_ASSIGN_TO_LENDER_DIALOG";
export const OPEN_APPROVE_LOAN_DIALOG = "OPEN_APPROVE_LOAN_DIALOG";
export const CLOSE_APPROVE_LOAN_DIALOG = "CLOSE_APPROVE_LOAN_DIALOG";
export const OPEN_DISBURSE_LOAN_DIALOG = "OPEN_DISBURSE_LOAN_DIALOG";
export const CLOSE_DISBURSE_LOAN_DIALOG = "CLOSE_DISBURSE_LOAN_DIALOG";
export const OPEN_MARK_PAID_FEES_DIALOG = "OPEN_MARK_PAID_FEES_DIALOG";
export const CLOSE_MARK_PAID_FEES_DIALOG = "CLOSE_MARK_PAID_FEES_DIALOG";
export const OPEN_DELETE_FEES_DIALOG = "OPEN_DELETE_FEES_DIALOG";
export const CLOSE_DELETE_FEES_DIALOG = "CLOSE_DELETE_FEES_DIALOG";
export const OPEN_COMPLETE_LOAN_DIALOG = "OPEN_COMPLETE_LOAN_DIALOG";
export const CLOSE_COMPLETE_LOAN_DIALOG = "CLOSE_COMPLETE_LOAN_DIALOG";
export const OPEN_PAY_EMI_DIALOG = "OPEN_PAY_EMI_DIALOG";
export const CLOSE_PAY_EMI_DIALOG = "CLOSE_PAY_EMI_DIALOG";

export const OPEN_REMOVE_BORROWER_DOCUMENT_DIALOG =
  "OPEN_REMOVE_BORROWER_DOCUMENT_DIALOG";
export const CLOSE_REMOVE_BORROWER_DOCUMENT_DIALOG =
  "CLOSE_REMOVE_BORROWER_DOCUMENT_DIALOG";

export const MARK_EMI_PAID = "MARK_EMI_PAID";
export const ADD_GLOBAL_COMMENT = "ADD_GLOBAL_COMMENT";
export const ADD_INTERNAL_COMMENT = "ADD_INTERNAL_COMMENT";

// Ui Types
export const SWITCH_NAV_MAIN = "SWITCH_NAV_MAIN";
export const SWITCH_NAV_STUDENT = "SWITCH_NAV_STUDENT";
export const SWITCH_NAV_MENTOR = "SWITCH_NAV_MENTOR";
