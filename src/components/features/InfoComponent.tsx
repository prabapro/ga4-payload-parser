// src/components/features/InfoComponent.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, FileCode, FileJson } from 'lucide-react';

interface InfoComponentProps {
  onLoadSample: (payload: string) => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ onLoadSample }) => {
  const samplePayloads = {
    encoded:
      'https://analytics.example.com/collect?v44f730e=L2cvY29sbGVjdD92PTImdGlkPUctQUJDREVGMTIzNCZndG09NDVqZTUyNDB2OTE5NzgyNDY1Nno4OTE4MjY4MDA1MHphMjA0emI5MTgyNjgwMDUwJl9wPTE3Mzg5ODM3MjUzMjYmZ2NkPTEzbDNsM2wzbDFsMSZucGE9MCZkbWE9MCZ0YWdfZXhwPTEwMjA2NzgwOH4xMDIwODE0ODV%2BMTAyMTIzNjA4fjEwMjQ4MjQzM34xMDI1Mzk5Njh%2BMTAyNTU4MDY0fjEwMjU4NzU5MX4xMDI2MDU0MTcmY2lkPTE0ODkwNzQ5NDkuMTczODk4MDMxMiZlY2lkPTEzMDkxNzQwMiZ1bD1lbi11cyZzcj0yNTYweDE0NDAmX2ZwbGM9MCZ1cj1MQyZ1YWE9YXJtJnVhYj02NCZ1YWZ2bD1Ob3QlMjUyMEEoQnJhbmQlM0I4LjAuMC4wJTdDQ2hyb21pdW0lM0IxMzIuMC42ODM0LjE2MCU3Q0dvb2dsZSUyNTIwQ2hyb21lJTNCMTMyLjAuNjgzNC4xNjAmdWFtYj0wJnVhbT0mdWFwPW1hY09TJnVhcHY9MTUuMy4wJnVhdz0wJmFyZT0xJmZybT0wJnBzY2RsPW5vYXBpJmVjX21vZGU9YyZfZXU9QUlBJnNzdC5ldGxkPWV4YW1wbGUuY29tJnNzdC50ZnQ9MTczODk4MzcyNTMyNiZzc3QubHBjPTE1OTcwNjAzMSZzc3QubmF2dD1yJnNzdC51ZGU9MCZfcz0xJnNpZD0xNzM4OTgxOTQ3JnNjdD0xJnNlZz0xJmRsPWh0dHBzJTNBJTJGJTJGd3d3LmV4YW1wbGUuY29tJTJGJmR0PWV4YW1wbGUtc2l0ZSZlbj1wYWdlX3ZpZXcmZXAuZXZlbnRfaWQ9MTczODk4MDczNjg5OV8xNzM4OTg0NjkwMTk5MiZlcC51c2VyX2RhdGEuZW1haWw9dXNlciU0MGV4YW1wbGUuY29tJmVwLnVzZXJfZGF0YS5waG9uZV9udW1iZXI9JTJCMTIzNDU2Nzg5MCZlcC51c2VyX2RhdGEuYWRkcmVzcy4wLmZpcnN0X25hbWU9Sm9obiZlcC51c2VyX2RhdGEuYWRkcmVzcy4wLmxhc3RfbmFtZT1Eb2UmZXAudXNlcl9kYXRhLmFkZHJlc3MuMC5zdHJlZXQ9MTIzJTIwTWFpbiUyMFN0JmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAuY2l0eT1OZXclMjBZb3JrJmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAucmVnaW9uPU5ZJmVwLnVzZXJfZGF0YS5hZGRyZXNzLjAuY291bnRyeT1VU0EmZXAudXNlcl9kYXRhLmFkZHJlc3MuMC5wb3N0YWxfY29kZT0xMDAwMSZlcC51c2VyX2RhdGEuX3RhZ19tb2RlPUNPREUmdGZkPTI0NjUmcmljaHNzdHNzZQ%3D%3D',
    unencoded:
      'https://analytics.example.com/collect?v=2&tid=G-ABCDEF1234&gtm=45he5240v878683060z871927886za204zb71927886&_p=1739008119036&gcs=G111&gcd=13t3tPt2t5l1&npa=0&dma_cps=default&dma=1&tag_exp=101509156~102067808~102081485~102123608~102482432~102539968~102558064~102587591~102605417&gdid=dZTJkMz&cid=1506821430.1730448757&ecid=800748917&ul=en-us&sr=2560x1440&_fplc=0&ur=&uaa=arm&uab=64&uafvl=Not%2520A(Brand%3B8.0.0.0%7CChromium%3B132.0.6834.160%7CGoogle%2520Chrome%3B132.0.6834.160&uamb=0&uam=&uap=macOS&uapv=15.3.0&uaw=0&are=1&frm=0&pscdl=noapi&sst.rnd=1104800471.1739008122&sst.adr=1&sst.tft=1739008119036&sst.lpc=258934422&sst.navt=n&sst.ude=0&_s=1&sid=1739008119&sct=44&seg=0&dl=https%3A%2F%2Fwww.example.com%2F&dt=Example%20Site&en=page_view&_ss=1&ep.content_group=page&ep.custom_page_referrer=search.example.com&tfd=5754&richsstsse',
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Decode and analyze Google Analytics 4 (GA4) payloads in a
                human-readable format. This tool supports both standard
                URL-encoded parameters and Base64-encoded payloads commonly used
                by various GA4 implementations, including{' '}
                <a
                  href="https://stape.io/solutions/data-tag-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary">
                  Stape Data Tag
                </a>{' '}
                and the{' '}
                <a
                  href="https://apps.shopify.com/server-gtm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary">
                  Stape Server GTM Shopify App
                </a>{' '}
                .
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Simply paste your GA4 payload URL or query string below - this
                tool will automatically detect the encoding format and display
                the decoded parameters in an organized, searchable view.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onLoadSample(samplePayloads.encoded)}>
                <FileCode className="mr-2 h-4 w-4" />
                Try Base64 Sample
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onLoadSample(samplePayloads.unencoded)}>
                <FileJson className="mr-2 h-4 w-4" />
                Try URL-encoded Sample
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoComponent;
