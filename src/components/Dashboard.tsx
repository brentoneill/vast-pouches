import * as React from 'react';
import { Grid, Card, Modal, Button, Input, Icon } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
const objectAssignDeep = require(`object-assign-deep`);

import AddressInput from './AddressInput';
import AddressCard from './AddressCard';

import { addAddress, deleteAddress, editAddress, fetchAddresses, IAddress } from '../actions';
import { IDashReducerState } from '../reducers/reducer_dash';

import { handleError, validateUrl } from '../util';

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
    editModalOpen?: boolean;
    editAddress?: IAddress;
    editTitle?: string;
}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    constructor(props: IDashboardProps) {
        super(props);
    }

    componentWillMount() {
        this.setState({ editAddress: null, editModalOpen: false });
        this.props.fetchAddresses()
            .then(action => {
                if (action.payload.response && action.payload.response.data.errors) {
                    const { errors } = action.payload.response.data;
                    handleError('Fetching listings failed', errors);
                }
            });
    }

    @autobind
    onAddAddress(address: IAddress): Promise<any> {
        return this.props.addAddress(address)
            .then(action => {
                if (action.payload.response && action.payload.response.errors) {
                    const { errors } = action.payload.response;
                    handleError('Add addresse failed', errors);
                } else {
                    toastr.success('Property added!', `Successfully added ${address.attributes.title}`);
                }
            });
    }

    @autobind
    deleteAddress(addressId: string): Promise<any> {
        return this.props.deleteAddress(addressId)
            .then(action => {
                if (action.payload.response && action.payload.response.errors) {
                    const { errors } = action.payload.response;
                    handleError('Delete addresse failed', errors);
                } else {
                    this.props.fetchAddresses();
                    toastr.success('Property deleted', `Successfully deleted that address`);
                }
            });
    }

    @autobind
    editAddress() {

    }

    @autobind
    onEditAddressClick(address: IAddress) {
        this.setState({
            editModalOpen: true,
            editAddress: objectAssignDeep({}, address),
            editTitle: address.attributes.title.substring(0, address.attributes.title.length)
        });
    }

    @autobind
    onDeleteAddressClick(address: IAddress) {
        return this.deleteAddress(address.id);
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

    @autobind
    onEditAddressTitleChange(event: React.ChangeEvent<HTMLInputElement>, data) {
        let { editAddress } = this.state;
        editAddress.attributes.title = data.value;
        this.setState({ editAddress });
    }

    @autobind
    onEditAddressUrlChange(event: React.ChangeEvent<HTMLInputElement>, data) {
        let { editAddress } = this.state;
        editAddress.attributes.url = data.value;
        this.setState({ editAddress });
    }

    @autobind
    renderEditModal(): JSX.Element {
        const { editModalOpen, editAddress, editTitle } = this.state;

        if (editAddress) {
            return (
                <Modal open={editModalOpen}
                   dimmer={'blurring'}
                   basic
                   size="small"
                   className="EditModal"
                   closeOnDimmerClick={true}>
                   <Modal.Content>
                        <h3>Edit "{editTitle}"</h3>
                        <div className="EditModal__inputs">
                            <div className="EditModal__input-wrapper">
                                <Input fluid
                                       value={editAddress.attributes.title}
                                       onChange={this.onEditAddressTitleChange}
                                       placeholder="Name"/>
                            </div>
                            <div className="EditModal__input-wrapper">
                                <Input fluid
                                       label="http://"
                                       value={editAddress.attributes.url}
                                       onChange={this.onEditAddressUrlChange}
                                       placeholder="URL"/>
                            </div>
                        </div>
                   </Modal.Content>
                   <Modal.Actions>
                       <Button basic
                               negative
                               inverted
                               onClick={() => { this.setState({ editModalOpen: false}); }}>
                           Cancel
                       </Button>
                       <Button primary
                               inverted
                               disabled={validateUrl(editAddress.attributes.url)}
                               onClick={this.editAddress}>
                           <Icon name="pencil" /> Save Address
                       </Button>
                   </Modal.Actions>
                </Modal>
            );
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
                {this.renderEditModal()}
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
