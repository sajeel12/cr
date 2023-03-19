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
import { getAgreement } from '../../actions/agreementAction';
import { Modal } from '@mui/material';
import { print, Preview } from 'react-html2pdf';
import moment from 'moment';

export class Agreement extends Component {

    // style = {
    //     paddingLeft: 5
    // }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'
    };


    state = {
        open: false
    };

    agreements = this.props.agreement;


    componentDidMount = () => {
        const lead_id = this.props.params.get("hash_id");
        this.props.getAgreement(lead_id);

    }

    onPdf = () => {
        console.log('In Pdf function ')
        print('a', 'toPrint');
    }

    handleClose = () => {
        this.setState({
            open: !this.state.open
        })
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
                        <div id='capture' style={{ overflowY: 'scroll', maxHeight: 600 }} >

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
                                                disabled
                                                name='fullname'
                                                value={agreements.fullname}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Full Name" variant="standard" />
                                            <TextField
                                                disabled
                                                name='email'
                                                value={agreements.email}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Email" variant="standard" />
                                            <TextField
                                                disabled
                                                name='phoneno'
                                                value={agreements.phoneno}
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
                                                disabled
                                                name='originadress'
                                                value={agreements.originaddress}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Origin Address" variant="standard" />
                                            <TextField
                                                disabled
                                                name='origincity'
                                                value={agreements.origincity}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Origin City" variant="standard" />
                                            <TextField
                                                disabled
                                                name='originstate'
                                                value={agreements.originstate}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Origin State" variant="standard" />
                                            <TextField
                                                disabled
                                                name='originzipcode'
                                                value={agreements.originzipcode}
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
                                                disabled
                                                name='destinationaddress'
                                                value={agreements.destinationaddress}
                                                sx={{ width: 300 }}
                                                id="standard-basic" label="Destination Address" variant="standard" />
                                            <TextField
                                                disabled
                                                name='destinationcity'
                                                value={agreements.destinationcity}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Destination City" variant="standard" />
                                            <TextField
                                                disabled
                                                name='destinationstate'
                                                value={agreements.destinationstate}
                                                sx={{ width: 300, marginTop: 2 }}
                                                id="standard-basic" label="Destination State" variant="standard" />
                                            <TextField
                                                disabled
                                                name='destinationzipcode'
                                                value={agreements.destinationzipcode}
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
                                                {agreements.vehicle.map((vehicle) => (
                                                    < tr >
                                                        <td style={{ paddingLeft: 20 }} > {vehicle.modelyear}</td>
                                                        <td style={{ paddingLeft: 20 }} > {vehicle.make}</td>
                                                        <td style={{ paddingLeft: 20 }}> {vehicle.model}</td>
                                                    </tr>
                                                ))}
                                            </table>
                                            <hr />
                                            <Typography>PRICE </Typography>
                                            <br />
                                            <p> <b> Total</b> &nbsp;&nbsp;&nbsp;  {agreements.price}$ </p>


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
                                                disabled
                                                name='electronicsignature'
                                                sx={{ width: 300, marginBottom: 2 }}
                                                id="standard-basic" label="Electronic Signature" variant="standard"
                                                value={agreements.signature}
                                            />
                                            <p style={{ textAlign: 'left' }} >Your IP Address </p>
                                            <TextField
                                                sx={{ width: 300 }}
                                                id="standard-basic-readonly" disabled value={agreements.ip} label="" variant="standard" />

                                            <FormGroup sx={{ marginTop: 2 }} >
                                                <FormControlLabel control={<Checkbox disabled checked />} label="I Agreed to the all Terms And Condition mention below" />
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

                                    <br />

                                </div>
                            </Container >
                        </div >
                }
                <Button onClick={this.handleClose} variant='contained'
                    sx={{
                        width: 150, backgroundColor: 'black', borderRadius: 50,
                        "&:hover": {
                            backgroundColor: 'green'
                        }
                    }}
                >
                    save as pdf
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowY: 'scroll', height: 700, }}
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

                            <Preview id={'toPrint'} >

                                <div className="modal-body " style={{
                                    marginTop: 50,
                                    marginBottom: 30,
                                    marginLeft: 30,
                                    marginRight: 30

                                }} id="invoicee">

                                    <div className="invpoiceheading" style={{ marginTop: 20 }} >
                                        <b>INVOICE</b>
                                    </div>
                                    <div className="logoandnumber ">
                                        <div className="logoo">
                                            <h1>SM Transports</h1>
                                        </div>
                                        <div className="numberr">
                                            {/* {agreements.phoneno} */}
                                        </div>
                                    </div>
                                    <div className="ordernumbr">
                                        <h6>ORDER# {agreements.leadid} </h6>
                                    </div>
                                    <div className="customeralex d-flex">
                                        <div className="" style={{ width: 300 }}>
                                            <h6>Customer: {agreements.fullname} </h6>
                                        </div>
                                        <div className="d-flex justify-content-start" style={{ width: 200 }}>
                                            <h6>Order Date</h6>
                                            {moment(agreements.recieveddate).format("ddd, MMM D YYYY")}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="customerinfo"><b>Phone : </b> {agreements.phoneno} <br />
                                            <b>Order Date : </b> {agreements.recieveddate} <br />
                                            {/* <b>Payment Method : </b> COD */}
                                        </div>
                                        <div className="orderpayment">

                                        </div>
                                    </div>
                                    <div className="dialog d-flex justify-content-between">
                                        <div className="dialogbox1">
                                            <p>We do bumper to bumper insurance (includes up to $250,000 Carrier's insurance),
                                                door-to-door shipment, including all the tolls and taxes, and 100 lbs. of personal
                                                belongings with absolutely no hidden charges</p>
                                        </div>
                                        <div className="dialogbox2">
                                            <div className="box2heading">
                                                <b>PRICE AND PAYMENT</b>
                                            </div>
                                            <div className="p-2">
                                                {/* <b>First Payment : </b> $3443 <br />
                                                <b>First Payment Due : </b> $24 <br />
                                                <b>Next Payment : </b> $554 <br />
                                                <b>Next Payment Due : </b> $4554 <br /> */}
                                                <b>Total Tariff : </b> ${agreements.price}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="shippmentdetails mt-3">
                                        <div className="w-100 text-center">
                                            <h5><b>Shippment Details</b></h5>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Transport Type : 1</th>
                                                    <th>Available Pickup Date : {agreements.shipdate}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Vehicles</td>
                                                    <td></td>
                                                </tr>
                                                {agreements.vehicle.map((vehicle) => (
                                                    < tr >

                                                        <td>->> {vehicle.modelyear}, {vehicle.make}, {vehicle.model}  </td>
                                                    </tr>
                                                ))}


                                                <tr>
                                                    <td>Origin: {agreements.origincity}, {agreements.originstate}, {agreements.originzipcode}</td>
                                                    <td>Destination:  {agreements.destinationcity}, {agreements.destinationstate}, {agreements.destinationzipcode}</td>

                                                </tr>
                                                {/* <tr>
                                                    <td>{agreements.origincity} {agreements.originstate} {agreements.originzipcode}</td>
                                                    <td> {agreements.destinationcity} {agreements.destinationstate} {agreements.destinationzipcode}</td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="details ">
                                        <div className="text-center w-100 mt-3">
                                            <h5><b>DIGITAL SIGNATURE CERTIFICATE</b></h5>
                                        </div>
                                        <p className="mt-1" style={{ fontSize: 13, marginLeft: 10 }}>By selecting "I Agree" and entering
                                            my full name as a binding electronic
                                            signature I understand that an electronic signature has the same legal effect and can be
                                            enforced in the same way as a written signature. Furthermore, I hereby accept the terms and
                                            conditions of service as described in the "Term" section below</p>
                                        <div className="d-flex">
                                            <div className="detailbox">
                                                <b>Electronic Signature : </b> "{agreements.signature}"  <br />
                                                <p>This Link represents the permanent URL(Agreement) of
                                                    SM Transport Solutions. <br />
                                                    <a href={agreements.agreementurl}>{agreements.agreementurl}</a>
                                                </p>
                                                {/* <b>Signed and Accepted On: </b>Jan 12, 2023 */}
                                                <br />
                                                <p> <b>Your IP Adress : </b>  {agreements.ip} </p>
                                            </div>
                                            {/* <div className="detailbox d-flex justify-content-center">
                                                <img src="imgawaisia/qr.png" alt="d" width="120px" height="120px" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                            </Preview>

                            <Button onClick={this.onPdf} variant='contained'
                                sx={{
                                    width: 150, backgroundColor: 'black', borderRadius: 50,
                                    "&:hover": {
                                        backgroundColor: 'green'
                                    }
                                }}
                            >
                                save as pdf
                            </Button>
                        </Box>
                    </Box>
                </Modal>

            </>
        )
    }
}

Agreement.propTypes = {
    getAgreement: PropTypes.func.isRequired,
    agreement: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    agreement: state.agreement
});


export default connect(mapStateToProps, { getAgreement })(Agreement);