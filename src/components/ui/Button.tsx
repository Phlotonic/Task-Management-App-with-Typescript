interface ButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined;
    onClick?: () => void;
    children: React.ReactNode;
}
const Button = ({ type, onClick, children }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;
