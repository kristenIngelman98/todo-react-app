import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Todo } from "../interfaces/Todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { format } from 'date-fns'
import styled from 'styled-components';
import Button from '../components/shared/Button';
import SmallButton from "./shared/SmallButton";

const DashboardWrapper = styled.div`
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 25px;
    background-color: yellow;
    margin-top: 50px;
    h1 {
      font-family: 'Sofia', cursive;
    }
`

const IntroWrapper = styled.div`
    display: flex;
    justify-content: space-between;
  `
var v = require('voca');
export default function Dashboard() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoValue, setTodoValue] = useState("");
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [name, setName] = useState('')
  const [authenticated, setAuthenticated] = useState(Boolean);

  let token = localStorage.getItem('token')

  // date fns
  let current_date = format(new Date(), 'MMMM do, y')
  //=> "3 days ago"
  console.log(current_date)
  const navigate = useNavigate();

  // console.log(token)
  // console.log('authenticated status before useeffect', authenticated)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authenticated")
    // console.log(typeof isLoggedIn)
    let loggedInStatus = isLoggedIn == "true" ? true : false;
    console.log(loggedInStatus) // this is a boolean and should work!!!

    if (loggedInStatus) {
      setAuthenticated(loggedInStatus)
    }
  }, [])

  console.log(localStorage)
  console.log("AUTHENTICATED STATUS", authenticated)
  // console.log("ALL TODOS", todos)
  // can you have 2 separate useEffects?! - FIX later
  useEffect(() => {
    // getting all todos
    axios.get<Todo[]>('http://localhost:8080/tasks', {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setTodos(response.data)
      })
      .catch(err => console.log(err))

    axios.get('http://localhost:8080/users/me', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.name)
        setName(v.upperCase(response.data.name)) //using voca case manipulation
      })
      .catch(err => console.log(err))
  }, [])
  // call checkAllCompleted whenever todos are updated

  useEffect(() => {
    checkAllCompleted()
  }, [todos])

  // create all completed todos array
  const checkAllCompleted = () => {
    console.log('in checkAllCompleted:', todos)
    let completedArr: Todo[] = []
    // initializing completedArr array on component render!
    // find all completed todos and add them to completedArr
    todos.map((todo) => {
      if (todo.completed === true) {
        completedArr.push(todo)
        return completedArr
      } else {
        // console.log('not complete, not adding to the ARRAY')
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
    axios.post<Todo[]>('http://localhost:8080/tasks', { description: todoValue }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("ADD TODO", response.data)

        let updatedArray: any = [...todos, response.data]

        console.log(updatedArray)
        setTodos(updatedArray)
      }).catch(error => console.log(error))
  }

  // setting todo value based on typed input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value)
    setTodoValue(event.currentTarget.value)
  }

  const handleClearing = async () => {
    console.log('in HANDLE CLEARING')
    let updatedTodos = [...todos]

    // let remove = [0, 2]
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
      axios.delete(`http://localhost:8080/tasks/${todos[remove[i]]._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }) // should this be todos or updatedTodos
        .then(response => {
          console.log(response.data)
        })
    }
    setTodos(updatedTodos)
  }

  const handleLogout = () => {
    // this works when sending an empty object?! WHYYYYY - doesn't need any content sent from postman,,, but maybe because POST?
    axios.post('http://localhost:8080/users/logout', {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("logout?", response.data)
        localStorage.clear()
        navigate('/login')

      }).catch(error => console.log(error))
  }

  // if (authenticated === false) {
  //   return <Navigate replace to="/login" />
  // } else {
  //   return (
  //     <>
  //       <h1>Todo List</h1>
  //       <TodoForm
  //         onSubmit={handleSubmit}
  //         onInputChange={handleChange}
  //         inputValue={todoValue} />

  //       <TodoList
  //         todos={todos}
  //         change={setTodos}
  //       />
  //       <button onClick={handleClearing}>clear all completed</button>
  //     </>
  //   )
  // }

  // may cause issues if localstorage authenticated value is not cleared
  // NEED TO FIX THIS!!!
  if (localStorage.getItem("authenticated") == "true") {
    return (
      <>
      <DashboardWrapper>

        <IntroWrapper>
        <p>Welcome {name}</p>
        <div>
        <p>{current_date}</p>
        <SmallButton onClick={handleLogout} title="Logout"/>
        </div>

        </IntroWrapper>

        <h1>Todo List</h1>
        
        {/* <button onClick={handleLogout}>Logout</button> */}
        <TodoForm
          onSubmit={handleSubmit}
          onInputChange={handleChange}
          inputValue={todoValue} />

        <TodoList
          todos={todos}
          change={setTodos}
        />
        <SmallButton onClick={handleClearing} title="clear all completed"/>
        {/* <button onClick={handleClearing}></button> */}
        </DashboardWrapper>
      </>
    )
  } else {
    return <Navigate replace to="/login" />
  }
}