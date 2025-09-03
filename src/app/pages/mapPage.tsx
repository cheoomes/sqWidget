import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
    border: "2px solid #ccc",
    borderRadius: "12px",
    overflow: "hidden",
};

const defaultCenter = {
    lat: 51.82724,
    lng: 4.2509,
};

export default function SearchMap() {
    const [center, setCenter] = useState(defaultCenter);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    //from search
    const handlePlaceChanged = () => {
        //console.log(autocompleteRef.current);
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                setCenter({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("mapCenter", JSON.stringify(center));
    }, [center]);

    //not in use!!
    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        const newPos = {
            lat: e.latLng?.lat() || center.lat,
            lng: e.latLng?.lng() || center.lng,
        };
        setCenter(newPos);

        // reverse geocode
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPos }, (results, status) => {
            if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
            }
        });
    };

    const mapOptions = {
        mapTypeId: "hybrid",
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true, // we use custom buttons
    };

    return (
        <div className="map-box">
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

            <div className="search">
                <Autocomplete
                    onLoad={(autocomplete) =>
                        (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={handlePlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="adress ..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // prevent dropdown from closing
                                handlePlaceChanged(); // still handle the selected place
                            }
                        }}
                    />
                </Autocomplete>
            </div>
        </div>
    );
}
