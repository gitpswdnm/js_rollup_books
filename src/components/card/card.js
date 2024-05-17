import { DivComponent } from '../../common/div-component';
import './card.css';

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super();
		this.appState = appState;
		this.cardState = cardState;
	}

	#addToFavorites() {
		this.appState.favorites.push(this.cardState);
	}

	#removeFromFavorites() {
		this.appState.favorites = this.appState.favorites.filter(
			(book) => book.key !== this.cardState.key,
		);
	}

	render() {
		this.el.classList.add('card');
		const existInFavorites = this.appState.favorites.find(
			(b) => b.key === this.cardState.key,
		);
		this.el.innerHTML = `
		<div class="card__image">
		<img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="book cover" loading="lazy"">
	</div>
	<div class="card__info">
		<div class="card__tag">
				${this.cardState.subject ? this.cardState.subject[0] : 'Tag is not specified'}
		</div>  
		<div class="card__name">   
				${this.cardState.title}
		</div>
		<div class="card__author">
				${this.cardState.author_name ? this.cardState.author_name[0] : 'Author is not specified'}
		</div>
		<div class="card__footer">
			<button id="fav_btn" class="button__add ${existInFavorites ? 'button__active' : ''}">
				${
					existInFavorites
						? '<img src="/static/favorites.svg"/>'
						: '<img src="/static/favorites-white.svg"/>'
				}
			</button>
		</div>
		`;
		this.el.querySelector('#fav_btn').addEventListener('click', () => {
			if (existInFavorites) {
				this.#removeFromFavorites();
				return;
			}
			this.#addToFavorites();
		});

		return this.el;
	}
}
