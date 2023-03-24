import { ChangeEvent } from "react";
import styled from 'styled-components';

const InputWrapper = styled.div` 
    margin-bottom:10px;
`
interface Props {
    placeholder: string;
    type: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, type, onInputChange }: Props) => {
    return (
        <InputWrapper>
            <input className="form-control" type={type} placeholder={placeholder} onChange={onInputChange}></input>
        </InputWrapper>
    )
}

export default Input;