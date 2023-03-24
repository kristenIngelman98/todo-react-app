import { ChangeEvent, HTMLProps } from "react";
import styled from 'styled-components';

const FormWrapper = styled.div`
    margin-bottom: 15px;
`;

const FormElementWrapper = styled.div`
    display:flex;

    button {
        margin-left: 5px;
    }
`;

interface Props extends HTMLProps<HTMLFormElement> {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void; // telling ts we are expecting a method that accepts an event as a parameter and doersn't return anything: voic!
    inputValue: string;
}

const TodoForm = ({ onInputChange, inputValue, ...props }: Props) => {
    return (
        <FormWrapper>
        <form {...props}>
            <FormElementWrapper>
            <input
                className="form-control"
                placeholder="What would you like to get done?"
                onChange={onInputChange}
                value={inputValue}
            />
            <button className="btn btn-dark">Add</button>
            </FormElementWrapper>
        </form>
        </FormWrapper>
    )
}

export default TodoForm;