import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider
} from '@mui/material';
import {connect} from 'react-redux';

import { deleteLeadM } from '../../actions/leadActions';

class DeleteLeadM extends Component {
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
        open: false
    }

    onSubmit = e => {
        e.preventDefault();

        const leadtodelete = {
            ids: this.props.checkedids
        }

        this.props.deleteLeadM(leadtodelete);
        this.handleClose();
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
            <>
                <Button variant="contained"
                    sx={{ width: 170, marginBottom:1, marginRight:1, backgroundColor: 'black', 
                    borderRadius: 50,
                    "&:hover": {
                        backgroundColor:'red'
                          } }}
                    onClick={this.handleClose}
                >Delete Leads
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
                            <Typography variant="h5" component="h2" sx={{  color: 'red', fontWeight:'bolder' }} >
                                DELETE Leads
                            </Typography>

                            <hr />
                            <Button variant='contained' 
                                sx={{ marginBottom: 5 , backgroundColor:'red', color:'white' }}
                                onClick={this.onSubmit}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Modal>




            </>



        )
    }
}


const mapStateToProps = (state) => ({
    lead:state.lead
})

export default connect(mapStateToProps, {deleteLeadM})(DeleteLeadM);