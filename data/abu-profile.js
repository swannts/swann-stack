/**
 * Abu Bokor Siddik - Professional CV & Portfolio Profile
 * Senior Full Stack Architect & AI Engineer
 */

export const abuProfile = {
  name: "Abu Bokor Siddik",
  nickname: "Swann",
  title: "Senior Full Stack Architect & AI Engineer",
  subtitle: "Python • Java • Node.js • AI • Cloud • Microservices",
  contact: {
    email: "a.b.siddik.swann@gmail.com",
    phone: "+8801748298069",
    github: "https://github.com/Swannts",
    linkedin: "https://www.linkedin.com/in/swannts/"
  },
  summary: "Senior Full Stack Architect & AI Engineer with 5+ years of experience building scalable production-grade SaaS platforms, cloud-native applications, AI-powered systems, and high-throughput distributed microservices. Specialized in Python, Java, Node.js, React, and modern AI engineering architectures including autonomous AI agents, advanced RAG pipelines, and model context protocols (MCP).",
  skills: {
    languages: ["Python", "Java", "Node.js", "TypeScript", "JavaScript", "PHP", "HTML5", "CSS3"],
    backend: ["FastAPI", "Django", "Spring Boot", "Express.js", "NestJS", "Laravel"],
    frontend: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux Toolkit", "Styled Components"],
    ai_engineering: [
      "AI Agents", "RAG (Retrieval-Augmented Generation)", "Model Context Protocol (MCP)", 
      "Tool Calling", "Function Calling", "Prompt Engineering", 
      "Vector Databases (pgvector, Pinecone)", "Embeddings", "LLMOps", "AI Observability"
    ],
    cloud_devops: ["Docker", "Kubernetes", "AWS (EKS, ECS, S3)", "Azure", "Terraform", "CI/CD (GitHub Actions)", "Nginx"],
    databases_messaging: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "WebSockets", "REST APIs", "GraphQL"]
  },
  experience: [
    {
      role: "Senior Software Engineer Team Lead",
      company: "ScaleBridger",
      period: "Sep 2025 – Apr 2026",
      highlights: [
        "Led engineering team of full-stack developers in constructing highly performant cloud solutions.",
        "Architected scalable backend microservices using Node.js/TypeScript and Python FastAPI.",
        "Engineered secure, automated CI/CD deployment pipelines on AWS infrastructure.",
        "Introduced rigorous code review guidelines and state-management best practices with React/Next.js."
      ]
    },
    {
      role: "Senior Software Engineer",
      company: "MYM Manager",
      period: "Mar 2025 – Sep 2025",
      highlights: [
        "Designed and maintained core backend services for a complex high-traffic SaaS business portal.",
        "Optimized real-time workflows and notifications using WebSockets and Redis caching, cutting retrieval latency by 40%.",
        "Refactored legacy CRM modules into clean, maintainable microservice architectures.",
        "Managed database performance optimizations, complex migrations, and indexing strategies on PostgreSQL."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Wise Minds & WeTicket",
      period: "Feb 2023 – May 2025",
      highlights: [
        "Developed custom high-concurrency transactional ticketing engines using Laravel and Next.js.",
        "Integrated robust multi-tenant authentication patterns with Keycloak SSO.",
        "Implemented secure global transactional flows via Stripe Payments including automatic invoice generation and webhooks.",
        "Designed high-performance server-side rendered (SSR) web portals, maximizing SEO and speed scores."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Fortunatis GmbH",
      period: "Aug 2021 – Mar 2024",
      highlights: [
        "Built dynamic modern client-facing applications using React and TypeScript.",
        "Developed and maintained containerized microservices deployed on AWS Kubernetes (EKS).",
        "Optimized Docker container sizing and streamlined localized development configurations.",
        "Designed high-efficiency RESTful APIs and integrated relational PostgreSQL databases."
      ]
    }
  ],
  projects: [
    {
      name: "WeTicket Platform",
      tech: ["Laravel", "React", "Next.js", "Stripe", "Keycloak", "PostgreSQL"],
      description: "A highly scalable transactional ticketing platform designed to manage extreme peak loads during ticket drops.",
      details: {
        problem: "Existing ticketing systems failed under concurrent spikes when popular tickets dropped, causing service disruption and double bookings.",
        solution: "Engineered a custom high-performance transactional ticketing engine with Redis-based queue locks and Keycloak SSO integration.",
        architecture: "Decoupled Next.js frontend with Laravel modular monolith backend, backed by PostgreSQL and managed by Nginx.",
        myRole: "Full Stack Developer - responsible for Stripe global payments flow, Keycloak identity provisioning, and high-concurrency ticket reservation locks."
      }
    },
    {
      name: "MYM Manager",
      tech: ["Node.js", "React", "Redis", "WebSockets", "PostgreSQL"],
      description: "A comprehensive SaaS CRM and workflow automation platform serving thousands of daily active business users.",
      details: {
        problem: "Slow updates and cascading renders in the legacy UI caused poor user engagement, while concurrent database queries created transaction lockouts.",
        solution: "Refactored the core state system with Redux Toolkit and introduced WebSocket-based real-time state broadcasts backed by Redis.",
        architecture: "Event-driven microservices architecture using Express/NestJS, communicating via Redis Pub/Sub, with a sleek React UI.",
        myRole: "Senior Software Engineer - refactored state persistence, optimized Odoo CRM integration routines, and reduced API gateway timeout rates."
      }
    },
    {
      name: "TRPS Platform",
      tech: ["React", "Node.js", "Microservices", "Docker", "Kubernetes", "AWS"],
      description: "A robust enterprise-grade distributed platform serving transactional backend capabilities.",
      details: {
        problem: "Rigid monolithic infrastructure limited developer velocity and made independent scaling of billing and user portals impossible.",
        solution: "Migrated legacy monolith to containerized, cloud-native microservices orchestrated by Kubernetes on AWS EKS.",
        architecture: "Microservices design using Docker, Kubernetes, API Gateway routing, and Kafka for asynchronous inter-service communication.",
        myRole: "Lead System Architect - designed overall service-discovery patterns, CI/CD pipelines, and led the multi-tenant migration strategy."
      }
    },
    {
      name: "SwannStack AI Knowledge Platform",
      tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "RAG", "Vector DB", "Embeddings"],
      description: "An advanced developer knowledge search platform leveraging state-of-the-art AI retrieval techniques.",
      details: {
        problem: "Standard documentation search was too literal, failing to understand conceptual developer intents or provide actionable code answers.",
        solution: "Built a semantic RAG platform that vectorizes developer articles and utilizes advanced reranking for high-precision LLM prompt generation.",
        architecture: "Next.js visual client, Python FastAPI AI orchestration server, Pinecone Vector database, and PostgreSQL database.",
        myRole: "AI Engineer - designed the semantic ingestion pipeline, implemented hybrid keyword/semantic search, and designed custom prompt-grounding guardrails."
      }
    }
  ],
  education: {
    degree: "Bachelor of Science in Information and Communication Engineering",
    university: "Bangladesh Army University of Engineering and Technology"
  },
  availability: "Open for senior full-stack architect, backend, AI agent engineering, and remote SaaS leadership roles."
}

export default abuProfile
