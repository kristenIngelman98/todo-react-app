import { HTMLProps } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Prompt = styled.p`
    text-align: center;
    margin-top: 5px;
`;

interface Props {
    question: string;
    link: string;
    action: string;

}
const Question = ({ question, link, action }: Props) => {
    return (
        <Prompt>{question}<span> <Link to={link}>{action}</Link></span></Prompt>
    )
}

export default Question;