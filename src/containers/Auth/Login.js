import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
//import { KeyCodeUtils, LanguageUtils } from "../utils";

//import userIcon from '../../src/assets/images/user.svg';
//import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
//import { userServices } from '../../services';
import { FormattedMessage } from 'react-intl';
import { userLoginSuccess } from '../../store/actions';
import { stringify } from 'react-auth-wrapper/helpers';

//import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log('ten nguoi su dung la: ', this.state.username, 'pass nguoi su dung la :', this.state.password);
        // console.log('All state la: ', this.state);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log('>>>>>>>>>>>>>> gia tri data:', data)
            console.log('>>>>>>>>>>>>>> gia tri data:', data.message)
            console.log('>>>>>>>>>>>>>> gia tri cua user:', data.user)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                console.log('>>>>>>>>>> data user:', data.user);
                this.props.userLoginSuccess(data.user)
                console.log('login succeedss')
            }
            console.log('>>>>>>>>> last check message:', this.state.errMessage);
        } catch (error) {
            console.log('>>>>>>>>> check error:', error.response);
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('>>>>>>>>>> check message state:', this.state.errMessage)
        }
    }





    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type="text" className='form-control'
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control'
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)} />

                                <span
                                    onClick={() => { this.handleShowHidePassword() }} >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }} >Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g facebook'></i>
                            <i className='fab fa-facebook google'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
