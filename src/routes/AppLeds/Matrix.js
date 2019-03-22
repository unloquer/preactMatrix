import { h, Component } from 'preact';
import Led from './Led';
import { arrayLeds } from '../../arrayLeds';
import * as R from 'ramda';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Matrix extends Component {
	constructor(props){
		super(props);
		this.state = {
			// ledsState: new Array(64).fill(0),
			ledsState: { keyid: 0, estadoled: 0 },
			alertAir: ''
		};

		this.setAlerts = () => {
			this.setState({ alertAir: this.props.colorMatrix }); 
		};
		
		this.reciboEstadoLed = (keyid,estadoled) => {
			const { alertAir, ledsState } = this.state;
			this.setState({
				ledsState: {
					...ledsState,
					keyid,
					estadoled
				}
			});

			let matrixEstado ={
				ledState: ledsState,
				idMatrix: alertAir
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

	componentDidMount () {
		this.setAlerts();
	}

	render(props, state) {
		// console.log('color de la matrix'. state.alertAir)
		return (
			<div class={style.Matrix} key={props.idMatrix}>
				{
					Object.keys(arrayLeds).map((value,index) => (
						<Led
							key={`${index}_${value}`}
							keyid={index}
							reciboEstadoLed={this.reciboEstadoLed}
							alertAir={props.colorMatrix}
						/>
					))
				}
			</div>
		);
	}
}

export default Matrix;