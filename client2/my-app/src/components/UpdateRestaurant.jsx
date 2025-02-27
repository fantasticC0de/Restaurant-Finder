import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { restaurants } = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        type="number"
                        id="price_range"
                        className="form-control"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UpdateRestaurant;
