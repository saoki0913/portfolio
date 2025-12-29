"use client";

import { Code2 } from 'lucide-react';
import {
    SiReact, SiVuedotjs, SiAngular, SiNextdotjs, SiSvelte, SiTailwindcss,
    SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiPhp,
    SiNodedotjs, SiExpress, SiNestjs, SiFastapi, SiDjango, SiFlask, SiSpring,
    SiGraphql, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiElasticsearch,
    SiFirebase, SiDocker, SiKubernetes, SiGooglecloud,
    SiGithubactions, SiTerraform, SiGit,
    SiPytorch, SiTensorflow, SiKeras, SiScikitlearn, SiOpenai,
    SiGoogleanalytics, SiGrafana, SiKibana, SiPrometheus,
    SiAuth0, SiJsonwebtokens, SiAdobeacrobatreader,
    SiLinux, SiRos,
    SiSupabase, SiVercel, SiMui, SiPydantic
} from 'react-icons/si';

import { FaServer, FaSearchengin, FaJava, FaAws, FaMicrosoft } from 'react-icons/fa';
import { TbApi, TbLock, TbFileText, TbBrain, TbBrandCSharp, TbLink, TbDatabase, TbCloudComputing } from 'react-icons/tb';

type TechIconProps = {
    tech: string;
    className?: string;
};

