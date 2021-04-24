import s from './Input.module.css';


const Input = ({label, name, placeholder, type, onChangeHandler, value, block = false}) => (
    <div className={s.formGroup}>
        <input 
            onChange={onChangeHandler} 
            value={value}
            type={type}
            name={name}
            placeholder={placeholder}
            className={`${s.input} ${block ? s.block : ''}`} />
        {
            label && 
            <label className={s.label}>{label}</label>
        }
    </div>
)

export default Input;
