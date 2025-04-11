import React, { useState, useEffect } from 'react'
import AddTodos from './AddTodos'
import Todos from './Todos'
import './Todolist.css'
import { ToastContainer } from 'react-toastify'

const TodoList = () => {
    const localStorageKey = "todos"
    const getLocalTodos = () => {
        let retrievedObj;

        try {
            retrievedObj = JSON.parse(localStorage.getItem(localStorageKey))
        }
        catch (err) {
            retrievedObj = []
        }
        return retrievedObj
    }

    const [todos, setTodos] = useState(getLocalTodos())
    const [filter, setFilter] = useState("All")

    useEffect(() => {
        if (todos === undefined || todos === null) {
            setTodos([])
        }
        localStorage.setItem(localStorageKey, JSON.stringify(todos))
    }, [todos])

    const addTodo = (todo) => {
        setTodos((oldstate, oldprops) => {
            return [...oldstate, todo]
        })
    }

    const deleteTodo = (itemid) => {
        setTodos(todos.filter((item) => {
            return item.sno !== itemid
        }))
    }

    const markItem = (val, index) => {
        setTodos(todos?.map((item, ind) => {
            if (ind === index) {
                return {
                    ...item,
                    completed: val
                }
            }
            return item
        }))
    }

    const getFilteredItems = () => {
        if (filter === "All") {
            return todos
        }
        let filterValue = filter === "completed" ? true : false
        return todos?.filter((el) => el?.completed === filterValue)
    }

    return (
        <div className="mainDiv">
            <ToastContainer />
            <div>
                <AddTodos addTodo={addTodo} todos={todos} setFilter={setFilter} filter={filter} />
                <Todos todos={getFilteredItems()} deleteTodo={deleteTodo} markItem={markItem} />
            </div>
        </div>
    )
}

export default TodoList
