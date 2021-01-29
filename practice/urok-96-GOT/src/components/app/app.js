import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemDetails from '../itemDetails';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import GOTService from '../../services/gotService';
import BookPage from '../bookPage';
import HousePage from '../housePage/housePage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    gotService = new GOTService();

    state = {
        randomCharActive: true,
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        console.log('App -> componentDidCatch()');
        this.setState({error: true})
    }

    toggleRandomChar = () => {
        console.log('toggleRandomChar');
        this.setState({
            randomCharActive: !this.state.randomCharActive
        });
    };

    render() {
        const randomChar = this.state.randomCharActive ? <RandomChar/> : '';

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 6, offset: 0}}>
                            {randomChar}
                                <Button color="primary" onClick={this.toggleRandomChar}>Toggle random char</Button>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/books' component={BookPage}/>
                        <Route path='/houses' component={HousePage}/>
                    </Container>
                </div>
            </Router>
        );

    };
};