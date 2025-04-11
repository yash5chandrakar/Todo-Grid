import React from 'react'
import './Todos.css'
import delete_icon from "./assets/delete.svg"
import { Input } from 'reactstrap'

const Todos = (props) => {
    let todos = props?.todos || []

    const handleMark = (val, index) => {
        props?.markItem(val, index)
    }

    return (
        <div className='mainDivStyle'>
            {((todos === null || todos.length === 0) ? <div className='noItemStyle'>No items in grid</div> : (
                todos?.map((item, index) => {
                    return (
                        <div className='myDivStyle' key={item?.index}>
                            <h2 className='todoTitle' title='Todo Title'>{item?.title}</h2>
                            <p className='todoDesc' title='Todo Description'>{item?.description}</p>
                            <div className='todoBottom d-flex justify-content-between'>
                                <Input
                                    type='checkbox'
                                    onChange={(e) => handleMark(e.target.checked, index)}
                                    checked={item?.completed || false}
                                    className='cursor-pointer'
                                    title={item?.completed ? 'Mark Uncomplete' : 'Mark Completed'}
                                />
                                <img src={delete_icon} alt="Img" title='Delete Item' onClick={() => props.deleteTodo(item.sno)} className='cursor-pointer' />
                            </div>
                        </div>
                    )
                })
            ))}
        </div>
    )
}



export default Todos
