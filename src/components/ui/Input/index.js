import s from './Input.module.css';


const Input = ({label, name, placeholder, type, onChangeHandler, value}) => (
    <div className={s.formGroup}>
        <input 
            onChange={onChangeHandler} 
            value={value}
            type={type}
            name={name}
            placeholder={placeholder}
            className={s.input} />
        {
            label && 
            <label className={s.label}>{label}</label>
        }
    </div>
)

export default Input;
