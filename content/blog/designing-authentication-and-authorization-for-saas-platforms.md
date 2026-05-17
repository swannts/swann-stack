---
layout: Post
title: "Designing Authentication and Authorization for SaaS Platforms"
slug: "designing-authentication-and-authorization-for-saas-platforms"
description: "Securing modern multi-tenant SaaS: OAuth2, OpenID Connect, JWT signing keys, and Role-Based Access Control (RBAC) with Keycloak."
category: "System Design"
tags: ["Security", "SaaS", "Authentication", "RBAC", "Keycloak"]
date: "2026-05-13"
images:
  - src: /blog/saas-auth.png
    alt: SaaS Authentication and Authorization Flow Diagram
readingTime: "10 min read"
featured: true
draft: false
---

### Introduction

Securing a Software-as-a-Service (SaaS) platform is one of the most critical aspects of production engineering. A security breach in a multi-tenant platform doesn't just affect one user—it can compromise the data of thousands of business tenants. Designing a secure, scalable, and recruiter-ready **AuthN (Authentication)** and **AuthZ (Authorization)** workflow is essential for senior full-stack success.

---

### 1. Identity Provisioning & OpenID Connect (OIDC)

Rather than rolling custom hashing databases, modern SaaS architectures offload user management to professional **Identity Providers (IDPs)** like Keycloak, Auth0, or AWS Cognito:
*   **Decoupled Auth**: The main application backend never handles raw user passwords, minimizing security vulnerabilities.
*   **SSO (Single Sign-On)**: Users authenticate once and receive tokens valid across multiple subdomains (e.g., `app.domain.com` and `billing.domain.com`).
*   **Standard Tokens**: OIDC utilizes standard JSON Web Tokens (JWT) including Identity Tokens (`id_token`) and Access Tokens (`access_token`).

---

### 2. Multi-Tenant JWT Structure

To support multi-tenancy, JWT access tokens must explicitly encapsulate the user's tenant constraints. A premium SaaS access token looks like this:

```json
{
  "iss": "https://auth.weticket.co/auth/realms/weticket",
  "sub": "usr_92837482",
  "tenant_id": "tenant_company_abc",
  "role": "tenant_admin",
  "permissions": ["tickets:create", "tickets:refund", "billing:view"],
  "exp": 1716382000
}
```

By putting the `tenant_id` directly in the cryptographically signed JWT, downstream microservices can instantly authenticate and scope queries without performing extra database queries to map users to companies.

---

### 3. Verification & API Gateways

The **API Gateway** intercepts incoming requests and performs stateless token verification:
1.  **Signature Verification**: Decrypts the token header and validates the signature using the IDP's public keys (retrieved via the `jwks_uri` endpoint).
2.  **Expiration Check**: Verifies that the current timestamp is less than the `exp` parameter.
3.  **Role/Scope Scrutiny**: Validates if the user's `permissions` array contains the scope required for the destination path (e.g. validating `tickets:create` scope before routing to `/api/v1/tickets`).

---

### 🏗️ Security Architectural Tradeoffs

| Pattern | Pros | Cons | Context |
| :--- | :--- | :--- | :--- |
| **Stateless JWT** | Extremely fast, zero DB lookups, microservice friendly | Token invalidation is difficult before expiration | Distributed scale SaaS |
| **Stateful Sessions** | Immediate user revoking, absolute control | Database lookup bottleneck on every single API request | Standard monolithic apps |
| **Hybrid (Token + Redis Blacklist)** | Fast lookup + instant revoking on logout | Minor cache lookup overhead | High-security financial SaaS |

---

### 💡 Interview Takeaways

*   **OAuth2 Grant Types**: Know when to use **Authorization Code Grant with PKCE** (for single-page apps like React) versus **Client Credentials** (for machine-to-machine APIs).
*   **Replay Attacks**: Explain how using token nonces, HTTPS-only cookies, and short-lived access tokens (15 minutes) with secure refresh tokens mitigates interception attacks.
*   **Tenant Leakage Prevention**: Discuss how validation filters in API gateways prevent a user with tenant A tokens from accessing tenant B data routes.

---
