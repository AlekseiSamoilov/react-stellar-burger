import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../MainWindow/MainWindow";

function App() {
  return (
    <div className={styles.app}>
      <pre
        style={{
          margin: "auto",
          fontSize: "1.5rem",
        }}
      >
        Измените src/components/app/app.jsx и сохраните для обновления.
      </pre>
    </div>
  );
}

export default App;
