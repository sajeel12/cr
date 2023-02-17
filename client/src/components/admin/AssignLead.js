import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';


import { connect } from "react-redux";
import { assignLead } from '../../actions/leadActions'
import { getAgents } from '../../actions/agentActions';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



class AssignLead extends Component {

    componentDidMount = () => {
        this.props.getAgents();
    }
 


    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    state = {
        open: false,
        owner: '',

    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.owner);
        // console.log(this.props.leadid);

        const updatedLead = {
            owner: this.state.owner,
        }

        const id = this.props.leadid;
        this.props.assignLead( id ,updatedLead);
        this.handleClose();
    }


    handleChange = (e) => {
        this.setState({
            owner: e.target.value
        });
    }


    handleClose = () => {
        this.setState({
            open: !this.state.open
        });
    }


    render() {
        const { agents } = this.props.agent;
        return (
            <div>
                <Button onClick={this.handleClose} variant='contained'
                    sx={{ width:150, backgroundColor: this.props.isassigned?  '#04d82b': 'black'  , borderRadius: 50 }}
                >
                    {this.props.isassigned ? "Lead Assigned"  :  "Assign Lead"}
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowX: 'scroll' }}
                >
                    <Box sx={this.style}>

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography variant="h5" component="h2">
                                Assign Lead
                            </Typography>

                            <hr />
                            <form  >
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Assign to</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.owner}
                                        onChange={this.handleChange}
                                        label="Assign To"
                                    >
                                        {agents.map((agent => (
                                                
                                                
                                                <MenuItem  key={agent._id} value={agent._id} >{agent.username}</MenuItem>
                                                
                                        )))}
                                    </Select>


                                </FormControl>

                                <div>
                                    <Button variant='contained'
                                        sx={{ marginBottom: 5, color: 'black', borderRadius: 50 }}
                                        onClick={this.onSubmit}
                                    >
                                        Assign
                                    </Button>
                                </div>

                            </form>



                        </Box>



                    </Box>
                </Modal>
            </div>
        )
    }
}

AssignLead.propTypes = {
    getAgents: PropTypes.func.isRequired,
    agent: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    lead: state.lead,
    auth: state.auth,
    agent: state.agent
});



export default connect(mapStateToProps, { assignLead, getAgents })(AssignLead);