import { HTMLProps } from "react";
import { Link } from "react-router-dom";

interface Props extends HTMLProps<HTMLFormElement> {
    question: string;
    link: string;
    action: string;

}
const Question = ({ question, link, action }: Props) => {
    return (
            <p>{question}<span> <Link to={link}>{action}</Link></span></p>
    )
}

export default Question;