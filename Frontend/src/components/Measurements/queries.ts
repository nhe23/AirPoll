import gql from "graphql-tag";

export const LOCATION_RESULTS = gql`
  query($after: String!) {
    measurements(take: 7, after: $after) {
      _id
      location
      city
      country {
        name
      }
      measurements {
        parameter
        value
        lastUpdated
        unit
        qualityIndex
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const LOCATION_RESULTS_CITY = gql`
  query($city: String!, $after: String!) {
    measurementsByCity(city: $city, take: 7, after: $after) {
      _id
      location
      city
      country {
        name
      }
      measurements {
        parameter
        value
        lastUpdated
        unit
        qualityIndex
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const LOCATION_RESULTS_COUNTRY = gql`
  query($country: String!, $after: String!) {
    measurementsByCountry(country: $country, take: 7, after: $after) {
      _id
      location
      city
      country {
        name
      }
      measurements {
        parameter
        value
        lastUpdated
        unit
        qualityIndex
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const CITIES_STARTWITH = gql`
  query($searchString: String!) {
    citiesStartsWith(searchString: $searchString) {
      name
    }
  }
`;

export const COUNTRIES = gql`
  query {
    countries {
      name
      code
    }
  }
`;
