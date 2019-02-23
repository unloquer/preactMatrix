import { h, Component } from 'preact';
import style from './style';

class Led extends Component {
	constructor(props) {
		super(props);
		this.state = {
			KeyLed: props.keyid,
			color: 1,
			alerta: ' '
			// coloresLeds: [ ]
		};

        
		this.coloresLeds = [
			' ',
			' '
		];
        
        
		this.changeColor = () => {
			let estadoActualLed = this.state.color;
			// recorro el array cuando se hace click
			this.setState({
                // color: ( estadoActualLed + 1 ) % this.state.coloresLeds.length // WARNING
                color: ( estadoActualLed + 1 ) % this.coloresLeds.length 
			});
            
			const { keyid } = this.props;

			this.props.reciboEstadoLed(keyid, estadoActualLed);
		};
        
		this.fijoColores = () => {
			const alertas = this.props.alerta;
			this.setState({ alerta: alertas });
			console.log(this.state.alerta);

			const prevColor = ['dummy', 'dummy'];

			if ( (this.state.keyLed <= 63) && (alertas === 'rojo') ) {

				/*
                push array with form prevcolor with colors leds
                */

                
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'rojo';
                
				// solution ????
				/*
                this.setState({
                    coloresLeds[1]: 'transparente',
                    coloresLeds[0]:'rojo',
                })
                */
			}

			/*
			else if (  (this.state.keyLed <= 63) && (alertas === 'verde') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'verde';
			}
			else if (  (this.state.keyLed <= 63) && (alertas === 'amarillo') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'amarillo';
			}
			else if (  (this.state.keyLed <= 63) && (alertas === 'naranja') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'naranja';
			}
			else if (  (this.state.keyLed <= 63) && (alertas === 'violeta') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'violeta';
            }
            */
		};
        
	}

	componentDidMount() {
		this.fijoColores();
	}
    
	render(props, state) {
		// const estado = this.coloresLeds[state.color];


		// const cambio = `${style.botones} ${estado}`;
		const cambio = `${style.botones}`;
        
		//console.log(this.coloresLeds[state.color]);
		return (
		//let nombre = this.props.leds;
			<div class={style.envLed} key={props.key}>
				<p class={style.botones} onClick={this.changeColor} />
			</div>
		);
	}
}

export default Led;
