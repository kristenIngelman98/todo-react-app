import { HTMLProps } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const QuestionP = styled.p`
    text-align: center;
    margin-top: 5px;
`
interface Props extends HTMLProps<HTMLFormElement> {
    question: string;
    link: string;
    action: string;

}
const Question = ({ question, link, action }: Props) => {
    return (
            <QuestionP>{question}<span> <Link to={link}>{action}</Link></span></QuestionP>
    )
}

export default Question;