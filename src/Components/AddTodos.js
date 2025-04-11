import React, { useState } from 'react'
import './Addtodos.css'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    Input
} from 'reactstrap';
import { toast } from 'react-toastify';

const AddTodos = (props) => {
    const [todoItem, setTodoItem] = useState(props?.todoItem || {})
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});

    const toggle = () => {
        setModal(!modal)
    };

    const validateTodo = () => {
        let isValid = true;
        let error = {}

        if (!todoItem?.title?.trim()) {
            isValid = false;
            error = {
                ...error,
                "title": "Title is required!"
            }
        }

        if (!todoItem?.description?.trim()) {
            isValid = false;
            error = {
                ...error,
                "description": "Description is required!"
            }
        }

        return { isValid, error }
    }

    const handleSubmit = () => {
        let { isValid, error } = validateTodo()

        if (!isValid) {
            setErrors(error);
            toast.error("Please Enter Valid Details")
            return
        }

        props.addTodo({
            title: todoItem?.title,
            description: todoItem?.description,
        })
        setTodoItem({})
        toggle()
    }

    const handleItemModal = () => {
        setModal(true)
        setTodoItem({
            type: 'new',
            title: "",
            description: "",
        })
        setErrors({})
    }

    const handleChange = (val, name) => {
        setTodoItem({
            ...todoItem,
            [name]: val
        })
        setErrors({
            ...errors,
            [name]: ""
        })
    }

    return (
        <form className='myFormStyle' onSubmit={(e) => e.preventDefault()}>
            <h3 className='heading'>Todo-Grid</h3>
            <div className='d-flex justify-content-center'>
                <button className='myAddBtnStyle' onClick={() => handleItemModal()} >Add New Item</button>
                <Input
                    name="select"
                    type="select"
                    className='myInputStyle'
                    value={props?.filter}
                    onChange={(e) => props?.setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </Input>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{todoItem?.type === "new" ? "Add" : "Edit"} Item</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12} className='mb-2'>
                            <Input
                                type='text'
                                onChange={(e) => handleChange(e.target.value, "title")}
                                value={todoItem?.title || ""}
                                placeholder='Enter Title'
                            />
                            {errors?.title && (
                                <p className='text-danger'>{errors?.title}</p>
                            )}
                        </Col>
                        <Col>
                            <Input
                                type='textarea'
                                onChange={(e) => handleChange(e.target.value, "description")}
                                value={todoItem?.description || ""}
                                placeholder='Enter Description'
                            />
                            {errors?.description && (
                                <p className='text-danger'>{errors?.description}</p>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    <div>
                        <Button color="primary" onClick={() => {
                            handleSubmit()
                        }}>
                            {todoItem?.type === "new" ? "Add" : "Update"} Item
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </form>
    )
}

export default AddTodos
