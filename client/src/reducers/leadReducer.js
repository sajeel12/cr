
import { GET_LEADS, ADD_LEAD, DELETE_LEAD, UPDATE_LEAD, LEAD_LOADING } from '../actions/types';

const initialState = {
    leads: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LEADS:
            return {
                ...state,
                leads: action.payload,
                loading: false
            };
        case DELETE_LEAD:
            return {
                ...state,
                leads: state.leads.filter(lead => lead._id !== action.payload)
            };
        case ADD_LEAD:
            return {
                ...state,
                leads: [action.payload, ...state.leads]
            };
        case UPDATE_LEAD:
            return {
                ...state,
                leads: [ ...state.leads]
                

            };
        case LEAD_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}