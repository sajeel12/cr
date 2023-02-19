import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import AgentAdmin from './AgentAdmin';
export class AgentAdmin2 extends Component {
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 240,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    state = {
        open: false
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
                    sx={{ width: 170, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Agent Activity
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
                            


                            <AgentAdmin  idt={this.props.idt}  />
                        </Box>
                    </Box>
                </Modal>

            </div>
        )
    }
}

export default AgentAdmin2