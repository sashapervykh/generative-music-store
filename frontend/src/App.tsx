import { AppTitle } from "./components/AppTitle/AppTitle";
import { DataLoader } from "./components/DataLoader/DataLoader";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { DataConfigProvider } from "./providers/DataConfigProvider";

function App() {
  return (
    <>
      <DataConfigProvider>
        <DataLoader>
          <AppTitle />
          <Toolbar />
        </DataLoader>
      </DataConfigProvider>
    </>
  );
}

export default App;
