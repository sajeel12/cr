import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import leadReducer from './leadReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import agentReducer from "./agentReducer";
import mailReducer from "./mailReducer";
import agreementReducer from "./agreementReducer";
import vendorReducer from "./vendorReducer"

export default combineReducers({
    item: itemReducer,
    lead: leadReducer,
    error: errorReducer,
    auth: authReducer,
    agent: agentReducer,
    mail: mailReducer,
    agreement: agreementReducer,
    vendor: vendorReducer

})
