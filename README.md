# Koan Guesser

A Next.js game where players match poetic koans to their corresponding video storyboards. Built with TypeScript, Tailwind CSS, and deployed on Vercel.

## Overview

Koan Guesser is an interactive game that challenges players to match Zen-inspired koans with their corresponding video storyboards. Each round presents a koan and four video options, testing the player's ability to connect poetic wisdom with visual storytelling.

## Features

- Dynamic koan-video matching gameplay
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Optimized image loading and performance
- Interactive feedback system
- Score tracking and game progression

## Project Structure

```
koanguessr/
├── app/                    # Next.js application
│   ├── public/            # Static assets
│   │   └── storybooks/    # Video storyboard images
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   └── app/           # Next.js app router
│   └── package.json       # Dependencies and scripts
├── scripts/               # Utility scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/koanguessr.git
   cd koanguessr
   ```

2. Install dependencies:
   ```bash
   cd app
   npm install
   ```

3. Add your video storyboards:
   - Place your video storyboard images in the `app/public/storybooks` directory
   - Each storyboard should be in its own directory with sequentially numbered frames
   - Supported image formats: JPG, JPEG, PNG, GIF

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `app`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. Add environment variables if needed
7. Click "Deploy"

### Local Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Development

### Adding New Koans

To add new koans, edit the `app/src/app/api/storybooks/route.ts` file:

```typescript
const koans = [
  {
    id: 'your-storybook-directory',
    koan: 'Your poetic koan here'
  },
  // ... more koans
];
```

### Customizing the Game

- Game logic: `app/src/context/GameContext.tsx`
- UI components: `app/src/components/Game.tsx`
- API routes: `app/src/app/api/storybooks/route.ts`

## Security Considerations

- No sensitive data is stored or processed
- All images are served statically from the public directory
- No API keys or secrets required
- No user authentication or data collection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js for the framework
- Tailwind CSS for styling
- Vercel for hosting
- Zen philosophy for inspiration 