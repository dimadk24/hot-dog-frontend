import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CleanPage from './components/CleanPage/CleanPage'
import * as Sentry from '@sentry/browser'

if (process.env.NODE_ENV === 'production') {
    // noinspection JSUnresolvedVariable
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN
    })
}

class App extends Component {
    componentWillMount() {
        window.user_id = getQueryParam('viewer_id')
        window.auth_key = getQueryParam('auth_key')
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error})
        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key])
            })
            Sentry.captureException(error)
        })
    }

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Fragment>
                    {/*<Navigation />*/}
                    <Switch>
                        <Route path="/" component={CleanPage} />
                        <Route path="/clean" component={CleanPage} />
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

function getQueryParam(param) {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] === param) {
            return pair[1]
        }
    }
    throw new Error(`Query Variable ${param} not found`)
}

export default App
