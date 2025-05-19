# LuchtLeven - Personal Finance Management

LuchtLeven is a modern web application for managing personal finances, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 💰 Track income and expenses
- 📊 Visualize financial data with charts
- 🎯 Set and track financial goals
- 💳 Manage fixed costs
- 🤖 Smart financial advisor
- 🌙 Dark/Light mode
- 🌍 Multi-language support
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: IndexedDB (local storage)
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/luchtleven.git
   cd luchtleven
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
luchtleven/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── charts/           # Chart components
│   └── ui/               # UI components
├── lib/                  # Utility functions and services
├── public/               # Static assets
└── styles/              # Global styles
```

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/) 