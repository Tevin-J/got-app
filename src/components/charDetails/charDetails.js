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
export const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}
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
        const {char} = this.state
        const {name} = char
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
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </CharDetailsBlock>
        );
    }
}
export default CharDetails