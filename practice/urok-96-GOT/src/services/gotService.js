export default class GOTService {
	constructor() {
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	async getResource(url) {
		const res = await fetch(this._apiBase + url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
		}
		return await res.json();
	}

	async getAllCharacters() {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	}

	async getCharacter(id) {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter({...character, id});
	}

	_transformCharacter(char) {
		return {
			name: char.name || '?',
			gender: char.gender || '?',
			born: char.born || '?',
			died: char.died || '?',
			culture: char.culture || '?',
			id: char.id
		}
	}

	_transformHouse(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		}
	}

	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publiser: book.publiser,
			released: book.released
		}
	}



}