---
layout: Post
title: MMOGAH Gaming Marketplace
description: High-traffic digital goods marketplace with scalable caching, queueing, and observability.
date: '2021-12-12'
tags:
  - spring-boot
  - redis
  - kafka
logo:
  src: /icons/logo-2.svg
  alt: MMOGAH
images:
  - src: /projects/project-6.png
    alt: MMOGAH marketplace
attributes:
  - label: Duration
    value: 9 Months
  - label: Role
    value: Senior Backend Engineer
---

Re-engineered backend services to handle gaming marketplace spikes with Spring Boot and Redis caching. Introduced Kafka-based
event pipelines for order processing and fraud detection, paired with React optimizations for storefront performance.

#### Highlights
- Added circuit breakers and retries to protect downstream payment and inventory systems.
- Built Grafana dashboards and Sentry alerting to trace drops in conversion and page performance.
- Tuned PostgreSQL indexing and read replicas to sustain peak marketplace traffic.
