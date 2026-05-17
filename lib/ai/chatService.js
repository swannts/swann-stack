import abuProfile from '../../data/abu-profile'

/**
 * Intelligent keyword-based heuristic matcher for local offline mode.
 * Evaluates intents and returns strict, profile-grounded answers without hallucinations.
 */
export function getOfflineMockResponse(query) {
  const q = query.toLowerCase().trim();

  // Contact intent
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire')) {
    return `### 📞 Contact Abu Bokor Siddik
*   **Email:** [a.b.siddik.swann@gmail.com](mailto:a.b.siddik.swann@gmail.com)
*   **Phone / WhatsApp:** +8801748298069
*   **LinkedIn:** [linkedin.com/in/swannts](https://www.linkedin.com/in/swannts/)
*   **GitHub:** [github.com/Swannts](https://github.com/Swannts)
*   **Availability:** Open for senior full-stack, backend, AI agent engineering, and remote SaaS leadership roles.
\n\nFeel free to reach out directly for hiring opportunities!`;
  }

  // Skills intent
  if (q.includes('skills') || q.includes('languages') || q.includes('tech') || q.includes('stack') || q.includes('database') || q.includes('framework')) {
    return `### 🛠️ Abu's Technical Skill Matrix
Abu is a multi-disciplinary **Senior Full Stack Architect & AI Engineer** with extensive experience across several modern stacks:
*   **Core Languages:** Python, Java, Node.js, TypeScript, JavaScript, PHP
*   **Backend Frameworks:** FastAPI, Django, Spring Boot, NestJS, Express.js, Laravel
*   **Frontend Technologies:** React, Next.js, TypeScript, TailwindCSS, Redux Toolkit
*   **AI Engineering:** AI Agents, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Tool/Function Calling, Prompt Engineering, Vector DBs (pgvector, Pinecone), Embeddings, LLMOps, AI Observability
*   **Cloud & DevOps:** Docker, Kubernetes (AWS EKS), Terraform, AWS, Azure, CI/CD (GitHub Actions), Nginx
*   **Databases & Messaging:** PostgreSQL, MySQL, MongoDB, Redis, Apache Kafka, RabbitMQ, WebSockets, REST APIs, GraphQL`;
  }

  // AI experience intent
  if (q.includes('ai') || q.includes('agent') || q.includes('rag') || q.includes('mcp') || q.includes('prompt') || q.includes('vector') || q.includes('llm') || q.includes('embeddings')) {
    return `### 🤖 AI Engineering & LLM Architecture
Abu specializes in designing advanced AI agents and robust retrieval pipelines:
*   **SwannStack AI Knowledge Platform:** Built a semantic RAG platform leveraging high-performance FastAPI, Next.js, and Pinecone vector search for intent-based document indexing.
*   **Agentic Workflows:** Expertise in tool calling, multi-agent frameworks, prompt-grounding guardrails, and model-context-protocols (MCP).
*   **LLMOps:** Experienced in optimizing latency, cold starts, managing context windows, and embedding caching strategies for production-grade AI deployments.`;
  }

  // Experience timeline intent
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('history') || q.includes('career') || q.includes('role') || q.includes('company')) {
    const jobs = abuProfile.experience.map(job => 
      `*   **${job.role}** at **${job.company}** (${job.period})\n` +
      job.highlights.map(h => `    - ${h}`).join('\n')
    ).join('\n\n');
    
    return `### 💼 Professional Experience Timeline
Abu has 5+ years of experience leading teams and building SaaS platforms:
\n\n${jobs}`;
  }

  // Projects intent
  if (q.includes('project') || q.includes('portfolio') || q.includes('weticket') || q.includes('mym') || q.includes('trps') || q.includes('swannstack')) {
    const projects = abuProfile.projects.map(proj => 
      `*   **${proj.name}** — *Tech Stack:* ${proj.tech.join(', ')}\n` +
      `    ${proj.description}\n` +
      `    *My Role:* ${proj.details.myRole}`
    ).join('\n\n');

    return `### 🏗️ Key Engineering Projects
Abu has engineered several high-performance distributed platforms:
\n\n${projects}`;
  }

  // Cloud & Microservices intent
  if (q.includes('cloud') || q.includes('microservice') || q.includes('docker') || q.includes('kubernetes') || q.includes('aws') || q.includes('eks') || q.includes('kafka') || q.includes('rabbitmq')) {
    return `### ☁️ Cloud Architecture & Distributed Systems
Abu excels in constructing highly scalable cloud-native architectures:
*   **Kubernetes & Orchestration:** Built and managed microservice environments deployed on AWS EKS (Kubernetes) and containerized workflows with Docker.
*   **Message Queues & Event Streaming:** Implemented asynchronous communications and high-throughput systems using Apache Kafka and RabbitMQ.
*   **API Gateways & Caching:** Scaled microservices with Nginx routers, GraphQL endpoints, and real-time state synchronization using WebSockets and Redis caching.`;
  }

  // Default helpful fall-through (answers grounded summary)
  return `### Hello! I am the "Ask Abu AI" Assistant 🤖
I am currently operating in **Local Grounded Mock Mode** because no external Groq API key is configured. However, I can answer any questions about Abu's background directly from his verified CV profile!

Abu Bokor Siddik is a **Senior Full Stack Architect & AI Engineer** with 5+ years of experience specializing in:
*   **Python, Java, & Node.js** microservices and backend API development.
*   **AI Agents, Advanced RAG systems, & Vector Search** pipelines.
*   **AWS, Docker, Kubernetes (EKS), & Terraform** cloud-native deployments.
*   **Event-Driven Pipelines** utilizing Kafka, RabbitMQ, and WebSockets.

*Try asking me about "skills", "experience", "projects", "AI background", or "how to contact Abu".*`;
}
