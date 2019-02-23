import { h, Component } from 'preact';
import style from './style';

class EnvioAlerta extends Component {

    /*
    constructor(props){
        super();
        this.connection = null;
      }

    componentDidMount() {
        this.initSocket();
    }
    
    initSocket = () => {
        const self = this;
        this.connection = new WebSocket('ws://'+document.location.host+'/ws', ['arduino']); 
        this.connection.onopen = function ()       { self.connection.send('Connect ' + new Date()); };
        this.connection.onerror = function (error) { console.log('WebSocket Error ', error);};
        this.connection.onmessage = function (e)   { console.log('Server: ', e.data);}
    }
    */

    /*
    envioMatrices = () => {
        const color = this.props.envioColor;
        let alerta = '';

        if(color === 0){ alerta = 'rojo'; }
        else if(color === 1) { alerta = 'verde'; }
        else if(color === 2) { alerta = 'amarillo'; }
        else if(color === 3) { alerta = 'violeta'; }
        else if(color === 4) { alerta = 'naranja'; }

        console.log( alerta );

        if(this.connection){
          //this.connection.send(alerta); 
        }
        
    }
    */
    
    render(props, state) { 
        return ( 
            <button 
                type="button" 
                class={style.botonAlerta} 
                //onClick={this.props.actualizoMatrices}
            > 
            Envío Alerta 
            </button>
         );
    }
}
 
export default EnvioAlerta;