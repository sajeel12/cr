import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField,
    MenuItem,
    InputLabel,
    Select,
    FormControl

} from '@mui/material';

import Textarea from '@mui/joy/Textarea';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export class SendMsg extends Component {


    // constructor(props) {
    //     super(props);
    //     this.state = {

    //         open: false,
    //         msg: this.msg1,
    //         copy: false,
    //         selected: '',
    //         myProp: props.fullname // initialize state with the prop
    //     };
    // }
    state = {
        open: false,
        msg: this.msg1,
        copy: false,
        selected: '',
        lead: this.props  // initialize state with the prop
    }

    // componentDidMount = () => {
    //     console.log( "props  llll",this.props)
    //     this.setState({name: this.props.name})
    // }



    msg1 = (props) => {
        const msg1 = `
Hey ${props.fullname},
This Is ${this.props.user.fullname} from SM Transports.
We Believe That You're Looking To Ship Your Vehicle. So The Total Quote For Your Vehicle Shipment Is $${props.price}.
It Is All Inclusive having Quote ID: ${props._id}, which Covers Door To Door Service And Bumper To Bumper Insurance up to $250K And You can add 100 lbs of belongings as well.
For Further Details And Discussions. Please Call Me or Text Me Back At (714)-902 6330.
US DOT # 3964435
MC# 1479476`;

        return msg1;
    }

    msg2 = (props) => {
        const msg2 = `
Hello,
${this.props.user.fullname} here from SM Transports.
Just wanted to double-check if your vehicle is ready for pick-up? The quote for your vehicle's move is ${props.price} which is all- inclusive. Please can text or call me with
your questions from 9 AM-7 PM EST. We are fully insured, bonded, and offer door-to-door services. You can contact me for further assistance at (714)-902-6330
Waiting for your response! Thank you`;
        return msg2;
    }

    msg3 = (props) => {
        const msg3 = `
Hello ${props.fullname},
It's ${this.props.user.fullname} with SM Transports. We've got request to move your vehicle with Order ID: ${props._id}. 
I did check the carrier rate going on your route and I can tell that your load can be transported with our company for ${props.price} (all inclusive), with all taxes and fees 
and insurance which is starting from $250,000 up to 1 Million Dollars.
How does this quote sound to you? My direct line is (714)-902-6330, you can give us a call or text me at your convenient time. Thanks!`;
        return msg3;
    }
    msg4 = (props) => {
        const msg4 = `
Hello,
It's ${this.props.user.fullname} with SM Transports and I am only one text away if you have any questions. I've got a driver in your area for $1499 who could pick up your vehicle this week anytime. 
Waiting for your call or text, our direct line is (714)-902-6330. Have a nice day!`;
        return msg4;
    }
    msg5 = (props) => {
        const msg5 = `
Hello,
It's ${this.props.user.fullname} with SM Transports. 
Are you still in need of auto shipping? We can have it transported anytime you want, for just ${props.price} which includes all the taxes and fees, insurance of $250,000 for your vehicle, and door-to-door transportation as well. Please call or text us back at (714)-902-6330 regarding your concerns and questions.
Thank you!
`;
        return msg5;
    }
    msg6 = (props) => {
        const msg6 = `
Hello,
I wanted to follow-up with you regarding
the shipment of your vehicle. If you have
not made arrangements yet or if you've
hired another company and you're not
satisfied with the quality of service you're
receiving, I'm standing by to help. We still
have availability around your area, so if you
need assistance getting your vehicle
picked up, so please give us a call or reply
to (714)-902-6330 for more information
and scheduling options. Thanks!
`;
        return msg6;
    }
    msg7 = (props) => {
        const msg7 = `
Hi,
Are you no longer interested in the shipment? Please let me know either way.
Simply reply with "STOP" and your quote
will automatically cancel from my system.
Thank you.
`;
        return msg7;
    }

    msg8 = (props) => {
        const msg8 = `
Dear ${props.fullname}, 
Your order ${this.props._id} has been dispatched in ${props.price} out of which you've already paid the deposit of $175 and the rest of balance $1000 is to be paid at delivery in cash or certified funds. 
(In-case the pickup gets rescheduled or you cancel the order after dispatching then there will be additional reschedule fee of $150.00 and initial deposit will be non refundable).
`;
        return msg8;
    }


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

    // componentDidMount(prevProps) {
    //     console.log(this.state.name)

    //     this.interval = setInterval(() => {
    //         this.forceUpdate();
    //         if (prevProps.name !== this.props.name) {
    //             this.setState({ name: this.props.name });
    //             console.log(this.props.name)
    //         }
    //     }, 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }


    // componentDidUpdate(prevProps) {
    //     if (prevProps.name !== this.props.name) {
    //         this.setState({ name: this.props.name });
    //     }
    // }

    handleChange = (e) => {
        // this.setState({ fullname: this.props.fullname })

        this.setState({ selected: e.target.value })
        if (e.target.value === '1') {
            const msg1 = this.msg1(this.props);
            this.setState({ msg: msg1 })
        } else if (e.target.value === '2') {
            const msg2 = this.msg2(this.props);
            this.setState({ msg: msg2 })
        } else if (e.target.value === '3') {
            const msg3 = this.msg3(this.props);
            this.setState({ msg: msg3 })
        } else if (e.target.value === '4') {
            const msg4 = this.msg4(this.props);
            this.setState({ msg: msg4 })
        } else if (e.target.value === '5') {
            const msg5 = this.msg5(this.props);
            this.setState({ msg: msg5 })
        } else if (e.target.value === '6') {
            const msg6 = this.msg6(this.props);
            this.setState({ msg: msg6 })
        } else if (e.target.value === '7') {
            const msg7 = this.msg7(this.props);
            this.setState({ msg: msg7 })
        } else {
            const msg8 = this.msg8(this.props);
            this.setState({ msg: msg8 })
        }

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


    }

    static propTypes = {
        user: PropTypes.object.isRequired,
    }



    onClick = () => {
        // e.preventDefault();

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
        // if(this.state.open){
        //     window.location.reload();
        // }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }



    render() {

        // this.setState({lead: this.props})

        return (

            <div key={this.props.name} >
                <Button onClick={this.toggle} variant='contained'
                    sx={{
                        width: 150,
                        backgroundColor: '#E8F8F9', color: '#009B9B',
                        "&:hover": {
                            backgroundColor: '#009B9B',
                            color: '#E8F8F9'
                        },
                        borderRadius: 50
                    }}
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
                                Send Message {this.state.fullname}
                            </Typography>

                            <hr />
                            <form  >

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>

                                    <InputLabel id="demo-simple-select-standard-label">Select Template</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.selected}
                                        onChange={this.handleChange}
                                        label="Select Template"
                                    >


                                        <MenuItem value='1' >1</MenuItem>
                                        <MenuItem value='2' >2</MenuItem>
                                        <MenuItem value='3' >3</MenuItem>
                                        <MenuItem value='4' >4</MenuItem>
                                        <MenuItem value='5' >5</MenuItem>
                                        <MenuItem value='6' >6</MenuItem>
                                        <MenuItem value='7' >7</MenuItem>
                                        <MenuItem value='8' >8</MenuItem>
                                        {/* <MenuItem value={true} ></MenuItem> */}


                                    </Select>


                                </FormControl>

                                <Textarea minRows={8} readOnly
                                    value={this.state.msg}
                                />








                            </form>

                            <CopyToClipboard text={this.state.msg}
                                onCopy={() => this.setState({ copy: !this.setState.copy })}>

                                <Button variant='contained'
                                    sx={{
                                        marginBottom: 1, marginLeft: 40, marginTop: 5, width: 200, borderRadius: 50,
                                        backgroundColor: this.state.copy ?  'green' :'#E8F8F9',color:this.state.copy ? 'white':'#009B9B', 
                                        "&:hover":{
                                            backgroundColor: this.state.copy ?  'green' :'#009B9B',
                                            color:'#E8F8F9'
                                        }, 
// sssssssssssssssssssssssssssssssssssssssssssssssssss
                                        //  backgroundColor:
                                        //     this.state.copy ? 'green' : 'black',
                                        // "&:hover": {
                                        //     backgroundColor: this.state.copy ? 'green' : 'black'
                                        // }
                                    }

                                    }
                                    onClick={this.onClick}
                                >
                                    {this.state.copy ? 'Copied' : 'Copy To Clipboard'}


                                </Button>

                            </CopyToClipboard>





                        </Box>



                    </Box>
                </Modal>
            </div >




        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(SendMsg);