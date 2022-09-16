import React, { useState, useEffect } from 'react'
import AddTodos from './AddTodos'
import Todos from './Todos'
import './Todolist.css'

const TodoList = () => {

    const localStorageKey = "todos"
    let retrievedObj;

    try {
        retrievedObj = JSON.parse(localStorage.getItem(localStorageKey))
    }
    catch (err) {
        retrievedObj = []
    }

    const [todos, setTodos] = useState(retrievedObj)


    useEffect(() => {
        if (todos === undefined || todos === null) {
            setTodos([])
        }
        localStorage.setItem(localStorageKey, JSON.stringify(todos))
    }, [todos])

    const addTodo = (todo) => {
        // setTodos([...todos, todo])
        setTodos((oldstate, oldprops) => {
            return [...oldstate, todo]
        })
    }

    const deleteTodo = (itemid) => {
        setTodos(todos.filter((item) => {
            return item.sno !== itemid
        }))
    }

    const sortTodos = (method) => {
        if (method === "byTitle") {
            let myTodos = todos
            myTodos.sort((a, b) => a.title.localeCompare(b.title))
            setTodos([...myTodos])
        }
        else {
            let myTodos = todos
            myTodos.sort((a, b) => b.sno - a.sno)
            setTodos([...myTodos])
        }
    }

    function editItem(itemId) {
        let data = prompt("Enter data as follows : - (Title : Description) ")
        if (data == null) {
            alert("No Changes have been made.")
            return
        }
        let arr = data.split(":")
        if (arr.length <= 1) {
            alert("Incorrect Format. Please Try Again")
        }
        else {
            const title = arr[0].trim()
            const desc = arr[1].trim()
            // console.log(title, desc)
            const todo = {
                sno: Date.now(),
                title: title,
                desc: desc,
                time: new Date().toLocaleDateString()
            }
            let myTodos = JSON.parse(JSON.stringify(todos))

            const index = myTodos.findIndex((element) => {
                return element.sno === itemId
            })

            myTodos.splice(index, 1, todo)

            setTodos([...myTodos])
        }
    }

    return (
        <div className="mainDiv">
            <div>
                <AddTodos addTodo={addTodo} todos={todos} sortTodos={sortTodos} />
                <Todos todos={todos} editItem={editItem} deleteTodo={deleteTodo} />
            </div>
        </div>
    )
}

export default TodoList
