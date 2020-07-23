// Shivank Sharma
// This script creates mazes using the modified version of Depth First Search Algorithm
// Created using p5.js


var rows, cols;
var w;
var grid = [];
var current;

var stack = [];

var get_rows;
var canvas;
var info;
var start = false;

// function to get index of spot in 1D array from 2D coordinates
function index(i, j){
	return(i*cols + j);
}

// function to remove the walls between two cells
// if there is a path between them
function removeWall(current, next){
	if(current.i-next.i==0){
		if(current.j-next.j==1){
			current.walls[0] = false;
			next.walls[2] = false;
		}else{
			current.walls[2] = false;
			next.walls[0] = false;
		}
	}else if(current.j-next.j==0){
		if(current.i-next.i==1){
			current.walls[3]=false;
			next.walls[1]=false;
		}else{
			current.walls[1]=false;
			next.walls[3] = false;
		}
	}
}

// constructor function for a cell
function Spot(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;
	
	// Funtion to add neighbours for each cell/spot
	this.checkNeighbour = function(){
		var neighbours = [];
		var dr = [0, +1, 0, -1];
		var dc = [-1, 0, +1, 0];
		
		for(var p=0; p<4; p++){
			var rr = this.i + dr[p];
			var cc = this.j + dc[p];
			
			if (rr<0 || cc<0){
				continue;
			}
			if(rr>=rows || cc>=cols){
				continue;
			}

			if(!(grid[index(rr,cc)].visited)){
				neighbours.push(grid[index(rr,cc)]);
			}
		}
		
		if(neighbours.length>0){
			var n = floor(random(0, neighbours.length))
			return neighbours[n];
		}else{
			return undefined;
		}
	}
	
	// Funstion to highlight the current 
	// cell generating the maze
	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		
		noStroke();
		fill(0, 255, 0);
		rect(x, y, w, w);
	}
	
	//Function to show each cell/spot
	this.show = function(){
		var x = this.i*w;
		var y = this.j*w;
		
		stroke(0);
		if(this.walls[0]){
		    line(x,y,x+w,y);
		}
		if(this.walls[1]){
		    line(x+w,y,x+w,y+w);
		}
		if(this.walls[2]){
		    line(x,y+w,x+w,y+w);
		}
		if(this.walls[3]){
		    line(x,y,x,y+w);
		}
		
		if(this.visited){
			noStroke();
		    fill(255);
		    rect(x, y, w, w);
		}
	}
				
}

// Funstion to get row number from input by the user
// It creates the cells/spots.
function get_row_col(){
	rows = get_rows.value();
	cols = rows;
  	w = floor(width/rows);

  	grid = [];
  	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			grid.push(new Spot(i, j));
		}
	}
	stack = [];
    current = grid[0];

    start = true;
}

function setup(){
	canvas = createCanvas(500, 500);
	canvas.position(25, 100);
	
	// Info paragraph
	info = createP('This algorithm is a randomized version of the depth-first search algorithm.<br /><br />Consider the space for a maze being a large grid of cells, each cell starting with four walls.<br />Starting from top left cell, the algorithm randomly selects an unvisited cell. The algorithm<br />removes the wall between the two cells and marks the new cell as visited, and adds it to the<br />stack to facilitate backtracking. The algorithm continues this process, with a cell that has<br />no unvisited neighbours being considered a dead-end. When at a dead-end it backtracks through<br />the path until it reaches a cell with an unvisited neighbour, continuing the path generation<br />by visiting this new, unvisited cell (creating a new junction).This process continues until<br />every cell has been visited, causing the computer to backtrack all the way back to the beginning<br />cell.<br /><br />The maze here creted is n x n and n denotes the number of rows and columns.<br />Type n in textbox and click start :)');
	info.position(canvas.x + width + 100, 100)

	// Input for row number
	get_rows = createInput();
  	get_rows.position(canvas.x + width + 100, 380);

  	// Button to start the algorithm
	button = createButton('Start');
	button.position(canvas.x + width + 100, 410);
	button.mousePressed(get_row_col);
}



function draw(){
	background(180);
	if(start){
		for(var i=0; i<grid.length; i++){
		    grid[i].show();
		}
		
		current.highlight();
		current.visited = true;
		
		var next = current.checkNeighbour();
	    if(next){
			stack.push(current);
			next.visited = true;
			removeWall(current, next);
			current = next;
	    }else if(stack.length>0){
	    	current = stack.pop();
	    }
	}
}