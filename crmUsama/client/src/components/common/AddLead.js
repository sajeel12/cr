import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider, MenuItem,
    InputLabel,
    Select,
    FormControl

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
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



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
        vehiclemodel: false,
        error: false,

        vehiclecount: 1,

        fullname: '',
        email: '',
        phoneno: '',
        origincity: '',
        originaddress: '',
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
        shipdate: '',
        transporttype: 1,
        isoperable: 0,
        vehicle: []

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
            // && this.state.destinationaddress !== ''
            && this.state.destinationcity !== ''
            && this.state.destinationstate !== ''
            && this.state.destinationzipcode !== ''
            // && this.state.model !== ''
            // && this.state.modelyear !== ''
            // && this.state.make !== ''
            // && this.state.vehicletype !== ''
        ) {
            this.setState({ error: false })

            const { user } = this.props.auth;
            const newLead = {
                id: uuid,
                owner: user._id,
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
                modelyear: this.state.modelyear,
                make: this.state.make,
                vehicletype: this.state.vehicletype,
                shipdate: this.state.shipdate,
                transporttype: this.state.transporttype,
                vehicle: this.state.vehicle

            };

            this.props.addLead(newLead);
            this.handleClose();
            this.setState({ vehicle: [] })

            NotificationManager.success('Lead Added', 'Lead')
        }
        else {
            this.setState({ error: true })
            NotificationManager.error('Fill All Fields', 'Error')
        }


        
    }

    handletransporttype = (e) => {
        this.setState({ transporttype: e.target.value })
    }
    handleisoperable = (e) => {
        this.setState({ isoperable: e.target.value })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    vehiclemodel = () => {
        this.setState({ vehiclemodel: true })
    }

    handleClosevehiclemodel = () => {
        this.setState({
            vehiclemodel: !this.state.vehiclemodel
        });
    }


    handleClose = () => {
        this.setState({
            open: !this.state.open
        });
    }


    handleaddvehicle = () => {
        this.state.vehicle.push(
            {

                model: this.state.model,
                modelyear: this.state.modelyear,
                make: this.state.make,
                vehicletype: this.state.vehicletype,
                isoperable: this.state.isoperable
            }
        )
        this.handleClosevehiclemodel();
    }
    handleremovevehicle = (i) => {
        this.state.vehicle.splice(i, 1)
        // this.setState({ vehiclecount: this.state.vehiclecount - 1 })

    }


    render() {

        // const vehiclefields = [];
        // for (let i = 1; i <= this.state.vehiclecount; i++) {
        //     vehiclefields.push(
        //         < div key={i}>
        //             {/* =======================================Vehicle Start===================================================== */}




        //             {/* =======================================Vehicle end===================================================== */}
        //         </div>
        //     )
        // }



        return (
            <div>
                <NotificationContainer  />

                <Button onClick={this.handleClose} variant='contained'
                    sx={{
                        fontSize: 20, width: 200, height: 56, marginBottom: 0, marginLeft: 5,
                        borderRadius: 50,
                        backgroundColor: '#E8F8F9', color: '#009B9B',
                        "&:hover": {
                            backgroundColor: '#009B9B',
                            color: '#E8F8F9'
                        }
                    }}
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
                                    Ship Date
                                </Typography>

                                <input style={{ width: 220, marginLeft: 8, marginTop: 10 }}
                                    type="date" name='shipdate' onChange={this.onChange} />


                                <hr />
                                <Typography variant="h6" component="h2">
                                    Transport Type
                                </Typography>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>

                                    <InputLabel id="demo-simple-select-standard-label">Transport Type</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.transporttype}
                                        onChange={this.handletransporttype}
                                        label="Select Template"
                                    >
                                        <MenuItem value={1} >1</MenuItem>
                                        <MenuItem value={2} >2</MenuItem>
                                        <MenuItem value={3} >3</MenuItem>

                                    </Select>


                                </FormControl>


                                <hr />
                                <table>
                                    <tr>
                                        <th style={{ paddingLeft: 1 }} > </th>
                                        <th style={{ paddingLeft: 20 }} > Year</th>
                                        <th style={{ paddingLeft: 50 }}> Make</th>
                                        <th style={{ paddingLeft: 50 }}> Model</th>
                                        <th style={{ paddingLeft: 50 }}> vehicletype</th>
                                        <th style={{ paddingLeft: 50 }}> *</th>
                                    </tr>
                                    {this.state.vehicle.map((vehicle, i) => (
                                        < tr key={i}  >
                                            <td style={{ paddingLeft: 1 }} > {i + 1})</td>
                                            <td style={{ paddingLeft: 20 }} > {vehicle.modelyear}</td>
                                            <td style={{ paddingLeft: 50 }} > {vehicle.make}</td>
                                            <td style={{ paddingLeft: 50 }}> {vehicle.model}</td>
                                            <td style={{ paddingLeft: 50 }}> {vehicle.vehicletype}</td>
                                            <td>
                                                <Button onClick={() => this.handleremovevehicle(i)} variant='contained'
                                                    sx={{ fontSize: 12, width: 10, marginLeft: 3, marginBottom: 1, backgroundColor: 'red', borderRadius: 100 }}
                                                >
                                                    -
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </table>

                                {/* vehicle area */}


                                <Button onClick={this.vehiclemodel} variant='contained'
                                    sx={{ fontSize: 12, width: 10, marginTop: 3, marginLeft: 0, backgroundColor: 'green', borderRadius: 100 }}
                                >
                                    +
                                </Button>
                                <Modal
                                    open={this.state.vehiclemodel}
                                    onClose={this.handleClosevehiclemodel}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    sx={{ overflowY: 'scroll', height: 600 }}
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
                                                Add Vehicle
                                            </Typography>
                                            <hr />
                                            <Typography variant="h6" component="h2">
                                                Vehicle Detail
                                            </Typography>
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
                                                name='model'
                                                label="Model"
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
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>

                                                <InputLabel id="demo-simple-select-standard-label">is  Operable?</InputLabel>

                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    value={this.state.isoperable}
                                                    onChange={this.handleisoperable}
                                                    label="is Operable"
                                                >
                                                    <MenuItem value={0} >No</MenuItem>
                                                    <MenuItem value={1} >Yes</MenuItem>

                                                </Select>


                                            </FormControl>

                                            <Button onClick={this.handleaddvehicle} variant='contained'
                                                sx={{ fontSize: 27, width: 10, marginTop: 1, marginLeft: 0, backgroundColor: 'black', borderRadius: 100 }}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>









                                {/* {this.state.vehiclecount > 1 &&
                                    <Button onClick={this.handleremovevehicle} variant='contained'
                                        sx={{ fontSize: 27, width: 10, marginTop: 1, marginLeft: 0, backgroundColor: 'red', borderRadius: 100 }}
                                    >
                                        -
                                    </Button>
                                } */}

                                {/* vehicle area */}



                                <div>
                                    <Button variant='contained'
                                        sx={{
                                            marginTop: 5,
                                            backgroundColor: '#009B9B', color: '#E8F8F9',
                                            "&:hover": {
                                                backgroundColor: '#E8F8F9',
                                                color: '#009B9B'
                                            },
                                            width: 500,
                                            borderRadius: 50, marginLeft: 3
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