import { useEffect, useState, useContext } from "react";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from "./pages";
import { supabase } from "./client";
import { CreatorsContext } from "./CreatorsContext.js";
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
  const [creators, setCreators] = useState();

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

    //create real time update channel
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "creators",
        },
        (payload) => {
          setCreators((prevCreators) => {
            const updatedCreatorIndex = prevCreators.findIndex(
              (creator) => creator.id === payload.new.id
            );
            // Update the local state with the new creator
            if (updatedCreatorIndex !== -1) {
              const updatedCreators = [...prevCreators];
              updatedCreators[updatedCreatorIndex] = payload.new;
              return updatedCreators;
            } else {
              //update with the new creator adde
              return [...prevCreators, payload.new];
            }
          });
        }
      )
      .subscribe();

    fetchCreators();

    return () => {
      // Clean up subscription on component unmount
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <CreatorsContext.Provider value={{ creators, setCreators }}>
        <RouterProvider router={router} />
      </CreatorsContext.Provider>
    </div>
  );
}

export default App;
