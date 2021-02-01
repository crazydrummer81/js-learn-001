import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GOTService from '../../services/gotService';
import {BooksPage, HousesPage, CharacterPage, BooksItem} from '../pages';
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
        const randomChar = this.state.randomCharActive ? <RandomChar interval={2000}/> : '';

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
                        <Route path='/' exact component={() => <h1>Weclome to GOT-BD</h1>}/>
                        <Route path='/characters/' component={CharacterPage}/>
                        <Route path='/houses/' component={HousesPage}/>
                        <Route path='/books/' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match, location, history}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                        
                    </Container>
                </div>
            </Router>
        );

    };
};