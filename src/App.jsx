import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from "./pages";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ShowCreators />} />
      <Route path="/add" element={<AddCreator />} />
      <Route path="/edit" element={<EditCreator />} />
      <Route path="/view" element={<ViewCreator />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
