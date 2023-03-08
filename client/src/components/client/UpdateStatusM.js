import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';


import { connect } from "react-redux";
import { updateLead, updateStatusM } from '../../actions/leadActions'
import { getAgents } from '../../actions/agentActions';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



class UpdateStatusM extends Component {




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
        selected: '',


    }

    onSubmit = (e) => {
        e.preventDefault();


        const updatedLead = {
            ids: this.props.checkedids,
            status: this.state.selected
        }


        const id = this.props.leadid;
        this.props.updateStatusM( updatedLead);
        this.handleClose();
    }



    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        });
    }


    handleClose = () => {
        this.setState({
            open: !this.state.open
        });
    }


    render() {
        return (
            <div>
                <Button onClick={this.handleClose} variant='contained'
                    sx={{fontSize:18, width: 200, height: 56, backgroundColor: 'black',marginRight:5 , borderRadius: 50 }}
                >
                    Update Status
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
                                Update Status
                            </Typography>

                            <hr />
                            <form  >

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>

                                    <InputLabel id="demo-simple-select-standard-label">Assign to</InputLabel>
                                    <h1> {this.state.selected} </h1>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.selected}
                                        onChange={this.handleChange}
                                        label="Move To ..."
                                    >


                                        <MenuItem value='followup' >Follow Up</MenuItem>
                                        <MenuItem value='quotes' >Qoutes</MenuItem>
                                        <MenuItem value='orders' >Orders</MenuItem>
                                        <MenuItem value='dispatched' >Dispatched</MenuItem>
                                        <MenuItem value='archived' >Archived</MenuItem>
                                        <MenuItem value='potential' >Potential</MenuItem>
                                        {/* <MenuItem value={true} ></MenuItem> */}


                                    </Select>


                                </FormControl>






                                <div>
                                    <Button variant='contained'
                                        sx={{ width: 150, marginBottom: 5, marginLeft: 25, backgroundColor: 'black', borderRadius: 50 }}
                                        onClick={this.onSubmit}
                                    >
                                        Update Status
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




const mapStateToProps = (state) => ({
    lead: state.lead,
});



export default connect(mapStateToProps, { updateStatusM, getAgents })(UpdateStatusM);