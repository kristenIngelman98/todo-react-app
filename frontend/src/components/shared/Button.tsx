import styled from 'styled-components';

interface Props {
    title: string;
    onClick?: () => void;
    className: string;
}

const BigButton = ({ title, onClick, className }: Props) => {
    return (
            <div className={className}>
                <button onClick={onClick} className="btn btn-dark">{title}</button>
            </div>
    )
}

const Button = styled(BigButton)`
    button {
        width:100%;
    }
`;


export default Button;