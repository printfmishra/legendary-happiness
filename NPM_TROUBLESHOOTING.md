# NPM & Development Server Troubleshooting

## Issue: Port Already in Use

If you're seeing errors like "Port 3000 is in use" or npm commands are not working correctly, follow these solutions:

## ✅ Solution 1: Use Different Port (Quickest)

```bash
npm run dev -- -p 3002
```

Your server is now running at: **http://localhost:3002**

## 🔧 Solution 2: Kill Node Processes (Requires Admin)

### Option A: Using Task Manager
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Find "Node.js JavaScript Runtime" processes
3. Right-click each → "End Task"
4. Run `npm run dev` again

### Option B: Using PowerShell as Administrator
1. Right-click PowerShell → "Run as Administrator"
2. Run:
```powershell
taskkill /F /IM node.exe
```
3. Navigate back to your project:
```powershell
cd H:\portfolio
npm run dev
```

### Option C: Using Command Prompt as Administrator
1. Right-click CMD → "Run as Administrator"
2. Run:
```cmd
taskkill /F /IM node.exe /T
```
3. Navigate back to your project and start server

## 🔍 Solution 3: Find What's Using the Port

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill specific process by PID (replace XXXX with actual PID)
taskkill /F /PID XXXX
```

## 🚀 Current Status

✅ **Your development server is running successfully on port 3002**

Access your portfolio at:
- **Local:** http://localhost:3002
- **Blog:** http://localhost:3002/blog
- **Any page:** http://localhost:3002/[page-name]

## 📝 Updating Your Workflow

### Development
```bash
# Start dev server (will use port 3002 if 3000/3001 are taken)
npm run dev -- -p 3002
```

### Building
```bash
# Build for production
npm run build
```

### Production
```bash
# Start production server
npm start
```

## 🔄 Making Port 3002 Default (Optional)

If you want to always use port 3002, update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start -p 3002",
    "lint": "next lint"
  }
}
```

## 🐛 Common Issues & Fixes

### Issue: "Access is denied" when killing processes
**Cause:** Node processes started by other users or system services  
**Fix:** Run PowerShell/CMD as Administrator

### Issue: Port still in use after killing processes
**Cause:** Multiple Node processes or other applications  
**Fix:** 
1. Check Task Manager for all Node processes
2. Restart your computer (last resort)
3. Use different port with `-p` flag

### Issue: npm commands hang or freeze
**Cause:** Corrupted node_modules or cache  
**Fix:**
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Build fails without clear error
**Cause:** TypeScript or dependency issues  
**Fix:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for dependency issues
npm audit

# Update dependencies
npm update
```

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (default port 3000) |
| `npm run dev -- -p 3002` | Start on specific port |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |
| `taskkill /F /IM node.exe` | Kill all Node processes (admin) |
| `netstat -ano \| findstr :3000` | Find process on port 3000 |

## ✨ Best Practices

1. **Always close dev server properly:**
   - Press `Ctrl + C` in terminal
   - Wait for "Closing..." message
   - Don't just close terminal window

2. **Use one terminal per project:**
   - Avoid running multiple dev servers
   - Keep track of which port you're using

3. **Check running processes:**
   - Before starting new server
   - Use Task Manager to verify

4. **Clean shutdown:**
   ```bash
   # In your dev terminal
   Ctrl + C
   # Wait for cleanup
   ```

## 🔗 Related Issues

If you continue having issues, check:
- Are other development tools running? (Docker, WSL, etc.)
- Is antivirus blocking Node?
- Do you have sufficient permissions?
- Is Windows Firewall configured correctly?

## 📞 Still Having Issues?

1. Check Node.js installation:
   ```bash
   node --version
   npm --version
   ```

2. Verify project dependencies:
   ```bash
   npm list
   ```

3. Clear everything and start fresh:
   ```bash
   rm -rf node_modules .next
   npm cache clean --force
   npm install
   npm run dev -- -p 3002
   ```

---

**Current Working Configuration:**
- Server: Running ✅
- Port: 3002
- URL: http://localhost:3002
- Status: Ready for development

**No further action needed** - your portfolio is working correctly!
