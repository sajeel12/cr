import React, { Component } from 'react';

import Agents from './Agents';


import RegisterModel from '../auth/RegisterModel';
import AddVendor from './AddVendor';

class BodyAgent extends Component {
    render() {
        return (



            <>
                <div style={{display:'flex'}} >
                    <RegisterModel />
                    <AddVendor/>
                </div>
                <Agents />
            </>



        );
    }
}

export default BodyAgent;
