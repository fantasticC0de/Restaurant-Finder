import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <select
                            className="custom-select my-1 mr-sm-2"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;