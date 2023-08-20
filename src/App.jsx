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
      <Route path="/edit/:id" element={<EditCreator />} />
      <Route path="/view/:id" element={<ViewCreator />} />
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

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "creators",
        },
        (payload) =>
          setCreators((prevCreators) => [...prevCreators, payload.new])
      )
      .subscribe();

    fetchCreators();

    return () => {
      // Clean up the subscription when the component unmounts
      channel.unsubscribe();
    };
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
