pragma solidity ^0.5.0;
import "./ERC721.sol";

contract Cats is ERC721{
    
   
    uint256 public _tokenId;
    struct Employee{
        uint EmpID;
        address EmpAddr;
        string name;
        string types;
        string task;
    }
    // struct tokenID{
    //     uint256 tok;
    // }
    mapping(uint => Employee) public Employees;
    // mapping(uint => tokenID) public tokenIDs;
     uint internal EmpCount;
     uint internal count;
     uint internal c;
     uint256 internal flag;
     function addEmpl (string memory _name,address EmpAddress,
        string memory _types,
        string memory _task) public {
         EmpCount ++;
       Employees[EmpCount] = Employee(EmpCount,EmpAddress,_name,_types,_task);
    }
    // To produce unique tokenId when submit button is clicked
    function calcToken(uint256 number) public returns(uint256)
    {   
        //keccak256 function is used to input create a pseudo random number as a tokenID each time 
        // it is called and is calcToken function is calls tokenId during minting
        _tokenId = uint256(keccak256(abi.encodePacked(EmpCount,number,now))) % 10000000;
        return _tokenId;
    }
      function mintingTok(address _from)   public 
{ 
    //when submit button is clicked data is sent as integers and string one is stored as a mapping 
    // and the integer data whic includes the same set of data variables are used to find unique token 
    //value substitued to produce _tokenId which is used to mint token to owner address
    require(_tokenId!= 0,"error");
     super._mint(_from,_tokenId);
    } 
     function transferTok(address from, address to) public{
         flag = calcToken(c);
        super.transferFrom(from,to,flag);
        c++;
     }
    
}
