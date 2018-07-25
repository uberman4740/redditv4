import React from "react"
import ReactDOM from "react-dom"
import Amplify from "aws-amplify";
import config from "./config";


import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import {Provider} from "react-redux"
import {createStore, applyMiddleware,compose} from "redux"
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducers";
import App from "./App";
import thunkMiddleware from 'redux-thunk'


const middlewares = [thunkMiddleware,logger]
// const middlewares = []

const store = createStore(
    reducer,
    composeWithDevTools(compose(applyMiddleware(...middlewares)))

)


Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root"))
registerServiceWorker()
