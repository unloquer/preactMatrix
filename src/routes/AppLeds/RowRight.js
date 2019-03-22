import { h } from 'preact';
import style from './style';

const RowRight = props => (
	<div class={style.backArrowRight} onClick={props.gotToNext}>
		<img class={style.pic}
			style={{ transform: 'scaleX(-1)' }}
			src="assets/img/leftArrow.png"
		/>
	</div>
);

export default RowRight;