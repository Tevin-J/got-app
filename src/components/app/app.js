import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ItemList from "../itemList/itemList";
import CharDetails from "../charDetails/charDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import ButtonToggle from "reactstrap/es/Button";


class App extends Component {
    state = {
        error: false,
        showRandomChar: true
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
            <>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <ButtonToggle color='primary' onClick={this.toggleRandomChar}>Toggle random character</ButtonToggle>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList/>
                        </Col>
                        <Col md='6'>
                            <CharDetails/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;