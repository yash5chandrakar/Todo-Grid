import React, { useState } from 'react'
import './Addtodos.css'

const AddTodos = (props) => {
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")


    // add a function format data (add a util file)

    const handleSubmit = (e) => {
        e.preventDefault()
        let newTitle = title.trim()
        let newDesc = desc.trim()

        // add a function for validation here

        if (newTitle !== "" && newDesc !== "") {
            const todo = {
                sno: Date.now(),
                title: newTitle,
                desc: newDesc,
                time: new Date().toLocaleDateString()
            }
            props.addTodo(todo)
            settitle("")
            setdesc("")
        }
        else {
            alert("Title and Desc cannot be left empty")
        }
    }


    function handleSort(event, method) {
        event.preventDefault()
        props.sortTodos(method)
    }

    return (
        <form className='myFormStyle' onSubmit={handleSubmit}>
            <h1 className='heading'>Todo-Grid</h1>
            <div>
                <label className='title' htmlFor='Title'>Title : </label><br />
                <input type={'text'} className="myInputStyle" value={title} onChange={(event) => settitle(event.target.value)}></input> <br />
            </div>
            <div>
                <label className='title' htmlFor='Desc'>Description : </label> <br />
                <input type={'text'} className="myInputStyle" value={desc} onChange={(event) => setdesc(event.target.value)}></input> <br />
            </div>
            <button className='myAddBtnStyle' onClick={handleSubmit} type={'submit'}>Add Item</button>
            <button className='mybtnStyle' onClick={(e) => handleSort(e, 'byTitle')}>Sort by Title</button>
            <button className='mybtnStyle' onClick={(e) => handleSort(e, 'byTime')}>Sort by Time</button>
        </form>
    )
}

export default AddTodos
