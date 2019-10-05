import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import '../css/login.css';
import Userservice from '../service/user';
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";
import { message } from 'antd';
import { log_wrapper } from '../utils'
import store from 'store';


import 'antd/lib/message/style'

const userservice = new Userservice();


@log_wrapper(userservice)
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        //token验证
        props.obj.test(store.get('token'))
    };

    state = {
        email: "",
        password: "",
    };

    handleclick(event) {
        event.preventDefault()
        this.props.obj.login(this.state.email, this.state.password)
    };

    // 获取email数据
    email_change = event => this.setState({ email: event.target.value, });



    //获取password数据
    password_change = (event) => this.setState({ password: event.target.value, });



    render() {
        if (this.props.obj.errMesg) {
            console.log('log fail~~~');
            if (store.get('token')) store.remove('token');
            message.info(this.props.obj.errMesg, 3,
                setTimeout(() => { this.props.obj.errMesg = '' }, 1000));
        };

        //Q:刷新之后重新登陆 Q2:token信息过期
        if (this.props.obj.loggin) {
            console.log('sucessfully use mobx');
            message.info('登陆成功');
            return (<Redirect to="/" />)
        };

        return (<div className='login-page'>
            <div className='form'>
                <form className='login-form'></form>
                <input type='text' placeholder='邮箱' onChange={this.email_change.bind(this)} />
                <input type='password' placeholder='密码' onChange={this.password_change.bind(this)} />
                <button onClick={this.handleclick.bind(this)}> 登陆 </button>
                <p className='message'>还未注册?<Link to='/reg'>请注册</Link></p>
            </div>
        </div>
        )
    };
};