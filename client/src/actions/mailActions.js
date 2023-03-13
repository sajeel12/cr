import { MAIL_SUCCESS, MAIL_FAIL } from '../actions/types';
import axios from 'axios';
import { returnErrors } from './errorActions';




export const sendMail = (body) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 

    // const body = JSON.stringify({ vendor, subject, html, email, emailpass, many, to, id });

    axios.post('/api/mail', body, config)
        .then(res => dispatch({
            type: MAIL_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: MAIL_FAIL
            })
        })

}
