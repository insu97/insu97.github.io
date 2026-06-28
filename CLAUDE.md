# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

Always respond in Korean (한국어로 항상 답변하기), per `.github/copilot-instructions.md`.

## What this is

A personal Jekyll blog ("INSU's Blog", data science / ML topics in Korean) hosted on GitHub Pages at https://insu97.github.io. Content lives in `_posts/`; the rest is theming and supporting pages.

## Commands

```bash
bundle install              # install gems (Ruby 3.1, Jekyll 3.9)
bundle exec jekyll serve    # local dev server at http://localhost:4000, live reload
bundle exec jekyll build    # build to _site/
```

There are no tests or linters. Deployment is automatic: pushing to `main` triggers `.github/workflows/jekyll.yml`, which builds with `JEKYLL_ENV=production` and deploys to GitHub Pages. Do not hand-edit `_site/` — it is generated output (the `_site/feed.xml` churn in git status is a build artifact).

## Writing posts

Posts go in `_posts/` named `YYYY-MM-DD-title.md`. Use `layout: markdown` (not the bare `post` default) for the full reading experience — it renders a sidebar with auto-generated TOC and a "related posts" list matched on the first tag. Front matter pattern:

```yaml
---
layout: markdown
title: ...
tags: [Python, FastAPI, ...]
toc: true
---

{% include markdown.html %}

## 첫 섹션 (TOC uses h2–h3 only)
```

`{% include markdown.html %}` renders the title/date header and tag links. TOC is configured site-wide for `## `–`#### ` (h2–h3 effectively; see `_config.yml` `toc` block). MathJax and Plotly support are wired into the layouts.

## Adding a tag (two-step — easy to miss)

Tags do **not** auto-register. Each tag needs:
1. An entry in `_data/tags.yml` (drives the `/tags.html` chip list and ordering).
2. A page file `tags/tag_<TagName>.html` that includes `tags.html` — this is the per-tag listing page that `/tags/tag_<TagName>.html` links resolve to. Copy an existing one (e.g. `tags/tag_Python.html`) and change `title`/`tags`.

A tag used in a post's front matter but missing either of these will show no count on the tags page and have a broken listing link.

## Structure notes

- **Layouts**: `default.html` (shell: header, nav from `_data/navigation.yml`, footer) → `markdown.html` (adds TOC sidebar + related posts + back-to-top). Posts default to `post` via `_config.yml` but should opt into `markdown`.
- **Nav**: edit `_data/navigation.yml`, not the layout. STUDY/PAPER entries are commented out.
- **Top-level pages**: `index.html`, `posts/` (paginated, 10/page), `tags.html`, `books.html`, `project.html` — plain HTML+Liquid.
- **Search**: `search.json` is generated and consumed client-side. `_plugins/simple_search_filter*.rb` register Liquid filters that strip control/non-ASCII chars so the JSON stays valid. Custom Ruby plugins mean the site cannot use GitHub's default `github-pages` gem build — which is why deployment uses the Actions workflow with `bundle exec jekyll build` rather than Pages' built-in Jekyll.
- `.claude/worktrees/` contains git worktrees — ignore them when searching/editing the live site.
