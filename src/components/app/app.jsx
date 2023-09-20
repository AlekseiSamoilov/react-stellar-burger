import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../MainWindow/MainWindow";
import Modal from "../modal/modal";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainWindow />
      {/* <ModalOverlay /> */}
    </div>
  );
}

export default App;
