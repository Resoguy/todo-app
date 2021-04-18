import {Link} from 'react-router-dom';
import s from './Toolbar.module.css';


const Toolbar = () => {
    const links = [
        {url: '/', title: 'Home'},
        {url: '/todos', title: 'Todos'},
        {url: '/about', title: 'About'}
    ]

    return (
        <nav className={s.toolbar}>
            <Link to="/" className={s.brandLogo}>
                Todo App
            </Link>

            <ul className={s.toolbarList}>
                {
                    links.map(link => <ToolbarItem key={link.url} link={link} />)
                }
            </ul>
        </nav>
    )
}

const ToolbarItem = ({link}) => (
    <li className={s.toolbarItem}>
        <Link to={link.url} className={s.toolbarLink}>
            {link.title}
        </Link>
    </li>
)

export default Toolbar;