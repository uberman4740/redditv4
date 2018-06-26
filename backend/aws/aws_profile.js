import { CognitoUserPool } from 'amazon-cognito-identity-js';
import 'amazon-cognito-js'
const REGION = "us-east-1"
const USER_POOL_ID = 'us-east-1_qMzOoPyJh'
const CLIENT_ID = '6v1m8garla1u4lvhu71u4ud15a'
AWS.config.update({
    region: REGION
})
const userData = {
    UserPoolId : USER_POOL_ID,
    ClientId : CLIENT_ID
}
export const userPool = new CognitoUserPool(userData);
export const USERPOOL_ID = 'cognito-idp.'+REGION+'.amazonaws.com/'+USER_POOL_ID
export const IDENTITY_POOL_ID = 'us-east-1:4d4365a8-9a44-4d47-abed-7f8b49d09228'