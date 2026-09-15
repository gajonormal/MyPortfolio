import { 
  SiPython, SiJavascript, SiTypescript, SiDart, SiKotlin, SiPhp,
  SiFlutter, SiReact, SiNextdotjs, SiNodedotjs, SiFlask, SiSpringboot,
  SiFirebase, SiDocker, SiGit, SiGithubactions,
  SiMysql, SiMongodb, SiMariadb, SiNeo4J
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

export interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export const techStack: TechItem[] = [
  // Languages
  { id: "python", name: "Python", category: "Languages", description: "Linguagem versátil usada para backend e scripts.", icon: SiPython, color: "#3776AB" },
  { id: "java", name: "Java", category: "Languages", description: "Linguagem orientada a objetos robusta e escalável.", icon: FaJava, color: "#007396" },
  { id: "javascript", name: "JavaScript", category: "Languages", description: "A linguagem da web, essencial para interatividade.", icon: SiJavascript, color: "#F7DF1E" },
  { id: "typescript", name: "TypeScript", category: "Languages", description: "JavaScript com tipagem forte para código mais seguro.", icon: SiTypescript, color: "#3178C6" },
  { id: "dart", name: "Dart", category: "Languages", description: "Linguagem otimizada para UI, base do Flutter.", icon: SiDart, color: "#0175C2" },
  { id: "kotlin", name: "Kotlin", category: "Languages", description: "Linguagem moderna e concisa para desenvolvimento Android.", icon: SiKotlin, color: "#7F52FF" },
  { id: "php", name: "PHP", category: "Languages", description: "Linguagem de script focada em desenvolvimento web no lado do servidor.", icon: SiPhp, color: "#777BB4" },

  // Frameworks
  { id: "flutter", name: "Flutter", category: "Frameworks", description: "Framework da Google para criar apps nativas multi-plataforma.", icon: SiFlutter, color: "#02569B" },
  { id: "react", name: "React", category: "Frameworks", description: "Biblioteca JavaScript para construção de interfaces de utilizador.", icon: SiReact, color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", category: "Frameworks", description: "Framework React com renderização no servidor (SSR) e geração estática.", icon: SiNextdotjs, color: "#000000" },
  { id: "nodejs", name: "Node.js", category: "Frameworks", description: "Ambiente de execução JavaScript no servidor.", icon: SiNodedotjs, color: "#339933" },
  { id: "flask", name: "Flask", category: "Frameworks", description: "Micro-framework web escrito em Python.", icon: SiFlask, color: "#000000" },
  { id: "springboot", name: "Spring Boot", category: "Frameworks", description: "Framework Java para criar aplicações baseadas em microserviços.", icon: SiSpringboot, color: "#6DB33F" },

  // Cloud/DevOps
  { id: "azure", name: "Azure", category: "Cloud/DevOps", description: "Plataforma de computação em nuvem da Microsoft.", icon: VscAzure, color: "#0089D6" },
  { id: "firebase", name: "Firebase", category: "Cloud/DevOps", description: "Plataforma da Google para desenvolvimento de apps web e mobile.", icon: SiFirebase, color: "#FFCA28" },
  { id: "docker", name: "Docker", category: "Cloud/DevOps", description: "Plataforma de contentorização para criar, testar e implementar aplicações.", icon: SiDocker, color: "#2496ED" },
  { id: "git", name: "Git", category: "Cloud/DevOps", description: "Sistema de controlo de versões distribuído.", icon: SiGit, color: "#F05032" },
  { id: "githubactions", name: "GitHub Actions", category: "Cloud/DevOps", description: "Automação de workflows de CI/CD diretamente no GitHub.", icon: SiGithubactions, color: "#2088FF" },

  // Databases
  { id: "mysql", name: "MySQL", category: "Databases", description: "Sistema de gestão de bases de dados relacionais.", icon: SiMysql, color: "#4479A1" },
  { id: "mongodb", name: "MongoDB", category: "Databases", description: "Base de dados NoSQL orientada a documentos.", icon: SiMongodb, color: "#47A248" },
  { id: "mariadb", name: "MariaDB", category: "Databases", description: "Fork do MySQL criado pela comunidade, focado na performance.", icon: SiMariadb, color: "#003545" },
  { id: "neo4j", name: "Neo4j", category: "Databases", description: "Base de dados orientada a grafos.", icon: SiNeo4J, color: "#4581C3" },
];
