import { DivComponent } from '../../common/div-component';
import './card-skeleton.css';

export class CardSkeleton extends DivComponent {
	render() {
		this.el.classList.add('card');
		this.el.classList.add('skeleton');
		this.el.innerHTML = ` 
		<div class="card__image skeleton">
	</div>
	<div class="card__info skeleton">
		<div class="card__tag skeleton">
		</div>  
		<div class="card__name skeleton">   
		</div>
		<div class="card__author skeleton">
		</div>
		<div class="card__footer skeleton">

		</div>
		`;
		return this.el;
	}
}
