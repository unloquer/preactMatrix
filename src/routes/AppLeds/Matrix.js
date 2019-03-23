import { h, Component } from 'preact';
import Led from './Led';
import { arrayLeds } from '../../arrayLeds';
import * as R from 'ramda';
import style from './style';

class Matrix extends Component {
	constructor(props){
		super(props);
		this.state = {
			matrixStatus: new Array(64).fill(0),
			alertAir: ''
		};

		this.setAlerts = () => {
			this.setState({ alertAir: this.props.colorMatrix });
		};
		
		this.receibeStatusLed = (ledkeyId,ledOnnOrOff) => {
			const { alertAir, matrixStatus } = this.state;
			this.setState({ matrixStatus: R.update(ledkeyId, ledOnnOrOff, matrixStatus) });
			const matrixStatusPresent = {
				matrixStatus: R.update(ledkeyId, ledOnnOrOff, matrixStatus),
				idMatrix: alertAir
			};
			this.props.receibeStatusMatrix(matrixStatusPresent);
		};
	}

	componentDidMount () { this.setAlerts(); }

	render(props, state) {
		return (
			<div class={style.Matrix} key={props.idMatrix}>
				{
					arrayLeds.map((value,index) => (
						<Led
							key={`${this.state.alertAir}-${value.keyNameId}`}
							keyIDLED={index}
							receibeStatusLed={this.receibeStatusLed}
							alertAir={props.colorMatrix}
						/>
					))
				}
			</div>
		);
	}
}

export default Matrix;