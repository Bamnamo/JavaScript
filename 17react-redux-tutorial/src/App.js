import './App.css';
import Todos from "./components/Todos";
import CounterContainer from "./containers/ConunterContainer";
import TodosContainer from "./containers/TodosContainer";

const App = () => {
  return (
      <div>
        <CounterContainer/>
        <hr/>
        <TodosContainer/>
      </div>
  );
};

export default App;
