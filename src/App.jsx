import { useEffect, useState } from "react";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from "./pages";
import { supabase } from "./client";
import { CreatorsContext } from "./CreatorsContext";
import "./App.css";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <div id="creators">
            <ShowCreators />
          </div>
        }
      />
      <Route path="/add" element={<AddCreator />} />
      <Route path="/edit" element={<EditCreator />} />
      <Route path="/view" element={<ViewCreator />} />
    </Route>
  )
);

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select();
        setCreators(data);
        console.log(data);
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCreators();
  }, []);

  return (
    <>
      <CreatorsContext.Provider value={{ creators, setCreators }}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </CreatorsContext.Provider>
    </>
  );
}

export default App;
