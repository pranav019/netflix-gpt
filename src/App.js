import MainBody from "./components/MainBody";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <MainBody />
      </Provider>
    </div>
  );
}

export default App;
