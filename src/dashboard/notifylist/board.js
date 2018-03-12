
import React from 'react';

import Settings from '../../settings.js';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
    Row,
    Col,
    Grid,
    Icon,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    PanelHeader,
    PanelFooter,
    PanelContainer,
    PanelTabContainer,
    Nav,
    Tab,
    NavItem,
    InputGroup,
    FormControl,

} from '@sketchpixy/rubix';

export default class NotificationBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "notification name",
            selIdx: this.props.selectedIdx,
            copiedShortenedUrl: false
        };
    }

    onCopyShortenedUrl() {
        this.setState({copiedShortenedUrl: true});
        vex.dialog.alert("This Shortened URL was copied to clipboard.");
    }

    render() {

        let iconStyle = {marginRight: 5};
        let itemStyle = {
            fontSize: 18,
            color: '#134f96',
            fontFamily: '"Roboto Condensed",helvetica,arial,sans-serif'
        };
        let formStyle = {
            width: '100%',
            marginBottom: 30
        };
        let textStyle = {
            height: 40,
            border: '1px solid #d7d7d7',
            borderRadius: '5px !important',
            fontSize: 17,
            position: 'relative'
        };
        let saveBtnStyle = {
            marginTop: 20,
            marginRight: 15,
            borderRadius: 7
        };

        const notification = this.props.notification || {};

        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <PanelContainer controls={false}>
                            <Panel>
                                <PanelHeader style={{backgroundColor: '#fafafa'}}>
                                    <Grid>
                                        <Row>
                                            <Col xs={12} style={{color: '#273135', height: 44}}>
                                                <strong>
                                                    <h4 style={{fontFamily: '"Roboto Condensed",helvetica,arial,sans-serif'}}>{notification.name}</h4>
                                                </strong>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </PanelHeader>
                                <PanelBody>
                                    <Grid>
                                        <Row>
                                            <Col xs={12} style={{minHeight: 760, padding: 0}}>
                                                <PanelTabContainer id='tabs-inline' defaultActiveKey="details" controls={false}>
                                                    <PanelHeader className='bg-lightpurple fg-white nav-inline'>
                                                        <Grid>
                                                            <Row>
                                                                <Col sm={12}>
                                                                    <h6 style={{height: 5}}></h6>
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                                    </PanelHeader>
                                                    <PanelBody>
                                                        <Grid>
                                                            <Row>
                                                                <Col sm={12}>

                                                                    <Tab.Content>

                                                                        <Tab.Pane eventKey="details">
                                                                            <div style={{borderBottom: '2px solid #f2f2f2'}}>

                                                                                <FormGroup style={formStyle}>
                                                                                    <h5>URL Name</h5>
                                                                                    <InputGroup style={{width: '100%'}}>
                                                                                        <FormControl className="notify-field" id="urlName" type='text' style={textStyle} value={notification.name} readOnly />
                                                                                    </InputGroup>
                                                                                </FormGroup>

                                                                                <FormGroup style={formStyle}>
                                                                                    <h5>Original URL</h5>
                                                                                    <InputGroup style={{width: '100%'}}>
                                                                                        <FormControl id="notifyMessage" type='text' style={textStyle} value={notification.originalUrl} readOnly />
                                                                                    </InputGroup>
                                                                                </FormGroup>

                                                                                <FormGroup style={{width: '100%'}}>
                                                                                    <h5>Shortened URL</h5>
                                                                                    <InputGroup style={{width: '100%'}}>
                                                                                        <FormControl id="notifyKey" type='text' style={{height: 40, border: '1px solid #d7d7d7', borderRadius: '5px !important', fontSize: 17, position: 'relative', paddingRight: 37}} value={Settings.herokuServerURL + "/" + notification.key} readOnly />
                                                                                    </InputGroup>
                                                                                    <div style={{textAlign: 'right'}}>
                                                                                        <CopyToClipboard text={Settings.herokuServerURL + "/" + notification.key} onCopy={this.onCopyShortenedUrl.bind(this)}>
                                                                                            <Button style={saveBtnStyle} outlined bsStyle='primary'>Copy to Clipboard</Button>
                                                                                        </CopyToClipboard>
                                                                                    </div>
                                                                                </FormGroup>
                                                                            </div>
                                                                        </Tab.Pane>
                                                                    </Tab.Content>
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                                    </PanelBody>
                                                </PanelTabContainer>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </PanelBody>
                                <PanelFooter style={{backgroundColor: '#fafafa', padding: '20px 0px'}}>
                                    <Grid>
                                        <Row>
                                            <Button outlined style={{marginBottom: 5, padding: '7px 15px', height: 40, fontSize: 13, borderRadius: 7}} bsStyle='danger'>
                                                <Icon glyph="icon-nargela-trash-bin" style={{marginRight: 5, verticalAlign: 'middle', fontSize: 17}} />
                                                Delete
                                            </Button>
                                        </Row>
                                    </Grid>
                                </PanelFooter>
                            </Panel>
                        </PanelContainer>
                    </Col>
                </Row>
            </div>
        );
    }
}

