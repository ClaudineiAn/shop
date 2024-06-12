import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Web3 from 'web3';
import { makeLog, inputEffect } from '../main.js';

export const setusernameError = (v, setError) => {
  setError(v);
};

export const validateUsername = (username, setError) => {
  if (!username) {
    setusernameError('Required.', setError);
  } else if (username.length > 50) {
    setusernameError('Max 50 characters.', setError);
  } else {
    setusernameError('', setError);
  }
};

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML!=="") {
    return;
  }

  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Create a new Web3 instance using the MetaMask provider
    const web3 = new Web3(window.ethereum);

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = {
      "compilerInput": "{\"language\":\"Solidity\",\"sources\":{\"userAuth.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\r\\npragma solidity ^0.8.0;\\r\\n\\r\\ncontract UserAuth {\\r\\n    struct User {\\r\\n        string username;\\r\\n        address userAddress;\\r\\n    }\\r\\n\\r\\n    mapping(address => User) private users;\\r\\n    mapping(string => address) private usernames;\\r\\n\\r\\n    event UserRegistered(address indexed userAddress, string username);\\r\\n\\r\\n    function register(string memory _username) public {\\r\\n        require(users[msg.sender].userAddress == address(0), \\\"User already registered\\\");\\r\\n        require(usernames[_username] == address(0), \\\"Username already taken\\\");\\r\\n\\r\\n        users[msg.sender] = User(_username, msg.sender);\\r\\n        usernames[_username] = msg.sender;\\r\\n\\r\\n        emit UserRegistered(msg.sender, _username);\\r\\n    }\\r\\n\\r\\n    function getUser() public view returns (string memory) {\\r\\n        require(users[msg.sender].userAddress != address(0), \\\"User not registered\\\");\\r\\n        return users[msg.sender].username;\\r\\n    }\\r\\n}\\r\\n\"}},\"settings\":{\"optimizer\":{\"enabled\":false,\"runs\":200},\"outputSelection\":{\"*\":{\"\":[\"ast\"],\"*\":[\"abi\",\"metadata\",\"devdoc\",\"userdoc\",\"storageLayout\",\"evm.legacyAssembly\",\"evm.bytecode\",\"evm.deployedBytecode\",\"evm.methodIdentifiers\",\"evm.gasEstimates\",\"evm.assembly\"]}},\"remappings\":[]}}",
      "name": "UserAuth",
      "metadata": "{\"compiler\":{\"version\":\"0.8.0+commit.c7dfd78e\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"username\",\"type\":\"string\"}],\"name\":\"UserRegistered\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"getUser\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_username\",\"type\":\"string\"}],\"name\":\"register\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"userAuth.sol\":\"UserAuth\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"userAuth.sol\":{\"keccak256\":\"0xe124d65bca3c789556fe395960f87d09ff9a78717c995bbff59278469d35551e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5808c90391c0d52ef0868e64b668aed862d92b4542c31cfd66f0b59fd23995ae\",\"dweb:/ipfs/QmZYYXu3XfR4nxzK7iawVrrRiNqwweLhVQc3jLF8VGDSnE\"]}},\"version\":1}",
      "bytecode": {
        "generatedSources": [],
        "linkReferences": {},
        "object": "608060405234801561001057600080fd5b506109c2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063832880e71461003b578063f2c298be14610059575b600080fd5b610043610075565b604051610050919061079f565b60405180910390f35b610073600480360381019061006e919061061d565b610217565b005b6060600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013f906107c1565b60405180910390fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610194906108eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101c0906108eb565b801561020d5780601f106101e25761010080835404028352916020019161020d565b820191906000526020600020905b8154815290600101906020018083116101f057829003601f168201915b5050505050905090565b600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146102e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102de90610801565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660018260405161030f9190610788565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610394576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038b906107e1565b60405180910390fd5b60405180604001604052808281526020013373ffffffffffffffffffffffffffffffffffffffff168152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610419929190610512565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050336001826040516104759190610788565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f48cac28ad4dc618e15f4c2dd5e97751182f166de97b25618318b2112aa951a2f82604051610507919061079f565b60405180910390a250565b82805461051e906108eb565b90600052602060002090601f0160209004810192826105405760008555610587565b82601f1061055957805160ff1916838001178555610587565b82800160010185558215610587579182015b8281111561058657825182559160200191906001019061056b565b5b5090506105949190610598565b5090565b5b808211156105b1576000816000905550600101610599565b5090565b60006105c86105c384610852565b610821565b9050828152602081018484840111156105e057600080fd5b6105eb8482856108a9565b509392505050565b600082601f83011261060457600080fd5b81356106148482602086016105b5565b91505092915050565b60006020828403121561062f57600080fd5b600082013567ffffffffffffffff81111561064957600080fd5b610655848285016105f3565b91505092915050565b600061066982610882565b610673818561088d565b93506106838185602086016108b8565b61068c8161097b565b840191505092915050565b60006106a282610882565b6106ac818561089e565b93506106bc8185602086016108b8565b80840191505092915050565b60006106d560138361088d565b91507f55736572206e6f742072656769737465726564000000000000000000000000006000830152602082019050919050565b600061071560168361088d565b91507f557365726e616d6520616c72656164792074616b656e000000000000000000006000830152602082019050919050565b600061075560178361088d565b91507f5573657220616c726561647920726567697374657265640000000000000000006000830152602082019050919050565b60006107948284610697565b915081905092915050565b600060208201905081810360008301526107b9818461065e565b905092915050565b600060208201905081810360008301526107da816106c8565b9050919050565b600060208201905081810360008301526107fa81610708565b9050919050565b6000602082019050818103600083015261081a81610748565b9050919050565b6000604051905081810181811067ffffffffffffffff821117156108485761084761094c565b5b8060405250919050565b600067ffffffffffffffff82111561086d5761086c61094c565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b82818337600083830152505050565b60005b838110156108d65780820151818401526020810190506108bb565b838111156108e5576000848401525b50505050565b6000600282049050600182168061090357607f821691505b602082108114156109175761091661091d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220bbdeef14acda534735b71a2ef1be3854a48c08cfbe4a736d676d1a898047bdf864736f6c63430008000033",
        "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x9C2 DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x36 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x832880E7 EQ PUSH2 0x3B JUMPI DUP1 PUSH4 0xF2C298BE EQ PUSH2 0x59 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x43 PUSH2 0x75 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x50 SWAP2 SWAP1 PUSH2 0x79F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x73 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x6E SWAP2 SWAP1 PUSH2 0x61D JUMP JUMPDEST PUSH2 0x217 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x60 PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x1 ADD PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x148 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x13F SWAP1 PUSH2 0x7C1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 ADD DUP1 SLOAD PUSH2 0x194 SWAP1 PUSH2 0x8EB JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x1C0 SWAP1 PUSH2 0x8EB JUMP JUMPDEST DUP1 ISZERO PUSH2 0x20D JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1E2 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x20D JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x1F0 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x1 ADD PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x2E7 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x2DE SWAP1 PUSH2 0x801 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x1 DUP3 PUSH1 0x40 MLOAD PUSH2 0x30F SWAP2 SWAP1 PUSH2 0x788 JUMP JUMPDEST SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x394 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x38B SWAP1 PUSH2 0x7E1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE POP PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 ADD MLOAD DUP2 PUSH1 0x0 ADD SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x419 SWAP3 SWAP2 SWAP1 PUSH2 0x512 JUMP JUMPDEST POP PUSH1 0x20 DUP3 ADD MLOAD DUP2 PUSH1 0x1 ADD PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP SWAP1 POP POP CALLER PUSH1 0x1 DUP3 PUSH1 0x40 MLOAD PUSH2 0x475 SWAP2 SWAP1 PUSH2 0x788 JUMP JUMPDEST SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x48CAC28AD4DC618E15F4C2DD5E97751182F166DE97B25618318B2112AA951A2F DUP3 PUSH1 0x40 MLOAD PUSH2 0x507 SWAP2 SWAP1 PUSH2 0x79F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH2 0x51E SWAP1 PUSH2 0x8EB JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH2 0x540 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH2 0x587 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH2 0x559 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x587 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x587 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x586 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x56B JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x594 SWAP2 SWAP1 PUSH2 0x598 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x5B1 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x599 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x5C8 PUSH2 0x5C3 DUP5 PUSH2 0x852 JUMP JUMPDEST PUSH2 0x821 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH2 0x5E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x5EB DUP5 DUP3 DUP6 PUSH2 0x8A9 JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x604 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH2 0x614 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0x5B5 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x62F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP3 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x649 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x655 DUP5 DUP3 DUP6 ADD PUSH2 0x5F3 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x669 DUP3 PUSH2 0x882 JUMP JUMPDEST PUSH2 0x673 DUP2 DUP6 PUSH2 0x88D JUMP JUMPDEST SWAP4 POP PUSH2 0x683 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x8B8 JUMP JUMPDEST PUSH2 0x68C DUP2 PUSH2 0x97B JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6A2 DUP3 PUSH2 0x882 JUMP JUMPDEST PUSH2 0x6AC DUP2 DUP6 PUSH2 0x89E JUMP JUMPDEST SWAP4 POP PUSH2 0x6BC DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x8B8 JUMP JUMPDEST DUP1 DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6D5 PUSH1 0x13 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x55736572206E6F74207265676973746572656400000000000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x715 PUSH1 0x16 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x557365726E616D6520616C72656164792074616B656E00000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x755 PUSH1 0x17 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x5573657220616C72656164792072656769737465726564000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x794 DUP3 DUP5 PUSH2 0x697 JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7B9 DUP2 DUP5 PUSH2 0x65E JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7DA DUP2 PUSH2 0x6C8 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7FA DUP2 PUSH2 0x708 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x81A DUP2 PUSH2 0x748 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP DUP2 DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0x848 JUMPI PUSH2 0x847 PUSH2 0x94C JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0x86D JUMPI PUSH2 0x86C PUSH2 0x94C JUMP JUMPDEST JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP3 DUP2 DUP4 CALLDATACOPY PUSH1 0x0 DUP4 DUP4 ADD MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x8D6 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x8BB JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x8E5 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0x903 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x917 JUMPI PUSH2 0x916 PUSH2 0x91D JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xBB 0xDE 0xEF EQ 0xAC 0xDA MSTORE8 SELFBALANCE CALLDATALOAD 0xB7 BYTE 0x2E CALL 0xBE CODESIZE SLOAD LOG4 DUP13 ADDMOD 0xCF 0xBE 0x4A PUSH20 0x6D676D1A898047BDF864736F6C63430008000033 ",
        "sourceMap": "60:873:0:-:0;;;;;;;;;;;;;;;;;;;"
      },
      "abi": [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "username",
              "type": "string"
            }
          ],
          "name": "UserRegistered",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "getUser",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_username",
              "type": "string"
            }
          ],
          "name": "register",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      "storageLayout": {
        "storage": [
          {
            "astId": 11,
            "contract": "userAuth.sol:UserAuth",
            "label": "users",
            "offset": 0,
            "slot": "0",
            "type": "t_mapping(t_address,t_struct(User)6_storage)"
          },
          {
            "astId": 15,
            "contract": "userAuth.sol:UserAuth",
            "label": "usernames",
            "offset": 0,
            "slot": "1",
            "type": "t_mapping(t_string_memory_ptr,t_address)"
          }
        ],
        "types": {
          "t_address": {
            "encoding": "inplace",
            "label": "address",
            "numberOfBytes": "20"
          },
          "t_mapping(t_address,t_struct(User)6_storage)": {
            "encoding": "mapping",
            "key": "t_address",
            "label": "mapping(address => struct UserAuth.User)",
            "numberOfBytes": "32",
            "value": "t_struct(User)6_storage"
          },
          "t_mapping(t_string_memory_ptr,t_address)": {
            "encoding": "mapping",
            "key": "t_string_memory_ptr",
            "label": "mapping(string => address)",
            "numberOfBytes": "32",
            "value": "t_address"
          },
          "t_string_memory_ptr": {
            "encoding": "bytes",
            "label": "string",
            "numberOfBytes": "32"
          },
          "t_string_storage": {
            "encoding": "bytes",
            "label": "string",
            "numberOfBytes": "32"
          },
          "t_struct(User)6_storage": {
            "encoding": "inplace",
            "label": "struct UserAuth.User",
            "members": [
              {
                "astId": 3,
                "contract": "userAuth.sol:UserAuth",
                "label": "username",
                "offset": 0,
                "slot": "0",
                "type": "t_string_storage"
              },
              {
                "astId": 5,
                "contract": "userAuth.sol:UserAuth",
                "label": "userAddress",
                "offset": 0,
                "slot": "1",
                "type": "t_address"
              }
            ],
            "numberOfBytes": "64"
          }
        }
      },
      "web3Deploy": "var userauthContract = new web3.eth.Contract([{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"username\",\"type\":\"string\"}],\"name\":\"UserRegistered\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"getUser\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_username\",\"type\":\"string\"}],\"name\":\"register\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]);\nvar userauth = userauthContract.deploy({\n     data: '0x608060405234801561001057600080fd5b506109c2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063832880e71461003b578063f2c298be14610059575b600080fd5b610043610075565b604051610050919061079f565b60405180910390f35b610073600480360381019061006e919061061d565b610217565b005b6060600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013f906107c1565b60405180910390fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610194906108eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101c0906108eb565b801561020d5780601f106101e25761010080835404028352916020019161020d565b820191906000526020600020905b8154815290600101906020018083116101f057829003601f168201915b5050505050905090565b600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146102e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102de90610801565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660018260405161030f9190610788565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610394576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038b906107e1565b60405180910390fd5b60405180604001604052808281526020013373ffffffffffffffffffffffffffffffffffffffff168152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610419929190610512565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050336001826040516104759190610788565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f48cac28ad4dc618e15f4c2dd5e97751182f166de97b25618318b2112aa951a2f82604051610507919061079f565b60405180910390a250565b82805461051e906108eb565b90600052602060002090601f0160209004810192826105405760008555610587565b82601f1061055957805160ff1916838001178555610587565b82800160010185558215610587579182015b8281111561058657825182559160200191906001019061056b565b5b5090506105949190610598565b5090565b5b808211156105b1576000816000905550600101610599565b5090565b60006105c86105c384610852565b610821565b9050828152602081018484840111156105e057600080fd5b6105eb8482856108a9565b509392505050565b600082601f83011261060457600080fd5b81356106148482602086016105b5565b91505092915050565b60006020828403121561062f57600080fd5b600082013567ffffffffffffffff81111561064957600080fd5b610655848285016105f3565b91505092915050565b600061066982610882565b610673818561088d565b93506106838185602086016108b8565b61068c8161097b565b840191505092915050565b60006106a282610882565b6106ac818561089e565b93506106bc8185602086016108b8565b80840191505092915050565b60006106d560138361088d565b91507f55736572206e6f742072656769737465726564000000000000000000000000006000830152602082019050919050565b600061071560168361088d565b91507f557365726e616d6520616c72656164792074616b656e000000000000000000006000830152602082019050919050565b600061075560178361088d565b91507f5573657220616c726561647920726567697374657265640000000000000000006000830152602082019050919050565b60006107948284610697565b915081905092915050565b600060208201905081810360008301526107b9818461065e565b905092915050565b600060208201905081810360008301526107da816106c8565b9050919050565b600060208201905081810360008301526107fa81610708565b9050919050565b6000602082019050818103600083015261081a81610748565b9050919050565b6000604051905081810181811067ffffffffffffffff821117156108485761084761094c565b5b8060405250919050565b600067ffffffffffffffff82111561086d5761086c61094c565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b82818337600083830152505050565b60005b838110156108d65780820151818401526020810190506108bb565b838111156108e5576000848401525b50505050565b6000600282049050600182168061090357607f821691505b602082108114156109175761091661091d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220bbdeef14acda534735b71a2ef1be3854a48c08cfbe4a736d676d1a898047bdf864736f6c63430008000033', \n     arguments: [\n     ]\n}).send({\n     from: web3.eth.accounts[0], \n     gas: '4700000'\n   }, function (e, contract){\n    console.log(e, contract);\n    if (typeof contract.address !== 'undefined') {\n         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);\n    }\n })",
      "functionHashes": {
        "832880e7": "getUser()",
        "f2c298be": "register(string)"
      },
      "gasEstimates": {
        "Creation": {
          "codeDepositCost": "499600",
          "executionCost": "537",
          "totalCost": "500137"
        },
        "External": {
          "getUser()": "infinite",
          "register(string)": "infinite"
        }
      },
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {},
        "version": 1
      },
      "Runtime Bytecode": {
        "generatedSources": [
          {
            "ast": {
              "nodeType": "YulBlock",
              "src": "0:6972:1",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "91:260:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "101:74:1",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "167:6:1"
                                }
                              ],
                              "functionName": {
                                "name": "array_allocation_size_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "125:41:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "125:49:1"
                            }
                          ],
                          "functionName": {
                            "name": "allocateMemory",
                            "nodeType": "YulIdentifier",
                            "src": "110:14:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "110:65:1"
                        },
                        "variableNames": [
                          {
                            "name": "array",
                            "nodeType": "YulIdentifier",
                            "src": "101:5:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "array",
                              "nodeType": "YulIdentifier",
                              "src": "191:5:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "198:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "184:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "184:21:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "184:21:1"
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "214:27:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "array",
                              "nodeType": "YulIdentifier",
                              "src": "229:5:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "236:4:1",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "225:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "225:16:1"
                        },
                        "variables": [
                          {
                            "name": "dst",
                            "nodeType": "YulTypedName",
                            "src": "218:3:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "279:16:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "288:1:1",
                                    "type": "",
                                    "value": "0"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "291:1:1",
                                    "type": "",
                                    "value": "0"
                                  }
                                ],
                                "functionName": {
                                  "name": "revert",
                                  "nodeType": "YulIdentifier",
                                  "src": "281:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "281:12:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "281:12:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "src",
                                  "nodeType": "YulIdentifier",
                                  "src": "260:3:1"
                                },
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "265:6:1"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "256:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "256:16:1"
                            },
                            {
                              "name": "end",
                              "nodeType": "YulIdentifier",
                              "src": "274:3:1"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "253:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "253:25:1"
                        },
                        "nodeType": "YulIf",
                        "src": "250:2:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "src",
                              "nodeType": "YulIdentifier",
                              "src": "328:3:1"
                            },
                            {
                              "name": "dst",
                              "nodeType": "YulIdentifier",
                              "src": "333:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "338:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "copy_calldata_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "304:23:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "304:41:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "304:41:1"
                      }
                    ]
                  },
                  "name": "abi_decode_available_length_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "64:3:1",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "69:6:1",
                      "type": ""
                    },
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "77:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "array",
                      "nodeType": "YulTypedName",
                      "src": "85:5:1",
                      "type": ""
                    }
                  ],
                  "src": "7:344:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "433:211:1",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "482:16:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "491:1:1",
                                    "type": "",
                                    "value": "0"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "494:1:1",
                                    "type": "",
                                    "value": "0"
                                  }
                                ],
                                "functionName": {
                                  "name": "revert",
                                  "nodeType": "YulIdentifier",
                                  "src": "484:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "484:12:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "484:12:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "461:6:1"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "469:4:1",
                                      "type": "",
                                      "value": "0x1f"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "457:3:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "457:17:1"
                                },
                                {
                                  "name": "end",
                                  "nodeType": "YulIdentifier",
                                  "src": "476:3:1"
                                }
                              ],
                              "functionName": {
                                "name": "slt",
                                "nodeType": "YulIdentifier",
                                "src": "453:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "453:27:1"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "446:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "446:35:1"
                        },
                        "nodeType": "YulIf",
                        "src": "443:2:1"
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "507:34:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "offset",
                              "nodeType": "YulIdentifier",
                              "src": "534:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "calldataload",
                            "nodeType": "YulIdentifier",
                            "src": "521:12:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "521:20:1"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "511:6:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "550:88:1",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "611:6:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "619:4:1",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "607:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "607:17:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "626:6:1"
                            },
                            {
                              "name": "end",
                              "nodeType": "YulIdentifier",
                              "src": "634:3:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_available_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "559:47:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "559:79:1"
                        },
                        "variableNames": [
                          {
                            "name": "array",
                            "nodeType": "YulIdentifier",
                            "src": "550:5:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_decode_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "offset",
                      "nodeType": "YulTypedName",
                      "src": "411:6:1",
                      "type": ""
                    },
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "419:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "array",
                      "nodeType": "YulTypedName",
                      "src": "427:5:1",
                      "type": ""
                    }
                  ],
                  "src": "371:273:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "726:299:1",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "772:16:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "781:1:1",
                                    "type": "",
                                    "value": "0"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "784:1:1",
                                    "type": "",
                                    "value": "0"
                                  }
                                ],
                                "functionName": {
                                  "name": "revert",
                                  "nodeType": "YulIdentifier",
                                  "src": "774:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "774:12:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "774:12:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "747:7:1"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "756:9:1"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "743:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "743:23:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "768:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "slt",
                            "nodeType": "YulIdentifier",
                            "src": "739:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "739:32:1"
                        },
                        "nodeType": "YulIf",
                        "src": "736:2:1"
                      },
                      {
                        "nodeType": "YulBlock",
                        "src": "798:220:1",
                        "statements": [
                          {
                            "nodeType": "YulVariableDeclaration",
                            "src": "813:45:1",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "844:9:1"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "855:1:1",
                                      "type": "",
                                      "value": "0"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "840:3:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "840:17:1"
                                }
                              ],
                              "functionName": {
                                "name": "calldataload",
                                "nodeType": "YulIdentifier",
                                "src": "827:12:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "827:31:1"
                            },
                            "variables": [
                              {
                                "name": "offset",
                                "nodeType": "YulTypedName",
                                "src": "817:6:1",
                                "type": ""
                              }
                            ]
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "905:16:1",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [
                                      {
                                        "kind": "number",
                                        "nodeType": "YulLiteral",
                                        "src": "914:1:1",
                                        "type": "",
                                        "value": "0"
                                      },
                                      {
                                        "kind": "number",
                                        "nodeType": "YulLiteral",
                                        "src": "917:1:1",
                                        "type": "",
                                        "value": "0"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "revert",
                                      "nodeType": "YulIdentifier",
                                      "src": "907:6:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "907:12:1"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "907:12:1"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "877:6:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "885:18:1",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "874:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "874:30:1"
                            },
                            "nodeType": "YulIf",
                            "src": "871:2:1"
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "935:73:1",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "980:9:1"
                                    },
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "991:6:1"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "976:3:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "976:22:1"
                                },
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "1000:7:1"
                                }
                              ],
                              "functionName": {
                                "name": "abi_decode_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "945:30:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "945:63:1"
                            },
                            "variableNames": [
                              {
                                "name": "value0",
                                "nodeType": "YulIdentifier",
                                "src": "935:6:1"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_decode_tuple_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "696:9:1",
                      "type": ""
                    },
                    {
                      "name": "dataEnd",
                      "nodeType": "YulTypedName",
                      "src": "707:7:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "719:6:1",
                      "type": ""
                    }
                  ],
                  "src": "650:375:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1123:272:1",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "1133:53:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "1180:5:1"
                            }
                          ],
                          "functionName": {
                            "name": "array_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "1147:32:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1147:39:1"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "1137:6:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1195:78:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1261:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1266:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "1202:58:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1202:71:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "1195:3:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "1308:5:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "1315:4:1",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "1304:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1304:16:1"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1322:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1327:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "copy_memory_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "1282:21:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1282:52:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1282:52:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1343:46:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1354:3:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "1381:6:1"
                                }
                              ],
                              "functionName": {
                                "name": "round_up_to_mul_of_32",
                                "nodeType": "YulIdentifier",
                                "src": "1359:21:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1359:29:1"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1350:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1350:39:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "1343:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "1104:5:1",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "1111:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "1119:3:1",
                      "type": ""
                    }
                  ],
                  "src": "1031:364:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1511:267:1",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "1521:53:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "1568:5:1"
                            }
                          ],
                          "functionName": {
                            "name": "array_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "1535:32:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1535:39:1"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "1525:6:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1583:96:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1667:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1672:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "1590:76:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1590:89:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "1583:3:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "1714:5:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "1721:4:1",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "1710:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1710:16:1"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1728:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1733:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "copy_memory_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "1688:21:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1688:52:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1688:52:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1749:23:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "1760:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1765:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1756:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1756:16:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "1749:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "1492:5:1",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "1499:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "1507:3:1",
                      "type": ""
                    }
                  ],
                  "src": "1401:377:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1930:171:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "1940:74:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2006:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2011:2:1",
                              "type": "",
                              "value": "19"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "1947:58:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1947:67:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "1940:3:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "pos",
                                  "nodeType": "YulIdentifier",
                                  "src": "2035:3:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2040:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2031:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2031:11:1"
                            },
                            {
                              "kind": "string",
                              "nodeType": "YulLiteral",
                              "src": "2044:21:1",
                              "type": "",
                              "value": "User not registered"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "2024:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2024:42:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2024:42:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2076:19:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2087:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2092:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "2083:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2083:12:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "2076:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c_to_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "1918:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "1926:3:1",
                      "type": ""
                    }
                  ],
                  "src": "1784:317:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2253:174:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "2263:74:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2329:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2334:2:1",
                              "type": "",
                              "value": "22"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "2270:58:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2270:67:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "2263:3:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "pos",
                                  "nodeType": "YulIdentifier",
                                  "src": "2358:3:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2363:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2354:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2354:11:1"
                            },
                            {
                              "kind": "string",
                              "nodeType": "YulLiteral",
                              "src": "2367:24:1",
                              "type": "",
                              "value": "Username already taken"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "2347:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2347:45:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2347:45:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2402:19:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2413:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2418:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "2409:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2409:12:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "2402:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c_to_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "2241:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "2249:3:1",
                      "type": ""
                    }
                  ],
                  "src": "2107:320:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2579:175:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "2589:74:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2655:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2660:2:1",
                              "type": "",
                              "value": "23"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "2596:58:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2596:67:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "2589:3:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "pos",
                                  "nodeType": "YulIdentifier",
                                  "src": "2684:3:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2689:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2680:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2680:11:1"
                            },
                            {
                              "kind": "string",
                              "nodeType": "YulLiteral",
                              "src": "2693:25:1",
                              "type": "",
                              "value": "User already registered"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "2673:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2673:46:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2673:46:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2729:19:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "2740:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2745:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "2736:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2736:12:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "2729:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40_to_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "2567:3:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "2575:3:1",
                      "type": ""
                    }
                  ],
                  "src": "2433:321:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2896:139:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "2907:102:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "value0",
                              "nodeType": "YulIdentifier",
                              "src": "2996:6:1"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "3005:3:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "2914:81:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2914:95:1"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "2907:3:1"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "3019:10:1",
                        "value": {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "3026:3:1"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "3019:3:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_packed_t_string_memory_ptr__to_t_string_memory_ptr__nonPadded_inplace_fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "2875:3:1",
                      "type": ""
                    },
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "2881:6:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "2892:3:1",
                      "type": ""
                    }
                  ],
                  "src": "2760:275:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3159:195:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "3169:26:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3181:9:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3192:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3177:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3177:18:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3169:4:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3216:9:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "3227:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "3212:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3212:17:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "3235:4:1"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3241:9:1"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "3231:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3231:20:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "3205:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3205:47:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3205:47:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "3261:86:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "value0",
                              "nodeType": "YulIdentifier",
                              "src": "3333:6:1"
                            },
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "3342:4:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "3269:63:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3269:78:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3261:4:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "3131:9:1",
                      "type": ""
                    },
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "3143:6:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "3154:4:1",
                      "type": ""
                    }
                  ],
                  "src": "3041:313:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3531:248:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "3541:26:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3553:9:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3564:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3549:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3549:18:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3541:4:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3588:9:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "3599:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "3584:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3584:17:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "3607:4:1"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3613:9:1"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "3603:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3603:20:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "3577:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3577:47:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3577:47:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "3633:139:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "3767:4:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "3641:124:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3641:131:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3633:4:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c__to_t_string_memory_ptr__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "3511:9:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "3526:4:1",
                      "type": ""
                    }
                  ],
                  "src": "3360:419:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3956:248:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "3966:26:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3978:9:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3989:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3974:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3974:18:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3966:4:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4013:9:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "4024:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "4009:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4009:17:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "4032:4:1"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4038:9:1"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "4028:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4028:20:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "4002:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4002:47:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4002:47:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4058:139:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "4192:4:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "4066:124:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4066:131:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "4058:4:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c__to_t_string_memory_ptr__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "3936:9:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "3951:4:1",
                      "type": ""
                    }
                  ],
                  "src": "3785:419:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4381:248:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "4391:26:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "4403:9:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4414:2:1",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "4399:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4399:18:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "4391:4:1"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4438:9:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "4449:1:1",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "4434:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4434:17:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "4457:4:1"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4463:9:1"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "4453:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4453:20:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "4427:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4427:47:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4427:47:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4483:139:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "4617:4:1"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "4491:124:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4491:131:1"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "4483:4:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40__to_t_string_memory_ptr__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "4361:9:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "4376:4:1",
                      "type": ""
                    }
                  ],
                  "src": "4210:419:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4675:243:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "4685:19:1",
                        "value": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4701:2:1",
                              "type": "",
                              "value": "64"
                            }
                          ],
                          "functionName": {
                            "name": "mload",
                            "nodeType": "YulIdentifier",
                            "src": "4695:5:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4695:9:1"
                        },
                        "variableNames": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "4685:6:1"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "4713:35:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "4735:6:1"
                            },
                            {
                              "name": "size",
                              "nodeType": "YulIdentifier",
                              "src": "4743:4:1"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "4731:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4731:17:1"
                        },
                        "variables": [
                          {
                            "name": "newFreePtr",
                            "nodeType": "YulTypedName",
                            "src": "4717:10:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "4859:22:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x41",
                                  "nodeType": "YulIdentifier",
                                  "src": "4861:16:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4861:18:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "4861:18:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "newFreePtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "4802:10:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "4814:18:1",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "4799:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4799:34:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "newFreePtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "4838:10:1"
                                },
                                {
                                  "name": "memPtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "4850:6:1"
                                }
                              ],
                              "functionName": {
                                "name": "lt",
                                "nodeType": "YulIdentifier",
                                "src": "4835:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4835:22:1"
                            }
                          ],
                          "functionName": {
                            "name": "or",
                            "nodeType": "YulIdentifier",
                            "src": "4796:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4796:62:1"
                        },
                        "nodeType": "YulIf",
                        "src": "4793:2:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4897:2:1",
                              "type": "",
                              "value": "64"
                            },
                            {
                              "name": "newFreePtr",
                              "nodeType": "YulIdentifier",
                              "src": "4901:10:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "4890:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4890:22:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4890:22:1"
                      }
                    ]
                  },
                  "name": "allocateMemory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "size",
                      "nodeType": "YulTypedName",
                      "src": "4659:4:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulTypedName",
                      "src": "4668:6:1",
                      "type": ""
                    }
                  ],
                  "src": "4635:283:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4991:265:1",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "5096:22:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x41",
                                  "nodeType": "YulIdentifier",
                                  "src": "5098:16:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "5098:18:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "5098:18:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5068:6:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5076:18:1",
                              "type": "",
                              "value": "0xffffffffffffffff"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "5065:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5065:30:1"
                        },
                        "nodeType": "YulIf",
                        "src": "5062:2:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5148:41:1",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "5164:6:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5172:4:1",
                                  "type": "",
                                  "value": "0x1f"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5160:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5160:17:1"
                            },
                            {
                              "arguments": [
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5183:4:1",
                                  "type": "",
                                  "value": "0x1f"
                                }
                              ],
                              "functionName": {
                                "name": "not",
                                "nodeType": "YulIdentifier",
                                "src": "5179:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5179:9:1"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "5156:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5156:33:1"
                        },
                        "variableNames": [
                          {
                            "name": "size",
                            "nodeType": "YulIdentifier",
                            "src": "5148:4:1"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5226:23:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "size",
                              "nodeType": "YulIdentifier",
                              "src": "5238:4:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5244:4:1",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "5234:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5234:15:1"
                        },
                        "variableNames": [
                          {
                            "name": "size",
                            "nodeType": "YulIdentifier",
                            "src": "5226:4:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_allocation_size_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "4975:6:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "size",
                      "nodeType": "YulTypedName",
                      "src": "4986:4:1",
                      "type": ""
                    }
                  ],
                  "src": "4924:332:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5321:40:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "5332:22:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "5348:5:1"
                            }
                          ],
                          "functionName": {
                            "name": "mload",
                            "nodeType": "YulIdentifier",
                            "src": "5342:5:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5342:12:1"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "5332:6:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_length_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "5304:5:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "5314:6:1",
                      "type": ""
                    }
                  ],
                  "src": "5262:99:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5463:73:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5480:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5485:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "5473:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5473:19:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5473:19:1"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5501:29:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5520:3:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5525:4:1",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "5516:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5516:14:1"
                        },
                        "variableNames": [
                          {
                            "name": "updated_pos",
                            "nodeType": "YulIdentifier",
                            "src": "5501:11:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "5435:3:1",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "5440:6:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulTypedName",
                      "src": "5451:11:1",
                      "type": ""
                    }
                  ],
                  "src": "5367:169:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5656:34:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "5666:18:1",
                        "value": {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "5681:3:1"
                        },
                        "variableNames": [
                          {
                            "name": "updated_pos",
                            "nodeType": "YulIdentifier",
                            "src": "5666:11:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "5628:3:1",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "5633:6:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulTypedName",
                      "src": "5644:11:1",
                      "type": ""
                    }
                  ],
                  "src": "5542:148:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5747:103:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "dst",
                              "nodeType": "YulIdentifier",
                              "src": "5770:3:1"
                            },
                            {
                              "name": "src",
                              "nodeType": "YulIdentifier",
                              "src": "5775:3:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5780:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "calldatacopy",
                            "nodeType": "YulIdentifier",
                            "src": "5757:12:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5757:30:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5757:30:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dst",
                                  "nodeType": "YulIdentifier",
                                  "src": "5828:3:1"
                                },
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "5833:6:1"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5824:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5824:16:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5842:1:1",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "5817:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5817:27:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5817:27:1"
                      }
                    ]
                  },
                  "name": "copy_calldata_to_memory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "5729:3:1",
                      "type": ""
                    },
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "5734:3:1",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "5739:6:1",
                      "type": ""
                    }
                  ],
                  "src": "5696:154:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5905:258:1",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "5915:10:1",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5924:1:1",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "i",
                            "nodeType": "YulTypedName",
                            "src": "5919:1:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "5984:63:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "arguments": [
                                      {
                                        "name": "dst",
                                        "nodeType": "YulIdentifier",
                                        "src": "6009:3:1"
                                      },
                                      {
                                        "name": "i",
                                        "nodeType": "YulIdentifier",
                                        "src": "6014:1:1"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "add",
                                      "nodeType": "YulIdentifier",
                                      "src": "6005:3:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "6005:11:1"
                                  },
                                  {
                                    "arguments": [
                                      {
                                        "arguments": [
                                          {
                                            "name": "src",
                                            "nodeType": "YulIdentifier",
                                            "src": "6028:3:1"
                                          },
                                          {
                                            "name": "i",
                                            "nodeType": "YulIdentifier",
                                            "src": "6033:1:1"
                                          }
                                        ],
                                        "functionName": {
                                          "name": "add",
                                          "nodeType": "YulIdentifier",
                                          "src": "6024:3:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "6024:11:1"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "mload",
                                      "nodeType": "YulIdentifier",
                                      "src": "6018:5:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "6018:18:1"
                                  }
                                ],
                                "functionName": {
                                  "name": "mstore",
                                  "nodeType": "YulIdentifier",
                                  "src": "5998:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "5998:39:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "5998:39:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "5945:1:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5948:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "lt",
                            "nodeType": "YulIdentifier",
                            "src": "5942:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5942:13:1"
                        },
                        "nodeType": "YulForLoop",
                        "post": {
                          "nodeType": "YulBlock",
                          "src": "5956:19:1",
                          "statements": [
                            {
                              "nodeType": "YulAssignment",
                              "src": "5958:15:1",
                              "value": {
                                "arguments": [
                                  {
                                    "name": "i",
                                    "nodeType": "YulIdentifier",
                                    "src": "5967:1:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "5970:2:1",
                                    "type": "",
                                    "value": "32"
                                  }
                                ],
                                "functionName": {
                                  "name": "add",
                                  "nodeType": "YulIdentifier",
                                  "src": "5963:3:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "5963:10:1"
                              },
                              "variableNames": [
                                {
                                  "name": "i",
                                  "nodeType": "YulIdentifier",
                                  "src": "5958:1:1"
                                }
                              ]
                            }
                          ]
                        },
                        "pre": {
                          "nodeType": "YulBlock",
                          "src": "5938:3:1",
                          "statements": []
                        },
                        "src": "5934:113:1"
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "6081:76:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "arguments": [
                                      {
                                        "name": "dst",
                                        "nodeType": "YulIdentifier",
                                        "src": "6131:3:1"
                                      },
                                      {
                                        "name": "length",
                                        "nodeType": "YulIdentifier",
                                        "src": "6136:6:1"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "add",
                                      "nodeType": "YulIdentifier",
                                      "src": "6127:3:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "6127:16:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "6145:1:1",
                                    "type": "",
                                    "value": "0"
                                  }
                                ],
                                "functionName": {
                                  "name": "mstore",
                                  "nodeType": "YulIdentifier",
                                  "src": "6120:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "6120:27:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "6120:27:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "6062:1:1"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6065:6:1"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "6059:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6059:13:1"
                        },
                        "nodeType": "YulIf",
                        "src": "6056:2:1"
                      }
                    ]
                  },
                  "name": "copy_memory_to_memory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "5887:3:1",
                      "type": ""
                    },
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "5892:3:1",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "5897:6:1",
                      "type": ""
                    }
                  ],
                  "src": "5856:307:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6220:269:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "6230:22:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "data",
                              "nodeType": "YulIdentifier",
                              "src": "6244:4:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6250:1:1",
                              "type": "",
                              "value": "2"
                            }
                          ],
                          "functionName": {
                            "name": "div",
                            "nodeType": "YulIdentifier",
                            "src": "6240:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6240:12:1"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "6230:6:1"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "6261:38:1",
                        "value": {
                          "arguments": [
                            {
                              "name": "data",
                              "nodeType": "YulIdentifier",
                              "src": "6291:4:1"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6297:1:1",
                              "type": "",
                              "value": "1"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "6287:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6287:12:1"
                        },
                        "variables": [
                          {
                            "name": "outOfPlaceEncoding",
                            "nodeType": "YulTypedName",
                            "src": "6265:18:1",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "6338:51:1",
                          "statements": [
                            {
                              "nodeType": "YulAssignment",
                              "src": "6352:27:1",
                              "value": {
                                "arguments": [
                                  {
                                    "name": "length",
                                    "nodeType": "YulIdentifier",
                                    "src": "6366:6:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "6374:4:1",
                                    "type": "",
                                    "value": "0x7f"
                                  }
                                ],
                                "functionName": {
                                  "name": "and",
                                  "nodeType": "YulIdentifier",
                                  "src": "6362:3:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "6362:17:1"
                              },
                              "variableNames": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "6352:6:1"
                                }
                              ]
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "outOfPlaceEncoding",
                              "nodeType": "YulIdentifier",
                              "src": "6318:18:1"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "6311:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6311:26:1"
                        },
                        "nodeType": "YulIf",
                        "src": "6308:2:1"
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "6441:42:1",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x22",
                                  "nodeType": "YulIdentifier",
                                  "src": "6455:16:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "6455:18:1"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "6455:18:1"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "outOfPlaceEncoding",
                              "nodeType": "YulIdentifier",
                              "src": "6405:18:1"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "6428:6:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "6436:2:1",
                                  "type": "",
                                  "value": "32"
                                }
                              ],
                              "functionName": {
                                "name": "lt",
                                "nodeType": "YulIdentifier",
                                "src": "6425:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6425:14:1"
                            }
                          ],
                          "functionName": {
                            "name": "eq",
                            "nodeType": "YulIdentifier",
                            "src": "6402:2:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6402:38:1"
                        },
                        "nodeType": "YulIf",
                        "src": "6399:2:1"
                      }
                    ]
                  },
                  "name": "extract_byte_array_length",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "data",
                      "nodeType": "YulTypedName",
                      "src": "6204:4:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "6213:6:1",
                      "type": ""
                    }
                  ],
                  "src": "6169:320:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6523:152:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6540:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6543:77:1",
                              "type": "",
                              "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "6533:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6533:88:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6533:88:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6637:1:1",
                              "type": "",
                              "value": "4"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6640:4:1",
                              "type": "",
                              "value": "0x22"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "6630:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6630:15:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6630:15:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6661:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6664:4:1",
                              "type": "",
                              "value": "0x24"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "6654:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6654:15:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6654:15:1"
                      }
                    ]
                  },
                  "name": "panic_error_0x22",
                  "nodeType": "YulFunctionDefinition",
                  "src": "6495:180:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6709:152:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6726:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6729:77:1",
                              "type": "",
                              "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "6719:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6719:88:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6719:88:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6823:1:1",
                              "type": "",
                              "value": "4"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6826:4:1",
                              "type": "",
                              "value": "0x41"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "6816:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6816:15:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6816:15:1"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6847:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6850:4:1",
                              "type": "",
                              "value": "0x24"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "6840:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6840:15:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6840:15:1"
                      }
                    ]
                  },
                  "name": "panic_error_0x41",
                  "nodeType": "YulFunctionDefinition",
                  "src": "6681:180:1"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6915:54:1",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "6925:38:1",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "6943:5:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "6950:2:1",
                                  "type": "",
                                  "value": "31"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "6939:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6939:14:1"
                            },
                            {
                              "arguments": [
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "6959:2:1",
                                  "type": "",
                                  "value": "31"
                                }
                              ],
                              "functionName": {
                                "name": "not",
                                "nodeType": "YulIdentifier",
                                "src": "6955:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6955:7:1"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "6935:3:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6935:28:1"
                        },
                        "variableNames": [
                          {
                            "name": "result",
                            "nodeType": "YulIdentifier",
                            "src": "6925:6:1"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "round_up_to_mul_of_32",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "6898:5:1",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "result",
                      "nodeType": "YulTypedName",
                      "src": "6908:6:1",
                      "type": ""
                    }
                  ],
                  "src": "6867:102:1"
                }
              ]
            },
            "contents": "{\n\n    function abi_decode_available_length_t_string_memory_ptr(src, length, end) -> array {\n        array := allocateMemory(array_allocation_size_t_string_memory_ptr(length))\n        mstore(array, length)\n        let dst := add(array, 0x20)\n        if gt(add(src, length), end) { revert(0, 0) }\n        copy_calldata_to_memory(src, dst, length)\n    }\n\n    // string\n    function abi_decode_t_string_memory_ptr(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert(0, 0) }\n        let length := calldataload(offset)\n        array := abi_decode_available_length_t_string_memory_ptr(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_tuple_t_string_memory_ptr(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n\n        {\n\n            let offset := calldataload(add(headStart, 0))\n            if gt(offset, 0xffffffffffffffff) { revert(0, 0) }\n\n            value0 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, length)\n    }\n\n    function abi_encode_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 19)\n\n        mstore(add(pos, 0), \"User not registered\")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 22)\n\n        mstore(add(pos, 0), \"Username already taken\")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 23)\n\n        mstore(add(pos, 0), \"User already registered\")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_packed_t_string_memory_ptr__to_t_string_memory_ptr__nonPadded_inplace_fromStack_reversed(pos , value0) -> end {\n\n        pos := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value0,  pos)\n\n        end := pos\n    }\n\n    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_263f68979ab8493dfb876baf1251b5bb5d13d94765abbd21388b0d254d48747c_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_72471179dc02414cf0ca04cb861ff5039e92029e5baefa064f12cc297df5850c_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_a08d66f010282343c63a2adfb2fb2eae7af36c2d0e7cd9b2008665789fb65b40_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function allocateMemory(size) -> memPtr {\n        memPtr := mload(64)\n        let newFreePtr := add(memPtr, size)\n        // protect against overflow\n        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n    }\n\n    function array_allocation_size_t_string_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        // round up\n        size := and(add(length, 0x1f), not(0x1f))\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function array_length_t_string_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length) -> updated_pos {\n        updated_pos := pos\n    }\n\n    function copy_calldata_to_memory(src, dst, length) {\n        calldatacopy(dst, src, length)\n        // clear end\n        mstore(add(dst, length), 0)\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x41() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n}\n",
            "id": 1,
            "language": "Yul",
            "name": "#utility.yul"
          }
        ],
        "immutableReferences": {},
        "linkReferences": {},
        "object": "608060405234801561001057600080fd5b50600436106100365760003560e01c8063832880e71461003b578063f2c298be14610059575b600080fd5b610043610075565b604051610050919061079f565b60405180910390f35b610073600480360381019061006e919061061d565b610217565b005b6060600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013f906107c1565b60405180910390fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610194906108eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101c0906108eb565b801561020d5780601f106101e25761010080835404028352916020019161020d565b820191906000526020600020905b8154815290600101906020018083116101f057829003601f168201915b5050505050905090565b600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146102e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102de90610801565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660018260405161030f9190610788565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610394576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038b906107e1565b60405180910390fd5b60405180604001604052808281526020013373ffffffffffffffffffffffffffffffffffffffff168152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610419929190610512565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050336001826040516104759190610788565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f48cac28ad4dc618e15f4c2dd5e97751182f166de97b25618318b2112aa951a2f82604051610507919061079f565b60405180910390a250565b82805461051e906108eb565b90600052602060002090601f0160209004810192826105405760008555610587565b82601f1061055957805160ff1916838001178555610587565b82800160010185558215610587579182015b8281111561058657825182559160200191906001019061056b565b5b5090506105949190610598565b5090565b5b808211156105b1576000816000905550600101610599565b5090565b60006105c86105c384610852565b610821565b9050828152602081018484840111156105e057600080fd5b6105eb8482856108a9565b509392505050565b600082601f83011261060457600080fd5b81356106148482602086016105b5565b91505092915050565b60006020828403121561062f57600080fd5b600082013567ffffffffffffffff81111561064957600080fd5b610655848285016105f3565b91505092915050565b600061066982610882565b610673818561088d565b93506106838185602086016108b8565b61068c8161097b565b840191505092915050565b60006106a282610882565b6106ac818561089e565b93506106bc8185602086016108b8565b80840191505092915050565b60006106d560138361088d565b91507f55736572206e6f742072656769737465726564000000000000000000000000006000830152602082019050919050565b600061071560168361088d565b91507f557365726e616d6520616c72656164792074616b656e000000000000000000006000830152602082019050919050565b600061075560178361088d565b91507f5573657220616c726561647920726567697374657265640000000000000000006000830152602082019050919050565b60006107948284610697565b915081905092915050565b600060208201905081810360008301526107b9818461065e565b905092915050565b600060208201905081810360008301526107da816106c8565b9050919050565b600060208201905081810360008301526107fa81610708565b9050919050565b6000602082019050818103600083015261081a81610748565b9050919050565b6000604051905081810181811067ffffffffffffffff821117156108485761084761094c565b5b8060405250919050565b600067ffffffffffffffff82111561086d5761086c61094c565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b82818337600083830152505050565b60005b838110156108d65780820151818401526020810190506108bb565b838111156108e5576000848401525b50505050565b6000600282049050600182168061090357607f821691505b602082108114156109175761091661091d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220bbdeef14acda534735b71a2ef1be3854a48c08cfbe4a736d676d1a898047bdf864736f6c63430008000033",
        "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x36 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x832880E7 EQ PUSH2 0x3B JUMPI DUP1 PUSH4 0xF2C298BE EQ PUSH2 0x59 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x43 PUSH2 0x75 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x50 SWAP2 SWAP1 PUSH2 0x79F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x73 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x6E SWAP2 SWAP1 PUSH2 0x61D JUMP JUMPDEST PUSH2 0x217 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x60 PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x1 ADD PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x148 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x13F SWAP1 PUSH2 0x7C1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 ADD DUP1 SLOAD PUSH2 0x194 SWAP1 PUSH2 0x8EB JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x1C0 SWAP1 PUSH2 0x8EB JUMP JUMPDEST DUP1 ISZERO PUSH2 0x20D JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1E2 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x20D JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x1F0 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x1 ADD PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x2E7 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x2DE SWAP1 PUSH2 0x801 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x1 DUP3 PUSH1 0x40 MLOAD PUSH2 0x30F SWAP2 SWAP1 PUSH2 0x788 JUMP JUMPDEST SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x394 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x38B SWAP1 PUSH2 0x7E1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE POP PUSH1 0x0 DUP1 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 ADD MLOAD DUP2 PUSH1 0x0 ADD SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x419 SWAP3 SWAP2 SWAP1 PUSH2 0x512 JUMP JUMPDEST POP PUSH1 0x20 DUP3 ADD MLOAD DUP2 PUSH1 0x1 ADD PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP SWAP1 POP POP CALLER PUSH1 0x1 DUP3 PUSH1 0x40 MLOAD PUSH2 0x475 SWAP2 SWAP1 PUSH2 0x788 JUMP JUMPDEST SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x48CAC28AD4DC618E15F4C2DD5E97751182F166DE97B25618318B2112AA951A2F DUP3 PUSH1 0x40 MLOAD PUSH2 0x507 SWAP2 SWAP1 PUSH2 0x79F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH2 0x51E SWAP1 PUSH2 0x8EB JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH2 0x540 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH2 0x587 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH2 0x559 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x587 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x587 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x586 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x56B JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x594 SWAP2 SWAP1 PUSH2 0x598 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x5B1 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x599 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x5C8 PUSH2 0x5C3 DUP5 PUSH2 0x852 JUMP JUMPDEST PUSH2 0x821 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH2 0x5E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x5EB DUP5 DUP3 DUP6 PUSH2 0x8A9 JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x604 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH2 0x614 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0x5B5 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x62F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP3 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x649 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x655 DUP5 DUP3 DUP6 ADD PUSH2 0x5F3 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x669 DUP3 PUSH2 0x882 JUMP JUMPDEST PUSH2 0x673 DUP2 DUP6 PUSH2 0x88D JUMP JUMPDEST SWAP4 POP PUSH2 0x683 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x8B8 JUMP JUMPDEST PUSH2 0x68C DUP2 PUSH2 0x97B JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6A2 DUP3 PUSH2 0x882 JUMP JUMPDEST PUSH2 0x6AC DUP2 DUP6 PUSH2 0x89E JUMP JUMPDEST SWAP4 POP PUSH2 0x6BC DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x8B8 JUMP JUMPDEST DUP1 DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6D5 PUSH1 0x13 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x55736572206E6F74207265676973746572656400000000000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x715 PUSH1 0x16 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x557365726E616D6520616C72656164792074616B656E00000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x755 PUSH1 0x17 DUP4 PUSH2 0x88D JUMP JUMPDEST SWAP2 POP PUSH32 0x5573657220616C72656164792072656769737465726564000000000000000000 PUSH1 0x0 DUP4 ADD MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x794 DUP3 DUP5 PUSH2 0x697 JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7B9 DUP2 DUP5 PUSH2 0x65E JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7DA DUP2 PUSH2 0x6C8 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x7FA DUP2 PUSH2 0x708 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x81A DUP2 PUSH2 0x748 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP DUP2 DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0x848 JUMPI PUSH2 0x847 PUSH2 0x94C JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0x86D JUMPI PUSH2 0x86C PUSH2 0x94C JUMP JUMPDEST JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP3 DUP2 DUP4 CALLDATACOPY PUSH1 0x0 DUP4 DUP4 ADD MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x8D6 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x8BB JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x8E5 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0x903 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x917 JUMPI PUSH2 0x916 PUSH2 0x91D JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xBB 0xDE 0xEF EQ 0xAC 0xDA MSTORE8 SELFBALANCE CALLDATALOAD 0xB7 BYTE 0x2E CALL 0xBE CODESIZE SLOAD LOG4 DUP13 ADDMOD 0xCF 0xBE 0x4A PUSH20 0x6D676D1A898047BDF864736F6C63430008000033 ",
        "sourceMap": "60:873:0:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;737:193;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;342:387;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;737:193;777:13;852:1;811:43;;:5;:17;817:10;811:17;;;;;;;;;;;;;;;:29;;;;;;;;;;;;:43;;;;803:75;;;;;;;;;;;;:::i;:::-;;;;;;;;;896:5;:17;902:10;896:17;;;;;;;;;;;;;;;:26;;889:33;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;737:193;:::o;342:387::-;452:1;411:43;;:5;:17;417:10;411:17;;;;;;;;;;;;;;;:29;;;;;;;;;;;;:43;;;403:79;;;;;;;;;;;;:::i;:::-;;;;;;;;;533:1;501:34;;:9;511;501:20;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:34;;;493:69;;;;;;;;;;;;:::i;:::-;;;;;;;;;595:27;;;;;;;;600:9;595:27;;;;611:10;595:27;;;;;575:5;:17;581:10;575:17;;;;;;;;;;;;;;;:47;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;656:10;633:9;643;633:20;;;;;;:::i;:::-;;;;;;;;;;;;;;:33;;;;;;;;;;;;;;;;;;699:10;684:37;;;711:9;684:37;;;;;;:::i;:::-;;;;;;;;342:387;:::o;-1:-1:-1:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:344:1:-;;110:65;125:49;167:6;125:49;:::i;:::-;110:65;:::i;:::-;101:74;;198:6;191:5;184:21;236:4;229:5;225:16;274:3;265:6;260:3;256:16;253:25;250:2;;;291:1;288;281:12;250:2;304:41;338:6;333:3;328;304:41;:::i;:::-;91:260;;;;;;:::o;371:273::-;;476:3;469:4;461:6;457:17;453:27;443:2;;494:1;491;484:12;443:2;534:6;521:20;559:79;634:3;626:6;619:4;611:6;607:17;559:79;:::i;:::-;550:88;;433:211;;;;;:::o;650:375::-;;768:2;756:9;747:7;743:23;739:32;736:2;;;784:1;781;774:12;736:2;855:1;844:9;840:17;827:31;885:18;877:6;874:30;871:2;;;917:1;914;907:12;871:2;945:63;1000:7;991:6;980:9;976:22;945:63;:::i;:::-;935:73;;798:220;726:299;;;;:::o;1031:364::-;;1147:39;1180:5;1147:39;:::i;:::-;1202:71;1266:6;1261:3;1202:71;:::i;:::-;1195:78;;1282:52;1327:6;1322:3;1315:4;1308:5;1304:16;1282:52;:::i;:::-;1359:29;1381:6;1359:29;:::i;:::-;1354:3;1350:39;1343:46;;1123:272;;;;;:::o;1401:377::-;;1535:39;1568:5;1535:39;:::i;:::-;1590:89;1672:6;1667:3;1590:89;:::i;:::-;1583:96;;1688:52;1733:6;1728:3;1721:4;1714:5;1710:16;1688:52;:::i;:::-;1765:6;1760:3;1756:16;1749:23;;1511:267;;;;;:::o;1784:317::-;;1947:67;2011:2;2006:3;1947:67;:::i;:::-;1940:74;;2044:21;2040:1;2035:3;2031:11;2024:42;2092:2;2087:3;2083:12;2076:19;;1930:171;;;:::o;2107:320::-;;2270:67;2334:2;2329:3;2270:67;:::i;:::-;2263:74;;2367:24;2363:1;2358:3;2354:11;2347:45;2418:2;2413:3;2409:12;2402:19;;2253:174;;;:::o;2433:321::-;;2596:67;2660:2;2655:3;2596:67;:::i;:::-;2589:74;;2693:25;2689:1;2684:3;2680:11;2673:46;2745:2;2740:3;2736:12;2729:19;;2579:175;;;:::o;2760:275::-;;2914:95;3005:3;2996:6;2914:95;:::i;:::-;2907:102;;3026:3;3019:10;;2896:139;;;;:::o;3041:313::-;;3192:2;3181:9;3177:18;3169:26;;3241:9;3235:4;3231:20;3227:1;3216:9;3212:17;3205:47;3269:78;3342:4;3333:6;3269:78;:::i;:::-;3261:86;;3159:195;;;;:::o;3360:419::-;;3564:2;3553:9;3549:18;3541:26;;3613:9;3607:4;3603:20;3599:1;3588:9;3584:17;3577:47;3641:131;3767:4;3641:131;:::i;:::-;3633:139;;3531:248;;;:::o;3785:419::-;;3989:2;3978:9;3974:18;3966:26;;4038:9;4032:4;4028:20;4024:1;4013:9;4009:17;4002:47;4066:131;4192:4;4066:131;:::i;:::-;4058:139;;3956:248;;;:::o;4210:419::-;;4414:2;4403:9;4399:18;4391:26;;4463:9;4457:4;4453:20;4449:1;4438:9;4434:17;4427:47;4491:131;4617:4;4491:131;:::i;:::-;4483:139;;4381:248;;;:::o;4635:283::-;;4701:2;4695:9;4685:19;;4743:4;4735:6;4731:17;4850:6;4838:10;4835:22;4814:18;4802:10;4799:34;4796:62;4793:2;;;4861:18;;:::i;:::-;4793:2;4901:10;4897:2;4890:22;4675:243;;;;:::o;4924:332::-;;5076:18;5068:6;5065:30;5062:2;;;5098:18;;:::i;:::-;5062:2;5183:4;5179:9;5172:4;5164:6;5160:17;5156:33;5148:41;;5244:4;5238;5234:15;5226:23;;4991:265;;;:::o;5262:99::-;;5348:5;5342:12;5332:22;;5321:40;;;:::o;5367:169::-;;5485:6;5480:3;5473:19;5525:4;5520:3;5516:14;5501:29;;5463:73;;;;:::o;5542:148::-;;5681:3;5666:18;;5656:34;;;;:::o;5696:154::-;5780:6;5775:3;5770;5757:30;5842:1;5833:6;5828:3;5824:16;5817:27;5747:103;;;:::o;5856:307::-;5924:1;5934:113;5948:6;5945:1;5942:13;5934:113;;;6033:1;6028:3;6024:11;6018:18;6014:1;6009:3;6005:11;5998:39;5970:2;5967:1;5963:10;5958:15;;5934:113;;;6065:6;6062:1;6059:13;6056:2;;;6145:1;6136:6;6131:3;6127:16;6120:27;6056:2;5905:258;;;;:::o;6169:320::-;;6250:1;6244:4;6240:12;6230:22;;6297:1;6291:4;6287:12;6318:18;6308:2;;6374:4;6366:6;6362:17;6352:27;;6308:2;6436;6428:6;6425:14;6405:18;6402:38;6399:2;;;6455:18;;:::i;:::-;6399:2;6220:269;;;;:::o;6495:180::-;6543:77;6540:1;6533:88;6640:4;6637:1;6630:15;6664:4;6661:1;6654:15;6681:180;6729:77;6726:1;6719:88;6826:4;6823:1;6816:15;6850:4;6847:1;6840:15;6867:102;;6959:2;6955:7;6950:2;6943:5;6939:14;6935:28;6925:38;;6915:54;;;:::o"
      }}
      const userAuthContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();

      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }

      const registeredUsername = await userAuthContract.methods.getUser().call({ from: accounts[0] });

      if (!registeredUsername) {
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          await userAuthContract.methods.register(username).send({ from: accounts[0] });
          const logged = await makeLog(username);
          if (logged === 200) {
            await router.push('/');
          } else {
            await router.push('/access?error=' + logged);
          }
        } else {
          setusernameError('Invalid user.', setError);
        }
      }
    } catch (error) {
      console.error(error);
      await router.push('/access?error=' + error.message);
    }
  } else {
    await router.push('/access?error=MetaMask is not installed.');
  }
};

export const dataAccess = () => {
  return {
    route: useRoute(),
    router: useRouter(),
    username: ref('')
  };
};

export const mountedAccess = () => {
  inputEffect();
};