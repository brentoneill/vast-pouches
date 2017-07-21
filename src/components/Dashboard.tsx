import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

import AddressInput from './AddressInput';
import AddressCard from './AddressCard';

import { addAddress, deleteAddress, editAddress, fetchAddresses, IAddress } from '../actions';
import { IDashReducerState } from '../reducers/reducer_dash';

import { handleError } from '../util';

import './styles/Dashboard.scss';

interface IDashboardProps {
    // redux actions
    addAddress: Function;
    deleteAddress: Function;
    editAddress: Function;
    fetchAddresses: Function;
    // data
    addresses: any[];
}

interface IDashboardState extends IDashReducerState  {
    loading?: boolean;
}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    constructor(props: IDashboardProps) {
        super(props);
    }

    componentWillMount() {
        this.toggleLoad(true);
        this.props.fetchAddresses()
            .then(action => {
                console.log(action);
                if (action.payload.response && action.payload.response.data.errors) {
                    const { errors } = action.payload.response.data;
                    handleError('Fetching listings failed', errors);
                }

                this.toggleLoad(false);
            });
    }

    toggleLoad(loading: boolean) {
        this.setState({ loading });
    }

    @autobind
    onAddAddress(address: IAddress) {
        this.toggleLoad(true);
        return this.props.addAddress(address)
            .then(action => {
                if (action.payload.response && action.payload.response.errors) {
                    const { errors } = action.payload.response;
                    handleError('Add addresses failed', errors);
                } else {
                    toastr.success('Property added!', `Successfully added ${address.attributes.title}`);
                }
                this.toggleLoad(false);
            });
    }

    @autobind
    deleteAddress(addressId: number) {
        this.toggleLoad(true);
        return this.props.deleteAddress(addressId)
            .then(action => {
                console.log(action);
                if (action.payload.response && action.payload.response.errors) {
                    const { errors } = action.payload.response;
                    handleError('Delete addresses failed', errors);
                } else {
                    toastr.success('Property deleted', `Successfully deleted that address`);
                }
                this.toggleLoad(false);
            });
    }

    @autobind
    onEditAddressClick(address: IAddress) {
        console.log(address);
    }

    @autobind
    onDeleteAddressClick(address: IAddress) {
        this.props.deleteAddress(address.id)
            .then(action => {
                this.props.fetchAddresses();
            });
    }

    renderAddress(addresses: IAddress[]): JSX.Element[] | null {
        if (addresses && addresses.length) {
            return addresses.map(address => {
                return (
                    <Grid.Column width={8} key={address.id}>
                        <AddressCard address={address}
                                     onEditClick={this.onEditAddressClick}
                                     onDeleteClick={this.onDeleteAddressClick}/>
                    </Grid.Column>
                );
            });
        } else {
            return null;
        }
    }

    render(): JSX.Element {
        const { addresses } = this.props;

        return (
            <div className="Dashboard">
                <Grid stackable={true}>
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            <AddressInput onAddAddress={this.onAddAddress}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={16}>
                        {this.renderAddress(addresses)}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.dash.addresses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: bindActionCreators(addAddress, dispatch),
        editAddress: bindActionCreators(editAddress, dispatch),
        deleteAddress: bindActionCreators(deleteAddress, dispatch),
        fetchAddresses: bindActionCreators(fetchAddresses, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
