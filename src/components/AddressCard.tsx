import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card } from 'semantic-ui-react';

import { IAddress } from '../actions';

interface IProps {
    address: IAddress;
    onDeleteClick: Function;
    onEditClick: Function;
}

export default class AddressCard extends React.Component<IProps, {}> {
    render(): JSX.Element {
        const { address } = this.props;

        return (
            <Card fluid className="AddressCard">
                <Card.Content>
                    <h3>{address.attributes.title}</h3>
                    <a href={address.attributes.url}>{address.attributes.url}</a>
                </Card.Content>
            </Card>
        );
    }
}
