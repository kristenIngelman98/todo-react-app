import { Dispatch, SetStateAction } from "react";
import { Todo } from "../interfaces/Todo";
import TodoListItemSmart from "./TodoListItemSmart";

interface Props {
    todos: Todo[]; //an array of that type. Same as Array<Todo>
    change: Dispatch<SetStateAction<Todo[]>>;
}
const TodoList = ({ todos, change }: Props) => {

    return (
        <>
            <ul className="list-group">
                {todos.map((todo) => (
                    <TodoListItemSmart key={todo._id}
                        todo={{
                            _id: todo._id,
                            description: todo.description,
                            completed: todo.completed
                        }} todos={todos} change={change}
                    />
                ))}
            </ul>
        </>
    )
}

export default TodoList;