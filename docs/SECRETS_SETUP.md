# 🔐 Google OAuth Local Setup

This guide helps you configure Google OAuth authentication using local environment variables.

## 🎯 Architecture Overview

- **Client ID**: Required in frontend (goes in `.env.local`)
- **Client Secret**: Required in both frontend and Supabase
- **Git Safety**: `.env.local` is git-ignored and safe for secrets

## 📋 Prerequisites

1. **Google Cloud Project** with OAuth credentials configured
2. **Supabase Project** with Google provider enabled
3. **Matching Client IDs** between Google Cloud, Supabase, and frontend

## 🚀 Setup Steps

### Step 1: Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add authorized origins and redirect URLs:
   - Origins: `https://your-app-domain.com`
   - Redirects: `https://wwhqbjrhbajpabfdwnip.supabase.co/auth/v1/callback`

### Step 2: Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/auth/providers)
2. Navigate to **Auth** → **Providers** → **Google**
3. Enable Google provider
4. Enter your **Client ID** and **Client Secret** from Google Cloud
5. Save configuration

### Step 3: Frontend Configuration

Update `.env.local` in the project root with your real values:

```bash
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

**Note**: The `.env.local` file is git-ignored, so it's safe to add real secrets here.

## 🔍 Verification

After setup, visit `/auth/signup` and check:

- ✅ **Green banner**: Google OAuth configured correctly
- ❌ **Red banner**: Missing `VITE_GOOGLE_CLIENT_ID`
- 🟡 **Yellow banner**: Client ID mismatch between frontend/Supabase
- 🔵 **Blue banner**: Google OAuth disabled (`VITE_GOOGLE_ENABLED=false`)

Console will show:
```
[AUTH CONFIG]
GOOGLE_ENABLED: true
GOOGLE_CLIENT_ID: …XY89
```

## 🛡️ Security Notes

- **Never commit** real Client IDs or secrets to git
- **Client Secret** stays in Supabase only (never in frontend)
- **Client ID** can be in frontend (it's not sensitive)
- Use environment variables for all configuration

## 🔧 Troubleshooting

### "Missing Google Client ID" (Red Banner)
- Ensure `VITE_GOOGLE_CLIENT_ID` is set in `.env.local`
- Restart development server after adding variables

### "Google sign-in disabled" (Blue Banner)
- Set `VITE_GOOGLE_ENABLED=true` in `.env.local`

### "Client ID mismatch" (Yellow Banner)
- Verify the same Client ID is used in Google Cloud, Supabase, and frontend
- Check for typos or extra spaces in configuration

### OAuth Redirect Errors
- Ensure redirect URLs in Google Cloud match your Supabase project URL
- Check Site URL configuration in Supabase Auth settings

## 📋 Quick Copy-Paste Block

### .env.local (project root)
```bash
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

Replace the placeholders with your actual values from Google Cloud Console.