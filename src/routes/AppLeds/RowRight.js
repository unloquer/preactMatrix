import { h } from 'preact';
import style from './style';
import leftArrow from '../../assets/img/leftArrow.png';

const RowRight = props => (
	<div class={style.backArrowRight} onClick={props.gotToNext}>
		<img class={style.pic}
			style={{ transform: 'scaleX(-1)' }}
			src={leftArrow}
		/>
	</div>
);

export default RowRight;