import { h, Component } from 'preact';
import style from './style';

class Led extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ledkeyId: 0,
			color: 0,
			alerta: ' ',
			coloresLeds: { }
		};

		this.changeColor = () => {
			this.setState({ color: ( this.state.color + 1 ) % 2 });

			// codigo viejo
			// color: ( estadoActualLed + 1 ) % this.state.coloresLeds.length
			// color: ( this.state.color + 1 ) % this.coloresLeds.length
			
			this.props.reciboEstadoLed(this.state.ledkeyId, this.state.color);
		};
        
		this.fijoColores = () => {

			const { alerta, keyid }  = this.props;
			this.setState({ alerta });
			this.setState({ ledkeyId: keyid });

			if ( alerta === 'red' ) {
				this.setState({
					coloresLeds: {
						...this.state.coloresLeds,
						uno: 'white',
						dos: 'red'
					}
				});
			}
			else {
				this.setState({
					coloresLeds: {
						...this.state.coloresLeds,
						uno: 'white',
						dos: 'green'
					}
				});
			}

			/*
			else if (  (this.state.ledkeyId <= 63) && (alertas === 'amarillo') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'amarillo';
			}
			else if (  (this.state.ledkeyId <= 63) && (alertas === 'naranja') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'naranja';
			}
			else if (  (this.state.ledkeyId <= 63) && (alertas === 'violeta') ) {
				this.coloresLeds[1] = 'transparente';
				this.coloresLeds[0] = 'violeta';
            }
            */
		};
	}

	componentWillMount() {
		this.fijoColores();
	}

	render(props, state) {
		const { coloresLeds } = state;

		let cambio = '';
		
		if ( state.color === 0 ) {
			cambio = `${coloresLeds.uno}`;
		}
		else {
			cambio = `${coloresLeds.dos}`;
		}

		return (
			<div class={style.envLed} key={props.key}>
				<p class={`${style.botones}`}
					onClick={this.changeColor}
					style={{ backgroundColor: `${cambio}` }}
				/>
			</div>
		);
	}
}

export default Led;
