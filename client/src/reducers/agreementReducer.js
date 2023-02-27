
import { GET_AGREEMENT, ADD_AGREEMENT, AGREEMENT_LOADING } from '../actions/types';

const initialState = {
    agreements: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AGREEMENT:
            console.log('reducer',action.payload)
            return {
                ...state,
                agreements: action.payload,
                loading: false,
            };
            
        case ADD_AGREEMENT:
            return {
                ...state,
                agreements: [action.payload, ...state.agreements]
            };
        
        case AGREEMENT_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}