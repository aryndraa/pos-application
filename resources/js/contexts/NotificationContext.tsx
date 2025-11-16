import { createContext, ReactNode, useContext, useState } from 'react';

interface Notification {
    type: 'success' | 'error';
    message: string;
}

interface NotificationContextType {
    notify: (type: 'success' | 'error', message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<Notification | null>(null);

    const notify = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });

        // auto close
        setTimeout(() => setNotification(null), 4000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {notification && (
                <div
                    className={`animate-fade-in-down fixed top-5 right-5 z-[9999] rounded-md px-4 py-3 text-white shadow-lg ${
                        notification.type === 'success'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            'useNotification must be used inside NotificationProvider',
        );
    }
    return context;
}
