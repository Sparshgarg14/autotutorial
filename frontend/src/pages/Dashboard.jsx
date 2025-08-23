import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, FileText, Trash2, Bot, Upload } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Dashboard() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // files shown per page

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:8000/documents/documents") // FastAPI endpoint
        const data = await res.json()
        setFiles(data.documents || [])
      } catch (err) {
        console.error("Error fetching files:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchFiles()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(files.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentFiles = files.slice(indexOfFirst, indexOfLast)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Upload Panel */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </CardContent>
      </Card>

      {/* Files Panel */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Training Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin h-6 w-6" />
            </div>
          ) : files.length === 0 ? (
            <p className="text-muted-foreground">No files found</p>
          ) : (
            <>
              <ul className="space-y-3">
                {currentFiles.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center p-3 rounded-lg border shadow-sm bg-white"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="truncate max-w-xs">{file}</span>
                    </div>
                     
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <Button>Chat</Button>
                    </Button>
                  </li>
                ))}
              </ul>

              {/* Pagination Component */}
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {totalPages > 5 && <PaginationEllipsis />}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Chatbot & Insights */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-purple-500" />
            <p className="text-muted-foreground">
              Chat with AI or view insights from your uploaded docs
            </p>
          </div>
          <div className="space-x-2">
            <Button>ChatAll</Button>
            <Button variant="secondary">View Insights</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
