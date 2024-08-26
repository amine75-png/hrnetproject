import { create } from "zustand";

import { department } from "../Data/mockDepartment";
import { employees } from "../Data/mockEmployee";
import { states } from "../Data/mockState";

export const useEmployeeStore = create((set) => ({
  employees,
  addEmployee: (newEmployee) =>
    set((state) => ({
      employees: [...state.employees, newEmployee],
    })),
}));

export const useAppDataStore = create(() => ({
  states,
  department,
}));

export const useSearchStore = create((set) => ({
  searchQuery: "",
  updateSearch: (newSearchQuery) =>
    set(() => ({
      searchQuery: newSearchQuery.toLowerCase(),
    })),
}));

export const useUserInteractionStore = create((set) => ({
  page: null,
  pageTitle: null,
  updatePageLocation: ({ page, pageTitle }) => set(() => ({ page, pageTitle })),
}));