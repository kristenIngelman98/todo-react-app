import { ChangeEvent, HTMLProps } from "react";
import Question from "../shared/Question";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Title from "../shared/PageTitle"
import styled from 'styled-components';

const FormWrapper = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:10px;
    padding: 50px;
`;

interface Props extends HTMLProps<HTMLFormElement> {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    // className: string;
}

const LoginUI = ({ onInputChange, className, ...props }: Props) => { // should I get ALL props? ...props?
    return (
        <>
        <Title className="page-title" title="Login" />
        <FormWrapper>
            {/* <div className={className}> */}
            <form {...props}>
                <Input className="input-field" onInputChange={onInputChange} placeholder="Email" type="email" />
                <Input className="input-field" onInputChange={onInputChange} placeholder="Password" type="password" />
                <Button className="bigbutton" title={"Login"} />
                <Question question="Don't have an account?" action="Sign Up" link="/signup" />
            </form>
            {/* </div> */}
        </FormWrapper>
        </>
    )
}



export default LoginUI;