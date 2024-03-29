import React, { Component } from "react";
import {
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from "react-redux";
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { register, updateUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


class UpdateUser extends Component {

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
        agent: 'Agent',
        open: false,
        isadmin: false,
        username: this.props.username,
        fullname: this.props.fullname,
        email: this.props.email,
        emailpass: this.props.emailpass,
        phoneno: this.props.phoneno,
        password: '',
        show: false
    }

    handleClickShowPassword = () => {
        this.setState({
            show: !this.state.show
        });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for  regiser error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }
    toggleAdmin = () => {
        this.setState({
            isadmin: !this.state.isadmin
        });

    }

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

        const { isadmin, username, fullname, email, emailpass, phoneno, password } = this.state;

        // create user object 

        const newUser = {
            isadmin,
            username,
            fullname,
            email,
            emailpass,
            phoneno,
            password
        };

        // attemp to register
        this.props.updateUser(newUser);

        console.log(newUser);
        this.toggle();
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} variant='contained'
                    sx={{
                        width: 70,
                        backgroundColor: '#E8F8F9', color: '#009B9B',
                        "&:hover": {
                            backgroundColor: '#009B9B',
                            color: '#E8F8F9'
                        },
                        borderRadius: 50
                    }}
                >
                    Edit

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
                                Update User
                            </Typography>

                            <hr />
                            <Button variant='contained'
                                sx={{ marginBottom: 0, marginLeft: 0, backgroundColor: 'orange', color: 'black' }}
                                onClick={this.toggleAdmin}
                            >
                                {this.state.isadmin ? 'Admin' : 'Agent'}
                            </Button>
                            <form  >
                                <TextField
                                    onChange={this.onChange}
                                    name='fullname'
                                    id="standard-required"
                                    label="Full Name"
                                    type="text"
                                    variant="standard"
                                    value={this.state.fullname}
                                />
                                <TextField
                                    onChange={this.onChange}
                                    name='username'
                                    id="standard-required"
                                    label="Username "
                                    type="text"
                                    variant="standard"
                                    value={this.state.username}

                                />
                                <TextField
                                    onChange={this.onChange}
                                    name='email'
                                    id="standard-required"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    value={this.state.email}

                                />

                                <TextField
                                    onChange={this.onChange}
                                    name='emailpass'
                                    id="standard-required"
                                    label="Email Password"
                                    type="text"
                                    variant="standard"
                                    value={this.state.emailpass}

                                />

                                <TextField
                                    onChange={this.onChange}
                                    name='phoneno'
                                    id="standard-required"
                                    label="Phone No"
                                    type="text"
                                    variant="standard"
                                    value={this.state.phoneno}

                                />
                                <div style={{ display: 'flex' }} >


                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            name="password"
                                            onChange={this.onChange}
                                            id="standard-adornment-password"
                                            type={this.state.show ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.show ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>



                                </div>
                            </form>

                            <Button variant='contained'
                                sx={{
                                    marginBottom: 5,
                                    backgroundColor: '#009B9B', color: '#E8F8F9',
                                    "&:hover": {
                                        backgroundColor: '#E8F8F9',
                                        color: '#009B9B'
                                    },
                                    borderRadius: 50
                                }}
                                onClick={this.onSubmit}
                            >
                                Update Agent
                            </Button>


                        </Box>



                    </Box>
                </Modal>
            </div>

        )
    };
}

UpdateUser.propTypes = {
    register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { updateUser, clearErrors })(UpdateUser);
