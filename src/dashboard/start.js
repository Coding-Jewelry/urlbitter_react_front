
import React from 'react';
import { Link, withRouter } from 'react-router';

import ZapierWebhookModal from './articles/zapier-webhook';

import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelContainer,
    ResponsiveEmbed,
} from '@sketchpixy/rubix';

class PostItem extends React.Component {

    launchZapierModal() {
        console.log("clicked");
        this.zapierModal.open();
    }

    render() {

        let guideTagStyle = {
            color: '#2b3438',
            fontSize: 15,
            marginLeft: 30,
            cursor: 'pointer',
            textDecoration: 'underline'
        };
        return (
            <PanelContainer controls={false}>
                <Panel>
                    <PanelBody style={{paddingRight: '15%', paddingLeft: '15%'}}>
                        <Grid>
                            <Row>
                                <Col xs={12} style={{padding: 30}}>
                                    <h2 className='fg-black' style={{fontWeight: 800, marginTop: 0}}>{this.props.header}</h2>
                                    <Grid>
                                        <Row>
                                            <Col xs={6} collapseLeft collapseRight>
                                                <div className='fg-darkgray50'>
                                                    {/*<small>by <a href='#'>{this.props.author}</a> / {this.props.date}</small>*/}
                                                </div>
                                            </Col>
                                            <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                <div className='fg-darkgray25 fg-hover-black50'>
                                                    {/*<small><Icon glyph='icon-ikons-time' style={{position: 'relative', top: 1}} /><span> {this.props.minutes} minutes read</span></small>*/}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                    <div>{this.props.children}</div>
                                </Col>
                            </Row>

                            <Row style={{marginBottom: 200, paddingLeft: 60}}>
                                <div className="div-howto">
                                    <h3 className="fg-black" style={{fontWeight: 600, marginBottom: 25}}>How To ...</h3>
                                </div>
                                <div className="div-guides">
                                    <span style={{color: '#2b3438'}}>1. <a style={guideTagStyle} bsStyle='primary' onClick={this.launchZapierModal.bind(this)}>
                                        Setup a notification with custom webhook using Zapier
                                    </a></span>
                                </div>
                                <ZapierWebhookModal ref={(c) => this.zapierModal = c} />
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

@withRouter
export default class StartPage extends React.Component {

    componentDidMount() {
        $("#body").bind('mousemove', () => {
            if (sessionStorage.rubixEntered === "false") {
                this.props.router.push('/');
            }
        });
    }

    getPath(path) {
        var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
        path = `/${dir}/${path}`;
        return path;
    }



    render() {
        return (
            <PostItem
                header='Welcome to Notify'
                author='Sales Notify Support Team'
                date='Aug 20, 2017'
                minutes='2'
                tag='ENTERTAINMENT'
                comments='10'>
                {/*<Lead className='fg-black75'>*/}
                    {/*<LoremIpsum query='4s' />..*/}
                {/*</Lead>*/}
                <p>
                    {/*<LoremIpsum query='2s' />{' '}*/}
                    {/*<a href='#' className='text-capitalize'><LoremIpsum query='2w' /></a>{' '}*/}
                    {/*<LoremIpsum query='3s' />*/}
                    Our mission is to help you grow your business using honest marketing strategies. We are continually developing Notify into the platform that will help you build massive trust with your audience and drive higher conversions.
                </p>
                <div style={{marginTop: 25, marginBottom: 25}}>
                    <ResponsiveEmbed a16by9>
                        <iframe className='embed-responsive-item' src='//player.vimeo.com/video/104087897898954' allowFullScreen></iframe>
                    </ResponsiveEmbed>
                </div>
            </PostItem>
        );
    }
}
