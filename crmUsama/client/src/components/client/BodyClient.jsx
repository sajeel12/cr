import React, { Component } from 'react';
import LeadClient from './LeadClient';
import { Button } from '@mui/material';
import AddLead from '../common/AddLead';

class BodyClient extends Component {
    render() {
        return (
            <div  >
                <AddLead />
                <LeadClient/>
                
            </div>
        );
    }
}

export default BodyClient;
