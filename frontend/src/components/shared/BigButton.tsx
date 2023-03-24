import styled from 'styled-components';

const ButtonWrapper = styled.div`
    text-align: center;

    button {
        width: 100%;
    }
`;

interface Props {
    title: string;
    onClick?: () => void;
}

const BigButton = ({ title, onClick }: Props) => {
    return (
        <ButtonWrapper>
            <button onClick={onClick} className="btn btn-dark">{title}</button>
        </ButtonWrapper>
    )
}

export default BigButton;