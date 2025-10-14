# Typography & Spacing Guide

## Overview
This guide ensures consistent typography and spacing throughout the portfolio website for better readability and professional appearance.

## Font Family
- **Primary Font**: Inter (Google Font)
- **Fallback**: system-ui, sans-serif
- **Base Size**: 16px
- **Line Height**: 1.6 (body text)

## Typography Scale

### Headings

#### H1 - Main Page Titles
```css
text-4xl md:text-5xl (36px → 48px)
font-bold
mb-6 (24px margin bottom)
line-height: 1.2
```
**Usage**: Page titles, hero headings

#### H2 - Section Headings
```css
text-3xl md:text-4xl (30px → 36px)
font-bold
mb-5 (20px margin bottom)
line-height: 1.3
```
**Usage**: Major section titles

#### H3 - Subsection Headings
```css
text-2xl md:text-3xl (24px → 30px)
font-bold
mb-4 (16px margin bottom)
line-height: 1.4
```
**Usage**: Card titles, subsection headers

#### H4 - Minor Headings
```css
text-xl md:text-2xl (20px → 24px)
font-semibold
mb-3 (12px margin bottom)
line-height: 1.4
```

#### H5 - Small Headings
```css
text-lg md:text-xl (18px → 20px)
font-semibold
mb-3
line-height: 1.5
```

#### H6 - Smallest Headings
```css
text-base md:text-lg (16px → 18px)
font-semibold
mb-2
line-height: 1.5
```

### Body Text

#### Paragraphs
```css
text-base md:text-lg (16px → 18px)
mb-4 (16px margin bottom)
line-height: 1.7
```

#### Lists
```css
text-base md:text-lg
space-y-2 (8px between items)
line-height: 1.6
```

## Utility Classes

### Custom Spacing Classes

#### `.section-spacing`
```css
py-20 md:py-24
```
**Usage**: Vertical padding for main sections

#### `.card-spacing`
```css
p-6 md:p-8
```
**Usage**: Padding inside cards and containers

#### `.content-spacing`
```css
space-y-6 md:space-y-8
```
**Usage**: Vertical spacing between content blocks

#### `.text-body`
```css
text-base md:text-lg leading-relaxed
```
**Usage**: Standard body text

### Heading Utility Classes

#### `.heading-primary`
```css
text-3xl md:text-4xl font-bold text-primary-copper mb-6
```
**Usage**: Primary section headings

#### `.heading-secondary`
```css
text-2xl md:text-3xl font-bold theme-text-primary mb-4
```
**Usage**: Secondary section headings

#### `.heading-tertiary`
```css
text-xl md:text-2xl font-semibold theme-text-primary mb-3
```
**Usage**: Card titles and small section headings

## Spacing System

### Margin & Padding Scale
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px
- `16` = 64px
- `20` = 80px
- `24` = 96px

### Recommended Spacing

#### Between Sections
```css
mb-12 md:mb-16 (48px → 64px)
```

#### Between Cards
```css
gap-6 md:gap-8 (24px → 32px)
```

#### Inside Cards
```css
p-6 md:p-8 (24px → 32px)
```

#### Between Paragraphs
```css
space-y-4 md:space-y-6 (16px → 24px)
```

## Color System

### Text Colors

#### Primary Text
```css
.theme-text-primary
Light mode: #212529
Dark mode: #f0f0f0
```

#### Secondary Text
```css
.theme-text-secondary
Light mode: #6c757d
Dark mode: #d0d0d0
```

#### Accent (Copper)
```css
.text-primary-copper
#DA8753
```

## Best Practices

### 1. **Consistent Heading Hierarchy**
- Always use headings in order (h1 → h2 → h3)
- Don't skip levels
- One h1 per page

### 2. **Readable Line Length**
- Optimal: 50-75 characters per line
- Use `max-w-4xl` or `max-w-prose` for text containers

### 3. **Adequate Line Height**
- Body text: 1.6-1.7
- Headings: 1.2-1.4
- Lists: 1.6

### 4. **Consistent Spacing**
- Use defined spacing utilities
- Maintain vertical rhythm
- Keep spacing proportional

### 5. **Responsive Typography**
- Mobile: Smaller font sizes
- Desktop: Larger font sizes
- Use `md:` breakpoint for transitions

### 6. **Text Alignment**
- Body text: `text-justify` or `text-left`
- Headings: Usually `text-left`
- Short text: Can be `text-center`

## Implementation Examples

### Section with Card
```tsx
<section className="section-spacing">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="heading-primary">Section Title</h2>
    <div className="theme-card-bg rounded-[10px] card-spacing shadow-card">
      <h3 className="heading-secondary">Card Title</h3>
      <div className="content-spacing">
        <p className="text-body text-justify">
          Your content here...
        </p>
      </div>
    </div>
  </div>
</section>
```

### Text Block
```tsx
<div className="prose prose-lg max-w-none">
  <p className="text-body theme-text-secondary text-justify">
    Your paragraph text...
  </p>
</div>
```

### List
```tsx
<ul className="space-y-2">
  <li className="text-body theme-text-secondary">
    <span className="text-primary-copper">•</span> List item
  </li>
</ul>
```

## Files Modified

1. **`src/app/globals.css`**
   - Added consistent typography rules
   - Added spacing utility classes
   - Enhanced base styles

2. **`src/components/PortableTextRenderer.tsx`**
   - Updated heading margins
   - Consistent text sizing
   - Proper spacing between elements

3. **`src/app/about/page.tsx`**
   - Applied consistent spacing
   - Used proper heading hierarchy
   - Text justification for readability

## Testing Checklist

- [ ] All headings follow hierarchy
- [ ] Text is readable at all screen sizes
- [ ] Spacing is consistent across pages
- [ ] Line heights are comfortable
- [ ] Dark mode text is readable
- [ ] Mobile responsive typography works
- [ ] No text overflow issues

## Maintenance

When adding new content:
1. Use defined utility classes
2. Follow the spacing system
3. Maintain heading hierarchy
4. Test on multiple screen sizes
5. Verify dark mode appearance
