
/**
 * Created by Wolf Hunter on 8/26/2017.
 */

import React from 'react';

import {
    Row,
    Col,
    Icon,
    Grid,
    Panel,
    Badge,
    Button,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

class BasicPanel extends React.Component {
    render() {
        let subTitleStyle = {
            color: '#5c3248'
        };
        let accountStyle = {
            padding: 20,
            borderBottom: '2px solid #e9f0f5',
            position: 'relative'
        };
        let accountLastStyle = {
            padding: 20,
            position: 'relative'
        };
        let btnStyle = {
            position: 'absolute',
            top: '30%',
            right: 20
        };
        let btnEmailStyle = {
            position: 'absolute',
            top: '30%',
            right: 160
        };
        let penStyle = {
            marginRight: 5,
            fontSize: 15
        };
        return (
            <PanelContainer controls={false}>
                <Panel>
                    <PanelBody style={{padding: 0}}>
                        <Grid>
                            <Row>
                                <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                                    <h3 style={subTitleStyle}>Account Settings</h3>
                                    <div style={{borderRadius: 7, backgroundColor: '#fafafa', marginBottom: 40}}>
                                        <div style={accountStyle}>
                                            <strong><h4 style={{color: '#2b3950'}}>LOGIN METHODS</h4></strong>
                                        </div>
                                        <div style={accountStyle}>
                                            <h4>Google Login</h4>
                                            <Button outlined bsStyle='success' style={btnStyle}>
                                                <Icon glyph="icon-fontello-flash" style={{marginRight: 5}} />
                                                Link Account
                                            </Button>
                                        </div>
                                        <div style={accountStyle}>
                                            <h4>Facebook Login</h4>
                                            <Button outlined bsStyle='success' style={btnStyle}>
                                                <Icon glyph="icon-fontello-flash" style={{marginRight: 5}} />
                                                Link Account
                                            </Button>
                                        </div>
                                        <div style={accountLastStyle}>
                                            <h4>Username & Password  <Badge>Active</Badge></h4>
                                            <Button outlined bsStyle='success' style={btnEmailStyle}>
                                                <Icon glyph="icon-outlined-pencil" style={penStyle} />
                                                Email
                                            </Button>
                                            <Button outlined bsStyle='success' style={btnStyle}>
                                                <Icon glyph="icon-outlined-pencil" style={penStyle} />
                                                Password
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 style={subTitleStyle}>Language Settings</h3>
                                    <h3 style={subTitleStyle}>Your Plan</h3>
                                    <h3 style={subTitleStyle}>Billing</h3>
                                    <h3 style={subTitleStyle}>Invoice History</h3>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

export default class Settings extends React.Component {

    componentDidMount() {
        $("#body").bind('mousemove', () => {
            if (sessionStorage.rubixEntered === "false") {
                this.props.router.push('/');
            }
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <BasicPanel />
                    </Col>
                </Row>
            </div>
        );
    }
}


