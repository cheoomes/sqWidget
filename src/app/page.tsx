"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import Widget from "./widget";
import PitchPage from "./pages/pitchPage";
import { useState } from "react";

export default function Page() {
    const [inWidget, setInWidget] = useState(false);
    const [search, setSearch] = useState<google.maps.places.PlaceResult>();

    const startWidget = (address: google.maps.places.PlaceResult) => {
        setSearch(address);
        setInWidget(true);
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                libraries={["places"]}
            >
                {!inWidget ? (
                    <PitchPage startWidget={startWidget} />
                ) : (
                    <Widget searchAddress={search} />
                )}
            </LoadScript>
        </div>
    );
}
