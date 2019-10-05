import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import '../css/login.css';
import Userservice from '../service/user';
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";
import { message, Spin, Pagination, Col, Form, Card, Row} from 'antd';
import { log_wrapper, match } from '../utils'
import PostService from '../service/post';
import { List } from 'antd';


import 'antd/lib/message/style';
import 'antd/lib/list/style';
import 'antd/lib/pagination/style';
import 'antd/lib/col/style'
import 'antd/lib/form/style';
import 'antd/lib/Card/style';
import 'antd/lib/Row/style';


const postservice = new PostService();


@log_wrapper(postservice)
@observer
export default class Cont extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        let { location: { pathname } } = props;
        console.log(pathname);
        console.log(match(pathname));
        let id = match(pathname)['id'];
        this.props.obj.cont_get(id);
    };
    handleClick(events) {
        console.log(events);
        console.log('sucessfully click');
        message.info('待开发功能');

    };

    render() {
        let data = this.props.obj.content;
        if (this.props.obj.errMesg) {
            message.info(this.props.obj.errMesg, 3, setTimeout(() => {
                this.props.obj.errMesg = '';
            }));
            return (<div>No Data</div>)
        };
        if (data) {
            let { post_content, post_name, post_date, post_title } = data;
            return (<div>
                <Col span={100} offset={1}>
                    <Card title={post_title} extra={<a onClick={this.handleClick.bind(this)}>More</a>} style={{ width: 1000 }} >

                        <Col span={18} push={0}>
                            <p>{post_name}{post_date}</p> 
                        </Col>
                        <Col span={18} push={0}>
                            <p>{post_content}</p>
                        </Col>
                    </Card>
                </Col>
            </div>)
        }
        return (<div>hello Cont</div>

        )
    }
}