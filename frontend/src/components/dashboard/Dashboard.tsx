import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Todo } from "../../interfaces/Todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { format } from 'date-fns'
import styled from 'styled-components';
import SmallButton from "../shared/SmallButton";
import Title from '../shared/PageTitle'

const DashboardWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-top: 25px;
    background-color: #e9ecef;
    height: 100vh;
`
const IntroWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  `
const TodosWrapper = styled.div`
    max-width: 800px;
    margin-left:auto;
    margin-right:auto;
    `
var v = require('voca');

export default function Dashboard() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoValue, setTodoValue] = useState("");
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [name, setName] = useState('')
  const [authenticated, setAuthenticated] = useState(Boolean);

  // what is this?! ADD COMMENT
  const navigate = useNavigate();

  let token = localStorage.getItem('token')

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }


  // date formatting w/ date-fns
  let current_date = format(new Date(), 'MMMM do, y')

  // THIS CURRENTLY IS NOT WORKING! - CHECK/FIX
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authenticated")
    let loggedInStatus = isLoggedIn === "true" ? true : false;
    console.log(loggedInStatus) // this is a boolean and should work!!!

    if (loggedInStatus) {
      setAuthenticated(loggedInStatus)
    }
  }, [])

  // can you have 2 separate useEffects?! - FIX later
  useEffect(() => {
    // getting all todos for specific user
    axios.get<Todo[]>('http://localhost:8080/tasks', config)
      .then(response => {
        setTodos(response.data)
      }).catch(err => console.log(err))

    // getting the current logged in user
    axios.get('http://localhost:8080/users/me', config)
      .then(response => {
        setName(v.upperCase(response.data.name)) // using voca case manipulation
      }).catch(err => console.log(err))
  }, [])

  // call checkAllCompleted whenever todos are updated
  useEffect(() => {
    checkAllCompleted()
  }, [todos])

  // create all completed todos array
  const checkAllCompleted = () => {
    let completedArr: Todo[] = []

    // find all completed todos and add them to completedArr
    todos.map((todo) => {
      if (todo.completed === true) {
        completedArr.push(todo)
        return completedArr
      } else {
        return
      }
    })
    setCompletedTodos(completedArr)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
    setTodoValue(""); //resetting todo value in input
  };

  const addTodo = () => {
    axios.post<Todo[]>('http://localhost:8080/tasks', { description: todoValue }, config)
    .then(response => {
      let updatedArray: any = [...todos, response.data] // change type from any?!
      setTodos(updatedArray)
    }).catch(error => console.log(error))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setting todo value based on typed input
    setTodoValue(event.currentTarget.value)
  }

  const handleClearing = async () => {
    let updatedTodos = [...todos]
    let remove: any = []; //change this type later

    completedTodos.map((todo) => {
      let id = todo._id;
      // find index of todo to remove based on id
      let index = todos.findIndex(function (todo) {
        return todo._id === id;
      })
      remove.push(index)
    })

    // update todo list
    for (var i = remove.length - 1; i >= 0; i--) {
      updatedTodos.splice(remove[i], 1)
      axios.delete(`http://localhost:8080/tasks/${todos[remove[i]]._id}`, config)
      .then(response => { // do I need response to be here?!
        setTodos(updatedTodos)
      }).catch(err => console.log(err))
    }
  }

  const handleLogout = () => {
    // this works when sending an empty object?! WHYYYYY - doesn't need any content sent from postman,,, but maybe because POST?
    axios.post('http://localhost:8080/users/logout', {}, config)
    .then(response => {
      localStorage.clear() // clear local storage to clear token and auth status
      navigate('/login') // redirect to /login
    }).catch(err => console.log(err))
  }

  if (localStorage.getItem("authenticated") == "true") {
    return (
      <DashboardWrapper>
        <IntroWrapper>
          <p>Welcome {name}</p>
          <div>
            <p>{current_date}</p>
            <SmallButton onClick={handleLogout} title="Logout" />
          </div>
        </IntroWrapper>
        <Title title="Todo List" />
        <TodosWrapper>
          <TodoForm
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            inputValue={todoValue}
          />
          <TodoList
            todos={todos}
            change={setTodos}
          />
          <SmallButton onClick={handleClearing} title="clear all completed" />
        </TodosWrapper>
      </DashboardWrapper>
    )
  } else {
    return <Navigate replace to="/login" />
  }
}