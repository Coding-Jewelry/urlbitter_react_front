
import React from 'react';
import ReactDOM from 'react-dom';

import {
    Row,
    Col,
    Grid,
    Panel,
    Table,
    FormControl,
    PanelBody,
    PanelContainer
} from '@sketchpixy/rubix';

export default class NotificationList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selIdx: -1,
            names: []
        };
    }

    componentDidMount() {

    }

    selectIdxOfNotification(idx) {
        this.setState({selIdx: idx});
        this.props.onSelectNotification(idx);
    }

    render() {
        let searchBarStyle = {
            border: '1px solid #cbcbcb',
            background: 'none',
            margin: '0px 0px 30px 0px',
            height: 45,
            fontSize: 16,
            backgroundColor: '#fafafa',
            borderRadius: '3px !important'
        };
        let tableStyle = {
            border: '1px solid #dddddd',
            borderRadius: 3,
            cursor: 'pointer'
        };

        let notifications = this.props.notifications || [];
        let names = [];
        for (let key in notifications) {
            names.push(notifications[key].name);
        }

        let selectedBackColor = {backgroundColor: '#fafafa', color: '#484e53'};
        let deselectedBackColor = {backgroundColor: '#ffffff', color: '#89949b'};

        return (
            <div>
                <Row>
                    <Col sm={12}>
                        {/*<ListPanel {...this.props} />*/}
                        <PanelContainer controls={false}>
                            <Panel>
                                <PanelBody>
                                    <Grid>
                                        <Row>
                                            <Col xs={12} style={{minHeight: 1000, padding: '0px 15px'}}>
                                                <span style={{fontSize: 15, color: '#273135', marginLeft: 5}}>
                                                    {this.props.notifications.length} shortened URLs
                                                </span>
                                                <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%' style={tableStyle}>
                                                    <tbody>
                                                        { names && names.length > 0 ? names.map((name, i) =>
                                                            <tr key={i} style={this.state.selIdx === i ? selectedBackColor : deselectedBackColor} onClick={this.selectIdxOfNotification.bind(this, i)}>
                                                                <td>{name}</td>
                                                            </tr>
                                                        ) : <tr></tr>}
                                                    </tbody>
                                                </Table>
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

