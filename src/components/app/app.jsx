import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../MainWindow/MainWindow";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainWindow />
    </div>
  );
}

export default App;
