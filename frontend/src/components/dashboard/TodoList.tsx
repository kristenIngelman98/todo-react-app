import { Todo } from "../../interfaces/Todo";
import ListItem from "./ListItem";
import styled from 'styled-components';

const List = styled.ul`
    list-style: none; 
`;

interface Props {
    todos: Todo[]; // an array of that type. Same as Array<Todo>
    variable: Todo;
    onVariableChange: (variable: Todo) => void;
    deleteButtonHandler: (variable: Todo) => void;
}
const TodoList = ({ todos, onVariableChange, variable, deleteButtonHandler }: Props) => {
    return (
        <List className="list-group">
            {todos.map((todo) => (
                <ListItem key={todo._id}
                    todo={{
                        _id: todo._id,
                        description: todo.description,
                        completed: todo.completed
                    }}
                    variable={variable} onVariableChange={onVariableChange} deleteButtonHandler={deleteButtonHandler}
                />
            ))}
        </List>
    )
}

export default TodoList;