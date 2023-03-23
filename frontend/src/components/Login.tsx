import { ChangeEvent, HTMLProps } from "react";
import Question from "./shared/Question";
import Button from "./shared/Button";
import Input from "./shared/Input";

import styled from 'styled-components';

const FormWrapper = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:10px;
    padding: 50px;
`

interface Props extends HTMLProps<HTMLFormElement> {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Login = ({ onInputChange, ...props }: Props) => {
    return (
        <FormWrapper>
            <form {...props}>
                <Input onInputChange={onInputChange} placeholder="Email" type="email" />
                <Input onInputChange={onInputChange} placeholder="Password" type="password" />
                <Button title={"Login"} />
                <Question question="Don't have an account?" action="Sign Up" link="/signup" />
            </form>
        </FormWrapper>
    )
}

export default Login;