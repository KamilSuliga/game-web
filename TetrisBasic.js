
let canvas;
let ctx;
let gBArrayHeight = 20;  // Liczba komórek w wysokości tablicy
let gBArrayWidth = 12; // Liczba komórek w szerokości tablicy
let startX = 4; // Początkowa pozycja X dla Tetromino
let startY = 0; // Początkowa pozycja Y dla Tetromino
let score = 0; // Wynik
let level = 1; // level
let winOrLose = "W grze";

// zawiera pozycje x i y, których możemy użyć 

let coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));
 
let curTetromino = [[1,0], [0,1], [1,1], [2,1]];
 

//  wszystkie Tetromino
let tetrominos = [];
// Tablica tetromino z kolorami dopasowanymi do tablicy tetromino
let tetrominoColors = ['purple','cyan','blue','yellow','orange','green','red'];
// aktualny kolor Tetromino
let curTetrominoColor;
 
// Tablica innych kwadratow
let gameBoardArray = [...Array(20)].map(e => Array(12).fill(0));
 
// Tablica do przechowywania zatrzymanych kształtów
// zapisuje kolory, gdy kształt się zatrzyma i zostanie dodany
let stoppedShapeArray = [...Array(20)].map(e => Array(12).fill(0));
 
// śledzi kierunek, w którym porusza się Tetromino
let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direction;
 
class Coordinates{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
 

document.addEventListener('DOMContentLoaded', SetupCanvas); 
 
// Tworzy tablicę ze współrzędnymi kwadratowymi

function CreateCoordArray(){
    let xR = 0, yR = 19;
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y += 23){
        
        for(let x = 11; x <= 264; x += 23){
            coordinateArray[i][j] = new Coordinates(x,y);
            
            i++;
        }
        j++;
        i = 0;
    }
}
 
function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;
 
    // Podwojony rozmiar elementów, aby zmieściły się na ekranie
    ctx.scale(2, 2);
 
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
   
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8, 8, 280, 462);
 
    tetrisLogo = new Image(161, 54);
    tetrisLogo.onload = DrawTetrisLogo;
    tetrisLogo.src = "tetrislogo.png";
 
    //Ustawia czcionkę dla tekstu etykiety 
    ctx.fillStyle = 'black';
    ctx.font = '13px Arial';
    ctx.fillText("PUNKTY", 300, 98);
 
    // rysuje prostokąt punktacji
    ctx.strokeRect(300, 107, 161, 24);
 
    // rysuje punkty
    ctx.fillText(score.toString(), 310, 127);
    
    // rysuje etykiete tekstu
    ctx.fillText("LEVEL", 300, 157);
 
    // rysuje prostokąt poziomu
    ctx.strokeRect(300, 171, 161, 24);
 
    // rysuje level
    ctx.fillText(level.toString(), 310, 190);
 
    // następny tekst etykiety
    ctx.fillText("WYGRANA / PRZEGRANA", 300, 221);
 
    // rysuje warunki gry
    ctx.fillText(winOrLose, 310, 261);
 
    // rysuje prostokąt warunkow gry
    ctx.strokeRect(300, 232, 161, 95);
    
    // rysuje tekst etykiety kontrolek
    ctx.fillText("STEROWANIE", 300, 354);
 
    // rysuje prostokąt sterujący
    ctx.strokeRect(300, 366, 161, 104);
 
    // Tekst kontrolek rysowania 
    ctx.font = '15px Arial';
    ctx.fillText("A :  LEWO", 310, 388);
    ctx.fillText("D :  PRAWO", 310, 413);
    ctx.fillText("S :  DÓŁ", 310, 438);
    ctx.fillText("E :  OBRÓĆ ", 310, 463);
 
    // naciśnięcia klawiatury
    document.addEventListener('keydown', HandleKeyPress);
 
    // tablice tetromino
    CreateTetrominos();
    // generowanie losowych tetromino
    CreateTetromino();
 
    // wzmiana wyszukiwania prostokatow
    CreateCoordArray();
 
    DrawTetromino();
}
 
function DrawTetrisLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}
 
