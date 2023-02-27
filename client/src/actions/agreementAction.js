import { GET_AGREEMENT, AGREEMENT_LOADING, ADD_AGREEMENT} from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { listSubheaderClasses } from '@mui/material';

export const getAgreement = (id) => (dispatch) => {
    dispatch(setAgreementLoading());
    console.log('me get Agreement se bol rha ho')
    axios.get(`/api/agreement/${id}` )
        .then(res => {
            dispatch({
                type: GET_AGREEMENT,
                payload: res.data
            })
            // console.log(res.data);
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};



export const addAgreement = (agreement) => (dispatch) => {
    alert('addAgreement')
    axios.post('/api/agreement', agreement, )
        .then(res => dispatch({
            type: ADD_AGREEMENT,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};






export const setAgreementLoading = () => {
    return {
        type: AGREEMENT_LOADING
    }
}