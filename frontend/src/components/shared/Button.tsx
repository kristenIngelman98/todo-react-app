interface Props {
    title: string;
    // onClick: () => void
}
const Button = ({ title }: Props) => {

    return (
        <>
            <button className="btn btn-primary">{title}</button>
        </>
    )
}

export default Button;