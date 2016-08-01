import resource from 'resource-router-middleware';
import web3 from './utils/web3';

export default ({ config }) => resource({

  id : 'address',

  load(req, id, callback) {
    let address = id;
    let err = address ? null : 'Address not found'
    callback(err, address);
  },
  
  read({ address }, res) {
    const balanceWei = web3.eth.getBalance(address);
    const balanceEther = web3.fromWei(balanceWei, "ether");
    res.json({ 
      address: address,
    	balance: { 
        wei: balanceWei, 
        ether: balanceEther  
      }
    });
  }
})