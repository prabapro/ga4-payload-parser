# GA4 Payload Parser

A modern React application built with TypeScript for decoding and analyzing Google Analytics 4 (GA4) payloads. This tool helps developers and analysts inspect GA4 requests in a human-readable format.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Features

- 🔄 Supports both Base64-encoded and URL-encoded GA4 payloads
- 🔍 Advanced parameter searching and filtering
- 📱 Responsive design with dark mode support
- 📋 Request history with local storage
- 🎨 Modern UI built with shadcn/ui components
- 🔒 Client-side only - no server required

## Installation

1. Clone the repository:

```bash
git clone https://github.com/prabapro/ga4-payload-parser.git
cd ga4-payload-parser
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:5173` to view the application.

## Usage

1. Copy your GA4 payload URL or query string
2. Paste it into the decoder input field
3. Click "Decode" to analyze the parameters
4. Use the search functionality to find specific parameters
5. View previous requests in the history sidebar

## Example Payloads

The decoder can handle both Base64-encoded and URL-encoded payloads:

### Encoded Payload (Base64)

```sh
https://analytics.example.com/collect?v44f730e=L2cvY29sbGVjdD92PTImdGlkPUctQUJDREVGMTIzNCZndG09NDVqZTUyNDB2OTE5NzgyNDY1Nno4OTE4MjY4MDA1MHphMjA0emI5MTgyNjgwMDUwJl9wPTE3Mzg5ODM3MjUzMjYmZ2NkPTEzbDNsM2wzbDFsMSZucGE9MCZkbWE9MCZ0YWdfZXhwPTEwMjA2NzgwOH4xMDIwODE0ODV%2BMTAyMTIzNjA4fjEwMjQ4MjQzM34xMDI1Mzk5Njh%2BMTAyNTU4MDY0fjEwMjU4NzU5MX4xMDI2MDU0MTcmY2lkPTE0ODkwNzQ5NDkuMTczODk4MDMxMiZlY2lkPTEzMDkxNzQwMiZ1bD1lbi11cyZzcj0yNTYweDE0NDAmX2ZwbGM9MCZ1cj1MQyZ1YWE9YXJtJnVhYj02NCZ1YWZ2bD1Ob3QlMjUyMEEoQnJhbmQlM0I4LjAuMC4wJTdDQ2hyb21pdW0lM0IxMzIuMC42ODM0LjE2MCU3Q0dvb2dsZSUyNTIwQ2hyb21lJTNCMTMyLjAuNjgzNC4xNjAmdWFtYj0wJnVhbT0mdWFwPW1hY09TJnVhcHY9MTUuMy4wJnVhdz0wJmFyZT0xJmZybT0wJnBzY2RsPW5vYXBpJmVjX21vZGU9YyZfZXU9QUlBJnNzdC5ldGxkPWV4YW1wbGUuY29tJnNzdC50ZnQ9MTczODk4MzcyNTMyNiZzc3QubHBjPTE1OTcwNjAzMSZzc3QubmF2dD1yJnNzdC51ZGU9MCZfcz0xJnNpZD0xNzM4OTgxOTQ3JnNjdD0xJnNlZz0xJmRsPWh0dHBzJTNBJTJGJTJGd3d3LmV4YW1wbGUuY29tJTJGJmR0PWV4YW1wbGUtc2l0ZSZlbj1wYWdlX3ZpZXcmZXAuZXZlbnRfaWQ9MTczODk4MDczNjg5OV8xNzM4OTg0NjkwMTk5MiZlcC51c2VyX2RhdGEuZW1haWw9dXNlciU0MGV4YW1wbGUuY29tJmVwLnVzZXJfZGF0YS5waG9uZV9udW1iZXI9JTJCMTIzNDU2Nzg5MCZlcC51c2VyX2RhdGEuYWRkcmVzcy4wLmZpcnN0X25hbWU9Sm9obiZlcC51c2VyX2RhdGEuYWRkcmVzcy4wLmxhc3RfbmFtZT1Eb2UmZXAudXNlcl9kYXRhLmFkZHJlc3MuMC5zdHJlZXQ9MTIzJTIwTWFpbiUyMFN0JmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAuY2l0eT1OZXclMjBZb3JrJmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAucmVnaW9uPU5ZJmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAuY291bnRyeT1VU0EmZXAudXNlcl9kYXRhLmFkZHJlc3MuMC5wb3N0YWxfY29kZT0xMDAwMSZlcC51c2VyX2RhdGEuX3RhZ19tb2RlPUNPREUmdGZkPTI0NjUmcmljaHNzdHNzZQ%3D%3D
```

### Unencoded Payload

```sh
https://analytics.example.com/collect?v=2&tid=G-ABCDEF1234&gtm=45he5240v878683060z871927886za204zb71927886&_p=1739008119036&gcs=G111&gcd=13t3tPt2t5l1&npa=0&dma_cps=default&dma=1&tag_exp=101509156~102067808~102081485~102123608~102482432~102539968~102558064~102587591~102605417&gdid=dZTJkMz&cid=1506821430.1730448757&ecid=800748917&ul=en-us&sr=2560x1440&_fplc=0&ur=&uaa=arm&uab=64&uafvl=Not%2520A(Brand%3B8.0.0.0%7CChromium%3B132.0.6834.160%7CGoogle%2520Chrome%3B132.0.6834.160&uamb=0&uam=&uap=macOS&uapv=15.3.0&uaw=0&are=1&frm=0&pscdl=noapi&sst.rnd=1104800471.1739008122&sst.adr=1&sst.tft=1739008119036&sst.lpc=258934422&sst.navt=n&sst.ude=0&_s=1&sid=1739008119&sct=44&seg=0&dl=https%3A%2F%2Fwww.example.com%2F&dt=Example%20Site&en=page_view&_ss=1&ep.content_group=page&ep.custom_page_referrer=search.example.com&tfd=5754&richsstsse
```

## Development

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Format code
pnpm format
```

### Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── features/    # Feature-specific components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # UI components from shadcn/ui
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
