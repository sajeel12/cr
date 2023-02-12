import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField

} from '@mui/material';

import Textarea from '@mui/joy/Textarea';


export class SendMsg extends Component {



    msg1 = `
     Hey ${this.props.fullname}, great to hear from you.
     So here is your requested quote, $${this.props.price},
     for ${this.props.modelyear} ${this.props.make} ${this.props.model} from 
     Origin: Farmington, MI 48334 
     Destination: ${this.props.destinationcity}, GA, ${this.props.destinationzipcode}
     Your quote number is ${this.props._id}.
     The services include:
     1- Door-To-Door Shipment, 
     2- Bumper to bumper insurance (includes up to $250,000 Carrier's insurance),
     3- Including all the Tolls and Taxes.
     4- You can put 100lbs of personal belongings.
     ${this.props.owner.fullname} 
     (714) 786-6661 
     HS LOGISTICS`;



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
        msg: this.msg1,
        copy: false



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

    onClick = (e) => {
        e.preventDefault();

        navigator.clipboard.writeText(this.state.msg);
        this.setState({
            copy: !this.setState.copy
        });
    }

    toggle = () => {
        // clear errors

        this.setState({
            open: !this.state.open
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }



    render() {
        return (

            <div>
                <Button onClick={this.toggle} variant='contained'
                    sx={{ width: 150, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Send MSG

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
                                Send Message
                            </Typography>

                            <hr />
                            <form  >



                                <Textarea minRows={8} readOnly
                                    value={this.state.msg}
                                />








                            </form>
                            <Button variant='contained'
                                sx={{
                                    marginBottom: 1, marginLeft: 40, marginTop: 5, width: 200, borderRadius: 50, backgroundColor:
                                        this.state.copy ? 'green' : 'black',
                                        "&:hover": {
                                            backgroundColor: this.state.copy ? 'green' : 'black'
                                              }
                                }
                                
                            }
                            onClick={this.onClick}
                            >
                            {this.state.copy ? 'Copied' : 'Copy To Clipboard'}


                        </Button>




                    </Box>



                </Box>
            </Modal>
            </div >




        )
    }
}

export default SendMsg