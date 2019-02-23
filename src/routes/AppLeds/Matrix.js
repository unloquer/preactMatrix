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
			ledsState: new Array(64).fill(0)
		};
		console.log('keys que me entran', props)

		
		this.reciboEstadoLed = (keyid,estadoled) => {
			const alerta = this.props.alerta;
			this.setState({ ledsState: R.update(keyid, estadoled, this.state.ledsState) });
	
			// console.log(this.state.ledsState)
			this.props.reciboStateLeds( { ledsState: R.update(keyid, estadoled, this.state.ledsState) } );
			
			let matrixEstado ={
				ledsState: R.update(keyid, estadoled, this.state.ledsState),
				idMatrix: alerta
			};
			this.props.reciboStateLeds(matrixEstado);
		};

		this.pintoLeds = () => (
			Object.keys(arrayLeds).map((key,idx) => (
				<Led
					key={idx}
					keyid={idx}
					reciboEstadoLed={this.reciboEstadoLed}
					alerta={props.alerta}
				/>
			))
		);
	}

	render(props, state) {
		return (
			<div class={style.Matrix} key={props.key}>
				{ this.pintoLeds() }

			</div>
		);
	}
}

export default Matrix;
