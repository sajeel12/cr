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
import Alert from '@mui/material/Alert';

class SendMailM extends Component {
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
        subject: '',
        success: false,



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
       
        if (this.state.template === "New Qoute Email") {
            this.setState({
                subject: "Thank you for your inquiry - here is your quote for your vehicle transportation"
            });
        }

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
        const checkedemail = this.props.checkedemail;



        checkedemail.forEach(toemail => {

            var templateParams = {
                from_name: this.state.company,
                to_name: this.props.name,
                from_email: this.props.fromemail,
                to_email: toemail,
                message: ' Assalam-o-Alaikum Amir You are hired at MasoomNetwork  congratulation '
            };

            const servicei = this.props.fromemail;
            const serviceid = servicei.split("@");

            emailjs.send(serviceid[0], 'template_f9jakzq', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    console.log('FAILED...', error);
                });
                
              
            });
            
         this.toggle();
        // sendMail(mail);





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
                        {this.state.success ? (<Alert severity="success">This is a success alert — check it out!</Alert>)
                        : null}
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
                                    value={user.email}
                                />

                                <Typography variant="h7" component="h2">
                                    To
                                </Typography>

                                <div>
                                    {this.props.checkedemail.map((mail) => (
                                        <div>
                                            <span style={{ fontSize: 14 }}  > {mail} </span>
                                        </div>

                                    ))
                                    }
                                </div>


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

// SendMail.propTypes = {
//     sendMail: PropTypes.func.isRequired,
// }


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors })(SendMailM);
