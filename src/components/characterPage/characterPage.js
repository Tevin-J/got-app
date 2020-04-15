import React from 'react'
import ItemList from "../itemList/itemList";
import CharDetails, {Field} from "../charDetails/charDetails";
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
    onItemSelected = (id) => {
        this.setState({selectedChar: id})
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                      getData={this.gotAPI.getAllCharacters}
                      renderItem={(item) => `${item.name} (${item.gender})`}/>
        )
        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
export default CharacterPage