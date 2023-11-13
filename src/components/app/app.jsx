import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../main-window/main-window";
import { store } from "../../services/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <Provider store={store}>
          <AppHeader />
          <MainWindow />
        </Provider>
      </div>
    </DndProvider>
  );
}

export default App;
