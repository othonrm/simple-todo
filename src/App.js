import React, { useState, useEffect } from 'react';

import './App.css';

function App() {

    const [inputValue, setInputValue] = useState("");

    const [todos, setTodos] = useState( JSON.parse(localStorage.getItem('todos')) || [] );

    // useEffect(() => {

    //     setTimeout(() => {

    //         setTodos(JSON.parse(localStorage.getItem('todos')) || []);

    //     }, 1500);

    // }, [])

    useEffect(() => {

        // console.log('useEffect triggered!');

        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])

    function handleSubmit(event) {

        event.preventDefault();

        console.log("Form submited");

        // console.log(event.target[0].value);
        // console.log(event.target.txtTodo.value);

        if (inputValue.length === 0) {
            return;
        }

        setTodos([...todos, { title: inputValue, done: false}]);

        setInputValue('');

    }

    function deleteTodo(index) {
        setTodos(todos.filter((val, idx, arr) => idx !== index));
    }

    function checkTodo(index) {

        const newTodos = todos.filter((val, idx, arr) => {

            if(idx === index)
            {
                val.done = !val.done;
            }

            return val;

        });

        setTodos(newTodos);
    }

    function listTodos()
    {
        const todosFragment = todos.map((todo, index, arr) =>
            <li className={["listItem", (todo.done === true ? 'done' : '')].join(" ")} key={index}>
                {todo.done ? <hr/> : null}

                <label className="checkboxContainer">
                    <input id={"checkTodo" + index} type="checkbox" defaultChecked={todo.done} onChange={() => checkTodo(index)} />
                    <span className="checkmark"></span>
                </label>

                <label className="listText" htmlFor={"checkTodo" + index} >
                    {todo.title}
                </label>

                <button onClick={() => deleteTodo(index)}>
                    <span role="img" aria-label="Red x emoji">❌</span>
                </button>
            </li>
        );

        if(todos.length === 0)
        {
            return (<p>Você ainda não adicionou nenhuma todo...</p>);
        }
        else
        {
            return (<ul className="todoList"> {todosFragment} </ul>);
        }
    }

    return (
        <div className="App">

            <div className="container">

                {/* <Todo propName="PropTest" /> */}

                <h2>TODO LIST</h2>

                <form onSubmit={handleSubmit} >
                    <input type="text" className="todoInput" name="txtTodo" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="add a new todo..."/>
                </form>

                {
                    todos == null ?
                    <span></span>
                    :
                    listTodos()
                }

            </div>

            {
                todos !== null ? todos.length > 0 ?
                <button onClick={() => setTodos([])} className="trashButton">
                    Limpar lista <span role="img" aria-label="Trash emoji">🗑</span>
                </button>
                :
                null
                :
                null
            }

        </div>
    );
}

export default App;
