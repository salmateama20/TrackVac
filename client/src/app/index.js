import Reviews from '../pages/Reviews';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => {
              return (

                <Redirect to="/reviews" />
              )
            }}
          />
          <Route path="/trackvac-api/questions" component={Reviews} />
          <Route path="/trackvac-api/reviews" component={Reviews} />
        </div>
      </Router>
    </div>
  );
}

export default App;
