// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src="/chadcn.png" alt="chadcn logo" />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">C</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-xl">chadcn</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
            <a href="#components" className="text-foreground/80 hover:text-foreground transition-colors">Components</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex">Log in</Button>
            <Button>Get Started</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <a href="#features">Features</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#components">Components</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#testimonials">Testimonials</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#pricing">Pricing</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#">Log in</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">New Release</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">Beautiful UI components built with Tailwind CSS v4</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Accessible and customizable components that you can copy and paste into your apps.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View on GitHub</Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to build modern web applications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tailwind CSS v4",
                description: "Built on the latest version of Tailwind CSS with modern features like container queries and 3D transforms."
              },
              {
                title: "Accessible Components",
                description: "All components follow WAI-ARIA guidelines and are keyboard navigable."
              },
              {
                title: "Dark Mode",
                description: "Built-in dark mode support with a toggle to switch between light and dark themes."
              },
              {
                title: "Customizable",
                description: "Components can be customized to match your brand with CSS variables."
              },
              {
                title: "TypeScript",
                description: "Written in TypeScript with full type safety and intelligent autocompletion."
              },
              {
                title: "Open Source",
                description: "Free and open source under the MIT license. Use it for personal or commercial projects."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-none bg-transparent">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <div className="size-6 text-primary">{index + 1}</div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Components Section */}
      <section id="components" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Components</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A collection of beautifully designed components.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Buttons", "Cards", "Dropdowns", "Forms", "Modals", "Tooltips",
              "Tabs", "Avatars", "Badges", "Alerts", "Toasts", "Menus"
            ].map((component, index) => (
              <Card key={index} className="group overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle>{component}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-40 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Preview</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">View Component</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">What others are saying about chadcn.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Frontend Developer",
                content: "chadcn has completely transformed how I build UIs. The components are so well designed and easy to customize."
              },
              {
                name: "Sarah Miller",
                role: "UI/UX Designer",
                content: "As a designer, I appreciate the attention to detail in these components. They're beautiful out of the box but flexible enough to adapt to any brand."
              },
              {
                name: "Michael Chen",
                role: "Full Stack Developer",
                content: "The TypeScript support is excellent. I can build type-safe UIs quickly without sacrificing quality or accessibility."
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${testimonial.name.replace(' ', '')}`} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">Join thousands of developers building better UIs with chadcn.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">View Documentation</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
              <p className="text-muted-foreground">Get updates on new components and features.</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="size-8">
                  <AvatarImage src="/chadcn.png" alt="chadcn logo" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">C</AvatarFallback>
                </Avatar>
                <span className="font-semibold">chadcn</span>
              </div>
              <p className="text-muted-foreground">Beautiful UI components built with Tailwind CSS v4.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Components</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} chadcn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}