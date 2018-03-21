import React from 'react';
import {Bond} from 'oo7';
import {bonds, formatBlockNumber,formatBalance, Rimg, isNullData} from 'oo7-parity';
import {Rspan} from 'oo7-react';
import {InputBond, BButton} from 'parity-reactive-ui';
const bgImg = 'https://dzc2hmj8w639c.cloudfront.net/sites/default/files/styles/bigsplashcl__standard/public/hp-main-img.jpg?itok=0DRpfFnv&timestamp=1468443132';
const tokenAdd = '0xF908d25108453c74f3f86a50bc77DaB38583D5b2'
const TokenAPI =[
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_spender",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "approve",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "totalSupply",
	  "outputs": [
		{
		  "name": "total",
		  "type": "uint256"
		}
	  ],
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_from",
		  "type": "address"
		},
		{
		  "name": "_to",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "transferFrom",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [
		{
		  "name": "_owner",
		  "type": "address"
		}
	  ],
	  "name": "balanceOf",
	  "outputs": [
		{
		  "name": "balance",
		  "type": "uint256"
		}
	  ],
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_to",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "transfer",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [
		{
		  "name": "_owner",
		  "type": "address"
		},
		{
		  "name": "_spender",
		  "type": "address"
		}
	  ],
	  "name": "allowance",
	  "outputs": [
		{
		  "name": "remaining",
		  "type": "uint256"
		}
	  ],
	  "type": "function"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "name": "from",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "name": "to",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "name": "value",
		  "type": "uint256"
		}
	  ],
	  "name": "Transfer",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "name": "owner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "name": "spender",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "name": "value",
		  "type": "uint256"
		}
	  ],
	  "name": "Approval",
	  "type": "event"
	}
  ];






  
export class App extends React.Component {

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.state1 = { random: 0 };
		this.state2 = { random: 0 };
		this.tot = {random: 0};
		this.bond = new Bond;
		window.bonds = bonds;
		this.state = { current: null };
		this.didBet = null;
		this.tokensContract = bonds.makeContract(tokenAdd,TokenAPI)
		}

	getTokens(){
		this.tokensContract.approve(bonds.me, 100)
	}

	payOwed(){
		const owed = 50;
		this.tokensContract.approve(bonds.me, 50)
		this.didBet = null;
	}

	bet(){
		this.tokensContract.transfer(tokenAdd, 10)
		this.didBet = 'yes';
	}

	handleClick() {	
		const min = 1;
		const max = 7;
		const rand = Math.floor(Math.random() * (max - min)) + min;;
		const rand2 = min + Math.floor(Math.random() * (max - min));;
		const tot = (rand + rand2);
		this.setState({ random: this.state1.random = rand });
		this.setState({ random: this.state2.random = rand2 });
		this.setState({ random: this.tot.random = (tot)});
		this.didBet = null;
		if (tot == 7 || 11){
			this.payOwed();
		}
	}

	
	render() {
	//	const resizeMode = 'center';
		var appStyles = {
			color:'black',
			backgroundColor:'red',
			fontWeight:'bold',
			textAlign: 'center',
			height: '100%',
			border: '5px solid black'
		};

	return (		
		//<Image 
		//style={{
	//		flex: 1,
	//		resizeMode,
	//	}}
	//	source={{ uri: bgImg }}
	//	/>
		<div style={appStyles}>
				{/*Account Information*/}
				Using Account:&nbsp;
				<Rspan>{bonds.me}</Rspan>
				<br />With a balance of&nbsp;
				<Rspan>
					{bonds.balance(bonds.me).map(formatBalance)}
				</Rspan>
				{/*Casino Greatting and Information*/}
				<h1>Welcome To Ozzy's Casino</h1>
				<h3>Each roll bets 10 Casino Tokens(OCT). Roll 7 or 11 to Win 5 times as much!</h3>

				{/*Dice Info*/}
				<h1>{this.state1.random}</h1>				
				<h1>+</h1>
        		<h1>{this.state2.random}</h1>
       			<h1>=</h1>
        		<span><h1>{this.tot.random}</h1></span> 
				<br></br>
				<BButton
					content='Get 100 Tokens'
					onClick={this.getTokens.bind(this)}
					/>
				<BButton
					content='Bet 10 Tokens'
					onClick={this.bet.bind(this)}
					/>
				<BButton
					content='Roll The Dice'
					onClick={this.handleClick.bind(this)}
					/>

				<br></br>

				<Rspan>{this.state.current && this.state.current.map(JSON.stringify)}</Rspan>
				
				{/* Win & Lose Conditionals */}				
				{this.tot.random === 11 && 
				<h2>You Win!</h2>
				}	
				{this.tot.random === 7 && 
				<h2>You Win!</h2>
				}	
				{this.tot.random === 2 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 3 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 4 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 5 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 6 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 8 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 9 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 10 && 
				<h2>You Lose!</h2>
				}
				{this.tot.random === 12 && 
				<h2>You Lose!</h2>
				}

			</div>		   
		);
	}
}
