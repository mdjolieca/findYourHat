const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {

  constructor(field,){
    this.field = field; 
    this.fieldHeight = field.length;
    this.fieldWidth = field[0].length;
    this.userPostion = { height: 0, width: 0 } 
  }

  userMoves(direction){
   
   let newWidth = this.userPostion.width;
   let newHeight = this.userPostion.height;

    switch (direction.toUpperCase()) {
      case 'L':
        newWidth--;  
      break;
      case 'R':
        newWidth++; 
      break;
      case 'U':
       newHeight--;
      break;
      case'D':
        newHeight++;
      break;
      default: 
        console.log("invalid entry, game over");
        return false;
    }
    // check that user move is with in the field 2d array
    if( newHeight > this.fieldHeight || newHeight < 0  || newWidth > this.fieldWidth || newWidth < 0 ){
      console.log("invalid move, game over");
        return false;
    }
  
    let charAtNewLocation = this.field[newHeight][newWidth];
      
    if(charAtNewLocation === hole){
        console.log('you fell in a hole, game over');
        return false;
     }

    if(charAtNewLocation === hat){
        console.log('You win!');
        return false;
     }
     
    if(charAtNewLocation === fieldCharacter || charAtNewLocation === pathCharacter ){
        this.field[newHeight][newWidth] = pathCharacter ;
        this.userPostion.height = newHeight;
        this.userPostion.width = newWidth;
        return true; 
      }

    return false;
  }

  print(){
    this.field.forEach(ary => {
      console.log(ary.toString());
    });
   
  }

  static generateField(height, width,percent) {
   
    var tempArray= Array.from(Array(height), () => new Array(width));
   
    tempArray.forEach(ary=> {
        ary.fill(fieldCharacter);
     });
   
     let numberOfHoles = height*width*(percent/100);
     var randNumbers = [];
    for(let i = 0; i < numberOfHoles; i++) {
      var newNum;
      do{//unique random numbers for holes 
       newNum = 1+Math.floor(Math.random()*(height*width));
      } while(randNumbers.includes(newNum))
      randNumbers.push(newNum);
    }

     do{// unique random number for hat 
       newNum = 1+Math.floor(Math.random()*(height*width));
      } while(randNumbers.includes(newNum))

     let counter = 0;
     for(let j = 0; j<height; j++){
       for(let k = 0; k< width; k++){
        
          if(randNumbers.includes(counter)) {
            tempArray[j][k]= hole;
          }
          if(newNum === counter){
           tempArray[j][k]= hat;
          }
          counter++;
       }
     }

     tempArray[0][0] = '*';
     return tempArray;
   }
}


let userField = new Field(Field.generateField(9,9,25));
let userMove;
do{
 userField.print();
 userMove = prompt('Which way (u,d,l,r)?');
} while(userField.userMoves(userMove));

userField.print();
