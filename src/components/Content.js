import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'email',
            notes: 'notes',
            favoriteLocations: [
                {
                    placename: 'Place Name',
                    type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    lat: 'numbers',
                    lon: 'numbers',
                    placeimage: 'image'
                }
            ]
        }
    }

    async componentDidMount() {

        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            console.log('token: ', jwt);

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: ''
            }

            const profileResponse = await axios(config);

            console.log('favorites from DB: ', profileResponse.data);

            this.setState({
                
            })
        }
    }

    render() {
        return (
            <>

            </>
        )
    }
}

export default withAuth0(Content);