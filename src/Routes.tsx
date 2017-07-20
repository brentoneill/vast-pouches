import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

// NOTE: Stats and settings tabs are stubbed for future development, but have
//       no content currently.
export default (
    <Route path="/" component={App}>
        <Route component={Layout}>
            <IndexRoute component={Dashboard} />
        </Route>
    </Route>
);
