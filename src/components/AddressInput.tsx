import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Input, Grid, Label } from 'semantic-ui-react';

import { addAddress } from '../actions';
import { validateUrl } from '../util';

import './styles/AddressInput.scss';

interface IProps {
    onAddAddress: Function;
}

interface IState {
    url?: string;
    loading?: boolean;
    title?: string;
    showUrlValidation?: boolean;
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
        let { url, title } = this.state;
        url = url.indexOf('http') >= 0 ? url : `http://${url}`;

        this.setState({ loading: true });

        this.props.onAddAddress({ attributes: { title: title, url }})
            .then(() => {
                this.setState({ url: '', title: '', loading: false });
            });
    }

    @autobind
    onUrlChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        const url = data.value;
        if (url.length > 5 && !validateUrl(url)) {
            this.setState({ url, showUrlValidation: true });
        } else {
            this.setState({ url, showUrlValidation: false });
        }
    }

    @autobind
    onNameChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ title: data.value });
    }

    validate(): boolean {
        const { title, url } = this.state;
        if (title.length > 1 && url.length > 1 && validateUrl(url)) {
            return false;
        } else {
            return true;
        }
    }

    renderUrlValidationError(showUrlValidation: boolean): JSX.Element | null {
        if (showUrlValidation) {
            return <Label basic color="red" pointing>Please enter a valid url to add an address.</Label>;
        } else {
            return null;
        }
    }

    render(): JSX.Element | null {
        const { showUrlValidation } = this.state;

        return (
            <div className="AddressInput">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Add Property</Header>
                        <div className="AddressInput__controls">
                            <div className="AddressInput__input-wrapper">
                                <Input fluid
                                       value={this.state.title}
                                       onChange={this.onNameChange}
                                       placeholder="Name"/>
                            </div>
                            <div className="AddressInput__input-wrapper">
                                <Input fluid
                                       label="http://"
                                       value={this.state.url}
                                       onChange={this.onUrlChange}
                                       action={{ loading: this.state.loading, disabled: this.validate(), color: 'blue', labelPosition: 'right', icon: 'plus', content: 'Add Address', onClick: this.handleAddAddressClick }}
                                       placeholder="URL"/>
                                {this.renderUrlValidationError(showUrlValidation)}
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
