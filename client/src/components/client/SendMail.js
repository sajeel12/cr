import React, { Component } from "react";

import { connect } from "react-redux";
import {
    Typography, Box, Modal, Button,
    TextField

} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { clearErrors } from "../../actions/errorActions";
import { sendMail } from "../../actions/mailActions";
import emailjs from '@emailjs/browser';


class SendMail extends Component {
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    state = {

        open: false,
        company: '',
        template: '',
        subject: ''



    }

    componentDidMount = () => {

        emailjs.init("ff5wgHH4vSzlFJ0j4");

    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        sendMail: PropTypes.func.isRequired
    }


    onTemplate = (e) => {
        this.setState({
            template: e.target.value
        });
        console.log(this.state.template);
        console.log(this.state.template);
        if (this.state.template === "New Qoute Email") {
            this.setState({
                subject: "Thank you for your inquiry - here is your quote for your vehicle transportation"
            });
        }
        console.log(this.state);

    }



    handleChange = (e) => {
        this.setState({
            company: e.target.value
        });
    };

    toggle = () => {
        // clear errors
        this.props.clearErrors();

        this.setState({
            open: !this.state.open
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.props.many) {
            const checkedemail = this.props.checkedemail;
            const checkedids = this.props.checkedids;
            console.log("emails ->", checkedemail)
            console.log("ids ->", checkedids)

            // checkedids.forEach(id => {
            //     checkedemail.forEach(to => {
            //         const mail = {
            //             to,
            //             id,
            //             many: false
            //         }
            //         this.props.sendMail(mail);
            //     })
            // })

        } else {
            const to = this.props.toemail;
            const id = this.props.leadid;
            const {user} = this.props.auth;
            const {email, emailpass}  = user;
            const mail = {
                email,
                emailpass,
                to,
                id,
                many: false
            }
            this.props.sendMail(mail);
        }

    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <Button onClick={this.toggle} variant='contained'
                    sx={{ width: 150, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Send Email
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.toggle}
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
                                Send Email
                            </Typography>

                            <hr />
                            <form  >
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Company</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.company}
                                        onChange={this.handleChange}
                                        label="Company"
                                    >
                                        <MenuItem value="SM Transports" >SM Transports</MenuItem>
                                        <MenuItem value="HS Logistics" >HS Logistics</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Template Name</InputLabel>
                                    <Select
                                        name='company'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.template}
                                        onChange={this.onTemplate}
                                        label="Template"

                                    >
                                        <MenuItem value='New Qoute Email'>New Qoute Email</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField

                                    onChange={this.onChange}
                                    name='from'
                                    id="standard-read-only-input"
                                    label="from"
                                    type="text"
                                    variant="standard"
                                    value={this.props.fromemail}

                                />



                                <TextField

                                    onChange={this.onChange}
                                    name='to'
                                    id="standard-read-only-input"
                                    label="To"
                                    type="text"
                                    variant="standard"
                                    value={this.props.toemail}

                                />

                            </form>

                            <Button variant='contained'
                                sx={{ marginBottom: 5 }}
                                onClick={this.onSubmit}
                            >
                                Send
                            </Button>


                        </Box>



                    </Box>
                </Modal>
            </div>

        )
    };
}

SendMail.propTypes = {
    sendMail: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, sendMail })(SendMail);
