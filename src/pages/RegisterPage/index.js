import React from 'react';
import {withRouter} from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import s from './RegisterPage.module.css';

const registerApi = 'http://localhost:1337/auth/local/register';


class RegisterPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        isRegistering: false
    }

    setUsername = (event) => {
        this.setState({username: event.target.value});
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    register = async (event) => {
        event.preventDefault();
        this.setState({isRegistering: true});

        const {username, email, password} = this.state;
        const registerForm = {
            username,
            email,
            password
        }
        const response = await fetch(registerApi, {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json(); // data = {jwt: MY_JWT_TOKEN, user: USER_DATA}

        window.localStorage.setItem('jwt', data.jwt);

        this.setState({
            username: '',
            email: '',
            password: '',
            isRegistering: false
        })

        this.props.history.replace('/')
    }

    render() {
        const {username, email, password, isRegistering} = this.state;

        return (
            <div>
                <h1>Register Page</h1>
    
                <div className={s.registerFormWrapper}>
                    <Card>
                        <form onSubmit={this.register}>
                            <Input
                                label="Username"
                                value={username}
                                placeholder="Enter a username..."
                                name="username"
                                onChangeHandler={this.setUsername}
                                block />

                            <Input 
                                label="Email"
                                value={email}
                                placeholder="Enter a valid email..."
                                type="email"
                                name="email"
                                onChangeHandler={this.setEmail}
                                block />

                            <Input
                                label="Password"
                                value={password}
                                placeholder="Enter your password..."
                                type="password"
                                onChangeHandler={this.setPassword}
                                block />

                            <Button type="submit" isLoading={isRegistering}>
                                Register
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterPage);
