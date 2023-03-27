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
        // anonymous function to update state in parent component
        // (function () { 
        //     change(newTodos) // sending newTodos to parent component
        //     // changeStatus(newTodoStatus)
        // })()

        change(newTodos)
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
                let updatedTodos = [...todos]
                updatedTodos[index].completed = todo.completed;
                setNewTodos(updatedTodos)
            }).catch(err => console.log(err))
    }

    const deleteButtonHandler = () => {
        let id = todo._id;

        // find index of todo to remove based on id
        let index = todos.findIndex(function (todo) {
            return todo._id === id;
        })

        // update todo list
        todos = [...todos.slice(0, index), ...todos.slice(index + 1)];

        // deleting specified todo task
        axios.delete(`http://localhost:8080/tasks/${todo._id}`, config)
            .then(response => {
                setNewTodos(todos)
            }).catch(err => console.log(err))
    }

    return (
        <>
            <ToDoWrapper>
                <CheckboxInput completed={todo.completed} updateStatus={updateStatus} deleteButtonHandler={deleteButtonHandler}/>
                <ListItemUI description={todo.description} deleteButtonHandler={deleteButtonHandler}/>
            </ToDoWrapper>
        </>
    )
}

export default ListItem;