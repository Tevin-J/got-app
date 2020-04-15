import React, {Component} from 'react';
import styled from "styled-components";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ItemListBlock = styled.ul`
    cursor: pointer;
    li {
        cursor: pointer;
    };
    margin-top: 30px
`
/*Компоненту ItemList сделали независимой, то что она отрисует зависит от пропсов
которые в нее придут*/
class ItemList extends Component {
    state = {
        itemList: null,
        isError: false
    }
    /*из пропсов получаем тот запрос на сервер, который необходимо сделать родительской
    компоненте, будто книги или герои*/
    componentDidMount() {
        const {getData} = this.props
        getData()
            .then(itemList => {
                this.setState({itemList})
            })
    }
    componentDidCatch(error, errorInfo) {
        this.setState({isError: true})
    }
    /*в этой ф-и отрисовываем все айтемы которые придут в стейт после запроса
    на сервер в componentDidMount и при клике на айтем вызываем ф-ю из пропсов с его id*/
    renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item
            /*вызываем из пропсов ф-ю renderItem и передаем в нее поочередно каждый айтем и
            получаем те данные которые мы из родителя в результат этой ф-и вернем. таким образом
            мы снаружи управляем тем, что вернет нам эта ф-я*/
            const label = this.props.renderItem(item)
            return (
                <li key={id} className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state
        if (!itemList) {
            return <Spinner/>
        }
        if (this.state.isError) {
            return <ErrorMessage/>
        }
        /*если у нас есть в стейте массив айтемов, то получаем его с помощью вызова ф-и
        которая отрисует их*/
        const items = this.renderItems(itemList)
        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    }
}
export default ItemList