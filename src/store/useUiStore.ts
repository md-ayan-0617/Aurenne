import { create } from 'zustand';
import { CursorState } from '../types';

interface UiStore {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isAppointmentDrawerOpen: boolean;
  appointmentPrefill: {
    service?: string;
    productName?: string;
  };
  cursorState: CursorState;
  cursorText: string;
  activeTheme: string;
  hasPreloaderFinished: boolean;
  activeSectionNumber: string;

  // Actions
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openAppointmentDrawer: (prefill?: { service?: string; productName?: string }) => void;
  closeAppointmentDrawer: () => void;

  setCursor: (state: CursorState, customText?: string) => void;
  resetCursor: () => void;

  setActiveTheme: (theme: string) => void;
  setPreloaderFinished: (finished: boolean) => void;
  setActiveSectionNumber: (num: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  isAppointmentDrawerOpen: false,
  appointmentPrefill: {},
  cursorState: 'default',
  cursorText: '',
  activeTheme: 'obsidian',
  hasPreloaderFinished: false,
  activeSectionNumber: '01',

  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

  openAppointmentDrawer: (prefill = {}) =>
    set({ isAppointmentDrawerOpen: true, appointmentPrefill: prefill }),
  closeAppointmentDrawer: () =>
    set({ isAppointmentDrawerOpen: false, appointmentPrefill: {} }),

  setCursor: (state, customText = '') =>
    set({ cursorState: state, cursorText: customText }),
  resetCursor: () => set({ cursorState: 'default', cursorText: '' }),

  setActiveTheme: (theme) => {
    document.body.setAttribute('data-theme', theme);
    set({ activeTheme: theme });
  },
  setPreloaderFinished: (finished) => set({ hasPreloaderFinished: finished }),
  setActiveSectionNumber: (num) => set({ activeSectionNumber: num }),
}));
