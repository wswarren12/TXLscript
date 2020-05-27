import LexTokenAbi from './LexTokenAbi.json';

//need to download Ether.js and Web3.js npm packages
import { ethers } from 'ethers';
import Web3 from 'web3'

//need to import MM information, can use user service or just pass in account each time.  
import { getAccountInfo, getMetamaskAccount } from './UserService.js';

export default class ContractService {

    constructor(userAccount) {

      //using LexTokenFactory as an example  
      this.lexTokenAddr = '0xAD5B189E64f3D972dec81F286b6101782aD37943';
      this.lexTokenAbi = LexTokenAbi;

      this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_KEY));

      window.ethereum.enable()
      this.web3 = new Web3(window.ethereum);

      //assumes using some user context or user service for import MM account address
      this.account = userAccount
      console.log("user acct", userAccount)

      this.initContract();

    };

    async initContract() {

      this.contract = new this.web3.eth.Contract(this.LexTokenAbi, this.LexTokenAddr)

    }

    async getAllEvents() {
      if (!this.contract) {
        await this.initContract();
      }
      let events = await this.contract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      return events;
    }

    async getLexTokens() {
      if (!this.contract) {
        await this.initContract();
      }
      let peepsMolochs = await this.contract.methods.PeepsMolochs().call();
      return peepsMolochs;
    }

 /************************************CreateDAO*****************************/

    async newLexToken(
        name, 
        symbol, 
        _stamp,
        decimals,
        cap,
        initialSupply,
        owner,
        _lexDAO,
        _lexDAOgoverned,
        encodedPayload = false
    ) {
        console.log('initializing contract')
        console.log('args',
        {name, 
        symbol, 
        _stamp,
        decimals,
        cap,
        initialSupply,
        owner,
        _lexDAO,
        _lexDAOgoverned,
        encodedPayload})

      if (!this.contract) {
        await this.initContract();
      }
      if (encodedPayload) {
        const data = this.contract.methods
          .newLexToken (
            name, 
            symbol, 
            _stamp,
            decimals,
            cap,
            initialSupply,
            owner,
            _lexDAO,
            _lexDAOgoverned
            )
          .encodeABI();
        return data;
      }

      let LT = this.contract.methods
        .newLexToken(
            name, 
            symbol, 
            _stamp,
            decimals,
            cap,
            initialSupply,
            owner,
            _lexDAO,
            _lexDAOgoverned)
        .send({ from: this.account })
        .once('transactionHash', (txHash) => {
          console.log('transactionhash', txHash)

        })
        .then((resp) => {
          console.log(resp)
          return resp;
        })
        .catch((err) => {
          console.log(err);
          return { error: 'rejected transaction' };
        });
      return LT;
    }
}
