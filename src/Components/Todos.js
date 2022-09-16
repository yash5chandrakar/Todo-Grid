import React from 'react'
import './Todos.css'

const Todos = (props) => {
    let todos = props.todos

    return (
        <div className='mainDivStyle'>
            {((todos == null || todos.length === 0) ? <div className='noItemStyle'>No items in grid</div> : (
                todos.map((item) => {
                    // console.log(item.time)
                    return <div className='myDivStyle' key={item.sno}>
                        <h2>{item.title}</h2>
                        <p>{item.desc}</p>
                        <p><button className='btnStyle' onClick={() => { props.editItem(item.sno) }}>✏️</button>
                            <button className='redBtnStyle' onClick={() => props.deleteTodo(item.sno)}>
                                <img src={require('./assets/emojisky.com-854092.png')} alt="Img" />
                            </button></p> <span>{item.time}</span>
                    </div>
                })
            ))}
        </div>
    )
}



export default Todos
