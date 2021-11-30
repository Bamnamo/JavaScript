import React from "react";
import {Route} from 'react-router-dom';
import Menu1 from "./components/Menu1";
import RedPages from "./pages/RedPages";
import BluePages from "./pages/BluePages";

const App = () => {
  return (
      <div>
        <Menu1/>
        <hr/>
        <Route path="/red" component={RedPages}/>
        <Route path="/blue" component={BluePages}/>
      </div>
  );
};

export default App;