---
lang: "en"
slug: "a-story-about-shaders"
title: "A Story about shaders"
description:
  "Notes about shaders, what they are, how they work, and how they evolved over time. If
  you are a interested in shaders, you may find this post useful. To the GPU and beyond!"
pubDate: 2025-03-12
draft: true
---

Shaders are small programs that run on your GPU rather than your CPU. They are written in
a language called GLSL (OpenGL Shading Language), which is similar to the C language.

While shaders are primarily used for rendering graphics, they are also widely used in
other fields like AI, physics simulations, and scientific computing. This because the GPU
is highly optimized for parallel processing.

## The origin of the name

The term _"shader"_ comes from its original purpose: **shading** objects in computer
graphics. Shading refers to how light interacts with surfaces, affecting their appearance
(color, brightness, shadowing, reflections, etc).

- Early computer graphics needed a way to determine how objects should look based on
  lighting conditions.
- Programs were written to calculate light reflection, shadows, and color variations,
  these were called **shading algorithms**.
- When these algorithms became more sophisticated and were moved to specialized GPU
  programs, they were named **shaders**.

## The evolution of shaders

At first, shaders were fixed-function (predefined lighting and shading models). Later,
they became **programmable**, allowing developers to write custom shader programs. Beyond
simple shading effects.

Today, shaders do much more than just shading. They are used for:

- _Vertex transformations_ (moving 3D objects, morphing geometry, etc).
- _Post-processing effects_ (blur, glow, color correction, etc).
- _Physics simulations_ (water ripples, cloth simulation, etc).
- _AI and general computing_ (neural networks, cryptography, scientific computing, etc).

Despite this evolution, the name **"shader"** has stuck, even though modern shaders do
much more than just shading.
