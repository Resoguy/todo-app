import React, {useState} from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import s from './TodosPage.module.css';


class TodosPage extends React.Component {
    state = {
        todos: [],
        todoTitle: '',
        isSubmitting: false,
    }

    componentDidMount() {
        this.fetchTodos();
    }

    setTodoTitle = (event) => {
        this.setState({todoTitle: event.target.value});
    }

    fetchTodos = async () => {
        const response = await fetch('http://localhost:1337/todos');
        const data = await response.json();

        this.setState({todos: data});
    }

    postTodo = async (newTodo) => {
        const response = await fetch('http://localhost:1337/todos', {
            body: JSON.stringify(newTodo),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data;
    }

    addTodo = async (event) => {
        event.preventDefault();

        this.setState({isSubmitting: true});

        const newTodo = { title: this.state.todoTitle };

        await this.postTodo(newTodo);

        await this.fetchTodos();

        this.setState({
            todoTitle: '',
            isSubmitting: false
        });
    }

    toggleCompleted = async (todo) => {
        // put requesti at
        await fetch(`http://localhost:1337/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...todo,
                completed: !todo.completed
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // guncel datayi cek
        // statei guncelle
        await this.fetchTodos();
    }

    deleteTodo = async (todoId) => {
        // silme istegi at
        await fetch(`http://localhost:1337/todos/${todoId}`, {
            method: 'DELETE'
        });

        // guncel datayi cek
        await this.fetchTodos()
    }

    render() {
        const {todos, todoTitle, isSubmitting, isDeleting, isToggling} = this.state;

        return (
            <div>
                <h1>Todos Page</h1>
                <hr />

                <div className={s.todoFormWrapper}>
                    <Card>
                        <h1>Todo Form</h1>
                        <form onSubmit={this.addTodo}>
                            <Input
                                label="Todo Title"
                                placeholder="Enter todo title..."
                                value={todoTitle}
                                onChangeHandler={this.setTodoTitle} />

                            <Button 
                                type="submit"
                                isLoading={isSubmitting}>
                                Add Todo
                            </Button>
                        </form>
                    </Card>
                </div>

                <div className={s.todosGrid}>
                    {
                        todos.map(todo => <TodoCard 
                                                key={todo.id} 
                                                todo={todo} 
                                                onToggleDone={this.toggleCompleted}
                                                onDelete={this.deleteTodo} />)
                    }
                </div>
            </div>
        )
    }
}

const TodoCard = ({todo, onToggleDone, onDelete}) => {
    const [isToggling, setToggling] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    return (
        <Card>
            <h3>{todo.title}</h3>
            <div className={s.todoActions}>
                <Button 
                    variant={todo.completed ? 'success' : 'primary'}
                    onClickHandler={async () => {
                        setToggling(true);

                        await onToggleDone(todo);

                        setToggling(false);
                    }}
                    isLoading={isToggling}>
                    {todo.completed ? 'Done' : 'Not Done'}
                </Button>
                <Button 
                    variant="danger"
                    onClickHandler={async () => {
                        setDeleting(true);

                        await onDelete(todo.id);

                        setDeleting(false);
                    }}
                    isLoading={isDeleting}>
                    Delete
                </Button>
            </div>
        </Card>
    )
}

export default TodosPage;
