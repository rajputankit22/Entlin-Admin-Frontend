import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import employeeReducer from "./employeeReducer";
import uiReducer from "./uiReducer";
import historyReducer from "./historyReducer";
import homeReducer from "./homeReducer";
import mentorReducer from "./mentorReducer";
import studentReducer from "./studentReducer";
import eventReducer from "./eventReducer";
import videoReducer from "./videoReducer";
import incubationReducer from "./incubationReducer";
import courseReducer from "./courseReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import subscriptionReducer from "./subscriptionReducer";

export default combineReducers({
  admin: adminReducer,
  employee: employeeReducer,
  mentor: mentorReducer,
  student: studentReducer,
  question: questionReducer,
  answer: answerReducer,
  event: eventReducer,
  video: videoReducer,
  course: courseReducer,
  ui: uiReducer,
  history: historyReducer,
  home: homeReducer,
  subscription: subscriptionReducer,
  incubation: incubationReducer
});
