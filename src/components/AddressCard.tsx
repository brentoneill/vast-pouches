import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Button, Feed } from 'semantic-ui-react';

import { IAddress } from '../actions';
import { stringToColour } from '../util';

import './styles/AddressCard';

interface IProps {
    address: IAddress;
    onDeleteClick: Function;
    onEditClick: Function;
}

interface IState {
    loading?: boolean;
}

export default class AddressCard extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false
        };
    }

    @autobind
    onDeleteClick(event: React.MouseEvent<HTMLElement>) {
        this.setState({ loading: true });
        this.props.onDeleteClick(this.props.address)
            .then(() => { this.setState({ loading: false }); });
    }

    @autobind
    onEditClick(event: React.MouseEvent<HTMLElement>) {
        this.props.onEditClick(this.props.address);
    }

    render(): JSX.Element {
        const { address } = this.props;
        const { loading } = this.state;

        return (
            <Card fluid className="AddressCard">
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <div className="circle" style={{ backgroundColor: stringToColour(address.attributes.url) }}></div>
                            </Feed.Label>
                            <Feed.Content>
                            <div className="AddressCard__content">
                                <h3>{address.attributes.title}</h3>
                                <a target="_blank" href={address.attributes.url}>{address.attributes.url}</a>
                            </div>
                            <div className="AddressCard__controls">
                                <Button.Group>
                                    <Button primary onClick={this.onEditClick}>Edit</Button>
                                        <Button.Or />
                                    <Button negative loading={loading} onClick={this.onDeleteClick}>Delete</Button>
                                </Button.Group>
                            </div>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );
    }
}
