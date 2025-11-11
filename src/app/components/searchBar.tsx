import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState, useEffect } from "react";
import "../media/pitchPage.css";

interface SearchBarProps {
    onSubmit: (address: google.maps.places.PlaceResult) => void;
    // optional initial PlaceResult so the component is immediately ready to submit
    initialPlace?: google.maps.places.PlaceResult;
}

export default function SearchBar({ onSubmit, initialPlace }: SearchBarProps) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
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

    // If parent passes an initial PlaceResult, set the internal address state
    // and prefill the input so the component can submit immediately.
    useEffect(() => {
        if (initialPlace) {
            setAddress(initialPlace);
            if (inputRef.current) {
                inputRef.current.value =
                    initialPlace.formatted_address ?? initialPlace.name ?? "";
            }
        }
    }, [initialPlace]);

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
                    ref={inputRef}
                    // Use defaultValue so Autocomplete can still control the input.
                    defaultValue={initialPlace?.formatted_address ?? initialPlace?.name}
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
