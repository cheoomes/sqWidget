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
                    {" "}
                    get an estimated solar quote in 30 sec
                </h1>
                <p className="hero-subtitle">
                    completely online, no email or phonenumber requird
                </p>
                <SearchBar onSubmit={startWidget} />
            </div>
            <div className="footer">
                {/* <div className="footer-logo" aria-hidden="true" /> */}

                <div className="trust-indicators">
                    <span className="indicator">✓ Uses NASA Solar Data</span>
                    <span className="indicator">✓ Privacy Guaranteed</span>
                    <span>✓ Trusted by Local Installers</span>
                </div>
            </div>
        </div>
    );
}
