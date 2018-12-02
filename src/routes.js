import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import TimeTrackerPage from './components/timetracker/TimeTrackerPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TimeTrackerPage} />
        <Route path="about" component={AboutPage} />
    </Route>
);