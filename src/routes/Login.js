
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

import Settings from '../settings';
import client from '@sketchpixy/rubix/lib/utils/HttpClient';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  InputGroup,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
export default class Login extends React.Component {

    message = {};
    yesorno = -1;

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
    }

    componentDidMount() {
        // $('html').addClass('authentication');
    }

    componentWillUnmount() {
        // $('html').removeClass('authentication');
    }

    getPath(path) {
        var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
        path = `/${dir}/${path}`;
        return path;
    }

    login(e) {
        e.preventDefault();

        let email = ReactDOM.findDOMNode(this.email).value;
        let password = ReactDOM.findDOMNode(this.password).value;

        let url = Settings.serverURL + '/login';

        client.post(url, {
            email,
            password,
        }).then((result) => {
            this.yesorno = result.data.success;
            this.message = result.data.message;
            if (this.yesorno == 1) {
                sessionStorage.setItem('rubixEntered', true);
                sessionStorage.setItem('rubixId', result.data.who);
                this.props.router.push('/ltr/mybiturls');
            } else {
                vex.dialog.alert(this.message);
            }
        });
    }

  render() {
    return (
        <div id='auth-container' className='login' style={{paddingTop: '5%'}}>
            <div id='auth-row'>
                <div id='auth-cell'>
                    <Grid>
                        <Row>
                            <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                <PanelContainer controls={false}>
                                    <Panel>
                                        <PanelBody style={{padding: 0}}>
                                            <div className='text-center bg-darkblue fg-white'>
                                                <h3 style={{margin: 0, padding: 25}}>Sign in</h3>
                                            </div>
                                            {/*<div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>*/}
                                                {/*<div>You need to sign in for those awesome features</div>*/}
                                                {/*<div style={{marginTop: 12.5, marginBottom: 12.5}}>*/}
                                                    {/*<Button id='facebook-btn' lg bsStyle='darkblue' type='submit'>*/}
                                                        {/*<Icon glyph='icon-fontello-facebook' />*/}
                                                        {/*<span>Sign in <span className='hidden-xs'>with facebook</span></span>*/}
                                                    {/*</Button>*/}
                                                {/*</div>*/}
                                                {/*<div>*/}
                                                    {/*<a id='twitter-link' href='#' onClick={this.back}><Icon glyph='icon-fontello-twitter' /><span> or with twitter</span></a>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            <div>
                                                {/*<div className='text-center' style={{padding: 12.5}}>*/}
                                                    {/*or use your own account*/}
                                                {/*</div>*/}
                                                <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                                    <Form onSubmit={this.back}>
                                                        <FormGroup controlId='emailaddress'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-mail' />
                                                                </InputGroup.Addon>
                                                                <FormControl autoFocus type='email' ref={(input) => this.email = input} className='border-focus-blue' placeholder='Email' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup controlId='password'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-key' />
                                                                </InputGroup.Addon>
                                                                <FormControl type='password' ref={(input) => this.password = input} className='border-focus-blue' placeholder='Password' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Grid>
                                                                <Row>
                                                                    <Col xs={12} collapseLeft collapseRight>
                                                                        <Button type='submit' outlined lg bsStyle='blue' block onClick={this.login.bind(this)}>Log in</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Grid>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                            </div>
                                        </PanelBody>
                                    </Panel>
                                </PanelContainer>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
  }
}