export function TechIcon({ tech, className = "w-6 h-6" }: TechIconProps) {
    // 技術名を小文字に変換して比較する
    const techLower = tech.toLowerCase();

    // 技術に応じた色を定義
    let color = "";
    let IconComponent: React.ElementType = Code2;

    // Frontend Frameworks & Libraries
    if (techLower.includes('react')) {
        color = "#61DAFB"; // React Blue
        IconComponent = SiReact;
    } else if (techLower.includes('vue')) {
        color = "#4FC08D"; // Vue Green
        IconComponent = SiVuedotjs;
    } else if (techLower.includes('angular')) {
        color = "#DD0031"; // Angular Red
        IconComponent = SiAngular;
    } else if (techLower.includes('next.js') || techLower.includes('nextjs')) {
        color = "#000000"; // Next.js Black
        IconComponent = SiNextdotjs;
    } else if (techLower.includes('svelte')) {
        color = "#FF3E00"; // Svelte Orange
        IconComponent = SiSvelte;
    } else if (techLower.includes('tailwind')) {
        color = "#06B6D4"; // Tailwind Blue
        IconComponent = SiTailwindcss;
    } else if (techLower.includes('mui') || techLower.includes('material-ui') || techLower.includes('material ui')) {
        color = "#007FFF"; // MUI Blue
        IconComponent = SiMui;
    }

    // Programming Languages
    else if (techLower.includes('typescript')) {
        color = "#3178C6"; // TypeScript Blue
        IconComponent = SiTypescript;
    } else if (techLower.includes('javascript')) {
        color = "#F7DF1E"; // JavaScript Yellow
        IconComponent = SiJavascript;
    } else if (techLower.includes('python')) {
        color = "#3776AB"; // Python Blue
        IconComponent = SiPython;
    } else if (techLower.includes('go') || techLower.includes('golang')) {
        color = "#00ADD8"; // Go Blue
        IconComponent = SiGo;
    } else if (techLower.includes('rust')) {
        color = "#000000"; // Rust Black
        IconComponent = SiRust;
    } else if (techLower.includes('java')) {
        color = "#007396"; // Java Blue
        IconComponent = FaJava;
    } else if (techLower.includes('c#') || techLower.includes('csharp')) {
        color = "#239120"; // C# Green
        IconComponent = TbBrandCSharp;
    } else if (techLower.includes('php')) {
        color = "#777BB4"; // PHP Purple
        IconComponent = SiPhp;
    }

    // Operating Systems & Platforms
    else if (techLower.includes('linux')) {
        color = "#FCC624"; // Linux Yellow
        IconComponent = SiLinux;
    } else if (techLower.includes('ros')) {
        color = "#22314E"; // ROS Blue
        IconComponent = SiRos;
    }

    // Backend Frameworks
    else if (techLower.includes('node')) {
        color = "#339933"; // Node.js Green
        IconComponent = SiNodedotjs;
    } else if (techLower.includes('express')) {
        color = "#000000"; // Express Black
        IconComponent = SiExpress;
    } else if (techLower.includes('nest')) {
        color = "#E0234E"; // NestJS Red
        IconComponent = SiNestjs;
    } else if (techLower.includes('fastapi')) {
        color = "#009688"; // FastAPI Teal
        IconComponent = SiFastapi;
    } else if (techLower.includes('django')) {
        color = "#092E20"; // Django Green
        IconComponent = SiDjango;
    } else if (techLower.includes('flask')) {
        color = "#000000"; // Flask Black
        IconComponent = SiFlask;
    } else if (techLower.includes('spring')) {
        color = "#6DB33F"; // Spring Green
        IconComponent = SiSpring;
    } else if (techLower.includes('graphql')) {
        color = "#E10098"; // GraphQL Pink
        IconComponent = SiGraphql;
    } else if (techLower.includes('pydantic')) {
        color = "#E92063"; // Pydantic Pink
        IconComponent = SiPydantic;
    } else if (techLower.includes('uvicorn')) {
        color = "#499848"; // Uvicorn Green
        IconComponent = FaServer;
    }

    // Databases
    else if (techLower.includes('postgres')) {
        color = "#336791"; // PostgreSQL Blue
        IconComponent = SiPostgresql;
    } else if (techLower.includes('mysql')) {
        color = "#4479A1"; // MySQL Blue
        IconComponent = SiMysql;
    } else if (techLower.includes('sqlite')) {
        color = "#003B57"; // SQLite Blue
        IconComponent = SiPostgresql;
    } else if (techLower.includes('sql')) {
        color = "#4479A1"; // SQL Blue
        IconComponent = SiMysql;
    } else if (techLower.includes('mongo')) {
        color = "#47A248"; // MongoDB Green
        IconComponent = SiMongodb;
    } else if (techLower.includes('redis')) {
        color = "#DC382D"; // Redis Red
        IconComponent = SiRedis;
    } else if (techLower.includes('elasticsearch')) {
        color = "#005571"; // Elasticsearch Blue
        IconComponent = SiElasticsearch;
    } else if (techLower.includes('firestore')) {
        color = "#FFCA28"; // Firestore Yellow
        IconComponent = SiFirebase;
    } else if (techLower.includes('supabase')) {
        color = "#3ECF8E"; // Supabase Green
        IconComponent = SiSupabase;
    } else if (techLower.includes('cosmos')) {
        color = "#0078D4"; // Azure Cosmos DB Blue
        IconComponent = TbDatabase;
    }

    // Cloud & Infrastructure
    else if (techLower.includes('docker')) {
        color = "#2496ED"; // Docker Blue
        IconComponent = SiDocker;
    } else if (techLower.includes('kubernetes') || techLower.includes('k8s')) {
        color = "#326CE5"; // Kubernetes Blue
        IconComponent = SiKubernetes;
    } else if (techLower.includes('azure openai')) {
        color = "#0078D4"; // Azure OpenAI Blue
        IconComponent = SiOpenai;
    } else if (techLower.includes('azure function')) {
        color = "#0078D4"; // Azure Functions Blue
        IconComponent = FaServer;
    } else if (techLower.includes('azure static web')) {
        color = "#0078D4"; // Azure Static Web Apps Blue
        IconComponent = TbCloudComputing;
    } else if (techLower.includes('azure ai search') || techLower.includes('azure cognitive')) {
        color = "#0078D4"; // Azure AI Search Blue
        IconComponent = FaSearchengin;
    } else if (techLower.includes('azure document intelligence')) {
        color = "#0078D4"; // Azure Document Intelligence Blue
        IconComponent = TbFileText;
    } else if (techLower.includes('azure')) {
        color = "#0078D4"; // Azure Blue
        IconComponent = FaMicrosoft;
    } else if (techLower.includes('vercel')) {
        color = "#000000"; // Vercel Black
        IconComponent = SiVercel;
    } else if (techLower.includes('render')) {
        color = "#46E3B7"; // Render Green
        IconComponent = TbCloudComputing;
    } else if (techLower.includes('aws')) {
        color = "#FF9900"; // AWS Orange
        IconComponent = FaAws;
    } else if (techLower.includes('google cloud') || techLower.includes('gcp')) {
        color = "#4285F4"; // Google Cloud Blue
        IconComponent = SiGooglecloud;
    } else if (techLower.includes('firebase')) {
        color = "#FFCA28"; // Firebase Yellow
        IconComponent = SiFirebase;
    } else if (techLower.includes('function') || techLower.includes('lambda')) {
        color = "#FF9900"; // Lambda Orange
        IconComponent = FaServer;
    } else if (techLower.includes('github action')) {
        color = "#2088FF"; // GitHub Actions Blue
        IconComponent = SiGithubactions;
    } else if (techLower.includes('terraform')) {
        color = "#7B42BC"; // Terraform Purple
        IconComponent = SiTerraform;
    } else if (techLower.includes('git')) {
        color = "#F05032"; // Git Orange
        IconComponent = SiGit;
    }

    // AI & ML
    else if (techLower.includes('pytorch')) {
        color = "#EE4C2C"; // PyTorch Orange
        IconComponent = SiPytorch;
    } else if (techLower.includes('tensorflow')) {
        color = "#FF6F00"; // TensorFlow Orange
        IconComponent = SiTensorflow;
    } else if (techLower.includes('keras')) {
        color = "#D00000"; // Keras Red
        IconComponent = SiKeras;
    } else if (techLower.includes('scikit') || techLower.includes('sklearn')) {
        color = "#F7931E"; // Scikit-learn Orange
        IconComponent = SiScikitlearn;
    } else if (techLower.includes('openai')) {
        color = "#412991"; // OpenAI Purple
        IconComponent = SiOpenai;
    } else if (techLower.includes('gpt')) {
        color = "#412991"; // GPT Purple
        IconComponent = SiOpenai;
    } else if (techLower.includes('langchain')) {
        color = "#1C3C3C"; // LangChain Dark Green
        IconComponent = TbLink;
    } else if (techLower.includes('rag') || techLower.includes('retrieval')) {
        color = "#6366F1"; // RAG Indigo
        IconComponent = TbBrain;
    } else if (techLower.includes('深層学習') || techLower.includes('deep learning')) {
        color = "#FF6F00"; // Deep Learning Orange
        IconComponent = TbBrain;
    } else if (techLower.includes('ai') || techLower.includes('intelligence') || techLower.includes('ml')) {
        color = "#00A0D6"; // AI Blue
        IconComponent = TbBrain;
    }

    // Search & Analytics
    else if (techLower.includes('search')) {
        color = "#4285F4"; // Search Blue
        IconComponent = FaSearchengin;
    } else if (techLower.includes('google analytics')) {
        color = "#E37400"; // Google Analytics Orange
        IconComponent = SiGoogleanalytics;
    } else if (techLower.includes('analytics')) {
        color = "#E37400"; // Analytics Orange
        IconComponent = SiGoogleanalytics;
    } else if (techLower.includes('grafana')) {
        color = "#F46800"; // Grafana Orange
        IconComponent = SiGrafana;
    } else if (techLower.includes('kibana')) {
        color = "#005571"; // Kibana Blue
        IconComponent = SiKibana;
    } else if (techLower.includes('prometheus')) {
        color = "#E6522C"; // Prometheus Orange
        IconComponent = SiPrometheus;
    }

    // Microsoft Services
    else if (techLower.includes('sharepoint')) {
        color = "#0078D4"; // SharePoint Blue
        IconComponent = FaMicrosoft;
    } else if (techLower.includes('microsoft graph') || techLower.includes('graph api')) {
        color = "#0078D4"; // Microsoft Graph Blue
        IconComponent = TbApi;
    } else if (techLower.includes('msal')) {
        color = "#0078D4"; // MSAL Blue
        IconComponent = TbLock;
    }

    // Networking & Security
    else if (techLower.includes('api')) {
        color = "#00A0D6"; // API Blue
        IconComponent = TbApi;
    } else if (techLower.includes('auth0')) {
        color = "#EB5424"; // Auth0 Orange
        IconComponent = SiAuth0;
    } else if (techLower.includes('jwt')) {
        color = "#000000"; // JWT Black
        IconComponent = SiJsonwebtokens;
    } else if (techLower.includes('auth') || techLower.includes('oauth')) {
        color = "#0066CC"; // Auth Blue
        IconComponent = TbLock;
    }

    // Document & Content
    else if (techLower.includes('pdf')) {
        color = "#EC1C24"; // PDF Red
        IconComponent = SiAdobeacrobatreader;
    } else if (techLower.includes('document')) {
        color = "#4285F4"; // Document Blue
        IconComponent = TbFileText;
    }

    // スタイルオブジェクトを作成
    const style = { color };

    // 色付きのアイコンを返す
    return <IconComponent className={className} style={style} />;
} 
