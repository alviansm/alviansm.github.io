---
layout: post
title: "About ShipStabilityLib"
subtitle: "A work-in-progress C++ library dedicated to modeling and computing fundamental concepts of ship stability, inspired by *Ship Stability for Masters and Mates*."
date: 2025-07-15 10:00:00 +0000
categories: [Devlog]
tags: [ship stability]
author: "Alvians Maulana"
image: assets/images/shipstabilitylib/satish-dharmavarapu-8m-ZN9d34G4-unsplash.jpg
permalink: /archive/2025-07-15-about-shipstabilitylib/
---

**ShipStabilityLib** is a work-in-progress C++ library dedicated to modeling and computing fundamental concepts of ship stability, inspired by *Ship Stability for Masters and Mates*. It aims to provide a clear, modular, and well-documented API for anyone interested in marine engineering calculations—from basic buoyancy and equilibrium checks to more advanced stability assessments.

---

## What is ShipStabilityLib?

The library is designed to **bridge theoretical principles of ship stability with practical computation**. It focuses on:

- **Core Stability Principles**  
  Functions to calculate buoyant force, equilibrium difference, and related stability metrics.

- **Structured Modules**  
  Each chapter or concept from the reference materials is implemented as a self-contained module. For example, `Chapter01_Forces` covers fundamental forces like weight and buoyancy.

- **Readable and Documented API**  
  With Doxygen-generated documentation, the library prioritizes clarity and educational value.

---

## Quick Links

- **Source Code Repository:** [github.com/alviansm/ShipStabilityLib](https://github.com/alviansm/ShipStabilityLib)  
- **Documentation (auto-generated):** [alviansm.github.io/ShipStabilityLib/](https://alviansm.github.io/ShipStabilityLib/)

The docs are built using **Doxygen**.

---

## Why Build This Library?

As part of my ongoing journey in **marine engineering and software development**, this library serves several purposes:

- **Learning Aid:** Reinforce theoretical knowledge through hands-on implementation.  
- **Reusable Foundation:** Provide a foundation for future projects, like an interactive Ship Stability desktop application.  
- **Community Contribution:** Offer an accessible and open resource for students, engineers, or anyone curious about ship stability.

---

## Current Status: Work-in-Progress

The library is still in its early stages. At the moment, it includes the basic structure of the library.

Example snippet:

```cpp
/**
 * @brief Compute buoyant force given displaced volume.
 */
double buoyantForce(double displacedVolume, double waterDensity = 1.025);

/**
 * @brief True if weight equals buoyant force within tolerance.
 */
bool isInEquilibrium(double weightShip, double displacedVolume, double waterDensity = 1.025);
```

Cover: Photo by <a href="https://unsplash.com/@satishdharmavarapu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Satish Dharmavarapu</a> on <a href="https://unsplash.com/photos/a-large-red-boat-sitting-on-top-of-a-body-of-water-8m-ZN9d34G4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

