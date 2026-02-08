import { AppTitle } from "./components/AppTitle/AppTitle";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { LikesProvider } from "./providers/LikesProvider";

function App() {
  return (
    <>
      <LikesProvider>
        <AppTitle />
        <Toolbar />
      </LikesProvider>
    </>
  );
}

export default App;
