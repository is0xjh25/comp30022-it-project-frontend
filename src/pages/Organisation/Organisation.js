import React from 'react'

export default class Organisation extends React.Component {
    // read in the user's organisation info from backend api
    // const classes = useStyles();

    state = {
        loading: true,
        organisations: [],
    };

    componentDidMount() {
        // const url;
        // const response = await fetch(url);
        // const data = response.json();

        // make up some fake data for testing
        const data = [
            {
                "organization_id":1,
                "name": "University of Melbourne",
                "owner_id": 100,
                "ownership": "own"
            },
            {
                "organization_id": 2,
                "name": "University of Sydeny",
                "owner_id": 100,
                "ownership": "own"
            },
            {
                "organization_id": 3,
                "name": "Peking University",
                "owner_id": 200,
                "ownership": "member"
            },
            {
                "organization_id": 4,
                "name": "University of Tokyo",
                "owner_id": 300,
                "ownership": "member"
            }
        ]
        this.setState({loading: false, organisations: data});
        
    };

    // identify organisation data from json
    // create different boxes for different authority levels
    // boxes has link buttons directs to department pages
    render() {

        if (this.state.loading) {
            return <div>loading...</div>
        }

        // if (this.state.organisations.length()==0) {
        //     return <div>No valid organisation</div>
        // }
        
        const orgs = <div></div>;
        const result = this.state.organisations.forEach(org => {
            if (org.ownership === "own") {
                orgs = orgs +
                    <div key={org.organization_id}>
                        <div>{org.name}</div>
                        <div>{org.owner_id}</div>
                    </div>
            } else {
                orgs = orgs +
                    <div key={org.organization_id}>
                        <div>{org.name}</div>
                        <div>{org.owner_id}</div>
                    </div>
            }
            
        });

        // const plus = <div key={org.organization_id}>
        //                 <div>{org.name}</div>
        //                 <div>{org.owner_id}</div>
        //             </div>

        return (
            <div>
                {result}
                <div>+</div>
            </div>
        )
    }
}
