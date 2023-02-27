import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Navigate } from "react-router-dom";

class LoginModel extends Component {
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
            <div>

                <NavLink onClick={this.toggle} href="#"  >
                    Login
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle} >Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger" >{this.state.msg}</Alert>)
                            : null}
                        <Form onSubmit={this.onSubmit} >
                            <FormGroup>

                                <Label for="email" >email</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="email"
                                    onChange={this.onChange}
                                />
                                <Label for="name" >password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={this.onChange}
                                />



                                <Button color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                > Login
                                </Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>

                {
                    this.state.submitted && <Navigate to='/crm' />
                }

            </div>

        )
    };
}

// RegisterModel.propTypes = {
//     addItems: PropTypes.func.isRequired,
//     item:PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModel);
