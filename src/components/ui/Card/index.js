import s from './Card.module.css';


const Card = ({children, padding = true}) => (
    <div className={`${s.card} ${padding ? s.padding : ''}`}>
        {children}
    </div>
)

export default Card;
