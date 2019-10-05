import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import '../css/login.css';
import Userservice from '../service/user';
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";
import { log_wrapper } from '../utils'
import { Form, Icon, Input, Button,Col } from 'antd';
import PostService from '../service/post';
import { message } from 'antd';

import 'antd/lib/form/style';
import 'antd/lib/Input/style';
import 'antd/lib/button/style';
import 'antd/lib/col/style';

const { TextArea } = Input;


const postservice = new PostService();

@log_wrapper(postservice)
@observer
export default class Pub extends React.Component {
    state = {
        title: '',
        content: '',
    }

    handlesubmit() {
        event.preventDefault();
        console.log('hello pub');
        this.props.obj.post(this.state.title, this.state.content)
    };
    title_change = (event) => this.setState({ title: event.target.value, });
    content_change = (event) => this.setState({ content: event.target.value, });

    render() {
        if (this.props.obj.errMesg === 1) {
            message.info('发表成功', 3,
                setTimeout(() => { this.props.obj.errMesg = '' }, 1000));
            return (<Redirect to='/list' />)
        };
        // Q：token信息过期
        if (this.props.obj.errMesg === 2) {
            message.info('请先登陆', 3,
                setTimeout(() => { this.props.obj.errMesg = '' }, 1000))
        };
        return (<Form layout="vertical" >
            <Form.Item wrapperCol={{ offset: 7 }}>
                <Input  type='text' placeholder='标题' style={{ width: 400 }} onChange={this.title_change.bind(this)}></Input>
            </Form.Item>
            <Form.Item >
            <Col span={19} offset={2}><TextArea type='text' placeholder='正文' autosize={{ minRows: 25, maxRows: 45 }} style={{ width: 900 }} onChange={this.content_change.bind(this)}> </TextArea></Col>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 11 }}>
                <Button type="primary" onClick={this.handlesubmit.bind(this)}> 提交 </Button>
            </Form.Item>
        </Form>
        )
    };
};