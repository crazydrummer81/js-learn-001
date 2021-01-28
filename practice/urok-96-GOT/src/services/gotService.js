export default class GOTService {
	constructor() {
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	getResource = async (url) => {
		const res = await fetch(this._apiBase + url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async (page = 5, size = 10) => {
		const res = await this.getResource(`/characters?page=${page}&pageSize=${size}`);
		return res.map((char,i) => {
			return {...this._transformCharacter(char), id: (page-1)*size + i}
		});
	}

	getAllHouses = async (page = 5, size = 10) => {
		const res = await this.getResource(`/houses?page=${page}&pageSize=${size}`);
		return res.map((char,i) => {
			return {...this._transformHouse(char), id: (page-1)*size + i}
		});
	}

	getAllBooks = async (page = 1, size = 10) => {
		const res = await this.getResource(`/books`);
		return res.map((book,i) => {
			return {...this._transformBook(book), id: (page-1)*size + i + 1}
		});
	}

	getItem = async (type, id) => {
		const item = await this.getResource(`/${type}s/${id}`);
		switch (type) {
			case 'character': this._transformCharacter({...item, id}); break;
			case 'book': this._transformBook({...item, id}); break;
			case 'house': this._transformHouse({...item, id}); break;
			default: break;
		}
		return item;
	}

	_transformCharacter(char) {
		return {
			name: char.name || 'неизвестно',
			gender: char.gender || 'неизвестно',
			born: char.born || 'неизвестно',
			died: char.died || 'неизвестно',
			culture: char.culture || 'неизвестно',
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
			publisher: book.publisher,
			released: (new Date(book.released)).getFullYear(),
			id: book.isbn
		}
	}
}
