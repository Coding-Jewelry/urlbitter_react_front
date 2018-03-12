/**
 * Created by Wolf Hunter on 8/26/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Settings from '../../settings';
import client from '@sketchpixy/rubix/lib/utils/HttpClient';

import {
    Row,
    Col,
    Grid,
    Form,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    InputGroup,
    PanelHeader,
    FormControl,
    PanelContainer,
} from '@sketchpixy/rubix';

export default class Wizard extends React.Component {

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
    }

    componentDidMount() {
        $("#body").bind('mousemove', () => {
            if (sessionStorage.rubixEntered === "false") {
                this.props.router.push('/');
            }
        });
    }

    create_shortener(e) {
        e.preventDefault();

        let url_name = ReactDOM.findDOMNode(this.urlName).value;
        let url_link = ReactDOM.findDOMNode(this.urlLink).value;

        let url = Settings.serverURL + '/myurls/create';
        let slug = sessionStorage.rubixId;

        client.post(url, {
            name: url_name,
            originalUrl: url_link,
            slug: slug
        }).then((result) => {
            console.log(result.data);
            this.yesorno = result.data.success;
            if (this.yesorno == 1) {
                vex.dialog.alert("Congratulations!<br>New shortened URL was successfully created!");
                this.props.router.push('/ltr/mybiturls');
            } else if (result.data.error == 1) {
                if (result.data.hasOwnProperty('errors')) {
                    let errors = result.data.errors;
                    const errorText = Object.keys(errors).map(key => `${key} ${errors[key]}`).join('<br />');
                    vex.dialog.alert(errorText);
                }
            }
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <PanelContainer noOverflow controls={false} style={{height: '95vh'}}>
                        <Panel>
                            <PanelHeader className='bg-darkblue fg-white' style={{margin: 0}}>
                                <Grid>
                                    <Row>
                                        <Col xs={12}>
                                            <h3>Make A New Shortened URL</h3>
                                        </Col>
                                    </Row>
                                </Grid>
                            </PanelHeader>
                            <PanelBody style={{padding: '30px'}}>
                                <Form onSubmit={this.back}>
                                    <FormGroup controlId='url_name'>
                                        <InputGroup bsSize='large' style={{width: '100%'}}>
                                            <FormControl autoFocus type='text' ref={(input) => this.urlName = input} className='border-focus-blue' placeholder='Type a name for identifying the long URL' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup controlId='url_link'>
                                        <InputGroup bsSize='large' style={{width: '100%', marginBottom: 30}}>
                                            <FormControl type='url' ref={(input) => this.urlLink = input} className='border-focus-blue' placeholder='Paste the long URL' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Grid>
                                            <Row>
                                                <Col xs={12} collapseLeft collapseRight>
                                                    <Button type='submit' outlined lg bsStyle='red' block onClick={this.create_shortener.bind(this)}>Create</Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </FormGroup>
                                </Form>
                            </PanelBody>
                        </Panel>
                    </PanelContainer>
                </Col>
            </Row>
        );
    }
}

