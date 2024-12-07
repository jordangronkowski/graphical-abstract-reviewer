"use client"

import { useState } from "react"
import { CloudIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { analyzeImage } from "@/app/actions"
import { Results } from "@/components/results"

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [abstract, setAbstract] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<string | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === "image/jpeg" || droppedFile.type === "image/png")) {
      setFile(droppedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file || !abstract) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("abstract", abstract)
      
      const result = await analyzeImage(formData)
      setResults(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center"
      >
        {file ? (
          <div className="space-y-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-h-64 mx-auto"
            />
            <Button
              variant="outline"
              onClick={() => setFile(null)}
            >
              Remove Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <CloudIcon className="h-12 w-12 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-500">
                Upload Graphical Abstract Here
              </h3>
              <p className="text-sm text-gray-500">Max 15 MB</p>
              <p className="text-sm text-gray-500">
                High resolution images are recommended for better results
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: JPEG, PNG
              </p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Select File
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Your written abstract for the paper
        </label>
        <Textarea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Paste Written abstract.."
          className="h-32"
        />
      </div>

      <div className="space-y-2">
        <Button
          onClick={handleSubmit}
          disabled={!file || !abstract || isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing..." : "Analyze the Image"}
        </Button>
        <p className="text-xs text-center text-gray-500">
          By clicking on the button, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {results && <Results analysis={results} />}
    </div>
  )
}
