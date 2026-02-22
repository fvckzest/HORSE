# Developer Guide

Welcome to the backend of **horse**. This document explains how the site works under the hood and how you can add to it without breaking the retro aesthetic or modular system.

---

## 🏗️ Architecture Crash Course

This is a **Zero-Build, Vanilla JS** project. There is no npm, no Webpack, no React. It runs straight in the browser exactly how it's written on the disk.

- **`index.html`** - The homepage.
- **`style.css`** - The global retro design system. Contains all the ugly colors, clunky borders, and necessary responsive queries.
- **`script.js`** - The engine. It dynamically loads components, kicks off the visitor counter, handles custom cursors, etc.
- **`pages/`** - Where all other `.html` files live.
- **`components/`** - Small snippets of HTML that can be loaded into any page (e.g., headers, footers).
- **`assets/`** - Images, cursors, sounds.

---

## 🛠️ How to Add Things

### 1. Adding a New Page

1. Create a `your-page-name.html` file inside the `pages/` directory.
2. Use this boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title - horse</title>
  <!-- Notice we go UP one directory to link the global css -->
  <link rel="stylesheet" href="../style.css"> 
</head>
<body>

  <!-- This injects the global header -->
  <div data-component="header"></div>

  <main class="container">
      <h1>Welcome to my new page</h1>
      <p>This is where the magic happens.</p>
      
      <!-- Go back to root -->
      <a href="../index.html">Back Home</a>
  </main>

  <!-- This injects the global footer -->
  <div data-component="footer"></div>

  <!-- Notice we go UP one directory to link the global js -->
  <script src="../script.js"></script>
</body>
</html>
```

### 2. Using the Component System

You don't need to copy and paste the header out 50 times. The site uses a lightweight Vanilla JS component loader in `script.js`.

**To create a new reusable component:**
1. Create a file in `components/` (e.g., `sidebar.html`).
2. Write raw HTML inside it. No `<body>` or `<head>` tags needed.
   ```html
   <aside class="beveled bg-silver p-4">
     <h3>Quick Links</h3>
     <ul>
       <li><a href="link.html">Link 1</a></li>
     </ul>
   </aside>
   ```

**To use the component anywhere:**
Add a placeholder `<div>` with `data-component` matching the filename (without `.html`).
```html
<div data-component="sidebar"></div>
```
The JavaScript will automatically fetch `components/sidebar.html` and inject it there when the page loads.

### 3. Using Retro Design Utility Classes (`style.css`)

You don't need to write new CSS for everything. Use these utility classes built into `style.css`:

#### Layout & Containers
- `.container` (800px max width centered)
- `.container-wide` (960px)
- `.text-center`, `.text-left`, `.text-right`

#### Windows 95 Aesthetic
- `.beveled` - Gives a box a classic 3D pop-out border.
- `.beveled-inset` - Gives a box a sunken, indented border.
- `.btn` - Turns any `<a>` or `<button>` into a chunky Win95 button.

#### Fonts & Colors
- `.font-comic`, `.font-mono`, `.font-heading`
- `.bg-dark` (Navy), `.bg-teal`, `.bg-silver`, `.bg-yellow`, `.bg-hot` (Magenta), `.bg-black`

#### Nasty 90s Effects
- `.blink` - classic flashing text.
- `.marquee` - makes inner items scroll sideways infinitely.
- `.rainbow` - continuous rainbow color shift on text.
- `.under-construction` - yellow & black caution tape background.

---

## 🎨 Adding Assets

- Place any `.gif`, low-res `.jpg`, or pixel art in `assets/images/`.
- Want to change the global mouse cursor? Add a new `default.cur` into `assets/cursors/` (or update the JS file if it's a `.png`).
- Add weird midi files to `assets/sounds/`.

## ⚠️ Golden Rules
1. **Never use `npm` or compile tools.** 
2. **Never modernize it.** Let it be ugly. 
3. **Always test on Mobile.** It has to look like it's from 1999, but load smoothly on an iPhone in 2026.
