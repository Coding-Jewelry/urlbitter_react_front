
import React from 'react';

import NotificationList from './list';
import NotificationBoard from './board';
import Settings from '../../settings';
import client from '@sketchpixy/rubix/lib/utils/HttpClient';

import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer
} from '@sketchpixy/rubix';

export default class NotificationPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {notifications: {}, selIdx: 0}
    }

    componentDidMount() {
        $("#body").bind('mousemove', () => {
            if (sessionStorage.rubixEntered === "false") {
                this.props.router.push('/');
                return;
            }
        });

        let url = Settings.serverURL + '/myurls';
        let slug = sessionStorage.rubixId;

        client.post(url, {
            slug,
        }).then((result) => {
            if (result.data.hasOwnProperty('urls')) {
                console.log(result.data);
                this.setState({notifications: result.data.urls});
            }
        });
    }

    selectNotification(idx) {
        this.setState({selIdx: idx});
    }

    render() {

        let boardInvisibleStyle = {display: "none"};
        let boardVisibleStyle = {display: "block"};

        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <PanelContainer controls={false} className="mainBody" style={{marginBottom: 0}}>
                            <Panel style={{backgroundColor: '#fafafa'}}>
                                <PanelHeader className='bg-blue'>
                                    <Grid>
                                        <Row>
                                            <Col xs={12} className='fg-white'>
                                                <h3>Notifications</h3>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </PanelHeader>
                                <PanelBody>
                                    <Grid>
                                        <Row>
                                            <Col xs={3} collapseRight style={{paddingLeft: 20}}>
                                                <NotificationList notifications={this.state.notifications} onSelectNotification={this.selectNotification.bind(this)} />
                                            </Col>
                                            <Col xs={9} style={{paddingLeft: 20}}>
                                                <NotificationBoard ref="detailBoard" notification={this.state.notifications[this.state.selIdx]} selectedIdx={this.state.selIdx} style={this.state.selIdx === -1 ? boardInvisibleStyle : boardVisibleStyle } />
                                            </Col>
                                        </Row>
                                    </Grid>
                                </PanelBody>
                            </Panel>
                        </PanelContainer>
                    </Col>
                </Row>
            </div>
        );
    }
}

