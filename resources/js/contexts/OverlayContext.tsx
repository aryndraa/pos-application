import React, { createContext, useContext, useState } from 'react';

type OverlayKey = 'search' | 'category' | null;

type OverlayContextType = {
    active: OverlayKey;
    open: (key: OverlayKey) => void;
    close: () => void;
    toggle: (key: OverlayKey) => void;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState<OverlayKey>(null);

    const open = (key: OverlayKey) => setActive(key);
    const close = () => setActive(null);
    const toggle = (key: OverlayKey) =>
        setActive((prev) => (prev === key ? null : key));

    return (
        <OverlayContext.Provider value={{ active, open, close, toggle }}>
            {children}

            {/* Overlay global */}
            {active && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition"
                    onClick={close}
                />
            )}
        </OverlayContext.Provider>
    );
}

export function useOverlay() {
    const ctx = useContext(OverlayContext);
    if (!ctx) {
        throw new Error('useOverlay must be used inside OverlayProvider');
    }
    return ctx;
}
