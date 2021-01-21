import React, {Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () =>{
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}


const initialState = {
  food:getRandomCoordinates(),
  direction:'RIGHT',
  speed:200,
  score:2,
  countMoves:0,
  ratioScoreMoves:0,
  snakeDots:[
    [0,0],
    [2,0]
  ]
}



class App extends Component {

  state = initialState;

  componentDidMount(){
    document.onkeydown = this.onKeyDown;
    setInterval(this.moveSnake,this.state.speed);
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    
  }
  
  updateScoreSnake = () =>{
    return this.setState({score:this.state.snakeDots.length + 1});
  }

  updateMovesScoreAndRatio = () =>{
    this.setState({countMoves:this.state.countMoves+1});
    this.setState({ratioScoreMoves:Math.floor((this.state.score/this.state.countMoves)*100)});
  }

  onKeyDown = (e) =>{
    
    e = e || window.event;
    
    switch(e.keyCode){
      case 13:
        alert("GAME - PAUSE, Press Enter to continue...");
        break;
      case 38:
        this.setState({direction:'UP'});
       
        break;
      case 40:
        this.setState({direction:'DOWN'});
        this.updateMovesScoreAndRatio();
        break;
      case 37: 
        this.setState({direction: 'LEFT'});
        this.updateMovesScoreAndRatio();
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        this.updateMovesScoreAndRatio();
        break;  
    }

  }

  moveSnake = () =>{
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch(this.state.direction){

      case 'RIGHT':
          head = [head[0] + 2, head[1]];
        break;
      
      case 'LEFT': 
          head = [head[0] - 2, head[1]];
        break;

      case 'DOWN': 
          head = [head[0], head[1] + 2];
        break;
      
      case 'UP':
          head = [head[0], head[1]-2];
        break;
      
    }

    dots.push(head);
    dots.shift();
    
    this.setState({
      snakeDots:dots
    });
  
  }

  checkIfOutOfBorders(){
    
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    
    if(head[0]>= 100 || head[1]>= 100 || head[0]<0 || head[1]< 0){
      this.onGameOver();
    }



  }

  checkIfCollapsed(){
    
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    
    snake.pop();
    snake.forEach(dot=>{
      if(head[0]==dot[0] && head[1] == dot[1]){
        this.onGameOver();
      }
    });
  }

  checkIfEat(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if(head[0] == food[0] && head[1] == food[1]){
      this.setState({
        food:getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots:newSnake
    });
    this.updateScoreSnake();
  }

  increaseSpeed(){
    if(this.state.speed>10){
      this.setState({
        speed:this.state.speed - 10
      });
    }
  }

  onGameOver(){
    alert(`Game Over. Snake lenght is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  render(){
    return (
      <div>
            <div className="score-area">
              <ul>
                <li><stong>Score Snake:</stong> {this.state.score}</li>
                <li><stong>Count Moves:</stong> {this.state.countMoves}</li>
                <li><stong>Ratio Score/Moves:</stong> {this.state.ratioScoreMoves} %</li>
              </ul>
            </div>

            <div className="game-area">
                  <Snake snakeDots={this.state.snakeDots}/>
                  <Food dot={this.state.food}/>
            </div>
           
      </div>
    
    )
  }
 

}

export default App;
