# Installation Guide

Complete guide to installing and setting up the Hugo Saasify Theme for your SaaS website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: New Site](#method-1-new-site)
  - [Method 2: Existing Site](#method-2-existing-site)
  - [Method 3: Manual Installation](#method-3-manual-installation)
- [Initial Configuration](#initial-configuration)
- [Verifying Installation](#verifying-installation)
- [Next Steps](#next-steps)
- [Updating the Theme](#updating-the-theme)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the Hugo Saasify Theme, ensure you have the following installed on your system:

### Required Software

1. **Hugo Extended** (v0.80.0 or later)
   - The theme requires Hugo Extended edition for Tailwind CSS processing
   - Download from [Hugo Releases](https://github.com/gohugoio/hugo/releases)
   - Verify installation: `hugo version`
   - Expected output should include "extended"

2. **Git** (latest version recommended)
   - Required for theme installation and updates
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

3. **Node.js and npm** (v14.0.0 or later)
   - Required for Tailwind CSS compilation
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

### System Requirements

- Operating System: Windows, macOS, or Linux
- Disk Space: At least 100MB free
- Internet Connection: Required for initial setup and dependencies

### Recommended Tools

- Code editor (VS Code, Sublime Text, or similar)
- Terminal/Command line familiarity
- Basic understanding of Hugo and Markdown

## Installation Methods

Choose the installation method that best fits your use case.

### Method 1: New Site

This is the recommended method if you're starting a new project from scratch.

#### Step 1: Create a New Hugo Site

```bash
# Create a new Hugo site
hugo new site my-saas-website

# Navigate into the new site directory
cd my-saas-website
```

#### Step 2: Initialize Git Repository

```bash
# Initialize git repository
git init

# Create initial commit
git add .
git commit -m "Initial commit"
```

#### Step 3: Add the Theme as a Git Submodule

```bash
# Add theme as submodule
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme

# Update submodule
git submodule update --init --recursive
```

#### Step 4: Copy Example Configuration

```bash
# Copy example site configuration
cp themes/hugo-saasify-theme/exampleSite/hugo.toml hugo.toml

# Copy example content (optional)
cp -r themes/hugo-saasify-theme/exampleSite/content/* content/

# Copy static assets (optional)
cp -r themes/hugo-saasify-theme/exampleSite/static/* static/
```

#### Step 5: Install Dependencies

```bash
# Navigate to theme directory
cd themes/hugo-saasify-theme

# Install npm dependencies
npm install

# Return to project root
cd ../..
```

#### Step 6: Start Hugo Server

```bash
# Start development server
hugo server -D

# Your site will be available at http://localhost:1313
```

### Method 2: Existing Site

If you already have a Hugo site and want to add the Saasify theme.

#### Step 1: Add Theme as Submodule

```bash
# From your site root directory
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme

# Update submodule
git submodule update --init --recursive
```

#### Step 2: Update Configuration

Add or update the following in your `hugo.toml`:

```toml
theme = "hugo-saasify-theme"

[module]
  [module.hugoVersion]
    extended = true
    min = "0.80.0"

[build]
  writeStats = true

[build.buildStats]
  enable = true
```

#### Step 3: Install Theme Dependencies

```bash
# Navigate to theme directory
cd themes/hugo-saasify-theme

# Install dependencies
npm install

# Return to site root
cd ../..
```

#### Step 4: Configure Theme Settings

Copy relevant configuration from the example site:

```bash
# View example configuration for reference
cat themes/hugo-saasify-theme/exampleSite/hugo.toml
```

Merge the configuration settings into your existing `hugo.toml`. See [CONFIGURATION.md](CONFIGURATION.md) for detailed options.

#### Step 5: Test the Theme

```bash
# Start development server
hugo server -D
```

### Method 3: Manual Installation

For users who prefer not to use Git submodules or need more control over the installation.

#### Step 1: Download Theme

```bash
# Download and extract theme
curl -L https://github.com/chaoming/hugo-saasify-theme/archive/refs/heads/main.zip -o theme.zip
unzip theme.zip
mv hugo-saasify-theme-main themes/hugo-saasify-theme
rm theme.zip
```

Alternatively, download the ZIP file from GitHub and extract it manually to `themes/hugo-saasify-theme`.

#### Step 2: Install Dependencies

```bash
# Navigate to theme directory
cd themes/hugo-saasify-theme

# Install npm packages
npm install

# Return to site root
cd ../..
```

#### Step 3: Configure Hugo

Update your `hugo.toml` to reference the theme:

```toml
theme = "hugo-saasify-theme"
```

Add all required configuration settings from the example site.

#### Step 4: Verify Installation

```bash
# Check theme is recognized
hugo config

# Start development server
hugo server -D
```

## Initial Configuration

After installing the theme, configure the essential settings.

### Basic Configuration

Edit your `hugo.toml` file:

```toml
baseURL = "https://your-domain.com/"
languageCode = "en-us"
title = "Your SaaS Name"
theme = "hugo-saasify-theme"

# Enable syntax highlighting
pygmentsCodeFences = true
pygmentsUseClasses = true

# Enable emoji support
enableEmoji = true

# Enable Git info for lastmod dates
enableGitInfo = true

[params]
  description = "Your SaaS description"
  author = "Your Name"
  logo = "/images/logo.svg"

[module]
  [module.hugoVersion]
    extended = true
    min = "0.80.0"
```

### Tailwind CSS Setup

The theme uses Tailwind CSS for styling. The build process is integrated into Hugo.

1. Ensure the theme's `package.json` dependencies are installed
2. Tailwind configuration is in `themes/hugo-saasify-theme/tailwind.config.js`
3. Hugo automatically processes Tailwind during build

No additional setup is required for Tailwind.

### Menu Configuration

Add your navigation menu to `hugo.toml`:

```toml
[menu]
  [[menu.main]]
    name = "Features"
    weight = 1
    [menu.main.params]
      has_submenu = true
      submenu = [
        { name = "Feature 1", url = "/features/feature-1/" },
        { name = "Feature 2", url = "/features/feature-2/" }
      ]

  [[menu.main]]
    name = "Pricing"
    url = "/pricing"
    weight = 2

  [[menu.main]]
    name = "Blog"
    url = "/blog"
    weight = 3
```

See [CONFIGURATION.md](CONFIGURATION.md) for complete menu options.

## Verifying Installation

### Check Hugo Version

```bash
hugo version
```

Expected output should include "extended" and version 0.80.0 or higher.

### Check Theme Files

```bash
# Verify theme directory structure
ls -la themes/hugo-saasify-theme/

# Should show:
# - layouts/
# - assets/
# - static/
# - exampleSite/
# - package.json
# - tailwind.config.js
```

### Test Development Server

```bash
# Start server with verbose output
hugo server -D --verbose

# Check for errors in terminal
# Visit http://localhost:1313 in browser
```

### Verify Build Output

```bash
# Build site
hugo

# Check public directory was created
ls public/

# Should contain:
# - index.html
# - css/
# - js/
# - images/
```

## Next Steps

After successful installation:

1. **Customize Configuration**: Review [CONFIGURATION.md](CONFIGURATION.md) for all available options
2. **Create Content**: Learn about content creation in [CONTENT-CREATION.md](CONTENT-CREATION.md)
3. **Customize Styling**: See [STYLING.md](STYLING.md) for theme customization
4. **Add Pages**: Use available layouts documented in [LAYOUTS.md](LAYOUTS.md)
5. **Use Shortcodes**: Explore components in [SHORTCODES.md](SHORTCODES.md)
6. **Deploy**: Follow deployment guides in [DEPLOYMENT.md](DEPLOYMENT.md)

## Updating the Theme

### For Git Submodule Installations

```bash
# Update to latest version
git submodule update --remote themes/hugo-saasify-theme

# If there are npm dependency updates
cd themes/hugo-saasify-theme
npm install
cd ../..

# Commit the update
git add themes/hugo-saasify-theme
git commit -m "Update hugo-saasify-theme"
```

### For Manual Installations

```bash
# Backup your current theme (if you made custom changes)
cp -r themes/hugo-saasify-theme themes/hugo-saasify-theme-backup

# Download latest version
curl -L https://github.com/chaoming/hugo-saasify-theme/archive/refs/heads/main.zip -o theme.zip
unzip theme.zip
rm -rf themes/hugo-saasify-theme
mv hugo-saasify-theme-main themes/hugo-saasify-theme
rm theme.zip

# Install updated dependencies
cd themes/hugo-saasify-theme
npm install
cd ../..
```

### Update Best Practices

1. **Always backup** before updating
2. **Review changelog** for breaking changes
3. **Test locally** before deploying updates
4. **Check configuration** for new options
5. **Update dependencies** after theme updates

### Version Pinning

To pin to a specific version using Git submodule:

```bash
cd themes/hugo-saasify-theme
git checkout v1.0.0  # Replace with desired version tag
cd ../..
git add themes/hugo-saasify-theme
git commit -m "Pin theme to v1.0.0"
```

## Troubleshooting

### Theme Not Found

**Problem**: Hugo can't find the theme

**Solution**:
```bash
# Check theme directory exists
ls themes/

# Verify theme name in hugo.toml matches directory name
grep "^theme" hugo.toml

# Should output: theme = "hugo-saasify-theme"
```

### Extended Version Error

**Problem**: Error about Hugo Extended being required

**Solution**:
```bash
# Check Hugo version includes "extended"
hugo version

# If not extended, download extended version from:
# https://github.com/gohugoio/hugo/releases
```

### CSS Not Loading

**Problem**: Site loads without styling

**Solution**:
```bash
# Ensure build stats are enabled in hugo.toml
[build]
  writeStats = true

# Install theme dependencies
cd themes/hugo-saasify-theme
npm install
cd ../..

# Clear Hugo cache
hugo --gc

# Rebuild
hugo server -D
```

### Submodule Empty

**Problem**: Theme directory exists but is empty

**Solution**:
```bash
# Initialize and update submodules
git submodule init
git submodule update --recursive

# If still empty, remove and re-add
git submodule deinit -f themes/hugo-saasify-theme
rm -rf .git/modules/themes/hugo-saasify-theme
git rm -f themes/hugo-saasify-theme
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme
```

### npm Dependencies Error

**Problem**: npm install fails in theme directory

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
cd themes/hugo-saasify-theme
rm -rf node_modules package-lock.json
npm install
cd ../..
```

### Port Already in Use

**Problem**: Hugo server won't start due to port conflict

**Solution**:
```bash
# Use different port
hugo server -D --port 1314

# Or find and kill process using port 1313
lsof -ti:1313 | xargs kill -9  # macOS/Linux
# For Windows, use: netstat -ano | findstr :1313
```

For more troubleshooting help, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or visit the [GitHub Issues](https://github.com/chaoming/hugo-saasify-theme/issues) page.

## Getting Help

If you encounter issues not covered in this guide:

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [example site configuration](../exampleSite/)
3. Search [GitHub Issues](https://github.com/chaoming/hugo-saasify-theme/issues)
4. Create a new issue with:
   - Hugo version (`hugo version`)
   - Operating system
   - Error messages
   - Steps to reproduce

## Additional Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Theme Repository](https://github.com/chaoming/hugo-saasify-theme)
- [Demo Site](https://saasify-demo.chaoming.li)
