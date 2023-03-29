import styled from 'styled-components'

interface Props {
    title: string;
    className: string;
}

const PageTitle = ({ title, className }: Props) => {
    return (
        <h1 className={className}>{title}</h1>
    )
}

const Title = styled(PageTitle)`
    font-family: 'Sofia', cursive;
    text-align: center;
    margin-top: 20px;
`;

export default Title;