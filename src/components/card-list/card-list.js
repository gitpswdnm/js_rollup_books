import { DivComponent } from '../../common/div-component';
import { Card } from '../../components/card/card.js';
import './card-list.css';

export class CardList extends DivComponent {
	constructor(appState, parentState) {
		super();
		this.appState = appState;
		this.parentState = parentState;
	}

	render() {
		if (this.parentState.loading) {
			this.el.innerHTML = `<div class='card_list__loader'>Loading...</div>`;
			return this.el;
		}
		this.el.classList.add('card_list');
		this.el.innerHTML = `
			<h1 class='card__qty'>
			${this.parentState.numFound} books
			</h1>
		`;

		this.parentState.list.forEach((book) => {
			this.el.append(new Card(this.appState, book).render());
		});

		return this.el;
	}
}
