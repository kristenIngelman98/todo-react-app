import { ChangeEvent, HTMLProps } from "react";
import Question from "../shared/Question";
import Button from "../shared/BigButton";
import Input from "../shared/Input";
import Title from "../shared/PageTitle"
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

const LoginUI = ({ onInputChange, ...props }: Props) => {
    return (
        <>
        <Title title="Login" />
        <FormWrapper>
            <form {...props}>
                <Input onInputChange={onInputChange} placeholder="Email" type="email" />
                <Input onInputChange={onInputChange} placeholder="Password" type="password" />
                <Button title={"Login"} />
                <Question question="Don't have an account?" action="Sign Up" link="/signup" />
            </form>
        </FormWrapper>
        </>
    )
}

export default LoginUI;