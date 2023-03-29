import { ChangeEvent } from "react";
import styled from 'styled-components';

interface Props {
    placeholder: string;
    type: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className: string;
}

// look at React.FC
const Input : React.FC<Props> = ({ placeholder, type, onInputChange, className }) => {
    return (
        <div className={className}>
            <input className="form-control" type={type} placeholder={placeholder} onChange={onInputChange}></input>
        </div>
    )
}

const InputField = styled(Input)` 
    margin-bottom:10px;
`;

export default InputField;