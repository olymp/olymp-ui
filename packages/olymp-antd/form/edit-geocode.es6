import React, { Component } from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import { get, debounce } from 'lodash';
import { withApollo, graphql } from 'react-apollo';
import { createComponent } from 'react-fela';
import { compose, withState } from 'recompose';
import gql from 'graphql-tag';

const LocIcon = createComponent(
  ({ theme, hasLocation }) => ({
    color: !hasLocation ? theme.color : theme.dark3,
    cursor: 'pointer'
  }),
  p => <Icon type="environment-o" {...p} />,
  ({ hasLocation, ...p }) => Object.keys(p)
);

const enhance = compose(
  withApollo,
  withState('input', 'setInput'),
  withState('geocodeLoading', 'setGeocodeLoading'),
  withState(
    'location',
    'setLocation',
    ({ lat, lng }) => lat !== undefined && lng !== undefined && `${lat},${lng}`
  ),
  graphql(
    gql`
      query places($input: String!, $location: String) {
        places(input: $input, location: $location) {
          placeId
          description
        }
      }
    `,
    {
      options: ({ input, location }) => ({
        skip: !input,
        variables: {
          input,
          location
        }
      }),
      props: ({ ownProps: props, data }) => ({
        ...props,
        placesLoading: data.loading,
        items: get(data, 'places', [])
      })
    }
  )
);

@enhance
export default class GeocodeEditor extends Component {
  static defaultProps = {
    forceLatLng: true
  };

  componentWillMount() {
    const { forceLatLng } = this.props;

    if (forceLatLng) {
      this.getLatLng(false);
    }
  }

  onSelect = id => {
    const { client, onChange, setInput, setGeocodeLoading } = this.props;

    setGeocodeLoading(true);
    client
      .query({
        query: gql(`
        query place($id: String!) {
          place(placeId: $id) {
            id
            streetNumber
            route
            locality
            administrativeAreaLevel1
            administrativeAreaLevel2
            country
            postalCode
            formattedAddress
            lat
            lng
            locationType
            partialMatch
            types
          }
        }
      `),
        variables: {
          id
        }
      })
      .then(({ data, loading }) => {
        setGeocodeLoading(loading);

        if (data.place) {
          onChange(data.place);
          setInput();
        }
      })
      .catch(err => console.log(err));
  };

  getLatLng = (force = true) => {
    const {
      client,
      value,
      onChange,
      setInput,
      setLocation,
      setGeocodeLoading
    } = this.props;

    if (navigator.geolocation) {
      setGeocodeLoading(true);

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const location = `${coords.latitude},${coords.longitude}`;

        client
          .query({
            query: gql(`
            query geocode($location: String) {
              geocode(location: $location) {
                id
                streetNumber
                route
                locality
                administrativeAreaLevel1
                administrativeAreaLevel2
                country
                postalCode
                formattedAddress
                lat
                lng
                locationType
                partialMatch
                types
              }
            }
          `),
            variables: {
              location
            }
          })
          .then(({ data, loading }) => {
            setGeocodeLoading(loading);

            if (data.geocode[0] && (force || !value.id)) {
              onChange(data.geocode[0]);
              setInput();
            }
          })
          .catch(err => console.log(err));

        setLocation(location);
      });
    }
  };

  handleSearch = debounce(input => this.props.setInput(input), 500, {
    trailing: true,
    leading: false
  });

  renderOption = ({ placeId, description }) => (
    <AutoComplete.Option key={placeId} text={description}>
      <div style={{ whiteSpace: 'initial', display: 'flex' }}>
        {description}
      </div>
    </AutoComplete.Option>
  );

  render() {
    const {
      input,
      items,
      value,
      location,
      placesLoading,
      geocodeLoading
    } = this.props;

    return (
      <AutoComplete
        style={{ width: '100%' }}
        dataSource={[
          { placeId: value.id, description: value.formattedAddress },
          ...(items || [])
        ].map(this.renderOption)}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        optionLabelProp="text"
        value={input || value.id}
        disabled={placesLoading || geocodeLoading}
      >
        <Input
          suffix={
            placesLoading || geocodeLoading ? (
              <Icon type="loading" />
            ) : (
              <LocIcon hasLocation={!!location} onClick={this.getLatLng} />
            )
          }
          disabled={placesLoading || geocodeLoading}
        />
      </AutoComplete>
    );
  }
}
