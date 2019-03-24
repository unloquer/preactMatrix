import { Component } from 'preact';
import style from './style';

class Led extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ledId: 0,
			ledOnOrOff: 1,
			alertAir: ' ',
			colorLedOptions: { }
		};

		this.changeColor = () => {
			const { ledOnOrOff, colorLedOptions, ledId } = this.state;
			this.setState({
				ledOnOrOff: ( ledOnOrOff + 1 ) % (colorLedOptions.length === undefined ? 2 : colorLedOptions.length)
			});
			this.props.receibeStatusLed(ledId, ledOnOrOff);
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
						ledOff: 'transparent',
						ledOn: 'red'
					}
				});
			}
			else if ( alertAir === 'green' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						ledOff: 'transparent',
						ledOn: 'green'
					}
				});
			}
			else if ( alertAir === 'yellow' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						ledOff: 'transparent',
						ledOn: 'yellow'
					}
				});
			}
			else if ( alertAir === 'orange' ) {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						ledOff: 'transparent',
						ledOn: 'orange'
					}
				});
			}
			else {
				this.setState({
					colorLedOptions: {
						...colorLedOptions,
						ledOff: 'transparent',
						ledOn: 'violet'
					}
				});
			}
		};
	}

	componentWillMount() { this.setColorLed(); }

	render(props, state) {
		const { colorLedOptions, ledOnOrOff } = state;
		const { key } = props;
		let changeColorClick = '';
		
		if ( ledOnOrOff === 1 ) {
			changeColorClick = `${colorLedOptions.ledOff}`;
		}
		else {
			changeColorClick = `${colorLedOptions.ledOn}`;
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
