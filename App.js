import React, { Component } from 'react';
import './App.css';
import ipfs from './ipfs';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";

import {address, abi}  from './storehash';
import Web3 from 'web3';


class App extends Component {
  state = { ipfsHash:null,     
            buffer:'',      
            ethAddress:'',      
            transactionHash:'',      
            txReceipt: '' ,
            web3: null, accounts: null, contract: null, done: true  };



 captureFile =(event) => {
        event.stopPropagation()  
        event.preventDefault() 
        const file = event.target.files[0]
        let reader = new window.FileReader()        
        reader.readAsArrayBuffer(file)       
        reader.onloadend = () => this.convertToBuffer(reader) };

        //Convert the file to buffer to store on IPFS 
  convertToBuffer = async(reader) => {      
        //file is converted to a buffer for upload to IPFS        
        const buffer = await Buffer.from(reader.result);      
        //set this buffer-using es6 syntax        
        this.setState({buffer});
        console.log(this.state.buffer)}

  onSubmit = async (event) => {
          
          event.preventDefault();
          this.setState({done : undefined})

          //setting up web3 to talk to meta mask
          window.ethereum.enable()
          const web3 = new Web3(Web3.givenProvider);
          const accounts = await web3.eth.getAccounts()
          this.setState({accounts : accounts[0]})
          const storehash = new web3.eth.Contract(abi,address) 
         
          //save document to IPFS,return its hash#, and set hash# to state      
          await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          console.log(err,ipfsHash);        
          //setState by setting ipfsHash to ipfsHash[0].hash        
          this.setState({ ipfsHash:ipfsHash[0].hash }); 
          this.setState({done : true})
          storehash.methods.setHash(this.state.ipfsHash).send({from: accounts[0]},
            (error, transactionHash) => {          
              console.log(transactionHash);          
              this.setState({transactionHash});}
            ) })};  
        
onClick = async () => {
      try{        
          this.setState({blockNumber:"waiting.."});        
          this.setState({gasUsed:"waiting..."});
          await Web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{  
                console.log(err,txReceipt);          
                this.setState({txReceipt}); }); }
                catch(error){console.log(error);    }}
   
      

  render() {
    
    return ( 
      <div className="App">
           


      <Container> 
      <Row> <Col>
              <h3> Please keep your license in the network </h3>          
              <form onSubmit={this.onSubmit}>            
              <input  type = "file"   onChange = {this.captureFile} />
              <Button bsstyle="primary"  type="submit"> Send it </Button>          
              </form>
            </Col>
      </Row>
      </Container>

        <div>
        <hr/> 
        <div >
        {!this.state.done ? (
          <ReactLoading type={"bars"} color={"red"} />
        ) : (
          <h1></h1>
        )}   
        </div>
     <hr/>  

<table bordered responsive>                


    <tbody>                  
        <tr>                    
            <td>IPFS Hash stored on Ethereum</td>                    
            <td> : </td>                    
            <td>{this.state.ipfsHash}</td>                  
                           
                      
                            
            </tr> </tbody> </table>

        </div>

      </div>

     );    }}

export default App;
