import { h } from 'preact';
import style from './style';

const RowLeft = props => (
	<div class={style.backArrowLeft} onClick={props.gotToBack}>
		<img class={style.pic} src="assets/img/leftArrow.png" />
	</div>
);

export default RowLeft;