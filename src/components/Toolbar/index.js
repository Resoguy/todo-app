import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import s from './Toolbar.module.css';


const Toolbar = ({isAuthenticated, user, jwt}) => {
    const links = [
        {url: '/', title: 'Home'},
        {url: '/todos', title: 'Todos'},
        {url: '/about', title: 'About'},
    ]

    if (!jwt) {
        links.push(
            {url: '/login', title: 'Login'},
            {url: '/register', title: 'Register'}
        )
    }

    return (
        <nav className={s.toolbar}>
            <Link to="/" className={s.brandLogo}>
                Todo App
            </Link>

            <ul className={s.toolbarList}>
                {
                    links.map(link => <ToolbarItem key={link.url} link={link} />)
                }

                {user && <li>Hello, {user.username}</li>}
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

const mapStateToProps = (state) => {

    return {
        jwt: state.jwt,
        user: state.user
    }

}

export default connect(mapStateToProps)(Toolbar);