import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import SearchBar from "../components/searchBar";
import "../media/mapPage.css";

const containerStyle = {
    width: "100%",
    height: "400px",
    border: "2px solid #ccc",
    borderRadius: "12px",
    overflow: "hidden",
};

interface SearchMapProps {
    searchAddress?: google.maps.places.PlaceResult;
}

export default function SearchMap({ searchAddress }: SearchMapProps) {
    const defaultCenter = searchAddress?.geometry?.location
        ? {
              lat: searchAddress.geometry.location.lat(),
              lng: searchAddress.geometry.location.lng(),
          }
        : { lat: 51.82724, lng: 4.2509 };

    const [center, setCenter] = useState(defaultCenter);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    // from SearchBar: receive the PlaceResult directly
    const handlePlaceChanged = (
        place?: google.maps.places.PlaceResult | null
    ) => {
        const p = place ?? null;
        if (p && p.geometry && p.geometry.location) {
            setCenter({
                lat: p.geometry.location.lat(),
                lng: p.geometry.location.lng(),
            });
        }
    };

    useEffect(() => {
        localStorage.setItem("mapCenter", JSON.stringify(center));
    }, [center]);

    //not in use!!
    // const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    //     const newPos = {
    //         lat: e.latLng?.lat() || center.lat,
    //         lng: e.latLng?.lng() || center.lng,
    //     };
    //     setCenter(newPos);

    //     // reverse geocode
    //     const geocoder = new window.google.maps.Geocoder();
    //     geocoder.geocode({ location: newPos }, (results, status) => {
    //         if (status === "OK" && results[0]) {
    //             setAddress(results[0].formatted_address);
    //         }
    //     });
    // };

    const mapOptions = {
        mapTypeId: "hybrid",
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true, // we use custom buttons
    };

    return (
        <div className="map-box">
            <div className="instructions-side">
                <SearchBar
                    onSubmit={handlePlaceChanged}
                    initialPlace={searchAddress}
                />
            </div>

            <div className="map-side">
                {" "}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                    options={mapOptions}
                >
                    <Marker
                        position={center}
                        draggable={true}
                        onDragEnd={(e) =>
                            setCenter({
                                lat: e.latLng?.lat() || center.lat,
                                lng: e.latLng?.lng() || center.lng,
                            })
                        }
                    />
                </GoogleMap>
            </div>
        </div>
    );
}
