import React, { useState } from 'react'
import './Addtodos.css'

const AddTodos = (props) => {
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")




    const handleSubmit = (e) => {
        e.preventDefault()
        let newTitle = title.trim()
        let newDesc = desc.trim()

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
            <h3 className='heading'>Todo-Grid</h3>
            <div className='inputDiv'>
                <div>
                    <label className='title' htmlFor='Title'>Title : </label><br />
                    <input type={'text'} className="myInputStyle" value={title} onChange={(event) => settitle(event.target.value)}></input> <br />
                </div>
                <div>
                    <label className='title' htmlFor='Desc'>Description : </label> <br />
                    <input type={'text'} className="myInputStyle" value={desc} onChange={(event) => setdesc(event.target.value)}></input> <br />
                </div>
            </div>
            <button className='myAddBtnStyle' onClick={handleSubmit} type={'submit'}>Add Item</button>
            <button className='mybtnStyle' onClick={(e) => handleSort(e, 'byTitle')}>Sort by Title</button>
            <button className='mybtnStyle' onClick={(e) => handleSort(e, 'byTime')}>Sort by Time</button>
        </form>
    )
}

export default AddTodos
