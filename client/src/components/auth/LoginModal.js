import React, { Component } from 'react'
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';



class Login extends Component {

    state = {
        modal: false,
        submitted: false,
        username: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for  regiser error
            if (error.id === 'LOGIN_FAIL') {
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

    toggle = () => {
        // clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit = (e) => {
        e.preventDefault();
        console.log("salalm")

        const { username, password } = this.state;

        // create user object 

        const newUser = {

            username,
            password
        };

        // attemp to login
        this.props.login(newUser);

        // this.setState({ submitted: true })

        // if(isAuthenticated){

        // }
    }


    render() {
        return (

            <div className='image_container' >
                <div className='log_nav' >
                    <h3>HS Logistics</h3>
                </div>
                <div className='log_container' >
                    <div className='log_box' >
                        <div style={{ height: 60 }} >
                            {this.state.msg ? (<Alert severity="error"> {this.state.msg}</Alert>)
                                : null}
                        </div>
                        <TextField className='textfield'
                            sx={{ backgroundColor: 'white', width: 300 }}
                            name="username"
                            id="outlined-required"
                            label="username"
                            onChange={this.onChange}

                        />
                        <TextField className='textfield'
                            sx={{ marginTop: 2, backgroundColor: 'white', width: 300 }}
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={this.onChange}

                        />
                        <Button variant="contained"
                            onClick={this.onSubmit}
                            sx={{
                                marginTop: 5, width: 300, backgroundColor: 'black'
                                ,
                                "&:hover": {
                                    backgroundColor: '#636363'
                                }
                            }}
                        >Login</Button>

                    </div>
                </div>
                </div>

        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);