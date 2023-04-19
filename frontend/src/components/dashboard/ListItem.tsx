import { HTMLProps } from "react";
import { Todo } from "../../interfaces/Todo";
import styled from 'styled-components';
import ListItemUI from "./ListItemUI";
import CheckboxInput from "../shared/CheckboxInput";

interface Props extends HTMLProps<HTMLFormElement> { // do I need HTMLprops or just reg props?
    todo: Todo;
    variable: Todo; // do i need both of these?
    onVariableChange: (variable: Todo) => void;
    deleteButtonHandler: (variable: Todo) => void;
}

const ListItem = ({ todo, onVariableChange, deleteButtonHandler, className }: Props) => {
    return (
        <div className={className}>
            <CheckboxInput
                className="className"
                completed={todo.completed}
                todo={todo}
                onVariableChange={onVariableChange}
                variable={todo}
            />
            <ListItemUI
                description={todo.description}
                todo={todo}
                deleteButtonHandler={deleteButtonHandler}
                variable={todo}
                className="className"
            />
        </div>
    )
}

const ListItemWrapper = styled(ListItem)`
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
`;

export default ListItemWrapper;