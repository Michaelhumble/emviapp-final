# Sunshine API Integration Guide

## Overview
The Sunshine API is a unified endpoint that powers both the EmviApp website chat and external integrations like Facebook Messenger via ManyChat.

## API Endpoint
**URL:** `https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sunshine-api`
**Method:** `POST`
**Content-Type:** `application/json`

## Request Format
```json
{
  "message": "User's message",
  "userId": "unique_user_id_or_anonymous", 
  "platform": "website" | "messenger"
}
```

## Response Format
```json
{
  "reply": "Sunshine's response message",
  "ctaButtons": [
    {
      "label": "Find Beauty Jobs",
      "route": "/jobs",
      "icon": "💼",
      "variant": "primary"
    }
  ],
  "platform": "website" | "messenger",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

## ManyChat Integration Setup

### Step 1: Create External Request in ManyChat
1. Go to ManyChat Pro dashboard
2. Navigate to **Flows** → **Actions** → **External Request**
3. Configure the webhook:
   - **URL:** `https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sunshine-api`
   - **Method:** `POST`
   - **Headers:** `Content-Type: application/json`

### Step 2: Configure Request Body
**IMPORTANT**: Use the exact variable syntax with double curly braces:

```json
{
  "message": "{{last_input_text}}",
  "userId": "{{contact.id}}", 
  "platform": "messenger"
}
```

**Common Mistakes to Avoid:**
- ❌ `"Last Text Input"` → ✅ `"{{last_input_text}}"`
- ❌ `"Contact Id"` → ✅ `"{{contact.id}}"`
- ❌ `"Last Seen in Messenger"` → ✅ `"messenger"`

The platform should be the literal string `"messenger"`, not a variable.

### Step 3: Handle Response
- **Response Field:** `reply`
- **Action:** Send Text Message
- **Message:** `{{reply}}`

### Step 4: Optional - Handle CTA Buttons
For advanced setups, you can parse `ctaButtons` array and create dynamic quick replies or carousel cards.

## Features

### Bilingual Support
- Sunshine automatically detects language context
- Responds in English or Vietnamese as appropriate
- Supports mixed-language conversations

### Smart CTA Buttons
Sunshine generates contextual call-to-action buttons based on conversation content:
- **Job-related queries** → "Find Beauty Jobs" button
- **Salon inquiries** → "Explore Salons" button  
- **Artist searches** → "Find Artists" button
- **Vietnamese language** → "Tìm việc làm 🇻🇳" button

### Platform-Specific Responses
- **Website:** Full-featured responses with rich formatting
- **Messenger:** Mobile-optimized, conversational responses

## Error Handling
If the API encounters an error, it returns a friendly fallback message:
```json
{
  "reply": "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!"
}
```

## Testing
You can test the API directly using curl:
```bash
curl -X POST https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sunshine-api \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I need help finding nail tech jobs",
    "userId": "test_user",
    "platform": "messenger"
  }'
```

## Monitoring
- Check Supabase Edge Function logs for debugging
- All requests are logged with user ID and platform for analytics
- Response times and error rates are tracked

## Support
For technical issues or integration support, check the Supabase Edge Function logs or contact the development team.