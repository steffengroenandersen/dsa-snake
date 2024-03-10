"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  // start ticking
  tick();
}

function tick() {
  // setup next tick
  setTimeout(tick, 2000);

  // Remove head from model (before changing anything)
  // for (const part of queue) {
  //   writeToCell(part.row, part.col, 0);
  // }

  let aNode = snake.head.prev;
  while (aNode.data != "TAIL") {
    writeToCell(aNode.data.row, aNode.data.col, 0);
    aNode = aNode.prev;
  }
  // writeToCell(head.row, head.col, 0);

  // Change direction
  if (controls.right) {
    direction = "right";
  } else if (controls.left) {
    direction = "left";
  } else if (controls.up) {
    direction = "up";
  } else if (controls.down) {
    direction = "down";
  }

  // const head = {
  //   row: queue[queue.length - 1].row,
  //   col: queue[queue.length - 1].col,
  // };

  const newHead = {
    row: snake.tail.next.data.row,
    col: snake.tail.next.data.col,
  };

  // Move in that direction
  switch (direction) {
    case "left":
      // head.col--;
      // if (head.col < 0) head.col = 9;

      newHead.col--;
      if (newHead.col < 0) newHead.col = 9;

      break;
    case "right":
      // head.col++;
      // if (head.col > 9) head.col = 0;

      newHead.col++;
      if (newHead.col > 9) newHead.col = 0;

      break;
    case "up":
      // head.row--;
      // if (head.row < 0) head.row = 9;

      newHead.row--;
      if (newHead.row < 0) newHead.row = 9;

      break;
    case "down":
      //head.row++;
      //if (head.row > 9) head.row = 0;

      newHead.row++;
      if (newHead.row > 9) newHead.row = 0;

      break;
  }

  console.log("Row: " + newHead.row + " Col: " + newHead.col);
  // Move snakes head
  //queue.push(head);
  enqueue(newHead.row, newHead.col);

  // Check if head is equal to goal before shifting
  // queue.shift();
  console.log(model[newHead.row][newHead.col]);
  if(model[newHead.row][newHead.col] !== 2){
    dequeue();
  }


  // Check if head is part of snake. If yes, then die.

  // Add head to game
  // for (const part of queue) {
  //   writeToCell(part.row, part.col, 1);
  // }

  aNode = snake.head.prev;
  while (aNode.data != "TAIL") {
    writeToCell(aNode.data.row, aNode.data.col, 1);
    aNode = aNode.prev;
  }

  //writeToCell(head.row, head.col, 1);

  // display the model in full
  displayBoard();
}

// ******** MODEL ********

const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

let direction;

// const queue = [
//   {
//     row: 5,
//     col: 5,
//   },
//   {
//     row: 5,
//     col: 6,
//   },
//   {
//     row: 5,
//     col: 7,
//   },
// ];

const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2  , 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const head = { prev: null, next: null, data: "HEAD" };
const node1 = { prev: null, next: null, data: { row: 0, col: 0 } };
const node2 = { prev: null, next: null, data: { row: 0, col: 1 } };
const node3 = { prev: null, next: null, data: { row: 0, col: 2 } };
const tail = { prev: null, next: null, data: "TAIL" };

head.prev = node1;
node1.next = head;
node1.prev = node2;
node2.next = node1;
node2.prev = node3;
node3.next = node2;
node3.prev = tail;
tail.next = node3;

const snake = {
  head: head,
  tail: tail,
  node1: node1,
  node2: node2,
  node3: node3,
};

function enqueue(row, col) {
  //console.log("enqueue()");
  const newNode = { data: { row: row, col: col } };

  newNode.next = snake.tail.next;
  newNode.prev = snake.tail;

  snake.tail.next.prev = newNode;
  snake.tail.next = newNode;
}

function dequeue() {
  //console.log("dequeue()");

  snake.head.prev.prev.next = head;
  snake.head.prev = snake.head.prev.prev;
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function keyUp(event) {
  const key = event.key;

  switch (key) {
    case "ArrowUp":
      controls.up = false;
      break;
    case "ArrowDown":
      controls.down = false;
      break;
    case "ArrowLeft":
      controls.left = false;
      break;
    case "ArrowRight":
      controls.right = false;
      break;
  }

  //console.log(controls);
}

function keyDown(event) {
  const key = event.key;

  switch (key) {
    case "ArrowUp":
      controls.up = true;
      break;
    case "ArrowDown":
      controls.down = true;
      break;
    case "ArrowLeft":
      controls.left = true;
      break;
    case "ArrowRight":
      controls.right = true;
      break;
  }
  //console.log(controls);
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove head if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
