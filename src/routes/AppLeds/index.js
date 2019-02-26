import { h, Component } from 'preact';
import RowLeft from './RowLeft';
import RowRight from './RowRight';
import Matrix from './Matrix';
import EnvioAlerta from './EnvioAlerta';
import style from './style';

import Led from './Led';

const alertas = [
	{
		id: 0,
		color: 'rojo'
	},
	{
		id: 1,
		color: 'verde'
	},
	{
		id: 2,
		color: 'amarillo'
	},
	{
		id: 3,
		color: 'violeta'
	},
	{
		id: 4,
		color: 'naranja'
	}
];

// eslint-disable-next-line react/prefer-stateless-function
export default class AppLeds extends Component {
	constructor(){
		super();
	
		this.connection = null;
	
		this.state = {
		  currentIndex: 0,
		  translateValue: 0,
		  matrices: [new Array(64),new Array(64),new Array(64),new Array(64),new Array(64)],
		  estadomatrix: new Array(64)
		};

		this.reciboStateLeds = (estadoLeds) => {
			if (this.connection) {
			  // this.connection.send(estadoLeds.ledsState);
			}
			this.setState({ estadomatrix: estadoLeds.ledsState });
		};

		this.initSocket = () => {
			const self = this;
			this.connection = new WebSocket('ws://'+document.location.host+'/ws', ['arduino']);
			this.connection.onopen = function ()       { self.connection.send('Connect ' + new Date()); };
			this.connection.onerror = function (error) { console.log('WebSocket Error ', error);};
			this.connection.onmessage = function (e)   { console.log('Server: ', e.data);};
		};

		this.actualizoMatrices = () => {
			const data = this.state.estadomatrix;
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
			  this.connection.send(matrix);
			}

			this.irAlaAnterior = () => {
				if (this.state.currentIndex === 0) return;
			
				this.setState(prevState => ({
					currentIndex: prevState.currentIndex - 1,
					translateValue: prevState.translateValue + this.slideHeight()
				}));
			};
			
			this.irAlaSiguiente = () => {
				// si nos salimos del total de images, entonces volvemos a cero
				if (this.state.currentIndex === this.state.alertas.length - 1) {
					return this.setState({
						currentIndex: 0,
						translateValue: 0
					});
				}
			};

			this.slideHeight = () => document.querySelector('.Matrix').clientHeight;
		};
	}

	/*
	componentDidMount() {
		this.initSocket();
	}
	*/

	render(props, state) {
		console.log('')
		return (
			<div class={style.home}>
				<div class={style.content}>
					<div class={style.slider}>
						<div class={style.sliderWrapper} style={{
							transform: `translateY(${state.translateValue}px)`,
							transition: 'transform ease-out 0.45s'
						}}
						>
							{([{ id: 0, color: 'rojo' }]).map(alerta => (
								<Matrix
									key={alerta.id}
									idMatrix={alerta.id}
									reciboStateLeds={this.reciboStateLeds}
									alerta={alerta.color}
								/>
							))}
						</div>
						<div style={{ display: 'flex' }}>
							<RowLeft
								irAlaAnterior={this.irAlaAnterior}
							/>
							<EnvioAlerta
								actualizoMatrices={this.actualizoMatrices}
							/>
					
							<RowRight irAlaSiguiente={this.irAlaSiguiente} />
						</div>
					</div>
				</div>
		  </div>
		);
	}
}

/*
<Matrix
key="1"
idMatrix="1"
reciboStateLeds={this.reciboStateLeds}
alerta="rojo"
/>
*/