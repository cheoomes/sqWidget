import "../media/pitchPage.css";
import { Autocomplete } from "@react-google-maps/api";
import SearchBar from "../components/searchBar";

interface SolarWidgetLandingProps {
    startWidget: (address: google.maps.places.PlaceResult) => void;
}

export default function SolarWidgetLanding({
    startWidget,
}: SolarWidgetLandingProps) {
    return (
        <div className="solar-landing">
            <div className="content">
                <h1 className="hero-title">
                    Get a free solar quatation, right now
                </h1>
                <p className="hero-subtitle">
                    completely online, within 30 seconds
                    {/* Instantly check your roof’s solar potential — powered by
                    NASA solar data. */}
                </p>
                <SearchBar onSubmit={startWidget} />
                {/* <div className="search-bar">
                    <Autocomplete
                    // onLoad={(autocomplete) =>
                    //     (autocompleteRef.current = autocomplete)
                    // }
                    //onPlaceChanged={handlePlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Enter your address..."
                            className="search-input"
                        />
                    </Autocomplete>
                    <button onClick={startWidget} className="search-button">
                        Check My Roof
                    </button>
                </div> */}
            </div>
            <div className="footer">
                <div className="trust-indicators">
                    <span className="indicator">✓ Uses NASA Solar Data</span>
                    <span className="indicator">✓ Privacy Guaranteed</span>
                    <span>✓ Trusted by Local Installers</span>
                </div>
            </div>
        </div>
    );
}
