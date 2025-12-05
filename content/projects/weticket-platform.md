---
layout: Post
title: WeTicket Event Platform
description: SSR ticketing experience with Laravel microservices, Keycloak SSO, and Stripe payments deployed across AWS.
date: '2024-06-01'
tags:
  - next-js
  - laravel
  - keycloak
logo:
  src: /icons/logo-1.svg
  alt: WeTicket
images:
  - src: /projects/project-1.png
    alt: WeTicket web and mobile views
attributes:
  - label: Duration
    value: 14 Months
  - label: Role
    value: Senior Full Stack & DevOps Engineer
---

Built an event management platform with SSR Next.js frontends backed by Laravel microservices and Keycloak-based authentication.
Stripe handled global payments while Redis caching and API Gateway routing kept latency low. Delivery pipelines on Bitbucket
integrated Cypress and PHPUnit tests, pushing containers to AWS with zero-downtime releases.

#### Highlights
- Implemented Keycloak SSO and JWT flows for organizers, buyers, and vendors.
- Containerized services with Docker and orchestrated rollouts via Kubernetes and Helm charts.
- Added observability using Prometheus metrics and ELK logs to monitor seat inventory and payment success rates.
