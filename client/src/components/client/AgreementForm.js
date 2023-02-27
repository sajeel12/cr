import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField, Container, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAgreement, addAgreement } from '../../actions/agreementAction';
import { Navigate } from 'react-router-dom';




export class AgreementForm extends Component {

    style = {
        paddingLeft: 5
    }


    agreements = this.props.agreement;

    state = {
        ip: {},
        agree: true,
        leadid: '',
        lead: {},
        electronicsignature: '',

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
        modelyear: '',
        make: '',
        vehicletype: '',
        price: ''



    }
    static = {
        // getAgreement: PropTypes.func.isRequired,
        addAgreement: PropTypes.func.isRequired,
        agreement: PropTypes.object.isRequired
    }




    getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/https://geolocation-db.com/json/a9e48c70-8b22-11ed-8d13-bd165d1291e3')
        console.log(res.data);
        this.setState({ ip: res.data });
        console.log('ip = ', this.state.ip.IPv4);
    }

    componentDidMount = () => {
        const lead_id = this.props.params.get("hash_id");
        this.props.getAgreement(lead_id);
        this.getData();
        this.setAgreeState();

        console.log("from Wrapper", this.props.agree);
    }



    onChangeAgree = () => {
        this.setState({ agree: !this.state.agree })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.props.agreement.agreements.fullname);
    }

    onGetData = () => {
        this.setState({ lead: this.props.agreement.agreements });
        console.log(this.state.lead)
    }

    setAgreeState = () => {

        const { agreements } = this.props.agreement;
        this.setState({
            fullname: agreements.fullname,
            email: agreements.email,
            phoneno: agreements.phoneno,
            origincity: agreements.origincity,
            originaddress: agreements.originaddress,
            origincity: agreements.origincity,
            originstate: agreements.originstate,
            originzipcode: agreements.originzipcode,
            getAgreement: PropTypes.func.isRequired,
            destinationaddress: agreements.destinationaddress,
            destinationcity: agreements.destinationcity,
            destinationstate: agreements.destinationstate,
            destinationzipcode: agreements.destinationzipcode,
            model: agreements.model,
            modelyear: agreements.modelyear,
            make: agreements.make,
            vehicletype: agreements.vehicletype,
            price: agreements.price
        })
    }

    onSubmit = () => {

        // console.log(this.state.lead);

        const agreement = {
            leadid: this.props.params.get("hash_id"),

            electronicsignature: this.state.electronicsignature,
            ip: this.state.ip.IPv4,
            agreementurl: window.location.href,

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
            vehicletype: this.state.vehicletype
        }
        this.props.addAgreement(agreement);
        window.location.reload()
        // console.log(agreement)

    }


    render() {

        // const lead_id = this.props.params.get("hash_id");
        // console.log("hash_id", this.state.leadid);
        // console.log("lead from render", this.state.lead);

        const { agreements, loading } = this.props.agreement;

        return (
            <>
                {
                    loading ? 'Loading...' : 
                        <div style={{ overflowY: 'scroll', maxHeight: 600 }} >

                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static" sx={{ backgroundColor: 'black', height: 70, justifyContent: 'center' }} >
                                    <Toolbar variant="dense">

                                        <Typography variant="h6" color="inherit" component="div">
                                            HS Logistics  Agreement
                                        </Typography>
                                    </Toolbar>
                                </AppBar>



                            </Box>
                            <Container maxWidth="sm" align='center'  >
                                <div style={{ marginTop: 20 }} >
                                    {/* ==================================================== */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}
                                        >
                                            <Typography>Contact Info</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>


                                            <TextField
                                                onChange={this.onChange}
                                                name='fullname'
                                                value={this.state.fullname}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Full Name" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='email'
                                                value={this.state.email}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Email" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='phoneno'
                                                value={this.state.phoneno}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Phone" variant="standard" />



                                        </AccordionDetails>
                                    </Accordion>
                                    {/* ================================================================== */}
                                    {/* ============================= origin ======================= */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}

                                        >
                                            <Typography>Origin </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>


                                            <TextField
                                                onChange={this.onChange}
                                                name='originadress'
                                                value={this.state.originaddress}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Origin Address" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='origincity'
                                                value={this.state.origincity}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Origin City" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='originstate'
                                                value={this.state.originstate}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Origin State" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='originzipcode'
                                                value={this.state.originzipcode}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Origin Zip Code" variant="standard" />



                                        </AccordionDetails>
                                    </Accordion>
                                    {/* ================================================================== */}
                                    {/* ============================= desitnation ======================= */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}
                                        >
                                            <Typography>Destination </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>


                                            <TextField
                                                onChange={this.onChange}
                                                name='destinationaddress'
                                                value={this.state.destinationaddress}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Destination Address" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='destinationcity'
                                                value={this.state.destinationcity}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Destination City" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='destinationstate'
                                                value={this.state.destinationstate}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Destination State" variant="standard" />
                                            <TextField
                                                onChange={this.onChange}
                                                name='destinationzipcode'
                                                value={this.state.destinationzipcode}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Destination Zip Code" variant="standard" />



                                        </AccordionDetails>
                                    </Accordion>
                                    {/* ================================================================== */}
                                    {/* ============================= Shipment ======================= */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}
                                        >
                                            <Typography>SHIPMENT INFO </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Vehicle </Typography>
                                            <table>
                                                <tr>
                                                    <th style={{ paddingLeft: 20 }} > Year</th>
                                                    <th style={{ paddingLeft: 20 }}> Make</th>
                                                    <th style={{ paddingLeft: 20 }}> Model</th>
                                                </tr>
                                                <tr >
                                                    <td style={{ paddingLeft: 20 }} > {this.state.modelyear}</td>
                                                    <td style={{ paddingLeft: 20 }} > {this.state.make}</td>
                                                    <td style={{ paddingLeft: 20 }}> {this.state.model}</td>
                                                </tr>
                                            </table>
                                            <hr />
                                            <Typography>PRICE </Typography>
                                            <br />
                                            <p> <b> Total</b> &nbsp;&nbsp;&nbsp;  {this.state.price}$ </p>


                                        </AccordionDetails>
                                    </Accordion>

                                    {/* ================================================================== */}
                                    {/* ============================= Acceptance ======================= */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}
                                        >
                                            <Typography> ACCEPTANCE </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p style={{
                                                fontSize: 11,
                                                fontWeight: 'bold',
                                                color: '#838383',
                                                textAlign: 'left'
                                            }} >By selecting "I Agree" and entering my full name as a binding electronic
                                                signature I understand that an electronic signature has the same legal
                                                effect and can be enforced in the same way as a written signature.
                                                Furthermore, I hereby accept terms and conditions
                                                of service as described in the "Terms and Conditions" section below.</p>
                                            <br />
                                            <TextField
                                                onChange={this.onChange}
                                                name='electronicsignature'
                                                sx={{ width: 300, marginBottom: 2 }}
                                                id="standard-basic" label="Electronic Signature" variant="standard" />
                                            <p style={{ textAlign: 'left' }} >Your IP Address </p>
                                            <TextField
                                                sx={{ width: 300 }}
                                                id="standard-basic-readonly" disabled value={this.state.ip.IPv4} label="" variant="standard" />

                                            <FormGroup sx={{ marginTop: 2 }} >
                                                <FormControlLabel onChange={this.onChangeAgree} control={<Checkbox />} label="I Agreed to the all Terms And Condition mention below" />
                                            </FormGroup>

                                        </AccordionDetails>
                                    </Accordion>
                                    {/* ================================================================== */}
                                    {/* ============================= Terms And condition ======================= */}
                                    <Accordion  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{ backgroundColor: '#D9E2E6' }}
                                        >
                                            <Typography> TERMS AND CONDITIONS </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p style={{
                                                fontSize: 11,
                                                fontWeight: 'bold',
                                                color: '#838383',
                                                textAlign: 'left'
                                            }} >1) The carrier and driver jointly and separately are authorized to operate and transport his/her or their motor vehicle between its pickup location and the destination. While every effort will be made to confirm a driver for the estimated date and price, no guarantee of pickup or delivery date can be made. Changes may occur in both due to carrier schedules, mechanical failure, inclement weather, acts of God, among other unforeseen circumstances. HS Logistics will not be responsible for any charges or liabilities incurred due to delay of pickup or delivery. This includes but is not limited to airline tickets or rental car fees. The client will be given the carrier’s schedule at the time of dispatch.
                                                2) The client agrees to not contract any other broker or carrier during the respective time which corresponds with their shipping option. Any client that is found working with another broker or carrier during this period, is subject to a non-refundable deposit fee.
                                                3) Contracted carriers provide door to door transport if the truck driver can physically reach the pick-up and delivery addresses. If access to the pickup or delivery location is restricted by narrow streets, low- hanging trees or tight turns, the driver may ask that you meet the truck at a large parking lot nearby, such as a grocery store.
                                                4) Carriers are not licensed or insured to transport any personal or household goods, however, we do understand that you may need to put some items in the vehicle. Carrier is not liable for damage caused to the vehicle from excessive or improper loading of personal items. These items must be put in the trunk and kept to a limit of 100 lbs. Any exceptions must be previously discussed and approved by HS Logistics. An additional fee may be assessed for personal items of any weight. Any misrepresentation of the personal belongings will result in a change of price and/or a dry run fee of $150 if a carrier is made to attend the scene of the pick-up and the shipment is different from expected. If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper.
                                                5) Vehicles must be tendered to the carrier in good running condition with no more than a half tank of fuel. Carrier will not be liable for damage caused by leaking fluids, freezing, exhaust systems, or antennas not tied down. Any claim for loss or damage must be noted and signed on condition report at time of delivery.
                                                6) Trucking damage claims are covered by carriers from $100,000 up to $250,000 cargo insurance per load, and a minimum of 3/4 of a million dollars public liability and property damage. Any damage incurred to a vehicle during transport falls directly under the responsibility of the carrier and not HS Logistics. All carriers contracted will have insurance to cover damage caused by the driver or theft during transport. If damage is done, HS Logistics. will provide you with a full insurance packet for thecarrier to file a claim. All claims must be noted and signed for at time of delivery and submitted in writing within 15 days of delivery.
                                                7) If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper. If for any reason the vehicle becomes unavailable during a scheduled pick-up window, after an order has been placed, HS Logistics will not refund the deposit amount.
                                                8) The client should under no circumstances release or receive vehicle(s) from a carrier without an inspection report (Bill of Lading/BOL) regardless of the time of day or the weather conditions. Failure to do so may result in the client’s inability to file a damage claim. Carriers insurance will only process claims for damages due to the carrier’s own negligence. Damage must be reported to HS Logistics within 24 hours of delivery. Damage must be clearly listed on the BOL and signed by the driver (no exceptions). If there is damage during transport, the client must notate those damages on the final inspection report, pay the remaining balance stated on this agreement, and then contact the carrier’s main office as well as the carrier's insurance company. Failure to notate any damage on the final inspection report releases the carrier of any liability and would result in the inability to process a damage claim.
                                                09) A $150.00 non-operational fee will be charged for all non-running vehicles. This will be included in the final quote received from HS Logistics. If the vehicle becomes non-operational during transport, this fee will be applied to the original quote. Final quote will be provided to the customer at the time of dispatching with the carrier for the pickup of the vehicle.
                                                10) HS Logistics agrees to provide a carrier to transport your vehicle as promptly as possible in accordance with your instructions but cannot guarantee pick-up or delivery on a specified date. A cancellation fee of $200 will be charged for orders canceled 7 days before the requested available pick- up date. HS Logistics does not agree to pay for your rental of a vehicle, nor shall it be liable for failure of mechanical or operating parts of your vehicle. Shipper warrants that he/she will pay the price quoted due HS Logistics for delivered vehicles and will not seek to charge back a credit card. This agreement and any shipment here under is subject to all terms and conditions of the carrier’s tariff and the uniform straight bill of lading, copies of which are available at the office of the carrier.
                                                11) This agreement shall be governed by and construed in accordance with the laws of the State of California. The parties further agree that any legal action arising out of this agreement must be filed in a court of jurisdiction, and HS Logistics liability is limited to the amount of money HS Logistics broker’s fee only. The client hereby submits to the jurisdiction of such courts and waives any right to jurisdiction in any other location. I hereby agree to the transport terms provided by HS Logistics. I authorize a small down payment to be paid to HS Logistics via a credit or debit card or check by phone or mail. I further understand that any remaining balance is due on delivery and that it must be paid in full via cash, cashier’s check, and money order, to the authorized transporter.</p>
                                            <br />

                                        </AccordionDetails>
                                    </Accordion>
                                    {/* ================================================================== */}
                                    <br />
                                    <Button onClick={this.onSubmit} variant='contained'
                                        disabled={this.state.agree ? true : false}
                                        sx={{
                                            width: 150, backgroundColor: 'black', borderRadius: 50,
                                            "&:hover": {
                                                backgroundColor: 'green'
                                            }
                                        }}
                                    >
                                        Agree
                                    </Button>
                                    <Button onClick={this.onGetData} variant='contained'

                                        sx={{
                                            width: 150, backgroundColor: 'black', borderRadius: 50,
                                            "&:hover": {
                                                backgroundColor: 'green'
                                            }
                                        }}
                                    >
                                        get pre daa
                                    </Button>
                                    <br />

                                </div>
                            </Container >
                        </div >
                       

                }
            </>
        )
    }
}

AgreementForm.propTypes = {
    getAgreement: PropTypes.func.isRequired,
    addAgreement: PropTypes.func.isRequired,
    agreement: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    agreement: state.agreement
});


export default connect(mapStateToProps, { getAgreement, addAgreement })(AgreementForm);