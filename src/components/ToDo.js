import React, { useState, useEffect } from 'react'

function ToDo(props) {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todoList, setTodolist] = useState(() => {
        const savedTodos = localStorage.getItem('todoList')
        if (savedTodos) {
             return JSON.parse(savedTodos)
            } else {
                return []
            }
    });

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList])

    function createNewTodo (currentTodo) {
        if(!currentTodo){return}
        let todosArray = [...todoList];
        todosArray.push({
            task: currentTodo,
            isCompleted: false
        });
        setTodolist(todosArray)
    };

    function completeTodo(index) {
        const todosArray = [...todoList];
        todosArray[index].isCompleted = !todosArray[index].isCompleted;
        setTodolist(todosArray);
    }


    function deleteTodo (index) {
        let todosArray = [...todoList]
        todosArray.splice(index, 1);
        setTodolist(todosArray)
    }

  return (
    <div>
        <input 
            className='todo-input'
            value= {currentTodo}
            onChange = {e => {setCurrentTodo(e.target.value)}}
            onKeyPress = {e => {
                if (e.key === "Enter") {
                    createNewTodo (currentTodo);
                    setCurrentTodo("")
                }
            }}
            placeholder = "What needs to be Done?"
            />

        {todoList.map((todo, index)=> (
            <div key={index} className="todo">
                <div className='checkbox' onClick={() => completeTodo(index)}>
                    {todo.isCompleted && <span>&#x2714;</span>}
                </div>
                <div className='list-container'>
                    <div className={todo.isCompleted ? "done  list-item" : "list-item"} >{todo.task}</div>
                    <div className='delete' onClick={() => deleteTodo(index)}>&#128465;</div>
                </div>
            </div>
            ))
        }

        {todoList.length > 0 && `${todoList.length} items`}
    </div>
  )
}

export default ToDo;
