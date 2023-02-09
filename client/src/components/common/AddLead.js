import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';


import { connect } from "react-redux";
import {addLead} from '../../actions/leadActions'
import PropTypes from 'prop-types';


class AddLead extends Component {
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
        fullname: '',
        email: '',
        phoneno: '',
        origincity: '',
        originaddress: '',
        origincity: '',
        originstate: '',
        originzipcode: '',
        destinationaddress: '',
        destinationcity: '',
        destinationstate: '',
        destinationzipcode: '',
        model: '',
        make: '',
        vehicletype: ''

    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.fullname !== '' && this.state.destinationcity !== '' ){
        const newLead = {
            id: uuid(),
            fullname: this.state.fullname, 
            email: this.state.email, 
            phoneno: this.state.phoneno, 
            originaddress: this.state.originaddress, 
            origincity: this.state.origincity, 
            originstate: this.state.originstate, 
            originzipcode: this.state.originzipcode, 
            destinationaddress: this.state.destinationaddress, 
            destinationcity: this.state.destinationcity, 
            destinationstate: this.state.destinationstate, 
            destinationzipcode: this.state.destinationzipcode, 
            model: this.state.model, 
            make: this.state.make, 
            vehicletype: this.state.vehicletype, 
           
        };

        this.props.addLead(newLead);
        this.handleClose();
    }
    else{
        alert('fill all fields')
    }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                    sx={{ marginBottom: 5,marginLeft:20, backgroundColor: 'black', borderRadius:50  }}
                >
                    Add Lead
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
                                Add Lead
                            </Typography>

                            <hr />
                            <form  >
                                <TextField
                                    onChange={this.onChange}
                                    name='fullname'
                                    id="standard-required"
                                    label="Full Name"
                                    type="text"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='email'
                                    label="Email"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='phoneno'
                                    label="Phone No"
                                    type="required"
                                    variant="standard"
                                    required
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originaddress'
                                    label="Origin Address"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='origincity'
                                    label="Origin City"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originstate'
                                    label="Origin State"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originzipcode'
                                    label="Origin Zip Code"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationaddress'
                                    label="Destination Address"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationcity'
                                    label="Destination City"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationstate'
                                    label="Destination State"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationzipcode'
                                    label="Destination Zip Code"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='model'
                                    label="Model"
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='make'
                                    label="Make "
                                    type="required"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='vehicletype'
                                    label="Vehicle Type"
                                    type="required"
                                    variant="standard"
                                />


                                <Button variant='contained'
                                    sx={{ marginBottom: 5 }}
                                    onClick={this.onSubmit}
                                >
                                    Add
                                </Button>

                            </form>



                        </Box>



                    </Box>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    lead: state.lead
});



export default connect(mapStateToProps, {addLead})(AddLead);