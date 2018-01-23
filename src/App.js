import React, {Component} from 'react';
import './App.scss';
import {MuiThemeProvider} from "material-ui";

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import {Route} from "react-router-dom";
import {WidgetPage} from "./containers/WidgetPage/WidgetPage";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider>
                    <Route exact path='/' component={WidgetPage} />
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
