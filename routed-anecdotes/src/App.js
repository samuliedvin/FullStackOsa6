import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Alert, FormGroup, FormControl, ControlLabel, Button, Navbar, NavItem, Nav, Well, Label, Panel } from 'react-bootstrap'

const Menu = () => {
  const activeStyle = {
    color: 'white',
    textShadow: '0px 0px 10px #fff'

  }
  return(
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Anecdote app                
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#">
              <NavLink exact activeStyle={activeStyle} to="/">Anecdotes</NavLink>
            </NavItem>
            <NavItem href="#">
              <NavLink exact activeStyle={activeStyle} to="/create">Create new</NavLink> 
            </NavItem>
            <NavItem href="#">
              <NavLink exact activeStyle={activeStyle} to="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>  
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
  <div>
    <Panel>
      <Panel.Heading>
        <Panel.Title componentClass="h3">"{anecdote.content}"</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <p>This anecdote has <Label>{anecdote.votes}</Label> votes</p>
        <p>For more info, visit <a href={anecdote.info}>{anecdote.info}</a></p>
      </Panel.Body>
    </Panel>
  </div>
)}

const About = () => (
  <div>
    <Grid>
      <Row>
        <h2>About anecdote app</h2>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={6} md={4}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg" alt="Alan Turing"/>
          <p><em>Alan Turing (Wikimedia)</em></p>
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <Well>
      <p>Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>. See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.</p>
    </Well>
  </div>
)

// Tää jääköön nyt tänne osoittamaan että tämäkin tuli tehtyä.

// const Notification = ({notification}) => {
//   const notificationStyle = {
//     display: notification === '' ? 'none' : '',
//     padding: '1rem',
//     color: 'darkgreen',
//     border: '1px dashed darkgreen',
//     borderRadius: '1rem',
//     marginTop: '1rem',
//     marginBottom: '1rem',
//     textAlign: 'center'
//   }

//   return (
//   <div style={notificationStyle}>
//     <p>{notification}</p>
//   </div>
//   )
// }

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
            <ControlLabel>Content</ControlLabel> 
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>Author</ControlLabel> 
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>Url for more info</ControlLabel> 
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            <Button bsStyle="success" type="submit">Create</Button>
        </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} was added!` 
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            {(this.state.notification &&
              <Alert color="success">
                {this.state.notification}
              </Alert>
            )}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
