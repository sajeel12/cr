
import { GET_LEADS, ADD_VENDOR, DELETE_VENDOR, UPDATE_VENDOR, VENDOR_LOADING, GET_VENDOR } from '../actions/types';

const initialState = {
    vendors: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case  GET_VENDOR:
            return {
                ...state,
                vendors: action.payload,
                loading: false
            };
        case DELETE_VENDOR:
            return {
                ...state,
                vendors: state.vendors.filter(vendor => vendor._id !== action.payload)
            };
        case ADD_VENDOR:
            return {
                ...state,
                vendors: [action.payload, ...state.leads]
            };
        case UPDATE_VENDOR:
            return {
                ...state,
                vendors: [ ...state.vendors]
                

            };
        case VENDOR_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}