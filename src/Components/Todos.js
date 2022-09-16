import React from 'react'
import './Todos.css'

const Todos = (props) => {
    let todos = props.todos

    return (
        <div className='mainDivStyle'>
            {((todos == null || todos.length === 0) ? <div className='noItemStyle'>No items in grid</div> : (
                todos.map((item) => {
                    // console.log(item.time)
                    return (
                        <div className='myDivStyle' key={item.sno}>
                            <h2 className='todoTitle' title='Todo Title'>{item.title}</h2>
                            <p className='todoDesc' title='Todo Description'>{item.desc}</p>
                            <p className='todoBottom'><button title='Edit Item' className='btnStyle' onClick={() => { props.editItem(item.sno) }}>✏️</button>
                                <span className='todoTime'>{item.time}</span>
                                <button className='redBtnStyle' title='Delete Item' onClick={() => props.deleteTodo(item.sno)}>
                                    <img src={require('./assets/emojisky.com-854092.png')} alt="Img" />
                                </button></p>
                        </div>
                    )
                })
            ))}
        </div>
    )
}



export default Todos
