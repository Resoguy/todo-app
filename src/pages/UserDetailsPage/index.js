import React from 'react';
import {withRouter} from 'react-router-dom';
import Card from '../../components/ui/Card';
import s from './UserDetailsPage.module.css';


class UserDetailsPage extends React.Component {
    state = {
        todos: []
    }

    componentDidMount() {
        this.fetchUserTodos();
    }

    fetchUserTodos = async () => {
        const userId = this.props.match.params.id;
        const response = await fetch(`http://localhost:1337/todos?user=${userId}&&_sort=updated_at:desc`)
        const data = await response.json();

        this.setState({todos: data});
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <h1>User Todos</h1>

                <div>
                    {
                        todos.map(todo => <TodoCard key={todo.id} todo={todo} />)
                    }
                </div>
            </div>
        )
    }
}

const TodoCard = ({todo}) => {
    const createdAt = new Date(todo.created_at).toDateString();
    const updatedAt = new Date(todo.updated_at).toDateString();

    return (
        <Card>
            <p>
                <small>Created at: {createdAt}</small>
            </p>
            <p>
                <small>Updated at: {updatedAt}</small>
            </p>
            <h3>{todo.title}</h3>
            <p>{todo.user.username}</p>
            <h4>
                Status: <span className={s[todo.completed ? 'green' : 'red']}>{todo.completed ? 'Completed' : 'Not Completed'}</span>
            </h4>
        </Card>
    )
}

export default withRouter(UserDetailsPage);
