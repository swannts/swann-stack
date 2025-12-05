---
layout: Post
title: BikeFixUp Multi-Vendor Service Marketplace
description: Cross-platform booking marketplace with React web, NestJS backend, and PostgreSQL multi-tenant data model.
date: '2023-11-15'
tags:
  - react
  - nestjs
  - postgres
logo:
  src: /icons/logo-2.svg
  alt: BikeFixUp
images:
  - src: /projects/project-2.png
    alt: BikeFixUp customer and vendor portals
attributes:
  - label: Duration
    value: 10 Months
  - label: Role
    value: Full Stack Engineer
---

Delivered a multi-vendor marketplace enabling bike shops to manage bookings, inventory, and payouts. Built modular NestJS
microservices with Redis caching and RabbitMQ events, while React and React Native clients shared GraphQL/REST APIs for realtime
updates.

#### Highlights
- Architected PostgreSQL schemas for vendors, services, and payout flows with transactional guarantees.
- Added Stripe Connect for vendor settlements and automated invoicing.
- Deployed CI/CD through GitHub Actions with container scans, contract tests, and blue/green releases to AWS ECS.
