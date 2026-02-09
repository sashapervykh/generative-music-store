import { AppTitle } from "./components/AppTitle/AppTitle";
import { DataLoader } from "./components/DataLoader/DataLoader";
import { LocaleLoader } from "./components/LocaleLoader/LocaleLoader";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { DataConfigProvider } from "./providers/DataConfigProvider";
import { LocalesProvider } from "./providers/LocalesProvider";

function App() {
  return (
    <>
      <LocalesProvider>
        <DataConfigProvider>
          <LocaleLoader>
            <DataLoader>
              <AppTitle />
              <Toolbar />
            </DataLoader>
          </LocaleLoader>
        </DataConfigProvider>
      </LocalesProvider>
    </>
  );
}

export default App;
