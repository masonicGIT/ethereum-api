import resource from 'resource-router-middleware';
import web3 from './utils/web3';
import models from './utils/models';

export default ({ config }) => resource({

  id: 'user',

  load(req, id, callback) {
    let user = id;
    callback(err, user);
  },

  index({ params }, res) {
    res.json({message: 'Ethereum Classic API - Create a multi-signature wallet'  })
  },
  
  create({ body }, res) {
    const spendingLimit = 0;
    const walletContract = web3.eth.contract(config.multiSignature.abi);
    const contractData = {
      from: config.wallet.etherAddress,
      data: config.multiSignature.code.original,
      gas: 3000000
    };
    const m = body.m;
    const recoveryWalletPublic = body.recoveryWallet && body.recoveryWallet.public;
    const userWalletPublic = body.userWallet && body.userWallet.public;
    const userWalletPrivate = body.userWallet && body.userWallet.private;

    let data = new models.data();
    let publicKeys = [];

    if (!recoveryWalletPublic) {
      data = {
	error: true,
        message: 'Error: Missing the recovery wallets public address. Set as "recoveryWallet.public".'
      }  
    }

    if (!userWalletPublic) {
      data = {
	error: true,
        message: 'Error: Missing the user wallets public address. Set as "userWallet.public".'
      }  
    }

    if (!userWalletPrivate) {
      data = {
	error: true,
        message: 'Error: Missing the user wallets public address. Set as "userWallet.private".'
      }  
    }

    if (userWalletPrivate && userWalletPrivate.length === 32) {
      data = {
        error: true,
	message: 'Error: Please encrypt you private key and try again'
      }
      return res.json(data);
    } 

    publicKeys.push(userWalletPublic);
    publicKeys.push(recoveryWalletPublic);

    let wallet = walletContract.new(publicKeys, m, spendingLimit, contractData, function(error, contract) {
      if (!contract.address) {
        console.log('Waiting for Ethereum network confirmation...\n');
      } else {
	return res.json({ 
	  contract: {
            transactionHash: contract.transactionHash,
            address: contract.address
	  }
	});
      }
    });  
  }
})