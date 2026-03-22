import React, { useState } from "react";
import { createLead } from "../services/createLead";

//adress
type LeadFormProps = {
    lng: number;
    lat: number;
    quote: number;
    energyConsumption: number;
    bill: number;
};

export default function LeadForm({
    lng,
    lat,
    quote,
    energyConsumption,
    bill,
}: LeadFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Uncomment when backend is ready
        await createLead({
            ...formData,
            location: `${lat},${lng}`,
            quote,
            energyConsumption,
            bill,
        });

        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "" }); // clear form
    };

    if (submitted) {
        return (
            <div className="contact-form cta-box success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>
                    We've received your information and one of our solar experts
                    will be in contact with you shortly to discuss your
                    personalized quote.
                </p>
            </div>
        );
    }

    return (
        <form className="contact-form cta-box" onSubmit={handleSubmit}>
            <h3>get a personalised quote from an expert</h3>
            <p>
                one of our experts will review your specific situation and
                provide a tailored quote, along with advice suited to your home.
            </p>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 234 567 890"
                />
            </div>

            <button type="submit" className="btn-primary btn-large">
                Talk to one of our Experts
            </button>
        </form>
    );
}
