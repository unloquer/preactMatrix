import { h, Component } from 'preact';
import RowLeft from './RowLeft';
import RowRight from './RowRight';
import Matrix from './Matrix';
import EnvioAlerta from './EnvioAlerta';
import style from './style';

export default class AppLeds extends Component {
	constructor(){
		super();
		this.connection = null;
		this.state = {
		  currentIndex: 0,
		  translateValue: 0,
		  widthMatrix: 0,
		  statusAllMatrix: [new Array(64),new Array(64),new Array(64),new Array(64),new Array(64)],
		  statusMatrixPresent: new Array(64).fill(0)
		};

		this.alertsAirQuality = [
			{ id: 1, color: 'green'  },
			{ id: 2, color: 'orange' },
			{ id: 3, color: 'violet' },
			{ id: 4, color: 'red' },
			{ id: 5, color: 'yellow' }
		];

		this.receibeStatusMatrix = matrixStatusPresent => {
			if (this.connection) {
			  // this.connection.send(matrixStatusPresent.ledsState);
			}
			this.setState({ statusMatrixPresent: matrixStatusPresent.matrixStatus });
		};

		this.initSocket = () => {
			const self = this;
			this.connection = new WebSocket('ws://'+document.location.host+'/ws', ['arduino']);
			this.connection.onopen = function ()       { self.connection.send('Connect ' + new Date()); };
			this.connection.onerror = function (error) { console.log('WebSocket Error ', error);};
			this.connection.onmessage = function (e)   { console.log('Server: ', e.data);};
		};

		this.updateMatrices = () => {
			const { statusMatrixPresent, currentMatrix, statusAllMatrix } = this.state;
			const allMatrixUpdate = [...statusAllMatrix];
		
			if ( currentMatrix === 0) {
			  allMatrixUpdate[0] = statusMatrixPresent;
			  this.setState({ statusAllMatrix: allMatrixUpdate });
			}
			else if (currentMatrix === 1) {
			  allMatrixUpdate[1] = statusMatrixPresent;
			  this.setState({ statusAllMatrix: allMatrixUpdate });
			}
			else if (currentMatrix === 2) {
			  allMatrixUpdate[2] = statusMatrixPresent;
			  this.setState({ statusAllMatrix: allMatrixUpdate });
			}
			else if (currentMatrix === 3) {
			  allMatrixUpdate[3] = statusMatrixPresent;
			  this.setState({ statusAllMatrix: allMatrixUpdate });
			}
			else if (currentMatrix === 4) {
			  allMatrixUpdate[4] = statusMatrixPresent;
			  this.setState({ statusAllMatrix: allMatrixUpdate });
			}
			
			if (this.connection) {
				console.log('socket!');
			  // this.connection.send(matrix);
			}
			console.log('Updated all matrix sockets!');
		};

		this.gotToBack = () => {
			if (this.state.currentIndex === 0) return;
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex - 1,
				translateValue: prevState.translateValue + this.state.widthMatrix
			}));
		};
		
		this.gotToNext = () => {
			if (this.state.currentIndex === this.alertsAirQuality.length - 1){
				return this.setState({
					currentIndex: 0,
					translateValue: 0
				});
			}
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex + 1,
				translateValue: prevState.translateValue + (-this.state.widthMatrix)
			}));
		};

		this.setWidth = refMatrix => {
			if (refMatrix === undefined) return null;
			this.setState({  widthMatrix: refMatrix.base.clientWidth });
		};

	}

	componentDidMount(){
		this.setWidth(this.ref);
		// this.initSocket()
	}

	render(props, state) {
		const { home, content, slider, sliderWrapper } = style;
		const { translateValue } = state;
		// tengo que hacer click para que esto se actualize !!!
		// si el current index es diferente del anterior actualizo el status matrixPresent
		console.log('estado matrix', state.statusMatrixPresent); 
		return (
			<div class={home}>
				<div class={content}>
					<div class={slider}>
						<div class={sliderWrapper} style={{
							transform: `translateX(${translateValue}px)`,
							transition: 'transform ease-out 0.45s'
						}}
						>
							{
								this.alertsAirQuality.map(alerta => (
									<Matrix
										key={`matrix-${alerta.color}-${alerta.id}`}
										receibeStatusMatrix={this.receibeStatusMatrix}
										colorMatrix={alerta.color}
										ref={c => this.ref = c}
									/>
								))}
						</div>
						<div style={{ display: 'flex' }}>
							<RowLeft gotToBack={this.gotToBack} />
							<EnvioAlerta updateMatrices={this.updateMatrices} />
							<RowRight gotToNext={this.gotToNext} />
						</div>
					</div>
				</div>
		  </div>
		);
	}
}