import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Edit2, Trash2, RefreshCcw, Calendar, CreditCard, Coffee, ShoppingBag, Car, Home as HomeIcon } from 'lucide-react';

// Mock Transaction Data
const mockTransactions = [
    { id: 1, type: 'expense', category: 'Food & Dining', note: 'Grocery from Supermarket', wallet: 'Personal Cash', date: '2026-03-12', amount: 1200, icon: <Coffee size={16} />, color: 'bg-orange-100 text-orange-600' },
    { id: 2, type: 'income', category: 'Salary', note: 'Monthly Salary', wallet: 'Primary Bank', date: '2026-03-10', amount: 85000, icon: <CreditCard size={16} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 3, type: 'expense', category: 'Transportation', note: 'Uber to office', wallet: 'Personal Cash', date: '2026-03-09', amount: 350, icon: <Car size={16} />, color: 'bg-blue-100 text-blue-600' },
    { id: 4, type: 'expense', category: 'Shopping', note: 'New Shoes', wallet: 'Credit Card', date: '2026-03-08', amount: 4500, icon: <ShoppingBag size={16} />, color: 'bg-purple-100 text-purple-600' },
    { id: 5, type: 'expense', category: 'Housing', note: 'Monthly Rent', wallet: 'Primary Bank', date: '2026-03-01', amount: 15000, icon: <HomeIcon size={16} />, color: 'bg-indigo-100 text-indigo-600' },
    { id: 6, type: 'income', category: 'Freelance', note: 'Web Design Project', wallet: 'Business Account', date: '2026-02-28', amount: 25000, icon: <CreditCard size={16} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 7, type: 'expense', category: 'Food & Dining', note: 'Dinner with friends', wallet: 'Personal Cash', date: '2026-02-27', amount: 1800, icon: <Coffee size={16} />, color: 'bg-orange-100 text-orange-600' },
    { id: 8, type: 'expense', category: 'Transportation', note: 'Fuel', wallet: 'Trip Wallet', date: '2026-02-26', amount: 2000, icon: <Car size={16} />, color: 'bg-blue-100 text-blue-600' },
];

const TransactionHistory = () => {
    // States for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All Types');
    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [filterWallet, setFilterWallet] = useState('All Wallets');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Derived filtered transactions
    const filteredTransactions = useMemo(() => {
        return mockTransactions.filter(t => {
            const matchesSearch = t.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  t.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'All Types' || t.type.toLowerCase() === filterType.toLowerCase();
            const matchesCategory = filterCategory === 'All Categories' || t.category === filterCategory;
            const matchesWallet = filterWallet === 'All Wallets' || t.wallet === filterWallet;
            
            return matchesSearch && matchesType && matchesCategory && matchesWallet;
        });
    }, [searchTerm, filterType, filterCategory, filterWallet]);

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset to page 1 whenever filters change
    useMemo(() => setCurrentPage(1), [searchTerm, filterType, filterCategory, filterWallet]);

    const handleResetFilters = () => {
        setSearchTerm('');
        setFilterType('All Types');
        setFilterCategory('All Categories');
        setFilterWallet('All Wallets');
    };

    return (
        <section className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden flex flex-col w-full h-full">
            {/* Header / Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white">
                <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">Transaction History</h3>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-56 transition-all h-[38px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Filters */}
                    <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer w-full sm:w-auto h-[38px]"
                        value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option>All Types</option>
                        <option>Income</option>
                        <option>Expense</option>
                    </select>

                    <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer w-full sm:w-auto h-[38px]"
                        value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option>All Categories</option>
                        <option>Food & Dining</option>
                        <option>Transportation</option>
                        <option>Shopping</option>
                        <option>Housing</option>
                        <option>Salary</option>
                        <option>Freelance</option>
                    </select>

                    <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer w-full sm:w-auto h-[38px]"
                        value={filterWallet} onChange={(e) => setFilterWallet(e.target.value)}>
                        <option>All Wallets</option>
                        <option>Personal Cash</option>
                        <option>Primary Bank</option>
                        <option>Credit Card</option>
                        <option>Business Account</option>
                        <option>Trip Wallet</option>
                    </select>

                    {/* Date Picker Button mock */}
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm bg-gray-50 w-full sm:w-auto h-[38px]">
                        <Calendar size={16} className="text-gray-500"/>
                        <span className="hidden lg:inline">All Time</span>
                    </button>

                    {/* Refresh Button */}
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors bg-gray-50 flex items-center justify-center h-[38px]"
                        onClick={handleResetFilters}
                        title="Reset Filters"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto w-full flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                            <th className="p-4 rounded-tl-xl rounded-bl-xl">Category</th>
                            <th className="p-4">Note</th>
                            <th className="p-4">Wallet</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4 text-center w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-gray-50 hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 rounded-tl-xl rounded-bl-xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${tx.color}`}>
                                                {tx.icon}
                                            </div>
                                            <span className="font-semibold text-gray-800 whitespace-nowrap">{tx.category}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 min-w-[160px]">{tx.note}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 whitespace-nowrap">
                                            {tx.wallet}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 whitespace-nowrap font-medium">
                                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className={`p-4 text-right font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Search size={32} className="text-gray-300" />
                                        <p className="text-base font-medium text-gray-600">No transactions found</p>
                                        <p className="text-sm">Try adjusting your filters or search term.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Pagination */}
            <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30 mt-auto">
                <span className="text-sm text-gray-500 font-medium">
                    Showing <span className="font-bold text-gray-700">{filteredTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-bold text-gray-700">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="font-bold text-gray-700">{filteredTransactions.length}</span> transactions
                </span>

                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    
                    {Array.from({ length: totalPages || 1 }).map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TransactionHistory;
