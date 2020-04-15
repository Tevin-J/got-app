import React from 'react'
import ItemList from "../itemList/itemList";
import ItemDetails, {Field} from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import gotAPI from "../../api/api";
import RowBlock from "../rowBlock/rowBlock";

class CharacterPage extends React.Component {
    gotAPI = new gotAPI()
    state = {
        selectedChar: null,
        error: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }
    /*обработка клика по конкретному персонажу, чтоб в itemList затем
    показывался этот персонаж*/
    onCharSelected = (id) => {
        this.setState({selectedChar: id})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            /*передаем в универсальную компоненту ItemList ф-и по отрисовке компоненты
            и запросу на сервер с теми параметрами которые нужны конкретно этой компоненте*/
            <ItemList onItemSelected={this.onCharSelected}
                      getData={this.gotAPI.getAllCharacters}
                      renderItem={(char) => `${char.name} (${char.gender})`}/>
        )
        /*делаем компоненту itemDetails универсальной, передавая в нее те данные которые
        необходимо отрисовать для конкретной компоненты но мы не передаем здесь конкретный айтем, для которого будем
        показывать его свойства, так как его мы не узнаем, пока не сделаем запрос на сервер внутри дочерней компоненты.
        конкретный айтем мы узныем с помощью this.props.children внутри дочерней компоненты*/
        const charDetails = (
            <ItemDetails itemId={this.state.selectedChar} getData={this.gotAPI.getCharacter}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
export default CharacterPage