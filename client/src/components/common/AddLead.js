import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
// import { v1 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { connect } from "react-redux";
import { addLead } from '../../actions/leadActions'
import PropTypes from 'prop-types';
import ShortUniqueId from 'short-unique-id';
import { Alert } from '@mui/material';
class AddLead extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'
    };
    state = {
        open: false,
        error: false,

        fullname: '',
        email: '',
        phoneno: '',
        origincity: '',
        // originaddress: '',
        originstate: '',
        originzipcode: '',
        destinationaddress: '',
        destinationcity: '',
        destinationstate: '',
        destinationzipcode: '',
        model: '',
        modelyear: '',
        make: '',
        vehicletype: '',
        shipdate: ''

    }

    onSubmit = (e) => {
        e.preventDefault();

        const suid = new ShortUniqueId({ length: 6 })
        const uid = suid();
        const uuid = `HS${uid}`;
        if (this.state.fullname !== ''
            && this.state.destinationcity !== ''
            && this.state.fullname !== ''
            && this.state.email !== ''
            && this.state.phoneno !== ''
            // && this.state.originaddress !== ''
            && this.state.origincity !== ''
            && this.state.originstate !== ''
            && this.state.originzipcode !== ''
            && this.state.destinationaddress !== ''
            && this.state.destinationcity !== ''
            && this.state.destinationstate !== ''
            && this.state.destinationzipcode !== ''
            && this.state.model !== ''
            && this.state.modelyear !== ''
            && this.state.make !== ''
            && this.state.vehicletype !== ''
        ) {
            this.setState({ error: false })

            const { user } = this.props.auth;
            const newLead = {
                id: uuid,
                owner: user._id,
                fullname: this.state.fullname,
                email: this.state.email,
                phoneno: this.state.phoneno,
                // originaddress: this.state.originaddress,
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
                shipdate: this.state.shipdate

            };

            this.props.addLead(newLead);
            this.handleClose();
        }
        else {
            this.setState({ error: true })
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
                    sx={{ fontSize: 20, width: 200, height: 56, marginBottom: 0, marginLeft: 5, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Add Lead
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowY: 'scroll', height: 700 }}
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
                            {this.state.error && <Alert severity="error"> Please Fill All Fields</Alert>}
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
                                <hr />
                                <Typography variant="h6" component="h2">
                                    Origin
                                </Typography>

                                {/* <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='originaddress'
                                    label="Origin Address"
                                    type="required"
                                    variant="standard"
                                /> */}

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
                                <hr />
                                <Typography variant="h6" component="h2">
                                    Destination
                                </Typography>
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
                                <hr />
                                <Typography variant="h6" component="h2">
                                    Vehicle Detail
                                </Typography>
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
                                    name='modelyear'
                                    label="Model Year"
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


                                {/* <TextField
                                    onChange={this.onChange}
                                    id="standard-required"
                                    name='shipdate'
                                    label="Ship Date"
                                    type="required"
                                    variant="standard"
                                /> */}
                                
                                <input  style={{width:220, marginLeft:8, marginTop:10}}
                                 type="date"  name='shipdate' onChange={this.onChange}  />

                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                                        <DatePicker
                                            label="Controlled picker"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider> */}

                                <div>
                                    <Button variant='contained'
                                        sx={{
                                            marginTop: 5, backgroundColor: 'black', width: 100,
                                            borderRadius: 50, marginLeft: 28
                                        }}
                                        onClick={this.onSubmit}
                                    >
                                        Add
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
    auth: state.auth
});



export default connect(mapStateToProps, { addLead })(AddLead);