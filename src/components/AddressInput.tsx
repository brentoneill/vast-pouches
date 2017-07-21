import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Input, Grid } from 'semantic-ui-react';

import { addAddress } from '../actions';

import './styles/AddressInput.scss';

interface IProps {
    onAddAddress: Function;
}

interface IState {
    url?: string;
    loading?: boolean;
    title?: string;
}

export default class AddressInput extends React.Component<IProps, IState> {
    private input;

    constructor(props: IProps) {
        super(props);
        this.state = {
            url: '',
            title: ''
        };
    }

    @autobind
    handleAddAddressClick(event: React.MouseEvent<HTMLButtonElement>, data): void {
        const { url, title } = this.state;
        this.setState({ loading: true });
        this.props.onAddAddress({ attributes: { title: title, url: `http://${url}` }})
            .then(() => {
                this.setState({ url: '', title: '', loading: false });
            });
    }

    @autobind
    onUrlChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ url: data.value });
    }

    @autobind
    onNameChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ title: data.value });
    }

    validate(): boolean {
        const { title, url } = this.state;
        if (title.length > 1 && url.length > 1) {
            return false;
        } else {
            return true;
        }
    }

    render(): JSX.Element | null {
        return (
            <div className="AddressInput">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Add Property</Header>
                        <div className="AddressInput__controls">
                            <Input value={this.state.title}
                                   onChange={this.onNameChange}
                                   placeholder="Name"/>
                            <Input label="http://"
                                   value={this.state.url}
                                   onChange={this.onUrlChange}
                                   action={{ loading: this.state.loading, disabled: this.validate(), color: 'blue', labelPosition: 'right', icon: 'plus', content: 'Add', onClick: this.handleAddAddressClick }}
                                   placeholder="URL"/>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
