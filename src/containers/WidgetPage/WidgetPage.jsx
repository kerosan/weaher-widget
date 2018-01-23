import './WidgetPage.scss';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {SvgIcon, Tab, Tabs} from "material-ui";
import PropTypes from 'prop-types';
import {LocationInput} from "../../components/LocationInput/LocationInput";
import {addLocationAction, deleteLocationAction} from "../../redux/modules/locations";
import block from 'bem-cn-lite';
import {Col, Form, Row} from "reactstrap";

const b = block('WidgetPage');

const CloseIcon = (props) => (
    <div onClick={!props.disabled && props.onClick}>
        <SvgIcon viewBox="0 0 1000 1000" color={props.disabled ? '#c6c6c6' : '#000'}>
            <path
                d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z"/>
        </SvgIcon>
    </div>
);

@connect((state) => ({
    locations: state.locations
}), {
    addLocationAction,
    deleteLocationAction
})
export class WidgetPage extends Component {

    static propTypes = {
        weather: PropTypes.object,
        location: PropTypes.object,
    };

    componentDidMount() {
        this.props.locations.places.map(item => {
            this.props.addLocationAction(item);
            return null;
        })
    }

    render() {
        const {locations} = this.props;


        return <div className={b()}>
            <Form onSubmit={this.onSubmit}>
                <Row style={{padding: 10}}>
                    <Col xs={12}>
                        <LocationInput
                            style={{width: '100%', margin: 20}}
                            onChange={this.props.addLocationAction}
                        />
                    </Col>
                </Row>
            </Form>

            <Tabs>
                {
                    locations.places.map((tab, key) => {
                        if (!tab.weather) {
                            return `loading`
                        }

                        return <Tab
                            key={key}
                            icon={<CloseIcon disabled={key < 2} onClick={() => this.closeTab(tab)}/>}
                            className={'Tab'}
                            label={tab.formatted_address}>
                            <div className={b('content')}>
                                <br/>
                                <br/>
                                {`Temperature: ${tab.weather.temp} °C`}
                                <br/>
                                <br/>
                                {`Pressure: ${tab.weather.pressure} Pa`}
                            </div>
                        </Tab>
                    })

                }
            </Tabs>
        </div>;
    }

    onSubmit = (event) => {
        event.preventDefault();
    };

    closeTab(tab) {
        this.props.deleteLocationAction(tab);
    }
}