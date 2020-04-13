import React, {Component} from 'react';
import styled from 'styled-components';
import gotAPI from "../../api/api";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

/*реализовали стили с помощью styledComponent*/
export const RandomCharBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const RandomCharHeader = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`
const Term = styled.span`
    font-weight: bold;
`
const TermBlock = styled.li`
    display: flex;
    justify-content: space-between
`
class RandomChar extends Component {
    /*создали ребенка класса апишки, чтоб отсюда с ней взаимодействовать*/
    gotAPI = new gotAPI()
    /*вместо свойств объекта мы получаем с сервера сам объект и его в этой компоненте
    обрабатываем, поэтому для упрощения в стейт запихаоли весь объект и по умолчанию
    сделали его пустым*/
    state = {
        char: {},
        isLoading: true,
        isError: false
    }
    /*когда компонента отрисуется вызовем ф-ю по загрузке рандомного героя*/
    componentDidMount() {
        this.updateCharacter()
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            isLoading: false
        })
    }
    onError = () => {
        this.setState({
            isError: true,
            isLoading: false
        })
    }
    /*функция показа рандомного героя*/
    updateCharacter = () => {
        const id = Math.floor(Math.random()*350 + 25)
        /*делаем запрос на сервер с айдишкой героя, затем закрвываем прелоадер и
        обновляем стейт пришедшими с сервера данными*/
        this.gotAPI.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const {char, isLoading, isError} = this.state
        const errorMessage = isError ? <ErrorMessage/> : null
        const spinner = isLoading ? <Spinner/> : null
        const content = !(isLoading || isError) ? <View char={char}/> : null
        return (
            <RandomCharBlock className="rounded asd">
                {errorMessage}
                {spinner}
                {content}
            </RandomCharBlock>
        );
    }
}
export default RandomChar
/*компонента в которой вся видимая часть родительской компоненты RandomChar отрисовывается в случае
если нет ошибки и данные с сервера уже получены*/
const View = ({char}) => {
    /*получили объект и деструктуризировали его свойства*/
    const {name, gender, born, died, culture} = char
    return (
        <>
            <RandomCharHeader>Random Character: {name}</RandomCharHeader>
            <ul className="list-group list-group-flush">
                <TermBlock className="list-group-item">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </TermBlock>
                <TermBlock className="list-group-item">
                    <Term>Born </Term>
                    <span>{born}</span>
                </TermBlock>
                <TermBlock className="list-group-item">
                    <Term>Died</Term>
                    <span>{died}</span>
                </TermBlock>
                <TermBlock className="list-group-item">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </TermBlock>
            </ul>
        </>
    )
}
