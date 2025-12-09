
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className={`pointer-events-auto min-w-[300px] max-w-md p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] border-l-4 flex items-center gap-3 backdrop-blur-md ${toast.type === 'success' ? 'bg-gray-900/95 border-brand-yellow text-white' :
                                    toast.type === 'error' ? 'bg-gray-900/95 border-red-500 text-white' :
                                        'bg-gray-900/95 border-blue-500 text-white'
                                }`}
                        >
                            <div className="flex-shrink-0 text-xl">
                                {toast.type === 'success' && <FaCheckCircle className="text-brand-yellow" />}
                                {toast.type === 'error' && <FaExclamationCircle className="text-red-500" />}
                                {toast.type === 'info' && <FaInfoCircle className="text-blue-500" />}
                            </div>
                            <p className="font-medium text-sm flex-1">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
