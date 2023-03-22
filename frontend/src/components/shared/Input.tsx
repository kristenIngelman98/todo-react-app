import { ChangeEvent } from "react";

interface Props {
    placeholder: string;
    type: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, type, onInputChange }: Props) => {

    return (
        <>
           <input placeholder={placeholder} type={type} onChange={onInputChange} />

           {/* <input
                className="form-control"
                placeholder="What would you like to get done?"
                onChange={onInputChange}
                value={inputValue}
            /> */}
        </>
    )
}

export default Input;