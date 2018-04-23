import React, { Component, Fragment } from 'react';

import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {

    constructor(props){
        super()
        this.state = {
            novoTweet: '',
            tweets: []
        }
        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentWillMount(){
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetsDoServidor) => {
                this.setState({
                    tweets: tweetsDoServidor
                })
            })
    }

    adicionaTweet(e){
        e.preventDefault()
        
        //pega o valor do input
        const novoTweet = this.state.novoTweet

        if(novoTweet){
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then((respostaDoServer) => { return respostaDoServer.json() })
            .then((novoTweetRegistradoNoServer) => {
                console.log(novoTweetRegistradoNoServer)
                this.setState({
                    tweets: [novoTweetRegistradoNoServer, ...this.state.tweets]
                })
            })
        }

    }

    render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@caiqueSousa" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={this.adicionaTweet}>
                        <div className="novoTweet__editorArea">
                            <span 
                            className={`novoTweet__status ${this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : ''}`}>
                                {this.state.novoTweet.length}/140
                            </span>

                            <textarea className="novoTweet__editor"
                                    value={this.state.novoTweet}
                                    onChange = { (e) => this.setState({novoTweet: e.target.value})}
                                    placeholder="O que está acontecendo?">
                            </textarea>
                        </div>
                        <button type="submit"
                                disabled = {this.state.novoTweet.length > 140 ? true : false}
                                className="novoTweet__envia">
                        Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">

                    { this.state.tweets.length === 0 
                        ? 'Mensagem avisando' : '' }
                        
                    {this.state.tweets.map((tweetInfo, index) => 
                        <Tweet 
                            tweetInfo={tweetInfo}
                            key={tweetInfo._id} 
                            text={tweetInfo.conteudo}/>
                    )}

                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home
