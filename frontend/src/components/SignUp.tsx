import { ChangeEvent, HTMLProps } from "react";
import Question from "./shared/Question";
import Button from "./shared/Button";
import Input from "./shared/Input";

interface Props extends HTMLProps<HTMLFormElement> {
    onSignupChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignUp = ({ onSignupChange, ...props } : Props) => {
    return (
        <>
            <form {...props}>
                <Input onInputChange={onSignupChange} placeholder="Name" type="text" />
                <Input onInputChange={onSignupChange} placeholder="Email" type="email" />
                <Input onInputChange={onSignupChange} placeholder="Password" type="password" />
                <Button title={"Signup"} />
                <Question question="Already have an account?" action="Log In" link="/login" />
            </form>
        </>
    )
}

export default SignUp;