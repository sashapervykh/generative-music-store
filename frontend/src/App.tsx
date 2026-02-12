import { AppTitle } from "./components/AppTitle/AppTitle";
import { DataLoader } from "./components/DataLoader/DataLoader";
import { LocaleLoader } from "./components/LocaleLoader/LocaleLoader";
import { Songs } from "./components/Songs/Songs";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { DataConfigProvider } from "./providers/DataConfigProvider";
import { LocalesProvider } from "./providers/LocalesProvider";
import { SongsProvider } from "./providers/SongsProvider";

function App() {
  return (
    <>
      <SongsProvider>
        <LocalesProvider>
          <DataConfigProvider>
            <LocaleLoader>
              <DataLoader>
                <AppTitle />
                <Toolbar />
                <Songs />
              </DataLoader>
            </LocaleLoader>
          </DataConfigProvider>
        </LocalesProvider>
      </SongsProvider>
    </>
  );
}

export default App;
