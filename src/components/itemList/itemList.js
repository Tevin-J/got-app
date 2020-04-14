import React, {Component} from 'react';
import styled from "styled-components";
import gotAPI from "../../api/api";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ItemListBlock = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    };
    margin-top: 30px
`
class ItemList extends Component {
    gotAPI = new gotAPI()
    state = {
        charList: null,
        isError: false
    }
    componentDidMount() {
        this.gotAPI.getAllCharacters()
            .then(charList => {
                this.setState({charList})
            })
    }
    componentDidCatch(error, errorInfo) {
        this.setState({isError: true})
    }
    /*в этой ф-и отрисовываем всех персонажей которые придут в стейт после запроса
    на сервер в componentDidMount и при клике на персонажа вызываем ф-ю из пропсов с его id*/
    renderItems = (arr) => {
        return arr.map((item) => {
            const {id, name} = item
            return (
                <li key={id} className="list-group-item" onClick={() => this.props.onCharSelected(id)}>
                    {name}
                </li>
            )
        })
    }
    render() {
        const {charList} = this.state
        if (!charList) {
            return <Spinner/>
        }
        if (this.state.isError) {
            return <ErrorMessage/>
        }
        const items = this.renderItems(charList)
        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    }
}
export default ItemList