import s from './Button.module.css';


const Button = ({children, onClickHandler, type = 'button', variant = 'primary', isLoading = false}) => (
    <button 
        className={`${s.button} ${s[variant]}`}
        type={type}
        disabled={isLoading}
        onClick={onClickHandler}>
        {isLoading ? '...Loading' : children}
    </button>
)

export default Button;
