export default class gotAPI {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }
    /*метод получения данных с сервера*/
    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`)
        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${response.status}`)
        }
        return await response.json()
    }
    /*после получения необходимых данных с сервера в виде json, мапим этот массив
    объектов обрабатывая каждый объект ф-ей _transformCharacter*/
    getAllCharacters = async () => {
        const result = await this.getResource(`characters?page=5`)
        return result.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`characters/${id}`)
        return this._transformCharacter(character)
    }
    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }
    /*проверяем есть ли на сервере конкретное свойство объекта, если нет, то выводим
    сообщение что данных нет*/
    isSet = (data) => {
        if (data) {
            return data
        } else {
            return 'no data'
        }
    }
    /*вычленяем из урла уникальные id*/
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
    /*возвращаем трансформированный объект со свойствами которые есть на сервере
    и с уникальным id*/
    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }
    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}

