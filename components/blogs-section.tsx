"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogs } from "@/data/blogs"

export default function BlogsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const displayedBlogs = blogs.slice(0, 6)

  return (
    <section id="blogs" className="py-20 md:py-32 bg-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="font-mono text-primary">#</span>{" "}
            <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
              Blogs
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Quick reads, technical notes, and sample blog ideas that explain the thinking behind my work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <Card
                className="h-full overflow-hidden border-border/40 bg-card/70 backdrop-blur-xl transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold mt-3">{post.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-3">
                  <Link href={post.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="gap-2 hover:text-primary relative group">
                      <ExternalLinkIcon className="h-4 w-4" />
                      <span className="relative">
                        Read
                        <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
