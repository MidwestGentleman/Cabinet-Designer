import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project, CabinetUnit, UIState } from "@/types";

interface AppState {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  
  // UI state
  ui: UIState;
  
  // Actions
  createProject: (name: string) => void;
  loadProject: (id: string) => void;
  updateProject: (updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  saveProject: () => void;
  
  // Unit actions
  addUnit: (unit: Omit<CabinetUnit, "id">) => void;
  updateUnit: (id: string, updates: Partial<CabinetUnit>) => void;
  removeUnit: (id: string) => void;
  
  // UI actions
  setView: (view: UIState["selectedView"]) => void;
  toggleMeasurements: () => void;
  toggleGrid: () => void;
  selectUnit: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      ui: {
        selectedView: "design",
        showMeasurements: true,
        showGrid: true,
        selectedUnitId: null,
      },
      
      createProject: (name: string) => {
        const now = new Date();
        const project: Project = {
          id: crypto.randomUUID(),
          name,
          createdAt: now,
          updatedAt: now,
          settings: {
            materialThickness: 0.75, // 3/4" default
            materialType: "plywood",
            unitSystem: "imperial",
          },
          units: [],
        };
        
        set((state) => ({
          projects: [...state.projects, project],
          currentProject: project,
        }));
      },
      
      loadProject: (id: string) => {
        const project = get().projects.find((p) => p.id === id);
        if (project) {
          set({ currentProject: project });
        }
      },
      
      updateProject: (updates: Partial<Project>) => {
        const current = get().currentProject;
        if (!current) return;
        
        const updated: Project = {
          ...current,
          ...updates,
          updatedAt: new Date(),
        };
        
        set((state) => ({
          currentProject: updated,
          projects: state.projects.map((p) =>
            p.id === updated.id ? updated : p
          ),
        }));
      },
      
      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProject:
            state.currentProject?.id === id ? null : state.currentProject,
        }));
      },
      
      saveProject: () => {
        const current = get().currentProject;
        if (!current) return;
        
        get().updateProject({ updatedAt: new Date() });
      },
      
      addUnit: (unitData) => {
        const unit: CabinetUnit = {
          ...unitData,
          id: crypto.randomUUID(),
        };
        
        const current = get().currentProject;
        if (!current) return;
        
        get().updateProject({
          units: [...current.units, unit],
        });
      },
      
      updateUnit: (id, updates) => {
        const current = get().currentProject;
        if (!current) return;
        
        get().updateProject({
          units: current.units.map((u) =>
            u.id === id ? { ...u, ...updates } : u
          ),
        });
      },
      
      removeUnit: (id) => {
        const current = get().currentProject;
        if (!current) return;
        
        get().updateProject({
          units: current.units.filter((u) => u.id !== id),
        });
      },
      
      setView: (view) => {
        set((state) => ({
          ui: { ...state.ui, selectedView: view },
        }));
      },
      
      toggleMeasurements: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            showMeasurements: !state.ui.showMeasurements,
          },
        }));
      },
      
      toggleGrid: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            showGrid: !state.ui.showGrid,
          },
        }));
      },
      
      selectUnit: (id) => {
        set((state) => ({
          ui: { ...state.ui, selectedUnitId: id },
        }));
      },
    }),
    {
      name: "cabinet-builder-storage",
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    }
  )
);

