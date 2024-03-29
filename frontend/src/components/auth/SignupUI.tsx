import { ChangeEvent, HTMLProps } from "react";
import Question from "../shared/Question";
import Button from "../shared/Button";
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
       <Title className="page-title" title="Sign Up" />
        <FormWrapper>
            <form {...props}>
                <Input className="input-field" onInputChange={onSignupChange} placeholder="Name" type="text" />
                <Input className="input-field" onInputChange={onSignupChange} placeholder="Email" type="email" />
                <Input className="input-field" onInputChange={onSignupChange} placeholder="Password" type="password" />
                <Button className="bigbutton" title={"Signup"} />
                <Question question="Already have an account?" action="Log In" link="/login" />
            </form>
            </FormWrapper>
        </>
    )
}

export default SignupUI;