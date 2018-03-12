
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
export default class Signup extends React.Component {
  back(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.router.goBack();
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  signup(e) {
      e.preventDefault();

      let firstName = ReactDOM.findDOMNode(this.firstName).value;
      let lastName = ReactDOM.findDOMNode(this.lastName).value;
      let email = ReactDOM.findDOMNode(this.email).value;
      let password = ReactDOM.findDOMNode(this.password).value;
      let password_confirmation = ReactDOM.findDOMNode(this.password_confirmation).value;

      let url = Settings.serverURL + '/register';

      client.post(url, {
          firstName,
          lastName,
          email,
          password,
          password_confirmation
      }).then((result) => {
          if (result.data.success == 1) {
              let message = "Congratulations!<br>Your account was successfully created. Please log in to continue.";
              vex.dialog.alert(message);
              this.props.router.push('/login');
              return;
          }
          if (result.data.error == 1 && result.data.hasOwnProperty('errors')) {
              this.setState({errors: result.data.errors});
              let errs = result.data.errors;

              let i;
              let message = "Signing up failed!<br>";
              message += Object.keys(errs).map(key => `${key} ${errs[key]}`).join('<br />');

              vex.dialog.alert(message);
              return;
          }

          this.setState({ errors: {} });
          this.errors = [];
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
                                                <h3 style={{margin: 0, padding: 25}}>Sign up</h3>
                                            </div>
                                            <div>
                                                <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                                    <Form onSubmit={this.back}>
                                                        <FormGroup controlId='firstname'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-user' />
                                                                </InputGroup.Addon>
                                                                <FormControl autoFocus type='text' ref={(input) => this.firstName = input} className='border-focus-blue' placeholder='First Name' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup controlId='lastname'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-user' />
                                                                </InputGroup.Addon>
                                                                <FormControl autoFocus type='text' ref={(input) => this.lastName = input} className='border-focus-blue' placeholder='Last Name' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup controlId='emailaddress'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-mail' />
                                                                </InputGroup.Addon>
                                                                <FormControl type='email' className='border-focus-blue' ref={(input) => this.email = input} placeholder='Email: (e.g. support@sketchpixy.com)' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup controlId='password'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-key' />
                                                                </InputGroup.Addon>
                                                                <FormControl type='password' className='border-focus-blue' ref={(input) => this.password = input} placeholder='Password' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup controlId='password_confirmation'>
                                                            <InputGroup bsSize='large'>
                                                                <InputGroup.Addon>
                                                                    <Icon glyph='icon-fontello-key' />
                                                                </InputGroup.Addon>
                                                                <FormControl type='password' className='border-focus-blue' ref={(input) => this.password_confirmation = input} placeholder='Retype your password' />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Grid>
                                                                <Row>
                                                                    <Col xs={12} collapseLeft collapseRight>
                                                                        <Button type='submit' outlined lg bsStyle='blue' block onClick={this.signup.bind(this)}>Create account</Button>
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
