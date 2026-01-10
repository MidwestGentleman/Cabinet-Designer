"use client";

import { useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { z } from "zod";

export default function ProjectPage() {
  const params = useParams();
  const { currentProject, loadProject, addUnit } = useAppStore();
  const projectId = params.id as string;

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  const unitSchema = useMemo(() => {
    const base = {
      width: z.number().positive("Width must be greater than 0"),
      height: z.number().positive("Height must be greater than 0"),
      depth: z.number().positive("Depth must be greater than 0"),
    };

    return z.union([
      z.object({
        type: z.literal("cabinet"),
        ...base,
        numShelves: z
          .number()
          .int("Shelf count must be a whole number")
          .min(0, "Shelves cannot be negative")
          .max(12, "Shelves should be 12 or fewer"),
      }),
      z.object({
        type: z.literal("drawer"),
        ...base,
        numDrawers: z
          .number()
          .int("Drawer count must be a whole number")
          .min(1, "Drawer units need at least one drawer")
          .max(12, "Drawers should be 12 or fewer"),
      }),
    ]);
  }, []);

  const [formValues, setFormValues] = useState({
    type: "cabinet",
    width: "30",
    height: "34.5",
    depth: "24",
    numShelves: "2",
    numDrawers: "3",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleAddUnit = () => {
    const parsed = unitSchema.safeParse({
      type: formValues.type,
      width: Number(formValues.width),
      height: Number(formValues.height),
      depth: Number(formValues.depth),
      numShelves: formValues.type === "cabinet" ? Number(formValues.numShelves) : undefined,
      numDrawers: formValues.type === "drawer" ? Number(formValues.numDrawers) : undefined,
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString() ?? "form";
        nextErrors[field] = issue.message;
      });
      setFormErrors(nextErrors);
      return;
    }

    const totalWidth = currentProject?.units.reduce((sum, unit) => sum + unit.width + 2, 0) ?? 0;
    addUnit({
      type: parsed.data.type,
      width: parsed.data.width,
      height: parsed.data.height,
      depth: parsed.data.depth,
      numShelves: parsed.data.type === "cabinet" ? parsed.data.numShelves : undefined,
      numDrawers: parsed.data.type === "drawer" ? parsed.data.numDrawers : undefined,
      position: {
        x: totalWidth,
        y: 0,
        z: 0,
      },
    });

    setFormErrors({});
  };

  if (!currentProject || currentProject.id !== projectId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>
              The project you&apos;re looking for doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{currentProject.name}</h1>
          <p className="text-muted-foreground">
            Project workspace - Design your cabinets here
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>
              Configure material properties and design parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Material Thickness</p>
                <p className="text-sm text-muted-foreground">
                  {currentProject.settings.materialThickness}&quot; ({currentProject.settings.materialType})
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Units</p>
                <p className="text-sm text-muted-foreground">
                  {currentProject.units.length} unit{currentProject.units.length !== 1 ? "s" : ""} configured
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Cabinet Configuration</CardTitle>
                <CardDescription>
                  Define cabinet units with precise dimensions before generating the 3D scene.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="unit-type">Unit Type</Label>
                    <Select
                      id="unit-type"
                      value={formValues.type}
                      onChange={(event) => updateField("type", event.target.value)}
                    >
                      <option value="cabinet">Cabinet</option>
                      <option value="drawer">Drawer Stack</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="unit-width">Width (in)</Label>
                    <Input
                      id="unit-width"
                      type="number"
                      min="1"
                      step="0.125"
                      value={formValues.width}
                      onChange={(event) => updateField("width", event.target.value)}
                    />
                    {formErrors.width && (
                      <p className="text-xs text-destructive mt-1">{formErrors.width}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="unit-height">Height (in)</Label>
                    <Input
                      id="unit-height"
                      type="number"
                      min="1"
                      step="0.125"
                      value={formValues.height}
                      onChange={(event) => updateField("height", event.target.value)}
                    />
                    {formErrors.height && (
                      <p className="text-xs text-destructive mt-1">{formErrors.height}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="unit-depth">Depth (in)</Label>
                    <Input
                      id="unit-depth"
                      type="number"
                      min="1"
                      step="0.125"
                      value={formValues.depth}
                      onChange={(event) => updateField("depth", event.target.value)}
                    />
                    {formErrors.depth && (
                      <p className="text-xs text-destructive mt-1">{formErrors.depth}</p>
                    )}
                  </div>
                  {formValues.type === "cabinet" ? (
                    <div>
                      <Label htmlFor="unit-shelves">Number of Shelves</Label>
                      <Input
                        id="unit-shelves"
                        type="number"
                        min="0"
                        step="1"
                        value={formValues.numShelves}
                        onChange={(event) => updateField("numShelves", event.target.value)}
                      />
                      {formErrors.numShelves && (
                        <p className="text-xs text-destructive mt-1">{formErrors.numShelves}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="unit-drawers">Number of Drawers</Label>
                      <Input
                        id="unit-drawers"
                        type="number"
                        min="1"
                        step="1"
                        value={formValues.numDrawers}
                        onChange={(event) => updateField("numDrawers", event.target.value)}
                      />
                      {formErrors.numDrawers && (
                        <p className="text-xs text-destructive mt-1">{formErrors.numDrawers}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={handleAddUnit}>Add Unit</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormValues((prev) => ({
                        ...prev,
                        type: "cabinet",
                        width: "30",
                        height: "34.5",
                        depth: "24",
                        numShelves: "2",
                        numDrawers: "3",
                      }));
                      setFormErrors({});
                    }}
                  >
                    Reset Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configured Units</CardTitle>
                <CardDescription>
                  Review units that will drive geometry generation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentProject.units.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No units yet. Add a cabinet or drawer stack to begin.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {currentProject.units.map((unit, index) => (
                      <div
                        key={unit.id}
                        className="rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {index + 1}. {unit.type === "cabinet" ? "Cabinet" : "Drawer Stack"}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {unit.width}" × {unit.height}" × {unit.depth}"
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {unit.type === "cabinet"
                            ? `${unit.numShelves ?? 0} shelves`
                            : `${unit.numDrawers ?? 0} drawers`}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
