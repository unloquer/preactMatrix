import { h } from 'preact';
import style from './style';

const RowRight = props => (

	<div class={style.backArrow}
		onClick={props.irAlaSiguiente}
	>
		<img class={style.pic}
			style={{ transform: 'scaleX(-1)' }}
			src="assets/img/leftArrow.png"
		/>
	</div>

);

export default RowRight;