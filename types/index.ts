// Material types
export type MaterialType = "plywood" | "mdf" | "hardwood" | "other";

// Unit configuration types
export type UnitType = "cabinet" | "drawer";

// Project and unit types
export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  settings: ProjectSettings;
  units: CabinetUnit[];
}

export interface ProjectSettings {
  materialThickness: number; // inches
  materialType: MaterialType;
  unitSystem: "imperial";
}

export interface CabinetUnit {
  id: string;
  type: UnitType;
  width: number; // inches
  height: number; // inches
  depth: number; // inches
  
  // Cabinet-specific
  numShelves?: number;
  shelfSpacing?: number; // inches, auto-calculated if not provided
  
  // Drawer-specific
  numDrawers?: number;
  drawerHeights?: number[]; // inches, auto-calculated if not provided
  
  // Position (for multi-unit designs)
  position: {
    x: number;
    y: number;
    z: number;
  };
}

// Cut list types
export interface CutList {
  pieces: CutPiece[];
  sheets: SheetLayout[];
  wastePercentage: number;
  totalSheets: number;
}

export interface CutPiece {
  id: string;
  name: string; // e.g., "Top Panel", "Side Panel", "Shelf 1"
  width: number; // inches
  height: number; // inches
  quantity: number;
  material: MaterialType;
  grainDirection?: "horizontal" | "vertical";
}

export interface SheetLayout {
  sheetId: number;
  pieces: PlacedPiece[];
  wasteArea: number; // square inches
  utilization: number; // percentage
}

export interface PlacedPiece extends CutPiece {
  x: number; // position on sheet (inches from left)
  y: number; // position on sheet (inches from bottom)
  rotation: 0 | 90; // degrees
}

// UI state types
export interface UIState {
  selectedView: "design" | "cutlist" | "export";
  showMeasurements: boolean;
  showGrid: boolean;
  selectedUnitId: string | null;
}

