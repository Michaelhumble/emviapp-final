# 🔐 Google OAuth Secrets Setup

This guide helps you configure Google OAuth authentication safely without committing secrets to the repository.

## 🎯 Architecture Overview

- **Client ID**: Required in frontend (goes in `.env.local` or Lovable Secrets)
- **Client Secret**: Required in Supabase only (never in frontend)
- **Git Safety**: All secrets are ignored/excluded from version control

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

Choose **ONE** of the following methods:

#### Option A: Local Development (.env.local)

Create/update `.env.local` with:

```bash
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

#### Option B: Lovable Secrets (Production)

In Lovable Dashboard → **Environment** → **Secrets**, add:

```
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

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
- Ensure `VITE_GOOGLE_CLIENT_ID` is set in `.env.local` or Lovable Secrets
- Restart development server after adding variables

### "Google sign-in disabled" (Blue Banner)
- Set `VITE_GOOGLE_ENABLED=true` in your environment configuration

### "Client ID mismatch" (Yellow Banner)
- Verify the same Client ID is used in Google Cloud, Supabase, and frontend
- Check for typos or extra spaces in configuration

### OAuth Redirect Errors
- Ensure redirect URLs in Google Cloud match your Supabase project URL
- Check Site URL configuration in Supabase Auth settings

## 📋 Quick Copy-Paste Blocks

### Local Development → .env.local
```bash
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

### Lovable Secrets → Environment/Secrets
```
VITE_GOOGLE_ENABLED=true
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` with your actual Client ID from Google Cloud Console.