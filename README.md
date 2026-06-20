# ✨ lhy 的笔记 - lhy Blog

一个基于 **Astro** + **Tailwind CSS** 的现代化个人博客，支持直接部署到 GitHub Pages。

## 🎨 特性

- **玻璃拟态 UI 设计** - 现代化、好看的视觉效果
- **深色 / 浅色主题切换** - 自动识别系统偏好，也可手动切换
- **响应式布局** - 完美适配桌面、平板、手机
- **博客文章管理** - 使用 Markdown 撰写，支持分类、标签
- **下载中心** - 支持镜像加速源切换
- **RSS 订阅** - 自动生成 RSS Feed
- **Sitemap** - 自动生成站点地图

## 🚀 快速开始

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器中打开 http://localhost:4321
```

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 📁 项目结构

```
├── src/
│   ├── components/       # 可复用组件（卡片、导航等）
│   ├── layouts/          # 页面布局（基础布局、文章布局等）
│   ├── pages/            # 页面文件（自动生成路由）
│   │   ├── index.astro   # 首页
│   │   ├── blog/         # 博客列表 & 文章详情
│   │   ├── downloads.astro  # 下载中心
│   │   ├── about.astro   # 关于页面
│   │   └── rss.xml.js    # RSS Feed
│   ├── content/
│   │   ├── posts/        # 📝 博客文章（Markdown）
│   │   └── downloads/    # ⬇️ 下载项目列表
│   └── styles/
│       └── global.css    # 全局样式
├── public/               # 静态资源（可选）
├── astro.config.mjs      # Astro 配置
├── tailwind.config.mjs   # Tailwind CSS 配置
└── package.json          # 依赖与脚本
```

## 📝 如何写一篇新文章

在 `src/content/posts/` 目录下新建一个 `.md` 文件，文件名作为文章 URL 的 slug。

示例：

```markdown
---
title: 文章标题
description: 文章的简短描述
pubDate: 2026-06-20
categories: ['技术']
tags: ['标签1', '标签2']
---

# 正文标题

这里是正文内容，支持 Markdown 语法。
```

## ⬇️ 如何添加下载项目

在 `src/content/downloads/` 目录下新建一个 `.md` 文件。

示例：

```markdown
---
name: 项目名称
description: 项目描述
category: self-made          # self-made = 自制, repost = 转载
download_url: https://github.com/.../releases/download/.../file.exe
size: 55.8MB
version: v1.0.0
date: 2026-06-20
group: 信息课脱离管控工具    # 可选，用于分组展示
---
```

### 配置镜像加速源

编辑 `src/pages/downloads.astro` 中的 `mirrors` 数组即可添加或修改镜像源。

## 🌐 部署到 GitHub Pages

### 方法一：GitHub Actions（推荐，已配置）

1. 将代码 push 到 GitHub 仓库的 `main` 或 `master` 分支
2. 进入仓库 Settings → Pages，将 Source 设置为 "GitHub Actions"
3. 工作流会自动构建并部署，文件位于 `.github/workflows/deploy.yml`

### 方法二：本地构建后手动部署

```bash
npm run build
# dist/ 目录包含所有静态文件，上传到任意静态托管服务即可
```

## 🎯 自定义配置

### 修改站点名称/描述

编辑 `src/layouts/BaseLayout.astro` 和 `src/pages/index.astro` 中的相关文本。

### 修改主题色

编辑 `tailwind.config.mjs` 中的 `brand` 颜色值。

### 修改加速源

编辑 `src/pages/downloads.astro` 文件顶部的 `mirrors` 数组。

## 📚 技术栈

- **Astro 4.x** - 静态站点生成器
- **Tailwind CSS 3.x** - 实用优先的 CSS 框架
- **Node.js 20+** - 运行环境

## 📜 许可证

MIT License
