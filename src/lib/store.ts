import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type EyeTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type UserRole = 'Student' | 'Parent' | 'Adult' | null;

interface GameState {
    // User Profile
    role: UserRole;
    isOnboarded: boolean;
    setRole: (role: UserRole) => void;
    completeOnboarding: () => void;

    // Currencies
    ink: number;
    runes: number;
    gems: number;
    addInk: (amount: number) => void;
    addRunes: (amount: number) => void;
    addGems: (amount: number) => void;
    spendInk: (amount: number) => boolean;

    // Progression
    streak: number;
    eyeTier: EyeTier;
    incrementStreak: () => void;
    updateEyeTier: (tier: EyeTier) => void;

    // Session State (Transient)
    // Not persisted usually, but kept here for global access if needed
    lastRunDate: string | null;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            role: null,
            isOnboarded: false,
            setRole: (role) => set({ role }),
            completeOnboarding: () => set({ isOnboarded: true }),

            ink: 0,
            runes: 0,
            gems: 0,
            addInk: (amount) => set((state) => ({ ink: state.ink + amount })),
            addRunes: (amount) => set((state) => ({ runes: state.runes + amount })),
            addGems: (amount) => set((state) => ({ gems: state.gems + amount })),
            spendInk: (amount) => {
                const current = get().ink;
                if (current >= amount) {
                    set({ ink: current - amount });
                    return true;
                }
                return false;
            },

            streak: 0,
            eyeTier: 'Bronze',
            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
            updateEyeTier: (tier) => set({ eyeTier: tier }),

            lastRunDate: null,
        }),
        {
            name: 'book-wardens-storage',
        }
    )
);
