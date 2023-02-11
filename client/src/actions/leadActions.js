import { GET_LEADS, ADD_LEAD, UPDATE_LEAD , DELETE_LEAD, LEAD_LOADING } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getLeads = () => (dispatch, getState) => {
    dispatch(setLeadLoading());

    axios.get('/api/leads', tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_LEADS,
            payload: res.data
        })
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status)))
    );
};

export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_LEAD,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addLead = (lead) => (dispatch, getState) => {
    axios.post('/api/leads', lead, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_LEAD,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};


export const updateLead = ( id, lead) => (dispatch, getState) => {
    axios.put(`/api/leads/${id}`, lead, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_LEAD,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};


export const setLeadLoading = () => {
    return {
        type: LEAD_LOADING
    }
}