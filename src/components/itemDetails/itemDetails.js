import React, {Component} from 'react';
import styled from "styled-components";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/spinner";

const ItemDetailsBlock = styled.div`
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
/*компонента находящаяся в props.children для компоненты ItemDetails*/
export const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
class ItemDetails extends Component {
    state = {
        item: null,
        isError: false,
        isLoading: true
    }
    componentDidMount() {
        this.updateItem()
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }
    componentDidCatch(error, errorInfo) {
        this.setState({isError: true})
    }
    /*эта ф-я вызывается после ответа от сервера и пихаем в стейт героя и убирает прелоадер*/
    onItemDetailsLoaded = (item) => {
        this.setState({item: item, isLoading: false})
    }
    /*получаем из пропсов id и делаем запрос на сервер за конкретным персонажем и
    затем вызываем функцию окончания загрузки*/
    updateItem() {
        const {itemId, getData} = this.props
        if (!itemId) {
            return
        }
        this.setState({isLoading: true})
        getData(itemId)
            .then((item) => this.onItemDetailsLoaded(item))
            .catch(() => this.onError())
    }
    onError(){
        this.setState({
            item: null,
            isError: true
        })
    }
    render() {
        if (!this.state.item && this.state.isError) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <SelectError>Please, select item in the list</SelectError>
        }
        const {item} = this.state
        const {name} = item
        if (this.state.isLoading) {
            return (
                <ItemDetailsBlock className="rounded">
                    <Spinner/>
                </ItemDetailsBlock>
            )
        }
        /*то что мы прописываем внутри ItemDetails в компоненте которая ее вызвала
        попадает в ее props.children. в данном случае - массив компонент Field, каждая из
        которых отрисовывает разметку, получая свойства айтема из компоненты которая
        является родительской для ItemDetails, а конкретный айтем получает уже
        непосредственно при отрисовке ItemDetails когда ответ от сервера  на запрос
        конкретного айтема получен, мы его добавляем при маппинге, возвращаем копию каждого
        ребенка с уже добавленным айтемом*/
        return (
            <ItemDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </ItemDetailsBlock>
        );
    }
}
export default ItemDetails