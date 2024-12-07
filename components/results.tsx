import { Button } from "@/components/ui/button"
import { RotateCw, ClipboardCopy, Download } from 'lucide-react'

interface ResultsProps {
  analysis: string
}

export function Results({ analysis }: ResultsProps) {
  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log("Downloading PDF...")
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Result</h2>
          <p className="text-gray-500">Here is the result of the analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ClipboardCopy className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      <div className="prose max-w-none">
        {analysis.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
