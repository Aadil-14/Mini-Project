import React, { useState } from 'react';
import { Plus, CreditCard, UserPlus, TrendingUp, TrendingDown, Wallet, Users } from 'lucide-react';

import Modal from '../components/common/Modal';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import SharedWallets from '../components/dashboard/SharedWallets';

const Home = () => {
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [transactionType, setTransactionType] = useState('expense');
    const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
    const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
    const [isSharedTransactionsOpen, setIsSharedTransactionsOpen] = useState(false);

    // Mock data for shared wallets
    const sharedWallets = [
        { id: 1, name: 'Trip to Goa', balance: -500 }, // User owes 500
        { id: 2, name: 'Flat Expenses', balance: 1200 }, // User should receive 1200
        { id: 3, name: 'Team Lunch', balance: -200 } // User owes 200
    ];

    const totalOwed = sharedWallets.reduce((acc, wallet) => acc + wallet.balance, 0); // Expected: 500 (You are owed 500)
    const absTotalOwed = Math.abs(totalOwed);

    const handleAddTransaction = (e) => {
        e.preventDefault();
        // Logic to add transaction would go here
        setIsAddTransactionOpen(false);
        alert(`${transactionType === 'expense' ? 'Expense' : 'Income'} Added! (Demo)`);
    };

    const handleAddWallet = (e) => {
        e.preventDefault();
        setIsAddWalletOpen(false);
        alert('Wallet Created! (Demo)');
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl text-gray-800 mb-1 font-semibold">Hi Traveller 👋</h1>
                    
                    <p className="text-gray-500 text-base">Ready to manage your expenses?</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full md:w-auto justify-center" onClick={() => setIsAddTransactionOpen(true)}>
                    <Plus size={18} />
                    Add Transaction
                </button>
            </header>

            {/* Summary Cards */}
            <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-8">
                <div
                    className="relative overflow-hidden border border-white/60 bg-gradient-to-br from-white/90 to-white/40 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 cursor-pointer"
                    onClick={() => setIsTransactionsOpen(true)}
                >
                    <div className="flex justify-between items-center mb-4 text-gray-500 text-sm font-medium">
                        <span>My Balance</span>
                        <div className="text-indigo-600 bg-indigo-100 p-1 rounded-lg w-7 h-7 flex items-center justify-center">
                            <Wallet size={20} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">₹12,450</h2>
                    <div className="flex items-center gap-2 text-sm">
                        <TrendingUp size={16} className="text-emerald-500" />
                        <span className="text-emerald-500">+5,500</span>
                    </div>
                </div>

                <div
                    className="relative overflow-hidden border border-white/60 bg-gradient-to-br from-white/90 to-white/40 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 cursor-pointer flex flex-col justify-between"
                    onClick={() => setIsSharedTransactionsOpen(true)}
                >
                    <div className="flex justify-between items-start mb-4 text-gray-500 text-sm font-medium">
                        <span>Owed Balance</span>
                        <div className="flex">
                            <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[0.6rem] text-white font-bold">A</div>
                            <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[0.6rem] text-white font-bold">B</div>
                        </div>
                    </div>
                    <div>
                        <h2 className={`text-3xl font-bold mb-2 ${totalOwed < 0 ? 'text-rose-600' : totalOwed > 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                            ₹{absTotalOwed.toLocaleString()}
                        </h2>
                        <div className="flex items-center gap-2 text-sm mt-auto">
                            <span className="text-gray-500 text-xs font-medium">
                                {totalOwed < 0 ? 'Overall, you owe money' : totalOwed > 0 ? 'Overall, you are owed money' : 'All accounts settled'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden border border-white/60 bg-gradient-to-br from-white/90 to-white/40 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4 text-gray-500 text-sm font-medium">
                        <span>This Month Spend</span>
                        <div className="w-4 h-4 rounded-full bg-rose-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">₹1,950</h2>
                    <div className="flex items-center gap-2 text-sm">
                        <TrendingDown size={16} className="text-emerald-500" />
                        <span className="text-emerald-500">10% less than last month</span>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Recent Activity */}
                <TransactionHistory />

                {/* Shared Wallets */}
                <SharedWallets />
            </div>

            <Modal
                isOpen={isAddTransactionOpen}
                onClose={() => setIsAddTransactionOpen(false)}
                title="Add New Transaction"
            >
                <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                    <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${transactionType === 'expense' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setTransactionType('expense')}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${transactionType === 'income' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setTransactionType('income')}
                    >
                        Income
                    </button>
                </div>

                <form onSubmit={handleAddTransaction} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Amount</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full p-3 rounded-lg border border-gray-200 text-xl"
                        />
                    </div>
                    {transactionType === 'income' && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">Source</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Salary, Freelance"
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                />
                            </div>
                        </>
                    )}
                    {transactionType === 'expense' && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">Description</label>
                                <input
                                    type="text"
                                    placeholder="What is this for?"
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Category</label>
                                <select className="w-full p-3 rounded-lg border border-gray-200 bg-white">
                                    <option>Food & Dining</option>
                                    <option>Transportation</option>
                                    <option>Shopping</option>
                                    <option>Entertainment</option>
                                </select>
                            </div>
                        </>
                    )}
                    {transactionType === 'income' && (
                        <div>
                            <label className="block mb-2 font-medium">Description</label>
                            <input
                                type="text"
                                placeholder="Additional details (optional)"
                                className="w-full p-3 rounded-lg border border-gray-200"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-2 font-medium">Wallet</label>
                        <select className="w-full p-3 rounded-lg border border-gray-200 bg-white">
                            <option>Personal Cash</option>
                            <option>Trip to Goa (Shared)</option>
                            <option>Flat Expenses (Shared)</option>
                        </select>
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        Add {transactionType === 'expense' ? 'Expense' : 'Income'}
                    </button>
                </form>
            </Modal>

            <Modal
                isOpen={isAddWalletOpen}
                onClose={() => setIsAddWalletOpen(false)}
                title="Create New Wallet"
            >
                <form onSubmit={handleAddWallet} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Wallet Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Summer Trip"
                            className="w-full p-3 rounded-lg border border-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="type" defaultChecked /> Personal
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="type" /> Shared
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        Create Wallet
                    </button>
                </form>
            </Modal>

            <Modal
                isOpen={isTransactionsOpen}
                onClose={() => setIsTransactionsOpen(false)}
                title="Transaction History"
            >
                <div className="flex flex-col gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-100 hover:bg-gray-50 border-b border-gray-50 last:border-none">
                            <div className="flex flex-col items-center min-w-[40px] bg-slate-100 px-2 py-1 rounded-lg text-xs text-gray-500">
                                <span className="font-bold text-base text-gray-800">{20 + i}</span>
                                <span>Apr</span>
                            </div>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#e0f2fe', color: '#0ea5e9' }}>
                                <CreditCard size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800 mb-[2px]">Item {i}</p>
                                <p className="text-sm text-gray-500">Personal Cash</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-800">₹{100 * i}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal
                isOpen={isSharedTransactionsOpen}
                onClose={() => setIsSharedTransactionsOpen(false)}
                title="Owed Balance Breakdown"
            >
                <div className="flex flex-col gap-4">
                    {sharedWallets.map((wallet) => (
                        <div key={wallet.id} className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-100 hover:bg-gray-50 border border-gray-100 shadow-sm">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600">
                                <Wallet size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800 mb-[2px]">{wallet.name}</p>
                                <p className={`text-sm font-medium ${wallet.balance < 0 ? 'text-rose-600' : wallet.balance > 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                    {wallet.balance < 0 ? 'You owe' : wallet.balance > 0 ? 'You should receive' : 'Settled'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-lg ${wallet.balance < 0 ? 'text-rose-600' : wallet.balance > 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                                    ₹{Math.abs(wallet.balance).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    <div className="mt-2 pt-4 border-t border-gray-200 flex justify-between items-center px-4">
                        <span className="font-bold text-gray-800 text-lg">Net Total</span>
                        <div className="text-right">
                            <span className={`text-sm font-medium block ${totalOwed < 0 ? 'text-rose-600' : totalOwed > 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                {totalOwed < 0 ? 'You owe overall' : totalOwed > 0 ? 'You should receive' : 'Settled'}
                            </span>
                            <span className={`font-bold text-xl ${totalOwed < 0 ? 'text-rose-600' : totalOwed > 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                                ₹{absTotalOwed.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default Home;


