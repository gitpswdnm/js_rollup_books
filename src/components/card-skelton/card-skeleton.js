import { DivComponent } from '../../common/div-component';
import './card-skeleton.css';

export class CardSkeleton extends DivComponent {
	render() {
		this.el.classList.add('card_skeleton');
		this.el.classList.add('skeleton');
		this.el.innerHTML = ` 
		<div class="card_skeleton__image skeleton">
	</div>
	<div class="card_skeleton__info skeleton">
		<div class="card_skeleton__tag skeleton">
		</div>  
		<div class="card_skeleton__name skeleton">   
		</div>
		<div class="card_skeleton__author skeleton">
		</div>
		<div class="card_skeleton__footer skeleton">

		</div>
		`;
		return this.el;
	}
}
