import { ChangeEvent, HTMLProps } from "react";
import Question from "./shared/Question";
import Button from "./shared/Button";
import Input from "./shared/Input";

interface Props extends HTMLProps<HTMLFormElement> {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Login = ({ onInputChange, ...props }: Props) => {
    return (
        <>
            <form {...props}>
                <Input onInputChange={onInputChange} placeholder="Email" type="email" />
                <Input onInputChange={onInputChange} placeholder="Password" type="password" />
                <Button title={"Login"} />
                <Question question="Don't have an account?" action="Sign Up" link="/signup" />
            </form>
        </>
    )
}

export default Login;