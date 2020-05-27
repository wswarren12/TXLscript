/***************
 SOLIDITY SNIPPETS 
***************/

/* The following are meant to be reusable code snippets and contract building blocks that use current best practices 
so that LegL Engineers and Hackers can play with solidity legos */


/***************
 Contract Setups  
***************/

//plain jane

pragma solidity ^0.6.0;

contract contractName { 

}

//contracts that "is" something 
//example is ownable, which is a common contract modifier that allows an address to upgrade and control portions of the contract, contracts can use "is" followed by multiple modifiers

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol"

contract contractName  { 

    //add your logic here

}

//contracts that "using" something 
//example is importing a roles contract to manage different permissions within the contract. 

pragma solidity ^0.6.0;

import */Roles 

contract contractName  { 
    using Roles for Roles.Role;

    //add your logic here

}

//contract factory 
//contract that allows for the easy deployment of child contracts

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract contractFactory is ReentrancyGuard {
    using SafeMath for uint256;

    //constants and mappings
    address[] public ChildContracts;

    //events
    event NewContractEvent(address indexed _creator, address indexed newContract);

   // deploy a new child contract with these inputs 
   function createContract(
     address _creator,
     address[] memory _approvedAddresses,
     uint256 _numberInput,
     bool _canDoSomething
       )
    public returns (address newContract) {
     ChildContract newContract = new ChildContract(
     address _creator,
     address[] memory _approvedAddresses,
     uint256 _numberInput,
     bool _canDoSomething);

    emit NewContractEvent(_screator, address(newContract));
    ChildContracts.push(address(newContract));
    return address(newContract);
  }

    function getNewContractCount() public view returns (uint256 ChildContractCount) {
        return ChildContracts.length;
    }
}


/***************
 DATA OBJECTS  
***************/

//common types, which can be made public (visible to whole blockchain) or private (internal to contract)
uint256 public wholeNumber; // use for a whole number of indeterminate length
uint8 public smallNumber; // use for three digit number <255
address public ethAddress; // use for a contract address or wallet address
string public name; // use for word or hyperlink inputs 
bool public voted;  // if true, that person already voted
address[] addressArray; // an array of addresses 
//enum provides a limited number of options for an output
enum limitedOptions { Yes, No, Null}

//sets a constant for the contract, can be handy to limit array sizes
uint256 constant MAX_PARTICIPANTS = 100; // maximum number of participants

//structs are data objects that can hold 
struct DataObject {
    uint256 numberId; // unique number
    string name;   // short name
    bool True; // true or false 
    }






