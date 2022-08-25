const fetch = require("../../fetch/index")
const create_account= require("./create_account")
require('dotenv').config()
const createWallet = `
mutation ($wallet_address:String!) {
    insert_UserWallet(objects: {wallet_address:$wallet_address}) {
      affected_rows
      returning {
        id
        wallet_address
      }
    }
  }
  
`;
const execute = async (variables:Object) => {
  const fetchResponse = await fetch(variables,createWallet) 
  const data = await fetchResponse.json();
  console.log(data.data.insert_UserWallet.returning[0].id)
  const data_account = data.errors==undefined ?await  create_account({address_id:data.data.insert_UserWallet.returning[0].id}):null
  console.log("test123456",data_account.data.insert_UserNonce.returning[0].id)
  if(data_account.data.insert_UserNonce.returning[0].id!=null){
    data.data.insert_UserWallet.returning[0].user_id=data_account.data.insert_UserNonce.returning[0].id
  }
  console.log("DEBUG: ", data.data.insert_UserWallet.returning[0].user_id);
  return data;
};
module.exports=execute
export{}