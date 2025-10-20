#!/bin/bash
# Sprint 2 Dependencies Installation Script
# Run this script to install all required packages for Sprint 2

echo "🚀 Installing Sprint 2 Dependencies..."
echo ""

# Core dependencies for forms and animations
echo "📦 Installing core dependencies..."
npm install framer-motion react-hook-form @hookform/resolvers --save

# Email and communication
echo "📧 Installing email dependencies..."
npm install resend react-email --save

# Rate limiting and security
echo "🔒 Installing security dependencies..."
npm install @upstash/ratelimit --save

echo ""
echo "✅ Sprint 2 dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure RESEND_API_KEY in .env.local"
echo "2. Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local"
echo "3. Run 'npm run dev' to start development"
