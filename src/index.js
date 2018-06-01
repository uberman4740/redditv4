import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import {Provider} from "react-redux"
import {createStore, applyMiddleware,compose} from "redux"
import logger from 'redux-logger'

import promise from "redux-promise"
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducers";
import App from "./App";

const middlewares = [promise,logger]
const store = createStore(
    reducer,
    composeWithDevTools(compose(applyMiddleware(...middlewares)))

)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root"))
registerServiceWorker()
