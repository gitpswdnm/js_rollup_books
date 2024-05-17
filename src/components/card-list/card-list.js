import { DivComponent } from '../../common/div-component';
import { Card } from '../../components/card/card.js';
import { CardSkeleton } from '../card-skelton/card-skeleton.js';
import './card-list.css';

export class CardList extends DivComponent {
	constructor(appState, parentState) {
		super();
		this.appState = appState;
		this.parentState = parentState;
	}

	render() {
		// if (this.parentState.loading) {
		// 	this.el.innerHTML = `<div class='card_list__loader'>Loading...</div>`;
		// 	return this.el;
		// }

		const cardGrid = document.createElement('div');
		cardGrid.classList.add('card_grid');
		if (this.parentState.loading) {
			for (let i = 0; i < this.parentState.limit; i++) {
				cardGrid.append(new CardSkeleton().render());
				continue;
			}
		} else {
			this.parentState.list.forEach((book) => {
				cardGrid.append(new Card(this.appState, book).render());
			});
		}
		this.el.append(cardGrid);

		return this.el;
	}
}
