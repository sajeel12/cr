import { GET_LEADS, ADD_LEAD, UPDATE_LEAD, DELETE_LEAD, LEAD_LOADING, VENDOR_LOADING, GET_VENDOR, DELETE_VENDOR } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { listSubheaderClasses } from '@mui/material';


export const getVendors = () => (dispatch, getState) => {
    dispatch(setLeadLoading());

    axios.get('/api/vendor',   tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_VENDOR,
                payload: res.data
            })
            // console.log(res.data);
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};


export const deleteVendor = (id ) => (dispatch, getState) => {
    axios.delete(`/api/vendor/${id}` ,tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_VENDOR,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addVendor = (lead) => (dispatch, getState) => {
    axios.post('/api/vendor', lead, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_LEAD,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};











export const setLeadLoading = () => {
    return {
        type: VENDOR_LOADING
    }
}