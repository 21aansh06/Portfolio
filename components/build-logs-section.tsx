"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Terminal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BuildLog = {
  date: string
  title: string
  content: string
  project?: string
  tags: string[]
  status?: 'completed' | 'in-progress' | 'planned'
  impact?: string
  challenges?: string[]
  nextSteps?: string[]
}
const buildLogs: BuildLog[] = [
  
  {
    date: "2026-04-12",
    title: "HireNode | AI-Powered Microservices Platform",
    content:
      "Currently building a scalable microservices-based hiring platform with Kafka-based email workflows and AI-powered resume analysis using Gemini.",
    project: "HireNode",
    tags: ["Next.js", "Node.js", "Kafka", "PostgreSQL", "Docker", "Gemini AI"],
    status: "in-progress",
    impact:
      "Building a production-grade hiring ecosystem with async processing and AI-driven insights",
    challenges: [
      "Microservices orchestration",
      "Event-driven email pipeline using Kafka",
    ],
    nextSteps: [
      "Complete payment module integration",
      "Add advanced AI candidate scoring system",
    ],
  },
  {
  date: "2026-04-5",
  title: "Finance Backend | Centralized RBAC Permission System",
  content:
    "Designed a centralized role-based access control (RBAC) system using a single PERMISSIONS constant mapped to Prisma roles, eliminating repetitive authorization logic across routes and services.",
  project: "Finance Backend",
  tags: ["Node.js", "TypeScript", "Prisma", "RBAC"],
  status: "completed",
  impact:
    "Reduced code duplication and made permission management scalable and easy to maintain across the entire backend",
  challenges: [
    "Avoiding repeated role checks across multiple routes",
    "Keeping authorization logic consistent and maintainable",
  ],
  nextSteps: [
    "Add dynamic role management from database",
    "Implement permission-based audit logging",
  ],
},
 {
    date: "2026-01-03",
    title: "Chatify | Fixed Message Grouping Conflict",
    content:
      "Resolved message grouping conflicts by grouping messages using a composite key (date + conversationId) instead of only date.",
    project: "Chatify",
    tags: ["React", "Socket.IO"],
    status: "completed",
    impact:
      "Eliminated message mix-ups across different conversations and improved chat data integrity",
    challenges: [
      "Messages merging incorrectly across chats",
      "Improper grouping logic on date-only grouping",
    ],
    nextSteps: [
      "Optimize grouping performance for large chats",
    ],
  },

  {
    date: "2025-12-28",
    title: "Chatify | Real-time Messaging Optimization",
    content:
      "Solved pagination and auto-scroll issues in real-time chat by managing last message position using refs, preventing unwanted scroll jumps on new messages.",
    project: "Chatify",
    tags: ["React", "Socket.IO", "Node.js"],
    status: "completed",
    impact:
      "Improved chat UX by ensuring stable scroll behavior during real-time message updates",
    challenges: [
      "Auto-scroll breaking on new message arrival",
      "State sync issues during pagination",
    ],
    nextSteps: [
      "Add message virtualization for performance",
    ],
  },
   {
    date: "2025-10-13",
    title: "DigiQ | OTP Verification System Enhancement",
    content:
      "Implemented OTP-based verification at final stage to secure queue entry and prevent unauthorized access in waiting system.",
    project: "DigiQ",
    tags: ["Node.js", "Express", "OTP", "Security"],
    status: "completed",
    impact:
      "Improved system security and ensured verified user access in queue flow",
    challenges: [
      "Preventing OTP bypass attempts",
      "Handling OTP expiration edge cases",
    ],
    nextSteps: [
      "Add email + SMS fallback verification",
    ],
  },
 
];

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export default function BuildLogsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<BuildLog | null>(null)

  const projects = Array.from(new Set(buildLogs.map(log => log.project).filter(Boolean)))

  const filteredLogs = buildLogs.filter(log => {
    const matchesSearch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesProject = selectedProject === "all" || log.project === selectedProject
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus

    return matchesSearch && matchesProject && matchesStatus
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/30'
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30'
      case 'planned':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
      default:
        return 'bg-primary/10 text-primary border-primary/30'
    }
  }

  return (
    <section id="build-logs" className="py-20 md:py-32">
      <div className="container max-w-5xl">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-5xl font-bold">
              <span className="font-mono text-primary">#</span> Build Logs
            </h2>
            <Terminal className="text-chart-2 h-8 w-8" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Raw, unfiltered updates from my dev journey. Real projects, real challenges, real progress.
          </p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project || ""}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs */}
        <div className="space-y-6">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-card/70 backdrop-blur transition-all duration-300 hover:border-primary/30 cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(log.date)}</span>
                    </div>

                    <div className="flex gap-2">
                      {log.status && (
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getStatusColor(log.status))}
                        >
                          {log.status}
                        </Badge>
                      )}

                      {log.project && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {log.project}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{log.title}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line line-clamp-3">{log.content}</p>
                </CardContent>

                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedLog?.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{selectedLog?.date && formatDate(selectedLog.date)}</span>
              </div>
              {selectedLog?.project && (
                <Badge variant="outline" className="text-xs">{selectedLog.project}</Badge>
              )}
              {selectedLog?.status && (
                <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedLog.status))}>
                  {selectedLog.status}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {selectedLog?.content}
              </p>
            </div>

            {selectedLog?.impact && (
              <div className="space-y-2">
                <h3 className="font-semibold">Impact</h3>
                <p className="text-muted-foreground">
                  {selectedLog.impact}
                </p>
              </div>
            )}

            {selectedLog?.challenges && selectedLog.challenges.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Challenges</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {selectedLog.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedLog?.nextSteps && selectedLog.nextSteps.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Next Steps</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {selectedLog.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {selectedLog?.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLog(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
