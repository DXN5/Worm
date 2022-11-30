import React from "react";
import './Styles/buttlefield.css'; 
import './Styles/worm.css';
import './Styles/App.css';
import './Styles/fruit.css';
import './Styles/title.css';
import './Styles/score.css';
import './Styles/buttons.css';
import Worm from "./components/Worm";
import Fruit from "./components/Fruit";
import sound1 from './Sounds/Eating.mp3';
import sound2 from './Sounds/GameOver.mp3';
import sound3 from './Sounds/start.mp3';
import sound4 from './Sounds/stop.mp3';
import sound5 from './Sounds/Crash.mp3';
import sound6 from './Sounds/Intro.mp3';
//--------------------------------------------------------------------
const RendomPosition = () => {
  let min = 1;
  let max = 48;
  let x = Math.floor((((Math.random()*(max-min+1)+min)/2)*2)/10)*100;
  let y = Math.floor((((Math.random()*(max-min+1)+min)/2)*2)/10)*100;
  return [x,y]  
}

  let transparent = 0;  
  const startState = {           
    score : 0, 
    speed : 200,                
    direction : 'RIGHT',    
    fruit : RendomPosition(),
    wormParts : [
    [0,0],
    [20,0],
    [40,0]   
  ]  
  }
//--------------------------------------------------------------------
 class App extends React.Component {    

  state = startState;   

  componentDidMount()  {    
    setInterval(this.moveWorm, this.state.speed);
    document.onkeydown = this.onKeyDown                      
  }
  
  componentDidUpdate() {
    this.checkIfCollision();
    this.checkIfTakeTheFruit();   
    this.checkIfFruitAreOnWorm();
                             
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37: 
      this.setState({
        direction: 'LEFT'
      });
        break;
      case 38: 
      this.setState({
        direction: 'UP'
      });
        break;
      case 39: 
      this.setState({
        direction: 'RIGHT'
      });
        break;
      case 40: 
      this.setState({
        direction: 'DOWN'
      });
        break;
    } 
  }

  moveWorm = () => {       
    let parts = [...this.state.wormParts];
    let head = parts[parts.length - 1];    
    switch (this.state.direction) {       
      case 'RIGHT':
        head = [head[0] + 20, head[1]];
        if (head[0] >= 500){
          head = [head[0] - 500, head[1]]
        }        
        break;
      case 'LEFT':
        head = [head[0] - 20, head[1]];
        if (head[0] < 0)
        {head = [head[0] + 500, head[1]]
        }
        break;
       case 'DOWN':
        head = [head[0], head[1] + 20];
        if (head[1] >= 500){
          head = [head[0], head[1] - 500]
        }
        break;
       case 'UP':
        head = [head[0], head[1] - 20];
        if (head[1] < 0){
          head = [head[0], head[1] + 500]
        }
        break;             
    }      
    parts.push(head);
    parts.shift();    
    this.setState({
      wormParts : parts
    })      
  }

  checkIfTakeTheFruit = () => {    
    let head = this.state.wormParts[this.state.wormParts.length - 1];
    let fruit = this.state.fruit;   
    let increment = this.state.score; 
    if (head[0] === fruit[0] && head[1] === fruit[1]){
      increment++; 
      new Audio(sound1).play();                                
      this.setState({
        fruit: RendomPosition(),    
        score : increment        
      })        
      this.increaseWorm()
    }    
  }  

  checkIfFruitAreOnWorm() {
    let worm = [...this.state.wormParts];
    let fruit = this.state.fruit;    
    worm.forEach(part => {
      if (fruit[0] === part[0] && fruit[1] === part[1]) {                
        this.setState({
          fruit: RendomPosition()           
        })                    
      }
    })        
  }

  increaseWorm() {
    let nextWorm = [...this.state.wormParts];    
    nextWorm.unshift([...this.state.wormParts]);    
    this.setState({
      wormParts : nextWorm
    })
  }

  checkIfCollision() {
    let worm = [...this.state.wormParts];
    let head = worm[worm.length -1];    
    worm.pop();
    worm.forEach(part => {
      if (head[0] === part[0] && head[1] === part[1]) {                  
        this.restart();
        this.gameOver();                    
        transparent = 100                  
      }
    })
    }

    gameOver() {
      new Audio(sound5).play();
      new Audio(sound2).play();
    }

  restart() {    
    this.setState(startState);
    transparent = 0 
  } 

  restartBtn = () => {
    new Audio(sound6).play();  
    new Audio(sound3).play();
    this.setState(startState);
    this.setState({
      fruit: RendomPosition()           
    })  
    transparent = 0 
  } 

 stop = () =>  {    
  new Audio(sound4).play();
  let stop = 1000000;
  this.setState({
    speed : stop
  })     
 }

 start = () =>  {   
  new Audio(sound6).play();      
  new Audio(sound3).play();
  let start = 200;
  this.setState({
    speed : start
  })      
 } 
//-------------------------------------------------------------------------------------
  render() {
  return (
    <div className="App">          
        <div className='battlefield'>          
           <div id='title'> WORM GAME</div>  
            <div className='score'>{this.state.score}</div>         
             <button className='button1' onClick={this.restartBtn}>RESTART</button>
             <button className='button2' onClick={this.start}>START</button>
             <button className='button3' onClick={this.stop}>STOP</button>
             <Worm wormParts={this.state.wormParts}/>      
             <Fruit part={this.state.fruit}/>  
            <div className='gameover' style={{opacity: transparent + '%' }}> GAME OVER 
          </div>        
        </div>              
    </div>    
  );    
 }
}

export default App;
