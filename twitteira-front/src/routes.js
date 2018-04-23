import React, {Component} from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage/index'

//configurações das paginas
import { Switch, Route, Redirect} from 'react-router-dom'

function estadoAutenticado(){
    if(localStorage.getItem('TOKEN')){
        return true
    }
    return false
}

class PrivateRoute extends Component {
    render(){
        
        // const path = this.props.path
        // const component = this.props.component
        if(estadoAutenticado()){
            return (
                <Route { ...this.props} />
            )
        }else {
            return(
                <Redirect to="/login" />
            )
        }
    }
}

export default class Routes extends Component{
   render(){
       return(
           <Switch>{/*Ele pega as URLS e faz os ifs*/}
               <PrivateRoute path="/" exact component={Home} />
               <Route path="/login" component={LoginPage} />
               <Route path="*" component={() => (<div>Pagina 404</div>)} />
           </Switch>   
       )
   }

}
