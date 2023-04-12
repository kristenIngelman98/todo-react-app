import { Dispatch, HTMLProps, SetStateAction, useEffect, useState } from "react";
import { Todo } from "../../interfaces/Todo";
import styled from 'styled-components';
import ListItemUI from "./ListItemUI";
import axios from "axios";
import CheckboxInput from "../shared/CheckboxInput";

const ToDoWrapper = styled.div`
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
`;

interface Props extends HTMLProps<HTMLFormElement> {
    todos: Todo[];
    todo: Todo;
    change: Dispatch<SetStateAction<Todo[]>>;
}

const ListItem = ({ todo, todos, change }: Props) => {
    const [newTodos, setNewTodos] = useState(todos);

    let token = localStorage.getItem('token')

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

    useEffect(() => {
        change(newTodos)
        // console.log('useEffect')
    }, [newTodos])


    const updateStatus = () => {
        let id = todo._id;
        todo.completed = !todo.completed;

        // update todo completed status
        axios.patch(`http://localhost:8080/tasks/${id}`, { completed: todo.completed }, config)
            .then(response => {
                let todo = response.data

                // find index of todo to remove based on id
                let index = todos.findIndex(function (todo) {
                    return todo._id === id;
                })

                // UPDATED CODE - created a deep clone
                let deepCloneUpdatedTodos = JSON.parse(JSON.stringify(todos)); // deep clone
                deepCloneUpdatedTodos[index].completed = todo.completed; // this should be okay?! I'm not mutating the original array
                setNewTodos(deepCloneUpdatedTodos)
            }).catch(err => console.log(err))
    }

    // const updateStatus = async () => {
    //     let id = todo._id;
    //     todo.completed = !todo.completed;

    //     // update todo completed status
    //     // axios.patch(`http://localhost:8080/tasks/${id}`, { completed: todo.completed }, config)
    //     //     .then(response => {
    //     //         let todo = response.data

    //     //         // find index of todo to remove based on id
    //     //         let index = todos.findIndex(function (todo) {
    //     //             return todo._id === id;
    //     //         })

    //     //         // UPDATED CODE - created a deep clone
    //     //         let deepCloneUpdatedTodos = JSON.parse(JSON.stringify(todos)); // deep clone
    //     //         deepCloneUpdatedTodos[index].completed = todo.completed; // this should be okay?! I'm not mutating the original array
    //     //         setNewTodos(deepCloneUpdatedTodos)
    //     //     }).catch(err => console.log(err))
       
       
    //    try {
    //     const headers = new Headers()
    //     headers.append('Authorization', `Bearer ${token}`)
    //     headers.append('Content-Type', 'application/json')
    //     const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    //         method: 'PATCH',
    //         headers: headers,
    //         body: JSON.stringify({ completed: todo.completed })
    //     });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     }

    //     const responseData = await response.json()
    //     console.log('Task status updated: ', responseData)
    
    //     // ADDED LOGIC
    //     // let todo = responseData

    //     // // find index of todo to remove based on id
    //     // let index = todos.findIndex(function (todo) {
    //     //     return todo._id === id;
    //     // })

    //     // // UPDATED CODE - created a deep clone
    //     // let deepCloneUpdatedTodos = JSON.parse(JSON.stringify(todos)); // deep clone
    //     // deepCloneUpdatedTodos[index].completed = todo.completed; // this should be okay?! I'm not mutating the original array
    //     // setNewTodos(deepCloneUpdatedTodos)
    //    } catch (error) {
    //     console.error('Error updating task status: ', error)
    //    }
    // }

    const deleteButtonHandler = async () => {
        let id = todo._id;

        // find index of todo to remove based on id
        let index = todos.findIndex(function (todo) {
            return todo._id === id;
        })

        // update todo list
        todos = [...todos.slice(0, index), ...todos.slice(index + 1)];

        try {
            const headers = new Headers()
            headers.append('Authorization', `Bearer ${token}`)
            headers.append('Content-Type', 'application/json')
            const response = await fetch(`http://localhost:8080/tasks/${todo._id}`, {
                method: 'DELETE',
                headers: headers
        });

        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        console.log('Single task successfully deleted')
        setNewTodos(todos)
        } catch (error ) {
            console.error('Error deleting single task: ', error)
        }
    }

    return (
        <>
            <ToDoWrapper>
                <CheckboxInput className="className" completed={todo.completed} updateStatus={updateStatus} deleteButtonHandler={deleteButtonHandler}/>
                <ListItemUI description={todo.description} deleteButtonHandler={deleteButtonHandler}/>
            </ToDoWrapper>
        </>
    )
}

export default ListItem;