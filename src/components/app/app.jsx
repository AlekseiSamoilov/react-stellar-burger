import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../main-window/main-window";
import Modal from "../modal/modal";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainWindow />
    </div>
  );
}

export default App;
