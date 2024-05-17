import { DivComponent } from '../../common/div-component';
import './footer.css';

export class Footer extends DivComponent {
	constructor(parentState) {
		super();
		this.parentState = parentState;
	}

	render() {
		if (this.parentState.numFound > 6) {
			this.el.classList.add('footer');
			this.el.innerHTML = `
				<button aria-label='Previous page' class='prev_button'>
					<i class='arrow prev_arrow'></i>
					Previous page
				</button>
				<button aria-label='Next page' class='next_button'>
					Next page
					<i class='arrow next_arrow'></i>
				</button>
			`;
			this.el
				.querySelector('.prev_button')
				.addEventListener('click', this.subOffset.bind(this));
			this.el
				.querySelector('.next_button')
				.addEventListener('click', this.addOffset.bind(this));
			return this.el;
		}
		return '';
	}

	addOffset() {
		if (
			this.parentState.offset + this.parentState.limit >
			this.parentState.numFound - 1
		) {
			this.parentState.offset = this.parentState.numFound - this.parentState.limit;
			return;
		}
		this.parentState.offset += this.parentState.limit;
	}
	subOffset() {
		if (this.parentState.offset - this.parentState.limit < 0) {
			this.parentState.offset = 0;
			return;
		}
		this.parentState.offset -= this.parentState.limit;
	}
}
