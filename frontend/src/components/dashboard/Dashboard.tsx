import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Todo } from "../../interfaces/Todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import format from 'date-fns/format';
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
  // const [authenticated, setAuthenticated] = useState(Boolean);

  const navigate = useNavigate();

  let token = localStorage.getItem('token')
  let auth = localStorage.getItem('authenticated')

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  // date formatting w/ date-fns
  let current_date = format(new Date(), 'MMMM do, y')

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("authenticated")
  //   let loggedInStatus = isLoggedIn === "true" ? true : false;
  //   console.log(loggedInStatus)

  //   if (loggedInStatus) {
  //     // setAuthenticated(loggedInStatus)
  //   }
  // }, [])

  useEffect(() => {
    // getting all todos for specific user
    const fetchData = async () => {
      try {
        // getting all todos for specific user
        const response1 = await fetch('http://localhost:8080/tasks', config)
        const data1 = await response1.json()
        setTodos(data1)

        // getting the current logged in user
        const response2 = await fetch('http://localhost:8080/users/me', config)
        const data2 = await response2.json()
        setName(v.upperCase(data2.name))
      } catch (error) {
        console.error('Error fetchig data: ', error)
      }
    }
    fetchData()
  }, [])

  // call checkAllCompleted whenever todos are updated
  useEffect(() => {
    checkAllCompleted()
  }, [todos])

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

  // remove all completed todos
  const handleClearing = async () => { // FETCH
    let updatedTodos = [...todos]
    let remove: any = []; // array of indexes to remove

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

      try {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${token}`)
        headers.append('Content-Type', 'application/json')

        const response = await fetch(`http://localhost:8080/tasks/${todos[remove[i]]._id}`, {
          method: 'DELETE',
          headers: headers
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      console.log('Tasks successfully deleted')
      setTodos(updatedTodos)
      } catch (error) {
        console.error('Error deleting tasks', error)
      }
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
    setTodoValue(""); //resetting todo value in input
  };

  const addTodo = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ description: todoValue })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const responseData = await response.json()
      console.log('Task added successfully: ', responseData)
      let updatedArray: any = [...todos, responseData] // change type from any?! - FIX
      setTodos(updatedArray)
    } catch (error) {
      console.log('Error creating task: ', error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setting todo value based on typed input
    setTodoValue(event.currentTarget.value)
  }

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/users/logout', {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({})
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }

  //     const responseData = await response.json()
  //     console.log('Logged out successfully: ', responseData)
  //     localStorage.clear() // clear local storage
  //     navigate('/login')
  //   } catch (error) {
  //     console.error('Error logging out: ', error)
  //   }
  // }


  const handleLogout = () => {
    axios.post('http://localhost:8080/users/logout', {}, config)
    .then(response => {
      localStorage.clear() // clear local storage
      navigate('/login')
    }).catch(err => console.log(err))
  }

  if (auth == "true") {
    return (
      <DashboardWrapper>
        <IntroWrapper>
          <p>Welcome {name}</p>
          <div>
            <p>{current_date}</p>
            <SmallButton onClick={handleLogout} title="Logout" />
          </div>
        </IntroWrapper>
        <Title className="page-title" title="Todo List" />
        <TodosWrapper>
          <TodoForm
            formProps={{onSubmit: handleSubmit}}
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