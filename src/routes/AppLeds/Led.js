import { Component } from 'preact';
import style from './style';

class Led extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ledId: 0,
			ledOnnOrOff: 1,
			alertAir: ' ',
			colorLedOptions: { }
		};

		this.changeColor = () => {
			const { ledOnnOrOff, colorLedOptions, ledId } = this.state;
			this.setState({
				ledOnnOrOff: ( ledOnnOrOff + 1 ) % (colorLedOptions.length === undefined ? 2 : colorLedOptions.length)
			});
			this.props.receibeStatusLed(ledId, ledOnnOrOff);
		};
        
		this.setColorLed = () => {
			const { colorLedOptions } = this.state;
			const { alertAir, keyIDLED }  = this.props;
			this.setState({ alertAir });
			this.setState({ ledId: keyIDLED });
			if ( alertAir === 'red' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'red',
						colorTwo: 'transparent'
					}
				});
			}
			else if ( alertAir === 'green' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'green',
						colorTwo: 'transparent'
					}
				});
			}
			else if ( alertAir === 'yellow' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'yellow',
						colorTwo: 'transparent'
					}
				});
			}
			else if ( alertAir === 'orange' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'orange',
						colorTwo: 'transparent'
					}
				});
			}
			else {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						colorOne: 'violet',
						colorTwo: 'transparent'
					}
				});
			}
		};
	}

	componentWillMount() { this.setColorLed(); }

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
