import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Todo } from "../interfaces/Todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Dashboard() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoValue, setTodoValue] = useState("");
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const [authenticated, setAuthenticated] = useState(Boolean);

  console.log('authenticated status before useeffect', authenticated)
  useEffect(() => {
    console.log('IN USE EFFECT')
    const isLoggedIn = localStorage.getItem("authenticated")
    console.log(typeof isLoggedIn)
    let loggedInStatus = isLoggedIn == "true" ? true : false;
    console.log(loggedInStatus) // this is a boolean and should work!!!
    
    if (loggedInStatus) {
      setAuthenticated(loggedInStatus)
    }
  }, [])

  console.log(localStorage)
  console.log("AUTHENTICATED STATUS", authenticated)
  console.log("ALL TODOS", todos)
  // can you have 2 separate useEffects?! - FIX later
  useEffect(() => {
    // getting all todos
    axios.get<Todo[]>('http://localhost:8080/tasks', {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(response => {
        setTodos(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  // call checkAllCompleted whenever todos are updated

  useEffect(() => {
    checkAllCompleted()
  }, [todos])

  // create all completed todos array
  const checkAllCompleted = () => {
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
        Authorization: "Bearer " + localStorage.getItem('token')
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
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }) // should this be todos or updatedTodos
        .then(response => {
          console.log(response.data)
        })
    }
    setTodos(updatedTodos)
  }

  const handleLogout = () => {
    console.log('logoout button pressed')
    console.log(localStorage.getItem('token'))
    axios.post(`http://localhost:8080/users/logoutAll`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    .then((response) => {
      console.log(response.data)
      console.log('need to clear localstorage and redirect back to /login')
    })
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
        <h1>Todo List</h1>
        <button onClick={handleLogout}>Logout</button>
        <TodoForm
          onSubmit={handleSubmit}
          onInputChange={handleChange}
          inputValue={todoValue} />

        <TodoList
          todos={todos}
          change={setTodos}
        />
        <button onClick={handleClearing}>clear all completed</button>
      </>
  )
} else {
  return <Navigate replace to="/login" />
}


}

