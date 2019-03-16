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
			const { color, coloresLeds, ledkeyId } = this.state;
			this.setState({ color: ( color + 1 ) % coloresLeds.length });
			this.props.reciboEstadoLed(ledkeyId, color);
			// codigo viejo
			// color: ( estadoActualLed + 1 ) % this.state.coloresLeds.length
			// color: ( this.state.color + 1 ) % this.coloresLeds.length
		};
        
		this.fijoColores = () => {
			const { coloresLeds } = this.state;
			const { alerta, keyid }  = this.props;
			this.setState({ alerta });
			this.setState({ ledkeyId: keyid });
			if ( alerta === 'red' ) {
				this.setState({
					coloresLeds: {
						...coloresLeds,
						uno: 'white',
						dos: 'red'
					}
				});
			}
			else if ( alerta === 'green' ) {
				this.setState({
					coloresLeds: {
						...coloresLeds,
						uno: 'white',
						dos: 'green'
					}
				});
			}
			else if ( alerta === 'yellow' ) {
				this.setState({
					coloresLeds: {
						...coloresLeds,
						uno: 'white',
						dos: 'yellow'
					}
				});
			}
			else if ( alerta === 'orange' ) {
				this.setState({
					coloresLeds: {
						...coloresLeds,
						uno: 'white',
						dos: 'orange'
					}
				});
			}
			else {
				this.setState({
					coloresLeds: {
						...coloresLeds,
						uno: 'white',
						dos: 'violet'
					}
				});
			}
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
