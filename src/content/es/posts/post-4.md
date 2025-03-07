---
title: "Building a macOS Desktop Manager - Pt 1"
description: "I've decided that I'm doing a fps, it has to be fun and multiplayer those are the only two requirements, on this post I'm gonna familiarize with the game engine and other stuff."
date: 2025-01-06
slug: building-a-macos-desktop-manager-pt-1
status: ready
---

I've always used my desktop as a workbench for all my projects. However, switching between projects often gets messy, so I thought, "Why not create a solution?" So, here I am, building a macOS desktop manager.

## The Problem

When working on a project, I like to keep all files and directories related to that project on my desktop. This makes it easy to quickly access everything I need and helps me maintain focus on my current task.

The issue is that I rarely work on just one project at a time, I work on multiple things simultaneously. So, my desktop gets cluttered with files and directories from different projects. This makes it hard to find the files I need quickly, and it’s also a bit distracting.

## The Idea

The idea is to build a tool that helps me organize my desktop. I want to build a macOS status bar app that lets me create workspaces. These workspaces will be like containers for all the files and directories related to a project.

Each workspace will be a simple directory that contains files and directories. All workspaces will be stored on my drive, making it easy to switch between them.

For example, when I start working on project A and create its workspace, my desktop starts empty. As I add files and directories to my desktop, they automatically become part of project A's workspace.

If I then create and switch to a workspace for project B, my desktop clears again. Now any files I add to my desktop belong to project B's workspace.

This lets me switch seamlessly between workspaces, with my desktop showing only the files and directories for my current project.

I'll also include an empty mode that clears all files and folders from the desktop when I need a distraction-free environment.
