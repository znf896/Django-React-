import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import '../css/login.css';
import Userservice from '../service/user';
import { observable } from "mobx";
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";
import { message } from 'antd';
import { log_wrapper } from '../utils'


import 'antd/lib/message/style'

const userservice = new Userservice();


@log_wrapper(userservice)
@observer
export default class _Register extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        password_again: ""
    };

    name_change = event => this.setState({ name: event.target.value });
    email_change = event => this.setState({ email: event.target.value });
    password_change = event => this.setState({ password: event.target.value });
    password_again_change = event => this.setState({ password_again: event.target.value });


    handclick(event) {
        console.log(this.state)
        if (this.state.password === this.state.password_again) {
            this.props.obj.reg(this.state.name, this.state.email, this.state.password)
        }
        else {
            this.props.obj.errMesg = '注册失败';
        }

    };

    render() {
        if (this.props.obj.loggin) {
            return (<Redirect to="/ " />)
        };

        if (this.props.obj.errMesg) {
            console.log('register fail~~~');
            message.info(this.props.obj.errMesg, 3,
                setTimeout(() => { this.props.obj.errMesg = '' }, 1000));
        };
        return (<div className='login-page'>
            <div className='form'>
                <form className='login-form'></form>
                <input type='text' placeholder='姓名' onChange={this.name_change.bind(this)} />
                <input type='text' placeholder='邮箱' onChange={this.email_change.bind(this)} />
                <input type='password' placeholder='密码' onChange={this.password_change.bind(this)} />
                <input type='password' placeholder='确认密码' onChange={this.password_again_change.bind(this)} />
                <button onClick={this.handclick.bind(this)}> 注册 </button>
                <p className='message'>如果已注册<Link to='/login'>请登陆</Link></p>
            </div>
        </div>
        )
    };
};