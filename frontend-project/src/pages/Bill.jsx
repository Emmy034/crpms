import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Bill() {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBills = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.get("http://localhost:5000/bill");
            const data = res.data;

            if (Array.isArray(data)) {
                setBills(data);
                if (!selectedBill && data.length > 0) {
                    setSelectedBill(data[0]);
                }
            } else {
                console.warn("Unexpected bill payload:", data);
                setBills([]);
                setSelectedBill(null);
                setError("Bill data is unavailable right now.");
            }
        } catch (fetchError) {
            console.error(fetchError);
            setBills([]);
            setSelectedBill(null);
            setError("Unable to load bills. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const totalServiceValue = bills.reduce((sum, bill) => sum + Number(bill.ServicePrice || 0), 0);
    const totalPaid = bills.reduce((sum, bill) => sum + Number(bill.AmountPaid || 0), 0);

    const handlePrint = () => {
        if (selectedBill) {
            window.print();
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Invoice Center</p>
                            <h1 className="text-3xl font-semibold text-slate-900">Bills</h1>
                            <p className="mt-2 text-slate-600">Review and print payment invoices for completed service orders.</p>
                        </div>

                        <button
                            onClick={handlePrint}
                            disabled={!selectedBill}
                            className="print-hidden inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            Print Selected Bill
                        </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Invoices</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{bills.length}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Service Value</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{totalServiceValue.toLocaleString()} RWF</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Paid</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{totalPaid.toLocaleString()} RWF</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Balance</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{(totalServiceValue - totalPaid).toLocaleString()} RWF</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Plate</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Service</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Paid</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Date</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Select</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-6 text-center text-slate-500">Loading bills...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-6 text-center text-red-500">{error}</td>
                                </tr>
                            ) : bills.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-6 text-center text-slate-500">No bills available</td>
                                </tr>
                            ) : (
                                bills.map((bill, index) => {
                                    const paymentDate = bill.PaymentDate ? new Date(bill.PaymentDate).toLocaleDateString() : "Unknown date";
                                    const isSelected = selectedBill && selectedBill.PlateNumber === bill.PlateNumber && selectedBill.PaymentDate === bill.PaymentDate && selectedBill.AmountPaid === bill.AmountPaid;
                                    return (
                                        <tr key={`${bill.PlateNumber || index}-${index}`} className={`transition ${isSelected ? "bg-slate-100" : "hover:bg-slate-50"}`}>
                                            <td className="px-6 py-5 text-sm font-medium text-slate-900">{bill.PlateNumber || "N/A"}</td>
                                            <td className="px-6 py-5 text-sm text-slate-600">{bill.ServiceName || "N/A"}</td>
                                            <td className="px-6 py-5 text-right text-sm text-slate-900">{Number(bill.ServicePrice || 0).toLocaleString()} RWF</td>
                                            <td className="px-6 py-5 text-right text-sm text-slate-900">{Number(bill.AmountPaid || 0).toLocaleString()} RWF</td>
                                            <td className="px-6 py-5 text-sm text-slate-600">{paymentDate}</td>
                                            <td className="px-6 py-5 text-center">
                                                <button
                                                    type="button"
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                                                    onClick={() => setSelectedBill(bill)}
                                                >
                                                    {isSelected ? "Selected" : "Select"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm print-hidden">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Preview</p>
                            <h2 className="text-2xl font-semibold text-slate-900">Selected Invoice</h2>
                        </div>
                        <p className="text-sm text-slate-600">Only the chosen bill will print from this view.</p>
                    </div>

                    {selectedBill ? (
                        <div className="mt-6 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Plate Number</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedBill.PlateNumber || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Service</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedBill.ServiceName || "N/A"}</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Service Price</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{Number(selectedBill.ServicePrice || 0).toLocaleString()} RWF</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Amount Paid</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{Number(selectedBill.AmountPaid || 0).toLocaleString()} RWF</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Balance</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{(Number(selectedBill.ServicePrice || 0) - Number(selectedBill.AmountPaid || 0)).toLocaleString()} RWF</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Payment Date</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedBill.PaymentDate ? new Date(selectedBill.PaymentDate).toLocaleDateString() : "Unknown date"}</p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Bill ID</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedBill.id || selectedBill.billId || "--"}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
                            <p>Select a bill from the table above to view the printable invoice.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @media print {
                    .print-hidden { display: none !important; }
                    body { background: white !important; }
                }
            `}</style>
        </div>
    );
}

export default Bill;