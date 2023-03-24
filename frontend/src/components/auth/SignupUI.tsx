import { ChangeEvent, HTMLProps } from "react";
import Question from "../shared/Question";
import Button from "../shared/BigButton";
import Input from "../shared/Input";
import styled from 'styled-components';
import Title from "../shared/PageTitle";

const FormWrapper = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:10px;
    padding: 50px;
`
interface Props extends HTMLProps<HTMLFormElement> {
    onSignupChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignupUI = ({ onSignupChange, ...props } : Props) => {
    return (
        <>
       <Title title="Sign Up" />
        <FormWrapper>
            <form {...props}>
                <Input onInputChange={onSignupChange} placeholder="Name" type="text" />
                <Input onInputChange={onSignupChange} placeholder="Email" type="email" />
                <Input onInputChange={onSignupChange} placeholder="Password" type="password" />
                <Button title={"Signup"} />
                <Question question="Already have an account?" action="Log In" link="/login" />
            </form>
            </FormWrapper>
        </>
    )
}

export default SignupUI;