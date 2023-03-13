import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider
} from '@mui/material';
import { connect } from 'react-redux';

import { deleteAgent } from '../../actions/agentActions';

class DeleteAgent extends Component {
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
        open: false,
        id: '',
        userid: ''
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.deleteAgent(this.props.id);
        this.handleClose();
    }

    componentDidMount = () => {
        // const user  = this.props.userid;
        const { id, userid } = this.props;
        this.setState({ userid: userid, id: id })
    }

    handleClose = () => {
        this.setState({
            open: !this.state.open
        });
    }


    render() {
        const { user, isLoading } = this.props.auth
        return (
            <>
                {! user && this.props.id ? 'Loading...' :
                    <div>
                        <Button variant="contained" disabled={this.state.id == this.state.userid ? true : false}
                            sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }}
                            onClick={this.handleClose}
                        >Delete
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
                                    <Typography variant="h5" component="h2" sx={{ color: 'red', fontWeight: 'bolder' }} >
                                        DELETE Agent  for Name ----  {this.props.username}
                                    </Typography>

                                    <hr />
                                    <Button variant='contained'
                                        sx={{ marginBottom: 5, backgroundColor: 'red', color: 'white' }}
                                        onClick={this.onSubmit}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>



                    </div>
                }
            </>


        )
    }
}



const mapStateToProps = (state) => ({
    agent: state.agent,
    auth: state.auth
})

export default connect(mapStateToProps, { deleteAgent })(DeleteAgent);