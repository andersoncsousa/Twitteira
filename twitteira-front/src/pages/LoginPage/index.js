import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    state = {
        usuario: '',
        senha: ''
    }

    fazLogin = (e) => {
        e.preventDefault()

        const login = this.inputLogin.value
        const senha = this.inputSenha.value

        console.log(login, senha)

        const infoDoUsuario = {
            //ES6
            login,
            senha
        }

        fetch('http://localhost:3001/login',{
            method: 'POST',
            body: JSON.stringify(infoDoUsuario),
        })
        .then((respostaDoServer) => {
            if(!respostaDoServer.ok){
                throw new Error ('mensagem')
            }
            return respostaDoServer.json()
        })
        .then((respostaPronta) => { 
            //  console.log('TOKEN', respostaPronta.token)
            localStorage.setItem('TOKEN',respostaPronta.token)
            this.props.history.push('/')

        })

        .catch((erroQueAcontece) => {
                console.log(erroQueAcontece)
        })
            
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input className="loginPage__input" 
                                        type="text" 
                                        id="login"
                                        ref = {(inputLoginDoDom) => this.inputLogin = inputLoginDoDom}
                                        name="login"/>
                            </div>

                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input className="loginPage__input" 
                                        type="password" 
                                        id="senha"
                                        ref = {(inputSenhaDoDom) => this.inputSenha = inputSenhaDoDom} 
                                        name="senha"/>
                            </div>

                            {/* { <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div>} */}

                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}

export default LoginPage