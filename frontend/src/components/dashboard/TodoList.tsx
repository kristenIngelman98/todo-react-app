import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../interfaces/Todo";
import ListItem from "./ListItem";
import styled from 'styled-components';

const List = styled.ul`
    list-style: none; 
`;
interface Props {
    todos: Todo[]; //an array of that type. Same as Array<Todo>
    change: Dispatch<SetStateAction<Todo[]>>;
}
const TodoList = ({ todos, change }: Props) => {
    return (
            <List className="list-group">
                {todos.map((todo) => (
                    <ListItem key={todo._id}
                        todo={{
                            _id: todo._id,
                            description: todo.description,
                            completed: todo.completed
                        }} todos={todos} change={change}
                    />
                ))}
            </List>
    )
}

export default TodoList;