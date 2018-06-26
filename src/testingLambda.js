const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const dynamodb = new AWS.DynamoDB({region:'us-east-1', apiVersion: '2012-08-10'})

let a ={}
exports.handler = (event, context, callback) => {
    console.log(event)
    console.log("SDAFSAFSAFSADFDSAF#$_____________")
    const params= {
        TableName: 'categories'
    }
    dynamodb.scan(params, (err,data)=>{
        if(err) {
            console.log(err)
            callback(err)
        } else{
            const items = data.Items.map(item=>{
                return {
                    title:item.title.S
                }
            })
            a = items
            console.log(items)
            callback(null,items)
        }
    })
};
console.log(a)