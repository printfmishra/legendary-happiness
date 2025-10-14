# Quick Start: Publishing Your First Blog Post

## 🚀 Getting Started with Sanity CMS

Your portfolio is now connected to Sanity.io! Follow these steps to publish your first blog post.

## 📝 Step 1: Access Sanity Studio

### Option A: Sanity.io Dashboard (Recommended)
1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Sign in with your account
3. Select your project: **pqbv3g6w**
4. Click "Open Studio" or go to your studio URL

### Option B: Local Sanity Studio (If set up)
```bash
cd sanity-studio
npm run dev
# Opens at http://localhost:3333
```

## ✍️ Step 2: Create a New Post

1. **Click "+ Create" or "+ New Document"**
2. **Select "Post" or "Blog Post"**
3. **Fill in the required fields:**

### Required Fields:

#### Title
```
Example: "Building Scalable Cloud Infrastructure on AWS"
```
- This is your post headline
- Make it descriptive and engaging
- 50-60 characters ideal for SEO

#### Slug
```
Example: building-scalable-cloud-infrastructure-aws
```
- Click "Generate" to auto-create from title
- URL-friendly version of your title
- Used in: yoursite.com/blog/[slug]

#### Excerpt
```
Example: "Learn how to design and deploy highly available cloud infrastructure using AWS services like EC2, RDS, and CloudFormation. Best practices included."
```
- Brief summary (max 200 characters)
- Shows on blog list page
- Should entice readers to click

#### Category
Select from:
- ☁️ Cloud Computing
- 🔐 Network Security
- ⚙️ DevOps
- 🏗️ Infrastructure
- AWS
- Azure
- GCP
- Kubernetes
- Docker

#### Published Date
- Click calendar icon
- Select date and time
- Posts ordered by this date

### Optional but Recommended:

#### Main Image
1. Click "Upload" or drag image
2. Add alt text (for accessibility)
3. Recommended size: 1200x600px
4. Formats: JPG, PNG, WebP

#### Body (Content)
Use the rich text editor:

**Formatting Options:**
- **Bold** - Ctrl/Cmd + B
- *Italic* - Ctrl/Cmd + I
- `Code` - Use code style
- Headings - H1, H2, H3, H4
- Lists - Bullet or numbered
- Links - Highlight text, click link icon
- Images - Click "+" and select image
- Blockquotes - For highlighting quotes

**Sample Content Structure:**
```
# Introduction
Brief overview of the topic...

## Problem Statement
Describe the problem you're solving...

## Solution
Explain your approach...

### Step 1: Setup
Details about first step...

### Step 2: Configuration
Details about configuration...

## Conclusion
Wrap up and key takeaways...
```

#### Author
- Select from existing authors
- Or create new author reference

## 💾 Step 3: Save and Publish

1. **Save as Draft** (Blue button)
   - Saves without publishing
   - Won't appear on website yet

2. **Publish** (Green button)
   - Makes post live immediately
   - Appears on your blog page
   - Accessible via URL

## ✅ Step 4: Verify on Website

1. **Visit your blog page:**
   ```
   http://localhost:3001/blog
   ```

2. **Check your post appears:**
   - Should show in list
   - Display correct category icon
   - Show formatted date
   - Include excerpt

3. **Click "Read More":**
   - Verify full content displays
   - Check images load properly
   - Test internal formatting
   - Confirm theme compatibility (light/dark)

## 🎨 Content Writing Tips

### For Best Results:

#### Structure
- Start with engaging introduction
- Use clear headings (H2, H3)
- Break up long paragraphs
- Include code examples if technical
- End with key takeaways

#### Images
- Use high-quality images
- Add descriptive alt text
- Include captions when needed
- Optimize before upload (< 1MB)

#### SEO
- Front-load important keywords
- Use descriptive headings
- Keep excerpts compelling
- Add internal links

#### Readability
- Short sentences
- Active voice
- Simple language
- Clear explanations

## 🔄 Updating Existing Posts

1. Find post in Sanity Studio
2. Click to open
3. Make your changes
4. Click "Publish" to save
5. Changes appear on site (CDN may cache briefly)

## 🗑️ Deleting Posts

1. Open post in Sanity Studio
2. Click "..." menu (top right)
3. Select "Delete"
4. Confirm deletion
5. Post removed from website

## 📊 Post Status

### Draft
- Yellow indicator
- Not visible on website
- Can be edited freely

### Published
- Green indicator
- Live on website
- Can still be edited

### Scheduled (If enabled)
- Can set future publish date
- Automatically publishes at set time

## 🐛 Troubleshooting

### Post Not Appearing?

**Check:**
1. ✅ Post is Published (not Draft)
2. ✅ Published Date is not in future
3. ✅ All required fields filled
4. ✅ Clear browser cache
5. ✅ Refresh the page

**Debug:**
```bash
# In terminal, check if posts are fetched
npm run dev
# Visit http://localhost:3001/blog
# Open browser console (F12)
# Check for any errors
```

### Images Not Loading?

**Check:**
1. ✅ Image uploaded successfully
2. ✅ Alt text added
3. ✅ Image file size reasonable (< 5MB)
4. ✅ Supported format (JPG, PNG, WebP)

### Formatting Issues?

**Check:**
1. ✅ Used correct block types
2. ✅ No unsupported HTML
3. ✅ Headings properly nested
4. ✅ Code blocks use code type

## 📱 Mobile Preview

To see how posts look on mobile:
1. Open blog on phone
2. Or use browser DevTools (F12)
3. Click mobile icon
4. Select device size

## 🎓 Advanced Features

### Custom Code Blocks
```javascript
// Example code block
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

### Inline Links
[Visit Sanity Docs](https://sanity.io/docs)

### Blockquotes
> "This is an important quote or highlight."

### Lists

**Bullet List:**
- First item
- Second item
- Third item

**Numbered List:**
1. First step
2. Second step
3. Third step

## 🔗 Useful Links

- [Sanity Studio](https://sanity.io/manage)
- [Your Project Dashboard](https://sanity.io/manage/project/pqbv3g6w)
- [Sanity Documentation](https://sanity.io/docs)
- [Portable Text Guide](https://www.sanity.io/guides/introduction-to-portable-text)

## 📞 Need Help?

Refer to:
- `SANITY_SETUP.md` - Technical documentation
- `SANITY_INTEGRATION_SUMMARY.md` - Integration details
- [Sanity Community](https://slack.sanity.io/) - Community support

---

**Happy Blogging! 🎉**

Remember: Content is king. Focus on providing value to your readers, and the technical details will take care of themselves!
