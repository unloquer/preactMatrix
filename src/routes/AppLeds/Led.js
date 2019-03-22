import { Component } from 'preact';
import style from './style';

class Led extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ledId: 0,
			ledOnnOrOff: 0,
			alertAir: ' ',
			colorLedOptions: { }
		};

		this.changeColor = () => {
			const { ledOnnOrOff, colorLedOptions, ledId } = this.state;
			this.setState({
				ledOnnOrOff: ( ledOnnOrOff + 1 ) % (colorLedOptions.length === undefined ? 2 : colorLedOptions.length)
			});
			this.props.reciboEstadoLed(ledId, ledOnnOrOff);
		};
        
		this.setColorLed = () => {
			const { colorLedOptions } = this.state;
			const { alertAir, keyid }  = this.props;
			this.setState({ alertAir });
			this.setState({ ledId: keyid });
			if ( alertAir === 'red' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'white',
						colorTwo: 'red'
					}
				});
			}
			else if ( alertAir === 'green' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'white',
						colorTwo: 'green'
					}
				});
			}
			else if ( alertAir === 'yellow' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'white',
						colorTwo: 'yellow'
					}
				});
			}
			else if ( alertAir === 'orange' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'white',
						colorTwo: 'orange'
					}
				});
			}
			else {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'white',
						colorTwo: 'violet'
					}
				});
			}
		};
	}

	componentWillMount() {
		this.setColorLed();
	}

	render(props, state) {
		const { colorLedOptions, ledOnnOrOff } = state;
		const { key } = props;
		let changeColorClick = '';
		
		if ( ledOnnOrOff === 0 ) {
			changeColorClick = `${colorLedOptions.colorOne}`;
		}
		else {
			changeColorClick = `${colorLedOptions.colorTwo}`;
		}

		return (
			<div class={style.envLed} key={key}>
				<p class={`${style.botones}`}
					onClick={this.changeColor}
					style={{ backgroundColor: `${changeColorClick}` }}
				/>
			</div>
		);
	}
}

export default Led;
