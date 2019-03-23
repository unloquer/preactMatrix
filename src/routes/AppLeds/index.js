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
		  matrices: [new Array(64),new Array(64),new Array(64),new Array(64),new Array(64)],
		  statusMatrixPresent: new Array(64)
		};

		this.alertas = [
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
			console.log('hice click')
			const data = this.state.statusMatrixPresent;
			const matrix = [...this.state.matrices];
			const actual = this.state.currentIndex;
		
			if ( actual === 0) {
			  matrix[0] = data;
			  this.setState({ matrices: matrix });
			}
			else if (actual === 1) {
			  matrix[1] = data;
			  this.setState({ matrices: matrix });
			}
			else if (actual === 2) {
			  matrix[2] = data;
			  this.setState({ matrices: matrix });
			}
			else if (actual === 3) {
			  matrix[3] = data;
			  this.setState({ matrices: matrix });
			}
			else if (actual === 4) {
			  matrix[4] = data;
			  this.setState({ matrices: matrix });
			}
			
			if (this.connection) {
			  // this.connection.send(matrix);
			}
		};

		this.gotToBack = () => {
			if (this.state.currentIndex === 0) return;
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex - 1,
				translateValue: prevState.translateValue + this.state.widthMatrix
			}));
		};
		
		this.gotToNext = () => {
			if (this.state.currentIndex === this.alertas.length - 1){
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
		// console.log('currentIndex', state.currentIndex);
		console.log('estado matrix', state.statusMatrixPresent);
		return (
			<div class={style.home}>
				<div class={style.content}>
					<div class={style.slider}>
						<div class={style.sliderWrapper} style={{
							transform: `translateX(${state.translateValue}px)`,
							transition: 'transform ease-out 0.45s'
						}}
						>
							{
								this.alertas.map(alerta => (
									<Matrix
										key={alerta.id}
										idMatrix={alerta.color}
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