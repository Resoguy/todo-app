import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../../components/ui/Card';
import s from './HomePage.module.css';

class HomePage extends React.Component {
    state = {
        todos: []
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = async () => {
        const response = await fetch('http://localhost:1337/todos?_sort=updated_at:desc&&_limit=10');
        const data = await response.json();

        this.setState({todos: data});
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <h1>Home Page</h1>
                <hr/>

                <h2>Last 10 Todos</h2>

                <div className={s.todosGrid}>
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
            <h4>
                Status: <span className={s[todo.completed ? 'green' : 'red']}>
                    {todo.completed ? 'Completed' : 'Not Completed'}
                    </span>
            </h4>
            <Link to={`/users/${todo.user.id}`}>{todo.user.username}</Link>
        </Card>
    )
}

export default HomePage;
