import React, { Component } from 'react';
import LeadAdmin from './LeadAdmin';
import AddLead from '../common/AddLead';

class BodyAdmin extends Component {


    
    render() {
        return (
            <div  >
                <AddLead />
                {/* <RegisterModel/> */}
                <LeadAdmin/>
                {/* <Agents/> */}
                
            </div>
        );
    }
}

export default BodyAdmin;
