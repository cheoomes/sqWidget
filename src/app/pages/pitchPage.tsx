export default function SolarWidgetLanding() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-yellow-50 p-6">
            {/* Header */}
            <div className="absolute top-4 left-6 text-sm font-semibold text-gray-600">
                Solar by YourCompany
            </div>

            {/* Hero Section */}
            <div className="text-center max-w-xl">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    See how much you can save with solar panels on your home
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Instantly check your roof’s solar potential — powered by
                    NASA solar data.
                </p>

                {/* Search Bar */}
                <div className="flex w-full max-w-lg mx-auto rounded-2xl shadow-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Enter your address..."
                        className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium">
                        Check My Roof
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
                    <span>✓ Uses NASA Solar Data</span>
                    <span>✓ Privacy Guaranteed</span>
                    <span>✓ Trusted by Local Installers</span>
                </div>
            </div>
        </div>
    );
}
