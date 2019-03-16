import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import proCats from './proCats';

class App extends Component {
    state = {
      EmpID: null,
      EmpAddr: '',
      name:'',
      types:'',
      task:'',
      ipfsGateway:'https://gateway.ipfs.io/ipfs/',
      numb:'',
      Addr:'',
      To:'',
      From:''
    };

    componentDidMount(){
        document.title = "Project CATs"
    };
    
    //methods to capture textbox values and assign them to state variables  
    updateEid=(txt) =>{
        this.setState({EmpID: txt.target.value});  
    };

    updateEaddr=(txt) =>{
        this.setState({EmpAddr: txt.target.value});  
    };

    updatename=(txt) =>{
        this.setState({name: txt.target.value});  
    };

    updateType=(txt)=>{
        this.setState({types: txt.target.value});
    };

    updatetask=(txt)=>{
        this.setState({task: txt.target.value});
    };
    updateAddr=(txt)=>{
        this.setState({Addr: txt.target.value});
    };
    updatenumb=(txt)=>{
        this.setState({numb: txt.target.value});
    };
    updateAddrTo=(txt)=>{
        this.setState({To: txt.target.value});
    };
    updateAddrFrom=(txt)=>{
        this.setState({From: txt.target.value});
    };
    
     //method to setup addEmpl
     onViewTransfer = async (event) =>{
    event.preventDefault();
    console.log("web3 value is ", web3.eth.getAccounts());
    const accounts = await web3.eth.getAccounts();
    console.log('Sending from Metamask account: ', accounts[0]);
    const ethAddress = await proCats.options.address;
    this.setState({ ethAddress });

    await proCats.methods.transferTok(this.state.From,this.state.To).send({
        from: accounts[0]
        
    }).then(response => {
        console.log('Object Response: ', response);
        alert("the from address is "+this.state.From+" the to address is "+this.state.To );
    }).catch(err => console.log(err));

};
        //method to view contract content i.e. to redirect to IPFS gateway of the content after primary push
        onViewContent = async (event) =>{
            event.preventDefault();
            console.log("web3 value is ", web3.eth.getAccounts());
            const accounts = await web3.eth.getAccounts();
            console.log('Sending from Metamask account: ', accounts[0]);
            const ethAddress = await proCats.options.address;
            this.setState({ ethAddress });
            await proCats.methods.mintingTok(this.state.Addr).send({
                from: accounts[0]
            
                
            }).then(response => {
                console.log('Object Response: ', response);
                alert("the address is"+this.state.Addr);
            }).catch(err => console.log(err));
        
        };
        onViewCont = async (event) =>{
            event.preventDefault();
            console.log("web3 value is ", web3.eth.getAccounts());
            const accounts = await web3.eth.getAccounts();
            console.log('Sending from Metamask account: ', accounts[0]);
            const ethAddress = await proCats.options.address;
            this.setState({ ethAddress });
            await proCats.methods.calcToken(this.state.numb).send({
                from: accounts[0]
            
            }).then(response => {
                console.log('Object Response: ', response);
                alert("the no is"+this.state.numb);
            }).catch(err => console.log(err));
        
        };


   //method to setup addEmpl
   onAddEmpl = async (event) =>{
    event.preventDefault();
    console.log("web3 value is ", web3.eth.getAccounts());
    const accounts = await web3.eth.getAccounts();
    console.log('Sending from Metamask account: ', accounts[0]);
    const ethAddress = await proCats.options.address;
    this.setState({ ethAddress });

    await proCats.methods.addEmpl(this.state.EmpID,this.state.EmpAddr,this.state.name,this.state.types).send({
        from: accounts[0]
        
    }).then(response => {
        console.log('Object Response: ', response);
        alert("the id is"+this.state.EmpID+" Address "+this.state.EmpAddr+" Name "+this.state.name+" type "+this.state.types+" task "+this.state.task);
    }).catch(err => console.log(err));

};


 
render() {
return ( 
<div>
        <h1><center>Project CATs</center></h1>
        <br/>
    <fieldset>
        <legend> <h2>Manager (owner of tokens)</h2></legend>
    <div className="container">
    <div class="form-group">
        <form onSubmit={this.onAddEmpl}>
                
                <br/><br/>
                <label>Employee Id</label>{'   '}
                <input type="text" class="form-control" value={this.state.EmpID} onChange={this.updateEid} placeholder="Employee Identity Number" />
                <br/><br/>
                <label>Employee Address</label>{'   '}
                <input type="address" class="form-control" value={this.state.EmpAddr} onChange={this.updateEaddr} placeholder="Address" />
                <br/><br/>
                <label>Name of Employee</label>{'   '}
                <input type="text" class="form-control" value={this.state.name} onChange={this.updatename} placeholder="Name of Employee" />
                <br/>
                <label>Type of Goal</label>{'   '}
                <input type="text" class="form-control" value={this.state.types} onChange={this.updateType} placeholder="Type of Goal" />
                <br/>
                <label>Description of Task</label>{'   '}
                <input type="text" class="form-control" value={this.state.task} onChange={this.updatetask} placeholder="Task" />
                <br/>
                <input type="submit" class="btn btn-primary" disabled={this.state.EmpID === ''}value="Add"/>
        </form>
        </div>
    </div>
    </fieldset>
    <fieldset>
    <div className="container">
        <h3>Mint Token</h3>
        <label>Enter random number</label>{'   '}
                <input type="text" class="form-control" value={this.state.numb} onChange={this.updatenumb} placeholder="random number" />
                <br/>
        <label>Token Address of minter</label>{'   '}
                <input type="text" class="form-control" value={this.state.Addr} onChange={this.updateAddr} placeholder="Address of minting account" />
                <br/>
                <input type="submit" class="btn btn-success" onClick={this.onViewCont} value="createTokenId"/><br/>
        <br/><input type="submit" class="btn btn-warning" onClick={this.onViewContent} value="GetToken"/>
    </div>
    </fieldset>
    <fieldset>
    <div class="container">
  <div class="panel-body">
    
    <h3>Validate Task</h3>
    <input type="text" class="form-control" value={this.state.From} onChange={this.updateAddrFrom} placeholder="From Address" /><br/>
    <input type="text" class="form-control"  value={this.state.To} onChange={this.updateAddrTo}  placeholder="Token Id" /><br/>
    <button class="btn btn-primary" id="transferButton" type="button" onClick={this.onViewTransfer} value="Validate">Validate</button>
  </div>
</div>
    </fieldset>
</div>);
}
}
export default App;