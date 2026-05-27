import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Report() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchReports = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.get("http://localhost:5000/reports");
            const data = res.data;

            if (Array.isArray(data)) {
                setReports(data);
            } else {
                console.warn("Unexpected report payload:", data);
                setReports([]);
                setError("Report data is unavailable right now.");
            }
        } catch (fetchError) {
            console.error(fetchError);
            setReports([]);
            setError("Unable to load reports. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const totalReports = reports.length;
    const totalAmount = reports.reduce((sum, report) => sum + Number(report.AmountPaid || 0), 0);

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-6xl mx-auto p-8">

                <div className="mb-8 rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Report Center</p>
                            <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
                            <p className="mt-2 text-slate-600">All payment reports for completed service orders.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-3xl bg-slate-50 p-5 text-slate-900">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total Reports</p>
                                <p className="mt-3 text-2xl font-semibold">{totalReports}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-5 text-slate-900">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total Amount Paid</p>
                                <p className="mt-3 text-2xl font-semibold">{totalAmount.toLocaleString()} RWF</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
                    <table className="min-w-full divide-y divide-slate-200">

                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-3">Plate</th>
                                <th className="p-3">Service</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        Loading report...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : (reports || []).length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No reports found
                                    </td>
                                </tr>
                            ) : (
                                reports.map((r, i) => {
                                    const paymentDate = r.PaymentDate ? new Date(r.PaymentDate).toLocaleString() : "Unknown date";
                                    return (
                                        <tr key={`${r.PlateNumber || i}-${r.PaymentDate || i}`} className="border-b">
                                            <td className="p-3">{r.PlateNumber || "Unknown"}</td>
                                            <td className="p-3">{r.ServiceName || "Unknown"}</td>
                                            <td className="p-3">{r.AmountPaid ?? "-"} RWF</td>
                                            <td className="p-3">{paymentDate}</td>
                                        </tr>
                                    );
                                })
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Report;