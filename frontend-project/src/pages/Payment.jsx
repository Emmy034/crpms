import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Payment() {

    const [payment, setPayment] = useState({
        RecordNumber: "",
        AmountPaid: "",
        PaymentDate: ""
    });

    const handleChange = (e) => {

        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/payments",
                payment
            );

            alert("Payment Added");

            setPayment({
                RecordNumber: "",
                AmountPaid: "",
                PaymentDate: ""
            });

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                <form
                    onSubmit={handleSubmit}
                    className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
                >

                    <h1 className="text-2xl font-bold mb-6">
                        Add Payment
                    </h1>

                    <div className="grid gap-4">

                        <input
                            type="number"
                            name="RecordNumber"
                            placeholder="Record Number"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={payment.RecordNumber}
                        />

                        <input
                            type="number"
                            name="AmountPaid"
                            placeholder="Amount Paid"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={payment.AmountPaid}
                        />

                        <input
                            type="date"
                            name="PaymentDate"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={payment.PaymentDate}
                        />

                    </div>

                    <button
                        className="
                            mt-5
                            bg-black
                            text-white
                            px-6
                            py-3
                            rounded-xl
                        "
                    >
                        Save Payment
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Payment;