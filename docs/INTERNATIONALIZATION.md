# Internationalization (i18n) Guide

Complete guide for implementing multilingual support in Hugo Saasify Theme.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Translation Keys](#translation-keys)
- [Content Organization](#content-organization)
- [Date Formatting](#date-formatting)
- [Common Issues](#common-issues)
- [Adding a New Language](#adding-a-new-language)

## Overview

Hugo Saasify Theme provides full multilingual support with:
- Automatic language switcher in the header
- 40+ translation keys for UI elements
- Language-specific content directories
- Language-specific menus and parameters
- Date format localization
- Translated blog sidebar, post navigation, and more

## Quick Start

1. **Configure languages in `hugo.toml`:**

```toml
defaultContentLanguage = "en"

[languages]
  [languages.en]
    languageCode = "en-us"
    languageName = "English"
    title = "Your Site"
    weight = 1
    contentDir = "content"

  [languages.zh-cn]
    languageCode = "zh-cn"
    languageName = "简体中文"
    title = "Your Site"
    weight = 2
    contentDir = "content/zh-cn"
```

2. **Copy translation files:**

```bash
# Copy English translations (already included in theme)
cp themes/hugo-saasify-theme/i18n/en.toml i18n/en.toml

# Copy Chinese example and rename
cp themes/hugo-saasify-theme/docs/zh-cn.toml.example i18n/zh-cn.toml
```

3. **Create language-specific content:**

```
content/
├── _index.md              # English homepage
├── blog/
│   └── my-post.md         # English blog post
└── zh-cn/
    ├── _index.md          # Chinese homepage
    └── blog/
        └── my-post.md     # Chinese blog post
```

4. **Configure language-specific menus:**

```toml
# English menu
[[languages.en.menu.main]]
  name = "Blog"
  url = "/blog"
  weight = 1

# Chinese menu
[[languages.zh-cn.menu.main]]
  name = "博客"
  url = "/zh-cn/blog"
  weight = 1
```

The language switcher will automatically appear in the header!

## Configuration

### Basic Setup

```toml
# Set the default language
defaultContentLanguage = "en"

# Whether to include default language in URL path
# false: English at / (example.com/)
# true: English at /en/ (example.com/en/)
defaultContentLanguageInSubdir = false
```

### Language-Specific Parameters

Each language can have its own configuration for CTAs, headers, etc:

```toml
[languages.en.params.cta]
  enable = true
  title = "Ready to Get Started?"
  description = "Join companies using our platform"
  [languages.en.params.cta.primary_button]
    text = "Get Started Free"
    url = "/get-started"

[languages.zh-cn.params.cta]
  enable = true
  title = "准备好开始了吗？"
  description = "加入使用我们平台的公司"
  [languages.zh-cn.params.cta.primary_button]
    text = "免费开始"
    url = "/zh-cn/get-started"
```

### Sidebar Configuration

**Important:** Do NOT set title/description/text in global sidebar config, as this overrides i18n translations:

```toml
# ❌ DON'T: This prevents translation
[params.blog.sidebar.recent]
  enable = true
  title = "Recent Articles"  # This overrides i18n

# ✅ DO: Let i18n handle the translations
[params.blog.sidebar.recent]
  enable = true
  count = 5  # Only set non-text configuration
```

## Translation Keys

### Complete List

The theme includes 40+ translation keys. Here are the most important ones:

#### Blog & Content
- `readMore` - "Read More" link text
- `readTime` - Reading time suffix
- `categories` - Categories heading
- `tags` - Tags heading

#### Blog Post
- `tableOfContents` - TOC heading
- `minRead` - Reading time text
- `previousPost` - Previous navigation
- `nextPost` - Next navigation
- `dateFormat` - Date format string

#### Blog Sidebar
- `recentArticles` - Recent articles heading
- `popularTags` - Popular tags heading
- `subscribeNewsletter` - Newsletter heading
- `subscribeDescription` - Newsletter description
- `emailPlaceholder` - Email input placeholder
- `subscribe` - Subscribe button

#### Navigation
- `previous` - Previous page
- `next` - Next page
- `documentation` - Documentation heading
- `language` - Language label

#### Features & Pricing
- `seeItInAction` - Feature demo heading
- `popular` - Popular badge
- `mostPopular` - Most popular badge
- `perMonth` - Pricing suffix

#### Homepage
- `trustedByCompanies` - Company logos heading
- `lovedByTeams` - Testimonials heading

For the complete list with default values, see `themes/hugo-saasify-theme/i18n/en.toml`

### Example Translation File

**i18n/en.toml:**
```toml
[readMore]
other = "Read More"

[minRead]
other = "min read"

[previousPost]
other = "Previous Post"

[nextPost]
other = "Next Post"

[dateFormat]
other = "January 2, 2006"
```

**i18n/zh-cn.toml:**
```toml
[readMore]
other = "阅读更多"

[minRead]
other = "分钟阅读"

[previousPost]
other = "上一篇"

[nextPost]
other = "下一篇"

[dateFormat]
other = "2006年1月2日"
```

## Content Organization

### Directory Structure

```
content/
├── _index.md                    # English homepage
├── blog/
│   ├── post-1.md               # English blog posts
│   └── post-2.md
├── features/
│   └── performance.md          # English feature page
└── zh-cn/                      # Chinese content
    ├── _index.md               # Chinese homepage
    ├── blog/
    │   ├── post-1.md           # Chinese blog posts
    │   └── post-2.md
    └── features/
        └── performance.md      # Chinese feature page
```

### Creating Translated Content

1. **Duplicate the structure** from your default language
2. **Translate the content** including front matter
3. **Keep the same file names** for better URL consistency

**Example - English post:**
```yaml
---
title: "Getting Started with Hugo"
date: 2024-01-15
categories: ["Tutorial"]
tags: ["hugo", "web development"]
---
Content in English...
```

**Example - Chinese post:**
```yaml
---
title: "Hugo入门指南"
date: 2024-01-15
categories: ["教程"]
tags: ["hugo", "网站开发"]
---
中文内容...
```

## Date Formatting

The theme uses the `dateFormat` i18n key for locale-specific date formatting:

```toml
# English format
[dateFormat]
other = "January 2, 2006"  # Output: July 20, 2023

# Chinese format
[dateFormat]
other = "2006年1月2日"  # Output: 2023年7月20日

# French format example
[dateFormat]
other = "2 January 2006"  # Output: 20 juillet 2023
```

Hugo's date format reference:
- `2006` - Year (4 digits)
- `06` - Year (2 digits)
- `January` - Month (full name)
- `Jan` - Month (abbreviated)
- `01` - Month (2 digits)
- `1` - Month (1-2 digits)
- `02` - Day (2 digits)
- `2` - Day (1-2 digits)
- `Monday` - Weekday (full name)
- `Mon` - Weekday (abbreviated)

## Common Issues

### Issue: Sidebar Still Showing English

**Problem:** Blog sidebar shows English text even in Chinese version.

**Solution:** Remove hardcoded titles from global `[params.blog.sidebar]` configuration. The theme's i18n will handle the translations automatically.

```toml
# Remove these from global config:
[params.blog.sidebar.recent]
  enable = true
  # title = "Recent Articles"  ← Remove this
  count = 5
```

### Issue: Language Switcher Not Appearing

**Problem:** Language switcher doesn't show in header.

**Solution:** Ensure you have defined multiple languages in your `hugo.toml`:

```toml
[languages]
  [languages.en]
    # ...
  [languages.zh-cn]
    # ...
```

The language switcher automatically appears when 2+ languages are configured.

### Issue: Wrong Language on Home Link

**Problem:** Logo/home link goes to wrong language homepage.

**Solution:** This is already fixed in the theme. The header uses `{{ "/" | relLangURL }}` which automatically links to the correct language homepage.

## Adding a New Language

Let's add French as an example:

### 1. Add Language Configuration

```toml
[languages.fr]
  languageCode = "fr-fr"
  languageName = "Français"
  title = "Votre Site"
  weight = 3
  contentDir = "content/fr"
```

### 2. Create Translation File

Copy the example and translate:

```bash
cp themes/hugo-saasify-theme/docs/zh-cn.toml.example i18n/fr.toml
```

Edit `i18n/fr.toml`:
```toml
[readMore]
other = "Lire la suite"

[minRead]
other = "min de lecture"

[previousPost]
other = "Article précédent"

[nextPost]
other = "Article suivant"

[dateFormat]
other = "2 January 2006"

[recentArticles]
other = "Articles récents"

[categories]
other = "Catégories"

[popularTags]
other = "Tags populaires"

# ... translate all keys
```

### 3. Create French Content

```
content/fr/
├── _index.md
├── blog/
└── features/
```

### 4. Configure French Menu

```toml
[[languages.fr.menu.main]]
  name = "Fonctionnalités"
  url = "/fr/features"
  weight = 1

[[languages.fr.menu.main]]
  name = "Blog"
  url = "/fr/blog"
  weight = 2
```

### 5. Language-Specific Parameters (Optional)

```toml
[languages.fr.params.cta]
  title = "Prêt à commencer?"
  description = "Rejoignez les entreprises qui utilisent notre plateforme"
```

That's it! The French version will now be available with the language switcher automatically showing all three languages.

## Best Practices

1. **Consistent Structure:** Mirror your content directory structure across all languages
2. **Translation Keys:** Use descriptive i18n keys like `readMore` instead of abbreviations
3. **Avoid Hardcoding:** Don't set text parameters in global config; let i18n handle it
4. **Test Switching:** Verify language switching works correctly on all pages
5. **Date Formats:** Define appropriate date formats for each language
6. **Menus:** Configure language-specific menus with translated labels
7. **URLs:** Include language code in URLs for non-default languages

## Resources

- **Hugo i18n Documentation:** https://gohugo.io/content-management/multilingual/
- **Theme i18n Files:** `themes/hugo-saasify-theme/i18n/`
- **Example Configuration:** See demo site's `hugo.toml`
- **Chinese Example:** `themes/hugo-saasify-theme/docs/zh-cn.toml.example`

## Support

For issues or questions about i18n:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review the demo site's working multilingual setup
3. Open an issue on GitHub with details about your configuration
