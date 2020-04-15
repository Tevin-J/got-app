import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import ButtonToggle from "reactstrap/es/Button";
import CharactersPage from "../pages/charactersPage/charactersPage";
import ItemList from "../itemList/itemList";
import CharDetails from "../itemDetails/itemDetails";
import gotAPI from "../../api/api";
import BooksPage from "../pages/booksPage/booksPage";
import HousesPage from "../pages/housesPage/housesPage";
import {HashRouter, Route} from "react-router-dom";
import BooksItem from "../pages/booksPage/booksItem";


class App extends Component {
    gotAPI = new gotAPI()
    state = {
        error: false,
        showRandomChar: true,
        selectedChar: null
    }
    /*этот метод жизненного цикла предназначен перехватывать ошибки и их обрабатывать.
    лучше использовать его в разных компонентах, чтоб при ошибке в каком-то блоке
    падало не все приложение а только блок*/
    componentDidCatch(error, errorInfo) {
        alert(error)
        this.setState({error: true})
    }
    /*показ блока с рандомным героем при клике на кнопку*/
    toggleRandomChar = () => {
        this.setState({
            showRandomChar: !this.state.showRandomChar
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null
        return (
            <HashRouter>
                <div className='app'>
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <ButtonToggle color='primary' onClick={this.toggleRandomChar}>
                                    Toggle random character
                                </ButtonToggle>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharactersPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        {/*перенаправление на информацию о конкретной книге при клике на
                        нее. взяли из Route объект match для получения id куда нажали*/}
                        <Route path='/books/:id' render = {
                            ({match}) => {
                                const {id} = match.params
                                return (
                                    <BooksItem bookId={id}/>
                                )
                            }
                        }/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default App;