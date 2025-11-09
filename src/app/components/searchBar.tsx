import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import "../media/pitchPage.css";

function SearchBar() {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );
    const address = useState(null);
    return (
        <div className="search-bar">
            <Autocomplete
                onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                }
                //onPlaceChanged={handlePlaceChanged} //- change state
            >
                <input
                    type="text"
                    placeholder="Enter your address..."
                    className="search-input"
                />
            </Autocomplete>
            <button className="search-button">
                {/* onClick={startWidget} - send of state*/}
                Check My Roof
            </button>
        </div>
    );
}

export default SearchBar;
