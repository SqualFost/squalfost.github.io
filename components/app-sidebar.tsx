"use client";

import { Timer, Book, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const router = useRouter();
  // Utilisation useTheme (hook) pour gérer le thème
  const { theme, toggleTheme } = useTheme();

  // Quels éléments iront dans le menu de la sidebar
  const items = [
    { title: "Absences / Retards", url: "/absences", icon: Timer },
    { title: "Réservations", url: "/", icon: Book },
  ];

  // Fonction de gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login"); // Redirection vers la page de login
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex flex-col h-full">
        <div className="sr-only">
          <h2>Menu de navigation</h2>
          <p>Accédez aux différentes sections du site</p>
        </div>
        <SidebarGroup className="flex flex-col h-full justify-between">
          <SidebarGroupLabel className="flex items-center justify-center my-4">
            <Avatar>
              <AvatarImage alt="avatar de l'utilisateur" src="/globe.svg" />
              <AvatarFallback>TG</AvatarFallback>
            </Avatar>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent className="mt-auto p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={toggleTheme}>
                  <Button variant="ghost" aria-label="Changer le thème">
                    {theme === "dark" ? <Sun /> : <Moon />}
                    <span>
                      {theme === "dark" ? "Mode clair" : "Mode sombre"}
                    </span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator className="my-2" />
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleLogout}>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label="Se déconnecter"
                  >
                    <LogOut />
                    <span>Se déconnecter</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
