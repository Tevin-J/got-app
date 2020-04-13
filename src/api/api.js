export default class gotAPI {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }
    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`)
        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${response.status}`)
        }
        return await response.json()
    }
    async getAllCharacters() {
        const result = await this.getResource(`characters?page=5`)
        return result.map(this._transformCharacter())
    }
    async getCharacter(id) {
        const character = await this.getResource(`characters/${id}`)
        return this._transformCharacter(character)
    }
    getAllBooks() {
        return this.getResource(`books/`)
    }
    getBook(id) {
        return this.getResource(`books/${id}`)
    }
    getAllHouses() {
        return this.getResource(`houses/`)
    }
    getHouse(id) {
        return this.getResource(`houses/${id}`)
    }
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
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
            released: book.released
        }
    }
}

