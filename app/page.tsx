"use client";

import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, FolderOpen, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { projects, createProject, deleteProject } = useAppStore();
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName("");
      setShowNewProject(false);
    }
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cabinet Builder</h1>
          <p className="text-muted-foreground">
            Design custom cabinets with 3D visualization and automated cut lists
          </p>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => setShowNewProject(!showNewProject)}
            className="gap-2"
            data-testid="new-project-button"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {showNewProject && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>
                Enter a name for your new cabinet design project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., Kitchen Cabinets"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreateProject();
                      }
                      if (e.key === "Escape") {
                        setShowNewProject(false);
                        setNewProjectName("");
                      }
                    }}
                    autoFocus
                    data-testid="project-name-input"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button onClick={handleCreateProject} data-testid="create-project-button">Create</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowNewProject(false);
                      setNewProjectName("");
                    }}
                    data-testid="cancel-project-button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No projects yet. Create your first project to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {project.units.length} unit{project.units.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                      Updated: {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                    <Link href={`/project/${project.id}`}>
                      <Button className="w-full gap-2" variant="outline">
                        <FolderOpen className="h-4 w-4" />
                        Open Project
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
