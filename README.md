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
https://analytics.example.com/collect?e44f730e=L2cvY29sbGVjdD92PTImdGlkPUctQUJDREVGMTIzNCZndG09NDVqZTUyNDB2OTE5NzgyNDY1Nno4OTE4MjY4MDA1MHphMjA0emI5MTgyNjgwMDUwJl9wPTE3MzkyMDM5MzgwMDYmZ2NkPTEzbDNsM2wzbDFsMSZucGE9MCZkbWE9MCZ0YWdfZXhwPTEwMjA2NzgwOH4xMDIwODE0ODV%2BMTAyMTIzNjA4fjEwMjQ4MjQzM34xMDI1Mzk5Njh%2BMTAyNTU4MDY0fjEwMjU4NzU5MX4xMDI2MDU0MTcmZ2RpZD1kTURnMFl6JmNpZD0xNDg5MDc0OTQ5LjE3Mzg5ODAzMTImZWNpZD0xMzcyNjc4NzQ2JnVsPWVuLXVzJnNyPTI1NjB4MTQ0MCZfZnBsYz0wJnVyPUxLJnVhYT1hcm0mdWFiPTY0JnVhZnZsPU5vdCUyNTIwQShCcmFuZCUzQjguMC4wLjAlN0NDaHJvbWl1bSUzQjEzMi4wLjY4MzQuMTYyJTdDR29vZ2xlJTI1MjBDaHJvbWUlM0IxMzIuMC42ODM0LjE2MiZ1YW1iPTAmdWFtPSZ1YXA9bWFjT1MmdWFwdj0xNS4zLjAmdWF3PTAmYXJlPTEmZnJtPTEmcHNjZGw9bm9hcGkmZWNfbW9kZT1jJl9ldT1JSUEmc3N0LmV0bGQ9ZXhhbXBsZS5jb20mc3N0LnRmdD0xNzM5MjAzOTM4MDA2JnNzdC5scGM9MTM0NjEyMDY3JnNzdC5uYXZ0PW4mc3N0LnVkZT0wJl9zPTUmY3U9VVNEJmRsPWh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZjaGVja291dHMlMkZjbiUyRloyTndMWFZ6TFdWaGMzUXhPakF4U2t0U1FUTldSbEpOVTFGS09FSkRTMVpGV0RCRU4xbFQmc2lkPTE3MzkyMDM5MDUmc2N0PTgmc2VnPTEmZHI9aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRnByb2R1Y3RzJTJGZXhhbXBsZS10LXNoaXJ0JmR0PUNoZWNrb3V0JTIwLSUyMEV4YW1wbGUlMjBTdG9yZSZlbj1wdXJjaGFzZSZfYz0xJnByMT1pZDgwMDMxNzA2NjQ1NDh%2BdmE0NTIzNjk5ODUzNzMxNn5ubUV4YW1wbGUlMjBULVNoaXJ0fmt2YXJpYW50X25hbWV%2BdjBMaXRob2dyYXBoJTIwLSUyMEhlaWdodCUzQSUyMDklMjIlMjB4JTIwV2lkdGglM0ElMjAxMiUyMn5jYVNoaXJ0c35ickFjbWV%2BazFpdGVtX3VybH52MSUyRnByb2R1Y3RzJTJGZXhhbXBsZS10LXNoaXJ0fnByNzYwMH5rMmltYWdlVVJMfnYyaHR0cHMlM0ElMkYlMkZjZG4uc2hvcGlmeS5jb20lMkZzJTJGZmlsZXMlMkYxJTJGMDY5MyUyRjc2OTMlMkYzOTg4JTJGZmlsZXMlMkZncmVlbi10LXNoaXJ0XzY0eDY0LmpwZyUzRnYlM0QxNzM4OTc4NjgyfnF0MSZlcC5ldmVudF9pZD0xNzM4OTgwNzM2ODk5XzE3MzkyMDQ4NzYyMDMyMiZlcC52YWx1ZT03NjMwJmVwLmNhcnRfdG90YWw9NzYzMCZlcG4uY2FydF9xdWFudGl0eT0xJmVwbi50YXg9MCZlcG4uc2hpcHBpbmc9MzAmZXAudHJhbnNhY3Rpb25faWQ9NTUwMjk2MjgyNzM2NCZlcG4uc3ViX3RvdGFsPTc2MDAmZXAudXNlcl9kYXRhLmVtYWlsPXVzZXIlNDBleGFtcGxlLmNvbSZlcC51c2VyX2RhdGEuYWRkcmVzcy5maXJzdF9uYW1lPUpvaG4mZXAudXNlcl9kYXRhLmFkZHJlc3MubGFzdF9uYW1lPURvZSZlcC51c2VyX2RhdGEuYWRkcmVzcy5zdHJlZXQ9MTIzJTIwTWFpbiUyMFN0JmVwLnVzZXJfZGF0YS5hZGRyZXNzLmNpdHk9TmV3JTIwWW9yayZlcC51c2VyX2RhdGEuYWRkcmVzcy5yZWdpb249TlkmZXAudXNlcl9kYXRhLmFkZHJlc3MuY291bnRyeT1VU0EmZXAudXNlcl9kYXRhLmFkZHJlc3MucG9zdGFsX2NvZGU9MTAwMDEmdGZkPTEzMzk2JnJpY2hzc3Rzc2U%3D
```

### Unencoded Payload

```sh
https://analytics.example.com/collect?v=2&tid=G-ABCDEF1234&gtm=45je5240v919782465z891826800za204zb91826800&_p=1739203938006&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=102067808~102081485~102123608~102482433~102539968~102558064~102587591~102605417&gdid=dMDg0Yz&cid=1489074949.1738980312&ecid=137267874&ul=en-us&sr=2560x1440&_fplc=0&ur=&uaa=arm&uab=64&uafvl=Not%2520A(Brand%3B8.0.0.0%7CChromium%3B132.0.6834.162%7CGoogle%2520Chrome%3B132.0.6834.162&uamb=0&uam=&uap=macOS&uapv=15.3.0&uaw=0&are=1&frm=1&pscdl=noapi&ec_mode=c&_eu=IIA&sst.etld=example.com&sst.tft=1739203938006&sst.lpc=134612067&sst.navt=n&sst.ude=0&_s=5&cu=USD&dl=https%3A%2F%2Fexample.com%2Fcheckouts%2Fcn%2FZ2NwLXVzLWVhc3QxOjAxSktSQTNWRlJNUTFKOEJDS1ZFWDBFN1lT&sid=1739203905&sct=8&seg=1&dr=https%3A%2F%2Fexample.com%2Fproducts%2Fexample-t-shirt&dt=Checkout%20-%20Example%20Store&en=purchase&_c=1&pr1=id800317066454~va452369985373~nmExample%20T-Shirt~kvariant_name~v0Lithograph%20-%20Height%3A%209%22%20x%20Width%3A%2012%22~caShirts~brAcme~k1item_url~v1%2Fproducts%2Fexample-t-shirt~pr7600~k2imageURL~v2https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0693%2F7693%2F3988%2Ffiles%2Fgreen-t-shirt_64x64.jpg%3Fv%3D1738978682~qt1&ep.event_id=1738980736899_1739204876203&ep.value=7630&ep.cart_total=7630&epn.cart_quantity=1&epn.tax=0&epn.shipping=30&ep.transaction_id=5502962827364&epn.sub_total=7600&ep.user_data.email=user%40example.com&ep.user_data.address.first_name=John&ep.user_data.address.last_name=Doe&ep.user_data.address.street=123%20Main%20St&ep.user_data.address.city=New%20York&ep.user_data.address.region=NY&ep.user_data.address.country=USA&ep.user_data.address.postal_code=10001&tfd=13396&richsstsse
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
