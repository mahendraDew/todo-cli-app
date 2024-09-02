const { Command } = require('commander')
const fs = require('fs')
const program = new Command()

const filepath = './todos.txt'


function readFromTodoFile () {
  try {
    const todos = fs.readFileSync(filepath, 'utf-8')
    return todos.split('\n').filter(line => line.trim() !== '')
  } catch (err) {
    if (err.code === 'NOENT') {
      console.log(
        'Error: the file or directory you are trying to access does not exist at the specified path.'
      )
    }
  }
}

function saveTodoFile (todos) {
  const data = todos.join('\n')
  fs.writeFileSync(filepath, data)
}

function renderTodo () {
  console.log('----Your all todos:----')
  console.log(todos)
}

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')


// create operation
program
  .command('add')
  .description('add a todo in the todo list')
  .argument('<string>', 'add your todo')
  .action(todo => {
    let todos = readFromTodoFile()
    todos.push(todo)
    saveTodoFile(todos)
    console.log('New Todo added:', todo)
    console.log(`use "show" command to display all of your todos`)
  })

// read operation
program
  .command('show')
  .description('display all of your todos.')
  .action(() => {
    let todos = readFromTodoFile()
    if (todos.length == 0) {
      console.log('Todo is Empty!')
    } else {
      console.log('Todos are:')
      todos.forEach((ele, index) => {
        console.log(`${index + 1}: ${ele}`)
      })
    }
  })

  
// update operation
program.command('edit')
  .description('edit your todo using index')
  .argument('<Integer>', 'your todo index number')
  .argument('<String>', 'your new todo string')
  .action((index, todo)=>{
    let todos = readFromTodoFile();
    if(todos.length !== 0){
      if (index > -1 && index < todos.length) {
          let oldTodo = todos[index - 1]
          todos[index-1] = todo;
          console.log(`one todo is editd: `)
          console.log(`\tbefore edited:- ${index}: ${oldTodo}`)
          console.log(`\tafter edited :- ${index}: ${todo}`)
          saveTodoFile(todos)
          console.log(`use "show" command to display all of your todos`)
        }else{
          console.log('Error: Enter a valid index number!')
        }
    } else {
      console.log('Your todo is Empty!')
    }
  })
  
// delete operation
program
.command('delete')
.description('delete a todo from the todo list')
.argument('<Integer>', 'your todo index number')
.action(index => {
  let todos = readFromTodoFile()
  if (todos.length !== 0) {
    if (index > -1 && index < todos.length) {
      let rmTodo = todos[index - 1]
      todos.splice(index - 1, 1) // Remove 1 element at the specified index
      console.log(`one todo is removed: `)
      console.log(`\t${index}: ${rmTodo}`)
      saveTodoFile(todos)
      console.log(`use "show" command to display all of your todos`)
    }else{
      console.log('Error: Enter a valid index number!')
    }
  } else {
    console.log('Your todo is Empty!')
  }
  })
  
program
  .command('completed')
  .description('Mark the todo as complete')
  .argument('<Integer>', 'your todo index number')
  .action(index =>{
    let todos = readFromTodoFile();
    if(todos.length !== 0){
      if (index > -1 && index < todos.length) {
        todos[index-1] = `[Completed] ${todos[index-1]}`;
        console.log(`todo at ${index} is marked as completed:`)
        saveTodoFile(todos)
        console.log(`use "show" command to display all of your todos`)
      }else{
        console.log('Error: Enter a valid index number!')
      }
    }else{
      console.log('Your todo is Empty!')
    }
  })
  
program.parse()
