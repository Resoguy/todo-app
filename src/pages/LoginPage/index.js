import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {setJwt, setUser} from '../../store/actions';
import s from './LoginPage.module.css';

const loginApi = 'http://localhost:1337/auth/local';


class LoginPage extends React.Component {
    state = {
        identifier: '',
        password: '',
        isSubmitting: false
    }

    setIdentifier = (event) => {
        this.setState({identifier: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    login = async (event) => {
        event.preventDefault();
        this.setState({isSubmitting: true});
        const {identifier, password} = this.state;
        const loginForm = {
            identifier,
            password
        }

        const response = await fetch(loginApi, {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        window.localStorage.setItem('jwt', data.jwt);
        this.props.dispatch(setJwt(data.jwt));
        this.props.dispatch(setUser(data.user));

        this.setState({
            identifier: '',
            password: '',
            isSubmitting: false
        })
        this.props.history.replace('/');
    }

    render() {
        const {identifier, password, isSubmitting} = this.state;

        return (
            <div>
                <h1>Login Page</h1>
                <p>{this.props.jwt}</p>
                {this.props.user && <p>{this.props.user.username}</p>}

                <div className={s.loginFormWrapper}>
                    <Card>
                        <form onSubmit={this.login}>
                            <Input
                                label="Username or Email"
                                placeholder="Enter your username or email..."
                                name="identifier"
                                onChangeHandler={this.setIdentifier}
                                value={identifier}
                                block />

                            <Input
                                label="Password"
                                placeholder="Enter your password..."
                                name="password"
                                type="password"
                                onChangeHandler={this.setPassword}
                                value={password}
                                block />

                            <Button type="submit" isLoading={isSubmitting}>
                                Login
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        jwt: state.jwt, 
        user: state.user
    }

}

export default connect(mapStateToProps)(withRouter(LoginPage));
