import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';


import { connect } from "react-redux";
import { updateLead } from '../../actions/leadActions'
import { getAgents } from '../../actions/agentActions';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



class UpdateLead extends Component {




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
        fullname: this.props.fullname,
        email: this.props.email,
        phoneno: this.props.phoneno,
        origincity: this.props.origincity,
        originaddress: this.props.originaddress,
        origincity: this.props.origincity,
        originstate: this.props.originstate,
        originzipcode: this.props.originzipcode,
        destinationaddress: this.props.destinationaddress,
        destinationcity: this.props.destinationcity,
        destinationstate: this.props.destinationstate,
        destinationzipcode: this.props.destinationzipcode,
        model: this.props.model,
        modelyear: this.props.modelyear,
        make: this.props.make,
        vehicletype: this.props.vehicletype,
        price:this.props.price

    }

    onSubmit = (e) => {
        e.preventDefault();



        const updatedLead = {
            fullname: this.state.fullname,
            email: this.state.email,
            phoneno: this.state.phoneno,
            origincity: this.state.origincity,
            originaddress: this.state.originaddress,
            origincity: this.state.origincity,
            originstate: this.state.originstate,
            originzipcode: this.state.originzipcode,
            destinationaddress: this.state.destinationaddress,
            destinationcity: this.state.destinationcity,
            destinationstate: this.state.destinationstate,
            destinationzipcode: this.state.destinationzipcode,
            model: this.state.model,
            modelyear: this.state.modelyear,
            make: this.state.make,
            vehicletype: this.state.vehicletype,
            price:this.state.price
        }

        const id = this.props._id;
        this.props.updateLead(id, updatedLead);
        this.handleClose();
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
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
        return (
            <div>
                <Button onClick={this.handleClose} variant='contained'
                    sx={{ width: 150, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Update Lead
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
                                Update Lead
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
                                    value={this.state.fullname}
                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='email'
                                    label="Email"
                                    type="required"
                                    variant="standard"
                                    value={this.state.email}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='phoneno'
                                    label="Phone No"
                                    type="required"
                                    variant="standard"
                                    required
                                    value={this.state.phoneno}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originaddress'
                                    label="Origin Address"
                                    type="required"
                                    variant="standard"
                                    value={this.state.originaddress}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='origincity'
                                    label="Origin City"
                                    type="required"
                                    variant="standard"
                                    value={this.state.origincity}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originstate'
                                    label="Origin State"
                                    type="required"
                                    variant="standard"
                                    value={this.state.originstate}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originzipcode'
                                    label="Origin Zip Code"
                                    type="required"
                                    variant="standard"
                                    value={this.state.originzipcode}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationaddress'
                                    label="Destination Address"
                                    type="required"
                                    variant="standard"
                                    value={this.state.destinationaddress}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationcity'
                                    label="Destination City"
                                    type="required"
                                    variant="standard"
                                    value={this.state.destinationcity}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationstate'
                                    label="Destination State"
                                    type="required"
                                    variant="standard"
                                    value={this.state.destinationstate}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='destinationzipcode'
                                    label="Destination Zip Code"
                                    type="required"
                                    variant="standard"
                                    value={this.state.destinationzipcode}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='model'
                                    label="Model"
                                    type="required"
                                    variant="standard"
                                    value={this.state.model}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='modelyear'
                                    label="Model Year"
                                    type="required"
                                    variant="standard"
                                    value={this.state.modelyear}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='make'
                                    label="Make "
                                    type="required"
                                    variant="standard"
                                    value={this.state.make}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='vehicletype'
                                    label="Vehicle Type"
                                    type="required"
                                    variant="standard"
                                    value={this.state.vehicletype}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='price'
                                    label="Price"
                                    type="required"
                                    variant="standard"
                                    placeholder='$'
                                    value={this.state.price}

                                />




                                <div>
                                    <Button variant='contained'
                                        sx={{ width: 150, marginBottom: 5, marginLeft: 25, backgroundColor: 'black', borderRadius: 50 }}
                                        onClick={this.onSubmit}
                                    >
                                        Update Lead
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



export default connect(mapStateToProps, { updateLead, getAgents })(UpdateLead);