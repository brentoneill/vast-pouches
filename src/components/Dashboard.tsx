import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

import AddressInput from './AddressInput';

import { addAddress, fetchAddresses } from '../actions';

interface IDashboardProps {
    // redux actions
    addAddress: Function;
    fetchAddresses: Function;
    // data
    addresses: any[];
}

interface IDashboardState {
    addresses?: any;
}

import './styles/Dashboard.scss';

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

    public socket;

    constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            addresses: props.addresses
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps: IDashboardProps) {

    }

    @autobind
    onAddAddress(address: string) {
        console.log(address);
        // Make api request
    }

    render() {
        const { addresses } = this.state;

        return (
            <div className="Dashboard">
                <Grid stackable={true}>
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            <AddressInput onAddAddress={this.onAddAddress}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={16}>
                        <Grid.Column width={8}>
                        </Grid.Column>
                        <Grid.Column width={8}>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.dash.addresses,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: bindActionCreators(addAddress, dispatch),
        fetchAddresses: bindActionCreators(fetchAddresses, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
