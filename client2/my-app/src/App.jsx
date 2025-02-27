import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdatePage from "./routes/UpdatePage";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import Home from "./routes/Home";
import { RestaurantContextProvider } from "./context/RestaurantContext";

const App = () => {
    return (
        <RestaurantContextProvider> 
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants/:id/update" element={<UpdatePage />} />
                    <Route path="/restaurants/:id" element={<RestaurantdetailPage />} />
                </Routes>
            </Router>
        </div>
        </RestaurantContextProvider>

    );
};

export default App;