function DrawTetromino(){
    
    for(let i = 0; i < curTetromino.length; i++){
 // przeniesienie wartosci x i y tetromino 
       
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
 
       
        gameBoardArray[x][y] = 1;
      
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
 
    
        ctx.fillStyle = curTetrominoColor;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}
 // za kazdym nacisnieciem klawisza zmieniamy poczatek tetromino

function HandleKeyPress(key){
    if(winOrLose != "PRZEGRANA"){
   
    if(key.keyCode === 65){
     
        direction = DIRECTION.LEFT;
        if(!HittingTheWall() && !CheckForHorizontalCollision()){
            DeleteTetromino();
            startX--;
            DrawTetromino();
        } 
 
  
    } else if(key.keyCode === 68){
        
      
        direction = DIRECTION.RIGHT;
        if(!HittingTheWall() && !CheckForHorizontalCollision()){
            DeleteTetromino();
            startX++;
            DrawTetromino();
        }
 
   
    } else if(key.keyCode === 83){
        MoveTetrominoDown();
      
    } else if(key.keyCode === 69){
        RotateTetromino();
    }
    } 
}
 
function MoveTetrominoDown(){
    // przesuniecie w dol
    direction = DIRECTION.DOWN;
 
    //sprawdzanie pionu
    if(!CheckForVerticalCollison()){
        DeleteTetromino();
        startY++;
        DrawTetromino();
    }
}
 
// Automatycznie wzywa Tetromino co sekundę
 
window.setInterval(function(){
    if(winOrLose != "PRZEGRANA"){
        MoveTetrominoDown();
    }
  }, 1000);
 
 
// Usuwa poprzednio dobrany Tetrominoe
function DeleteTetromino(){
    for(let i = 0; i < curTetromino.length; i++){
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
 
        // Usuwa kdwarat tetromino z tablicy planszy
        gameBoardArray[x][y] = 0;
 
        // rysuje na biało, gdzie kiedys byly kolorowe kwadraty
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'white';
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}
 
// Generowanie losowych tetromino z kolorem
function CreateTetrominos(){
   
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
   
    tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
   
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
   
    tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
   
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
    
    tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
    
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}
 
function CreateTetromino(){
    // Pobierz losowy indeks tetromino
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    // Ustaw ten do rysowania
    curTetromino = tetrominos[randomTetromino];
    // Pobierz dla niego kolor
    curTetrominoColor = tetrominoColors[randomTetromino];
}
 //Sprawdza czy tetromino uderza w sciane

function HittingTheWall(){
    for(let i = 0; i < curTetromino.length; i++){
        let newX = curTetromino[i][0] + startX;
        if(newX <= 0 && direction === DIRECTION.LEFT){
            return true;
        } else if(newX >= 11 && direction === DIRECTION.RIGHT){
            return true;
        }  
    }
    return false;
}
 
// sprawdza kolizje pionowa
function CheckForVerticalCollison(){
    // tworzenie kopii twetromino
    let tetrominoCopy = curTetromino;
  //Zmiana wartości na podstawie kolizji
    let collision = false;
 
   //Przejdź przez wszystkie kwadraty Tetromino
    for(let i = 0; i < tetrominoCopy.length; i++){
     
        let square = tetrominoCopy[i];
     
        let x = square[0] + startX;
        let y = square[1] + startY;
 
      //jesli tetromino porusza sie w dol zwieksza sie y aby sprawdzic kolizje
        if(direction === DIRECTION.DOWN){
            y++;
        }
 
       //Sprawdzenie, czy uderzy w wcześniej ustawioną figurę
        if(typeof stoppedShapeArray[x][y+1] === 'string'){
            
            DeleteTetromino();
            //Przyrost do umieszczenia i narysowania
            startY++;
            DrawTetromino();
            collision = true;
            break;
        }
        if(y >= 20){
            collision = true;
            break;
        }
    }
    if(collision){
        //Sprawdza, czy gra się skończyła, a jeśli tak, ustaw tekst gry
        if(startY <= 2){
            winOrLose = "PRZEGRANA";
            ctx.fillStyle = 'white';
            ctx.fillRect(310, 242, 140, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(winOrLose, 310, 261);
        } else {
 
            //Dodanie zatrzymania tetromino do zatrzymanej tablicy ksztaltow
            for(let i = 0; i < tetrominoCopy.length; i++){
                let square = tetrominoCopy[i];
                let x = square[0] + startX;
                let y = square[1] + startY;
               //obecny kolor tetromino
                stoppedShapeArray[x][y] = curTetrominoColor;
            }
 
           //ukonczone wiersze
            CheckForCompletedRows();
 
            CreateTetromino();
 
            
            direction = DIRECTION.IDLE;
            startX = 4;
            startY = 0;
            DrawTetromino();
        }
 
    }
}
 

function CheckForHorizontalCollision(){

    var tetrominoCopy = curTetromino;
    var collision = false;
 

    for(var i = 0; i < tetrominoCopy.length; i++)
    {
        
        var square = tetrominoCopy[i];
        var x = square[0] + startX;
        var y = square[1] + startY;
 
// Pobiera potencjalnie zatrzymany kwadrat, który może istnieć
        if (direction == DIRECTION.LEFT){
            x--;
        }else if (direction == DIRECTION.RIGHT){
            x++;
        }
 
        
        var stoppedShapeVal = stoppedShapeArray[x][y];
 
        // Jeśli prawda  wiemy, że tam jest zatrzymany kwadrat
        if (typeof stoppedShapeVal === 'string')
        {
            collision=true;
            break;
        }
    }
 
    return collision;
}
 
// Sprawdza ukonczone wiersze
function CheckForCompletedRows(){
 
   //sledzi ile wierszy nalezy usunac
    let rowsToDelete = 0;
    let startOfDeletion = 0;
 
   
    for (let y = 0; y < gBArrayHeight; y++)
    {
        let completed = true;
      
        for(let x = 0; x < gBArrayWidth; x++)
        {
          
            let square = stoppedShapeArray[x][y];
 
           
            if (square === 0 || (typeof square === 'undefined'))
            {
               
                completed=false;
                break;
            }
        }
 
       //Jesli wiersz zostal ukonczony
        if (completed)
        {
        
            if(startOfDeletion === 0) startOfDeletion = y;
            rowsToDelete++;
 
            // Usuwa linie 
            for(let i = 0; i < gBArrayWidth; i++)
            {
                
                stoppedShapeArray[i][y] = 0;
                gameBoardArray[i][y] = 0;
                
                let coorX = coordinateArray[i][y].x;
                let coorY = coordinateArray[i][y].y;
              
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
    if(rowsToDelete > 0){
        score += 10;
        ctx.fillStyle = 'white';
        ctx.fillRect(310, 109, 140, 19);
        ctx.fillStyle = 'black';
        ctx.fillText(score.toString(), 310, 127);
        MoveAllRowsDown(rowsToDelete, startOfDeletion);
    }
}
 
//przesuwa wiersz w dol
function MoveAllRowsDown(rowsToDelete, startOfDeletion){
    for (var i = startOfDeletion-1; i >= 0; i--)
    {
        for(var x = 0; x < gBArrayWidth; x++)
        {
            var y2 = i + rowsToDelete;
            var square = stoppedShapeArray[x][i];
            var nextSquare = stoppedShapeArray[x][y2];
 
            if (typeof square === 'string')
            {
                nextSquare = square;
                gameBoardArray[x][y2] = 1; 
                stoppedShapeArray[x][y2] = square; 
 
               
                let coorX = coordinateArray[x][y2].x;
                let coorY = coordinateArray[x][y2].y;
                ctx.fillStyle = nextSquare;
                ctx.fillRect(coorX, coorY, 21, 21);
 
                square = 0;
                gameBoardArray[x][i] = 0; 
                stoppedShapeArray[x][i] = 0; 
                coorX = coordinateArray[x][i].x;
                coorY = coordinateArray[x][i].y;
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
}
 
//obrót tetromino
function RotateTetromino()
{
    let newRotation = new Array();
    let tetrominoCopy = curTetromino;
    let curTetrominoBU;
 
    for(let i = 0; i < tetrominoCopy.length; i++)
    {
      //klonuje tablice
        curTetrominoBU = [...curTetromino];
 //znajduje nowy obrot pobierajac wartosc x 
        let x = tetrominoCopy[i][0];
        let y = tetrominoCopy[i][1];
        let newX = (GetLastSquareX() - y);
        let newY = x;
        newRotation.push([newX, newY]);
    }
    DeleteTetromino();
 
   //nowa rotacja tetromino
    try{
        curTetromino = newRotation;
        DrawTetromino();
    }  
  //jesli wystapi blad, pobiera kopie zapasowa tetromino
    catch (e){ 
        if(e instanceof TypeError) {
            curTetromino = curTetrominoBU;
            DeleteTetromino();
            DrawTetromino();
        }
    }
}
 
// Pobiera wartosc x dla ostatniego kwadratu w tetromino
function GetLastSquareX()
{
    let lastX = 0;
     for(let i = 0; i < curTetromino.length; i++)
    {
        let square = curTetromino[i];
        if (square[0] > lastX)
            lastX = square[0];
    }
    return lastX;
}