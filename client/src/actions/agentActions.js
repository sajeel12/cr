import { GET_AGENTS, ADD_AGENT, DELETE_AGENT, AGENTS_LOADING } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getAgents = () => (dispatch,getState) => {
    dispatch(setAgentLoading());

    axios.get('/api/agents', tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_AGENTS,
            payload: res.data
        })
            .catch(err =>
                dispatch(returnErrors(console.log(err.response.data), err.response.status)))
    );
};

export const deleteAgent = (id) => (dispatch, getState) => {
    axios.delete(`/api/agents/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_AGENT,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addAgent = (agent) => (dispatch, getState) => {
    axios.post('/api/users', agent, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_AGENT,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setAgentLoading = () => {
    return {
        type: AGENTS_LOADING
    }
}