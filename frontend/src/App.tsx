import { AppTitle } from "./components/AppTitle/AppTitle";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { DataConfigProvider } from "./providers/DataConfigProvider";

function App() {
  return (
    <>
      <DataConfigProvider>
        <AppTitle />
        <Toolbar />
      </DataConfigProvider>
    </>
  );
}

export default App;
