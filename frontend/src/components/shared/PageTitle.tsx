import styled from 'styled-components'

const Title = styled.h1`
    font-family: 'Sofia', cursive;
    text-align: center;
    margin-top: 20px;
`;

interface Props {
    title: string;
}

const PageTitle = ({ title }: Props) => {
    return (
        <Title>{title}</Title>
    )
}

export default PageTitle;