import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CleanPage from './components/CleanPage/CleanPage'
import * as Sentry from '@sentry/browser'
import TopBar from './components/TopBar'
import AddMoneyPage from './components/AddMoneyPage/AddMoneyPage'
import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
    // noinspection JSUnresolvedVariable
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN
    })
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    setBalance(newBalance) {
        this.setState({balance: newBalance})
    }

    async componentWillMount() {
        window.user_id = getQueryParam('viewer_id')
        window.auth_key = getQueryParam('auth_key')
        this.setBalance(await this.getUserBalance())
    }

    async getUserBalance() {
        return (await axios.get('https://hot-dog.site/api/getBalance', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key
            }
        })).data.balance
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
                    <TopBar balance={this.state.balance}/>
                    <Switch>
                        <Route exact path="/" render={
                            (props) =>
                                <CleanPage balance={this.state.balance}
                                           onChangeBalance={(balance) => this.setBalance(balance)}/>
                        }/>
                        <Route path="/clean" component={CleanPage}/>
                        <Route path={"/add_money"} component={AddMoneyPage}/>
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

function getQueryParam(param) {
    const query = window.location.search.substring(1)
    window.urlParams = query
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
