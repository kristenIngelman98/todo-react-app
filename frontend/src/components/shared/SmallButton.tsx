import styled from 'styled-components';

const ButtonWrapper = styled.div`
    // text-align: center;
`
const ButtonBig = styled.button`
    // width: 100%;
`
interface Props {
    title: string;
    onClick?: () => void
}

const SmallButton = ({ title, onClick }: Props) => {

    return (
        <>
        <ButtonWrapper>
            <ButtonBig onClick={onClick} className="btn btn-outline-danger">{title}</ButtonBig>
        </ButtonWrapper>
            
        </>
    )
}

export default SmallButton;