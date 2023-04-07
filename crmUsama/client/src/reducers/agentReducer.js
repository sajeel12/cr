import {v1 as uuid} from 'uuid';
import { GET_AGENTS, ADD_AGENT, DELETE_AGENT, AGENTS_LOADING } from '../actions/types';

const initialState = {
    agents: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_AGENTS:
            return{
                ...state,
                agents:action.payload,
                loading:false
            };
        case DELETE_AGENT:
            return{
                ...state,
                agents: state.agents.filter(agent => agent._id !== action.payload)
            };
        case ADD_AGENT:
            return{
                ...state,
                agents:[action.payload, ...state.agents]
            };
        case AGENTS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}