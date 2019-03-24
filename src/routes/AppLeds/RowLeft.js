import { h } from 'preact';
import style from './style';
import leftArrow from '../../assets/img/leftArrow.png';

const RowLeft = props => (
	<div class={style.backArrowLeft} onClick={props.gotToBack}>
		<img class={style.pic} src={leftArrow} />
	</div>
);

export default RowLeft;