import { h, Component } from 'preact';
import style from './style';

class EnvioAlerta extends Component {

	constructor(props){
		super(props);
		this.connection = null;
	}

	componentDidMount() {
		// this.initSocket();
	}
    
    initSocket = () => {
    	const self = this;
    	this.connection = new WebSocket('ws://'+document.location.host+'/ws', ['arduino']);
    	this.connection.onopen = function ()       { self.connection.send('Connect ' + new Date()); };
    	this.connection.onerror = function (error) { console.log('WebSocket Error ', error);};
    	this.connection.onmessage = function (e)   { console.log('Server: ', e.data);};
    }
    
    render(props, state) {
    	return (
    		<button
    			type="button"
    			class={style.botonAlerta}
    			onClick={this.props.updateMatrices}
    		>
            Envío Alerta
    		</button>
    	);
    }
}
 
export default EnvioAlerta;