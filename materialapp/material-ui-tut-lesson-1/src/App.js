import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Footer from './pages/StickyFooter'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/stick ">
          <Footer />
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
