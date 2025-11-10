import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import "../media/pitchPage.css";

interface SearchBarProps {
    onSubmit: (address: google.maps.places.PlaceResult) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );
    const [address, setAddress] =
        useState<google.maps.places.PlaceResult | null>(null);

    const autocompleteOptions: google.maps.places.AutocompleteOptions = {
        componentRestrictions: { country: ["nl"] },
        fields: ["geometry", "name", "formatted_address"],
        locationBias: {
            center: { lat: 51.822, lng: 4.2593 },
            radius: 150000, // meters
        },
    } as any;

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place) {
                setAddress(place);
            } else {
                setAddress(null);
            }
        }
    };

    const handleSubmit = () => {
        if (!address || !address.formatted_address) return;
        onSubmit(address);
    };
    return (
        <div className="search-bar">
            <Autocomplete
                onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                }
                onPlaceChanged={handlePlaceChanged}
                options={autocompleteOptions}
            >
                <input
                    type="text"
                    placeholder="Enter your address..."
                    className="search-input"
                    // value={address}
                    //onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
            </Autocomplete>
            <button className="search-button" onClick={handleSubmit}>
                Check My Roof
            </button>
        </div>
    );
}
