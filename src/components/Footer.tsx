import * as React from 'react';

import './styles/Footer.scss';

interface IProps {
    className?: string;
}

class Footer extends React.PureComponent<IProps> {
    render(): JSX.Element {
        const cssClasses = `Footer ${this.props.className}`;

        return (
            <footer className={cssClasses}>
                <nav>
                    <a target="_blank" href="http://biggerpockets.com">biggerpockets.com</a>
                </nav>
            </footer>
        );
    }
}

export default Footer;
