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
			ledsState: new Array(64).fill(0),
			ledColor: ''
		};
		
		this.reciboEstadoLed = (keyid,estadoled) => {
			const alerta = this.props.alerta;
			this.setState({ ledsState: R.update(keyid, estadoled, this.state.ledsState) });
			
			// UPDATE STATE			
			// this.props.reciboStateLeds( { ledsState: R.update(keyid, estadoled, this.state.ledsState) } );
			
			/*
			let matrixEstado ={
				ledsState: R.update(keyid, estadoled, this.state.ledsState),
				idMatrix: alerta
			};
			*/
			// this.props.reciboStateLeds(matrixEstado);
		};
		
		this.pintoLeds = () => (

			/*
			Object.keys(arrayLeds).map((value,index) => (
				<Led
					key={index}
					keyid={index}
					reciboEstadoLed={this.reciboEstadoLed}
					alerta={value.alerta}
				/>
			))
			*/
			<Led
				key="1"
				keyid="1"
				reciboEstadoLed={this.reciboEstadoLed}
				alerta="rojo"
			/>
		);
	}

	componentWillUpdate() {
		// eslint-disable-next-line no-undef
		this.setState({ ledColor: props.alerta });
	}
			
	render(props, state) {
		// console.log('keys que me entran', props);
		// console.log('alertas en state', state.ledColor);
		return (
			<div class={style.Matrix} key={props.idMatrix}>
				{ this.pintoLeds() }

			</div>
		);
	}
}

export default Matrix;
