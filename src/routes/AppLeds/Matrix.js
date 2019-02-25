import { h, Component } from 'preact';
import Led from './Led';
import { arrayLeds } from '../../arrayLeds2';
import * as R from 'ramda';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Matrix extends Component {
	constructor(props){
		super(props);
		this.state = {
			// ledsState: new Array(64).fill(0),
			ledsState: { keyid: 0, estadoled: 0 },
			ledColor: '',
			alerta: props.alerta
		};
		
		this.reciboEstadoLed = (keyid,estadoled) => {
			const alerta = this.props.alerta;
			this.setState({
				ledsState: {
					...this.state.ledsState,
					keyid,
					estadoled
				}
			});

			let matrixEstado ={
				ledState: this.state.ledsState,
				idMatrix: alerta
			};

			this.props.reciboStateLeds(matrixEstado);

			// UPDATE STATE
			// this.props.reciboStateLeds( { ledsState: R.update(keyid, estadoled, this.state.ledsState) } );

			/*
			let matrixEstado ={
				ledsState: R.update(keyid, estadoled, this.state.ledsState),
				idMatrix: alerta
			};
			*/
		};
	}

	/*
	componentWillUpdate() {
		// eslint-disable-next-line no-undef
		this.setState({ ledColor: this.props.alerta });
	}
	*/
			
	render(props, state) {
		return (
			<div class={style.Matrix} key={props.idMatrix}>
				{
					Object.keys(arrayLeds).map((value,index) => (
						<Led
							key={index}
							keyid={index}
							reciboEstadoLed={this.reciboEstadoLed}
							alerta={this.state.alerta}
						/>
					))
				}
			</div>
		);
	}
}

export default Matrix;