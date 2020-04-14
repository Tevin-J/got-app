import React, {Component} from 'react';
import styled from "styled-components";
import gotAPI from "../../api/api";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/spinner";

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    margin-top: 30px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`
const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`
class CharDetails extends Component {
    gotAPI = new gotAPI()
    state = {
        char: null,
        isError: false,
        isLoading: true
    }
    componentDidMount() {
        this.updateChar()
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }
    componentDidCatch(error, errorInfo) {
        this.setState({isError: true})
    }
    /*эта ф-я вызывается после ответа от сервера и пихаем в стейт героя и убирает прелоадер*/
    onCharDetailsLoaded = (char) => {
        this.setState({char, isLoading: false})
    }
    /*получаем из пропсов id и делаем запрос на сервер за конкретным персонажем и
    затем вызываем функцию окончания загрузки*/
    updateChar() {
        const {charId} = this.props
        if (!charId) {
            return
        }
        this.setState({loading: true})
        this.gotAPI.getCharacter(charId)
            .then(this.onCharDetailsLoaded)
            .catch(() => this.onError())
    }
    onError(){
        this.setState({
            char: null,
            isError: true
        })
    }
    render() {
        if (!this.state.char && this.state.isError) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <SelectError>Please, choose any character</SelectError>
        }
        const {name, gender, born, died, culture} = this.state.char
        if (this.state.isLoading) {
            return (
                <CharDetailsBlock className="rounded">
                    <Spinner/>
                </CharDetailsBlock>
            )
        }
        return (
            <CharDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharDetailsBlock>
        );
    }
}
export default CharDetails