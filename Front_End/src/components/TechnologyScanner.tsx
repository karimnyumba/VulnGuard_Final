import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { detectTechnologies, Technology } from '@/utils/detectTechnologies';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TechnologyReportPDF } from './reports/TechnologyReportPDF';

export function TechnologyScanner() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<Technology[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScan = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const detectedTechs = await detectTechnologies(url);
      setTechnologies(detectedTechs);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to scan technologies. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: Technology['category']) => {
    switch (category) {
      case 'framework':
        return 'bg-blue-500/10 text-blue-500';
      case 'cms':
        return 'bg-purple-500/10 text-purple-500';
      case 'library':
        return 'bg-green-500/10 text-green-500';
      case 'analytics':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hosting':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter URL to scan (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleScan} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            'Scan'
          )}
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Technology Detection Results</DialogTitle>
          </DialogHeader>

          {technologies && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Target Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground">
                      URL: {url}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Detected Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={getCategoryColor(tech.category)}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Detailed Results</h3>
                <div className="space-y-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{tech.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Category: {tech.category}
                          </p>
                        </div>
                        <Badge variant="outline">
                          Confidence: {tech.confidence}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {technologies && (
              <PDFDownloadLink
                document={
                  <TechnologyReportPDF
                    url={url}
                    technologies={technologies}
                  />
                }
                fileName={`technology-report-${url.replace(/[^a-z0-9]/gi, '-')}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="outline" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download PDF
                  </Button>
                )}
              </PDFDownloadLink>
            )}
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 