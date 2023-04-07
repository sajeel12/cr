import {
  
    MAIL_SUCCESS,
    MAIL_FAIL

} from "../actions/types";


const initialState = {
    user: null,
    
}


export default function (state = initialState, action) {
    switch (action.type) {
       
      

        case MAIL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case MAIL_FAIL:
            return {
                ...state,
       

            };
        default:
            return state;
    }
}