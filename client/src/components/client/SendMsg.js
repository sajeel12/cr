import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField

} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export class SendMsg extends Component {



     msg1 = `Hello,
     ... here from SM Transports.
     Just wanted to double-check if your vehicle is ready for pick-up? The quote for your vehicle's move is $450 which is all- inclusive. Please can text or call me with your questions from 9 AM-7 PM EST. We are fully insured, bonded, and offer door-to-door services. You can contact me for further assistance at (714)-902-6330
     Waiting for your response! Thank you`;



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



    render() {
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

                               

                               
                                <TextField


                                    id="standard-read-only-input"
                                    label="Subject"
                                    type="text"
                                    variant="standard"
                                    value={this.state.subject}

                                />


                                <TextField

                                    onChange={this.onChange}
                                    name='to'
                                    id="standard-read-only-input"
                                    label="To"
                                    type="text"
                                    variant="standard"
                                    value={this.props.email}

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
    }
}

export default SendMsg