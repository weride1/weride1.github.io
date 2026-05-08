---
title: "梗漫画生成器"
description: "输入中文梗或谐音梗，AI 自动生成四格漫画。"
tags: ["Next.js", "Tailwind CSS", "OpenAI", "GPT-4o"]
featured: true
link: "https://genggraph.weride1.cn"
---

## 项目简介

GengComic 是一个基于中文梗、谐音梗生成四格漫画的 Web 应用。

用户输入一段中文文本，系统通过 AI 先将文本拆解为四格漫画分镜，再生成对应图片，最后以四宫格形式展示。

## 核心功能

- **智能分镜**：GPT-4o-mini 理解笑点，拆解为四格分镜
- **图片生成**：AI 绘制漫画，包含中文对白
- **Bento Grid 布局**：便签盒风格，毛玻璃质感
- **莫兰迪配色**：低饱和度渐变背景，舒适护眼

## 技术栈

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + Glassmorphism
- OpenAI API（中转站）
- Netlify 部署
