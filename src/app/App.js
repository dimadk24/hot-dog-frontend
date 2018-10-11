import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CleanPage from './components/CleanPage/CleanPage'
import Navigation from './components/Navigation'
import HomePage from './components/HomePage/HomePage'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/clean" component={CleanPage} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default App
