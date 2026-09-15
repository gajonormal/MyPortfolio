export interface Project {
  id: string;
  title: string;
  category: string;
  color: string;
  isNew: boolean;
  slug: string;
}

export const projects: Project[] = [
  { id: "1", title: "Projeto Alpha", category: "frontend", color: "#1a1a1a", isNew: true, slug: "projeto-alpha" },
  { id: "2", title: "Sistema Beta", category: "backend", color: "#4a0000", isNew: true, slug: "sistema-beta" },
  { id: "3", title: "App Gamma", category: "mobile", color: "#3d3d3d", isNew: false, slug: "app-gamma" },
  { id: "4", title: "Design Delta", category: "ui/ux", color: "#1a331a", isNew: false, slug: "design-delta" },
  { id: "5", title: "Jogo Epsilon", category: "jogos", color: "#8c4600", isNew: false, slug: "jogo-epsilon" },
  { id: "6", title: "Script Zeta", category: "scripts", color: "#2b2b2b", isNew: false, slug: "script-zeta" },
  { id: "7", title: "Portal Eta", category: "frontend", color: "#666666", isNew: false, slug: "portal-eta" },
  { id: "8", title: "API Theta", category: "backend", color: "#222222", isNew: false, slug: "api-theta" },
  { id: "9", title: "Dashboard Iota", category: "frontend", color: "#5a0000", isNew: false, slug: "dashboard-iota" },
  { id: "10", title: "Ferramenta Kappa", category: "scripts", color: "#111111", isNew: false, slug: "ferramenta-kappa" },
  { id: "11", title: "App Lambda", category: "mobile", color: "#8b7d6b", isNew: false, slug: "app-lambda" },
  { id: "12", title: "UX Mu", category: "ui/ux", color: "#4a004a", isNew: false, slug: "ux-mu" },
  { id: "13", title: "Plataforma Nu", category: "backend", color: "#333333", isNew: false, slug: "plataforma-nu" },
  { id: "14", title: "Website Xi", category: "frontend", color: "#3a5c6e", isNew: false, slug: "website-xi" },
];
