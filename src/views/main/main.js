import onChange from 'on-change';
import { AbstractView } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/card-list/card-list.js';
import { Footer } from '../../components/footer/footer.js';

export class MainView extends AbstractView {
	state = {
		list: [],
		numFound: 0,
		loading: false,
		searchQuery: undefined,
		offset: 0,
		limit: 6,
	};
	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.state = onChange(this.state, this.stateHook.bind(this));
		this.setTitle('Search books');
	}

	destroy() {
		onChange.unsubscribe(this.appState);
		onChange.unsubscribe(this.state);
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render();
		}
	}

	async stateHook(path) {
		if (path === 'searchQuery' || path === 'offset') {
			if (!this.state.searchQuery) {
				return;
			}
			this.state.loading = true;
			const data = await this.loadList(
				this.state.searchQuery,
				this.state.offset,
				this.state.limit,
			);
			this.state.loading = false;
			this.state.numFound = data.numFound;
			console.log(data);
			this.state.list = data.docs;
		}

		if (path === 'list' || path === 'loading') {
			this.render();
		}
	}

	async loadList(query, offset, limit) {
		const q = query.split(' ').join('+');
		const res = await fetch(
			`https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${limit}`,
		);
		return res.json();
	}

	render() {
		const main = document.createElement('div');
		const text = document.createElement('h2');
		text.textContent = `${this.state.numFound} books`;
		main.append(new Search(this.state).render());
		main.append(text);
		main.append(new CardList(this.appState, this.state).render());
		main.append(new Footer(this.state).render());
		this.app.innerHTML = '';
		this.app.append(main);
		this.renderHeader();
	}

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	}
}
