import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Button } from 'semantic-ui-react';

import { IAddress } from '../actions';

import './styles/AddressCard';

interface IProps {
    address: IAddress;
    onDeleteClick: Function;
    onEditClick: Function;
}

export default class AddressCard extends React.Component<IProps, {}> {

    @autobind
    onDeleteClick(event: React.MouseEvent<HTMLElement>) {
        this.props.onDeleteClick(this.props.address);
    }

    @autobind
    onEditClick(event: React.MouseEvent<HTMLElement>) {
        this.props.onDeleteClick(this.props.address);
    }

    render(): JSX.Element {
        const { address } = this.props;

        return (
            <Card fluid className="AddressCard">
                <Card.Content>
                    <h3>{address.attributes.title}</h3>
                    <a target="_blank" href={address.attributes.url}>{address.attributes.url}</a>
                    <div className="AddressCard__controls">
                        <Button.Group>
                            <Button primary onClick={this.onEditClick}>Edit</Button>
                                <Button.Or />
                            <Button negative onClick={this.onDeleteClick}>Delete</Button>
                        </Button.Group>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}
