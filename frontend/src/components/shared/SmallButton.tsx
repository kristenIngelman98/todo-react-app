interface Props {
    title: string;
    onClick?: () => void
}

const SmallButton = ({ title, onClick }: Props) => {
    return (
        <button onClick={onClick} className="btn btn-outline-danger">{title}</button>
    )
}

export default SmallButton;