"use client";

import { useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  const { currentProject, loadProject } = useAppStore();
  const projectId = params.id as string;

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

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
          <Card>
            <CardHeader>
              <CardTitle>Design Area</CardTitle>
              <CardDescription>
                3D visualization and configuration will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Design interface coming soon...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

