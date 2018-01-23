import './LocationInput.scss';
import React, {Component} from 'react';
import block from 'bem-cn-lite';
import ReactCustomGoogleAutocomplete from 'react-google-autocomplete';

const b = block('LocationInput');

export class LocationInput extends Component {
    render() {

        return <div className={b()}>
            <ReactCustomGoogleAutocomplete
                style={{width: '100%'}}
                onPlaceSelected={this.onChange}
            />
        </div>;
    }

    onChange = (place) => {
        const weatherPlace = {
            lat: place['geometry'].location.lat(),
            lon: place['geometry'].location.lng(),
            formatted_address: place['formatted_address']
        };
        this.props.onChange(weatherPlace);
    }
}