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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createLead({
            ...formData,
            location: `${lat},${lng}`,
            quote,
            energyConsumption,
            bill,
        });

        setFormData({ name: "", email: "", phone: "" }); // clear form
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Information</h2>

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
            <button type="submit">Submit</button>
        </form>
    );
}
