'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, FileText, BarChart, Upload, Calendar, Edit, Clock, Send, ThumbsDown, Loader2, User} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
//import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'


type Topic = {
  title: string;
  status: string;
  dateCreated: string;
  script: string;
  scheduledDate?: string;
  postedDate?: string;
  carouselContent?: string[];
};

type ContentItem = {
  title: string;
  createdAt: string;
  topics: Topic[];
};

type GeneratedContent = {
  [key: string]: ContentItem[];
};

type MetricsType = {
  'For Review': number;
  'Viewed': number;
  'Scheduled': number;
  'Posted': number;
  'Rejected': number;
};

const customers = [
  "PORTICUS MARKETPLACE INC.",
  "Acme Corp",
  "TechNova Solutions"
]

const dummyContent = {
  "PORTICUS MARKETPLACE INC.": [
    {
      title: "E-commerce Trends 2024",
      createdAt: "2024-01-15T10:30:00Z",
      topics: [
        {
          title: "The Rise of Social Commerce",
          status: "For Review",
          dateCreated: "2024-01-16T09:00:00Z",
          script: "Social commerce is revolutionizing online shopping..."
        },
        {
          title: "AI-Powered Personalization in E-commerce",
          status: "Scheduled",
          scheduledDate: "2024-02-01T10:00:00Z",
          script: "AI is transforming the way e-commerce platforms personalize..."
        },
        {
          title: "Sustainable E-commerce Practices",
          status: "Posted",
          postedDate: "2024-01-20T14:30:00Z",
          script: "Consumers are increasingly demanding sustainable practices..."
        }
      ]
    }
  ],
  "Acme Corp": [
    {
      title: "Innovation in Manufacturing",
      createdAt: "2024-01-17T14:45:00Z",
      topics: [
        {
          title: "3D Printing Revolution",
          status: "For Review",
          dateCreated: "2024-01-18T11:00:00Z",
          script: "3D printing is reshaping the manufacturing landscape..."
        },
        {
          title: "IoT in Smart Factories",
          status: "Viewed",
          dateCreated: "2024-01-19T10:30:00Z",
          script: "The Internet of Things is enabling smarter, more efficient factories..."
        }
      ]
    }
  ],
  "TechNova Solutions": [
    {
      title: "Cybersecurity Best Practices",
      createdAt: "2024-01-20T09:15:00Z",
      topics: [
        {
          title: "Zero Trust Security Model",
          status: "For Review",
          dateCreated: "2024-01-21T08:00:00Z",
          script: "The Zero Trust model is becoming essential in modern cybersecurity..."
        },
        {
          title: "AI in Threat Detection",
          status: "Scheduled",
          scheduledDate: "2024-02-05T13:00:00Z",
          script: "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats..."
        }
      ]
    }
  ]
}

export function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('Content Idea')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>(dummyContent as GeneratedContent);
  const [customerName, setCustomerName] = useState(customers[0])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleTopicClick = (topic: Topic) => {
    if (topic.status === "For Review") {
      setGeneratedContent(prevContent => ({
        ...prevContent,
        [customerName]: prevContent[customerName].map(content => ({
          ...content,
          topics: content.topics.map(t => 
            t.title === topic.title ? { ...t, status: "Viewed" } : t
          )
        }))
      }))
    }
    setSelectedTopic(topic)
  }
  

  const renderContent = () => {
    switch (activeSection) {
      case 'Content Idea':
        return <ContentIdeaSection setGeneratedContent={setGeneratedContent} setActiveSection={setActiveSection} setCustomerName={setCustomerName} customerName={customerName} />
      case 'Generated Content':
        return <GeneratedContentSection generatedContent={generatedContent[customerName] || []} onTopicClick={handleTopicClick} />
      case 'Analytics':
        return <AnalyticsSection generatedContent={generatedContent[customerName] || []} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      default:
        return null
    }
  }
  

  return (
    <div className="flex h-screen bg-background">
      {/* Navigation Sidebar */}
      <nav className="w-64 border-r bg-muted">
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-14 items-center border-b px-4">
            <h1 className="text-lg font-semibold">Content Generator</h1>
          </div>
          <ul className="flex-1 space-y-1 p-4">
            {[
              { name: 'Content Idea', icon: LayoutDashboard },
              { name: 'Generated Content', icon: FileText },
              { name: 'Analytics', icon: BarChart },
            ].map((item) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    activeSection === item.name && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setActiveSection(item.name)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t pt-4">
            <div className="flex items-center px-4 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.png" alt="Customer Avatar" />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium">{customerName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="mb-6 text-2xl font-bold">{activeSection}</h2>
        {renderContent()}
      </main>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          onClose={() => {
            setSelectedTopic(null)
            setIsEditing(false)
            setIsScheduling(false)
            setIsPosting(false)
            setIsRejecting(false)
          }}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isScheduling={isScheduling}
          setIsScheduling={setIsScheduling}
          isPosting={isPosting}
          setIsPosting={setIsPosting}
          isRejecting={isRejecting}
          setIsRejecting={setIsRejecting}
          date={date}
          setDate={setDate}
          setGeneratedContent={setGeneratedContent}
          customerName={customerName}
        />
      )}
    </div>
  )
}

function ContentIdeaSection({ setGeneratedContent, setActiveSection, setCustomerName, customerName }: {
  setGeneratedContent: React.Dispatch<React.SetStateAction<GeneratedContent>>;
  setActiveSection: (section: string) => void;
  setCustomerName: (name: string) => void;
  customerName: string;
}) {
  const [contentIdea, setContentIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newContent = {
      title: contentIdea,
      createdAt: new Date().toISOString(),
      topics: [
        {
          title: "Maximizing Efficiency with Airtable and Document Automation",
          status: "For Review",
          dateCreated: new Date().toISOString(),
          script: "In today's fast-paced business world, maximizing efficiency with tools like Airtable and integrating document automation can significantly enhance productivity. As technology solutions professionals, how can leveraging these innovations drive American business solutions forward and support our day-to-day operations?\n\n 📌STREAMLINED WORKFLOWS\n Imagine having complex data sets managed seamlessly. Airtable provides innovative management solutions for organizing data, automating workflows, and reducing manual tasks. How often do you find yourself bogged down by repetitive tasks that could be automated?\n\n 📊INTEGRATED DATA SOLUTIONS\n Through integrated data solutions, Airtable can pull together different data streams into one coherent system. This not only simplifies data management but also boosts real-time collaboration. For instance, have you ever experienced delays simply because teams are using different data sources?",
          carouselContent: [
            "/images/airtable1.jfif",
            "/images/airtable2.jfif",
            "/images/airtable3.jfif",
            "/images/airtable4.jfif",
            "/images/airtable5.jfif",
            "/images/airtable6.jfif"
          ],
        },
        {
          title: "Simplifying Document Creation with Airtable Automation",
          status: "For Review",
          dateCreated: new Date().toISOString(),
          script: "Simplifying the process of document creation can significantly enhance productivity for companies utilizing technology solutions professional services. Airtable automation offers an innovative management solutions approach to streamline workflows, ensuring proper management of tasks and projects. Here's how you can leverage Airtable to make your document creation process more efficient: \n\n\n📄 DOCUMENT TEMPLATES \n\nBy setting up specific templates for recurring documents, you can save valuable time and ensure consistency. Have you ever thought about how much time you spend recreating similar documents? Templates can be particularly useful in compliance management systems, where standardization is key.",
        },
        {
          title: "Collaboration Made Easy: Switch Seamlessly with Airtable",
          status: "For Review",
          dateCreated: new Date().toISOString(),
          script: "Understanding the power of variables in Airtable document automation can truly transform your approach to data management and workflow efficiency. By leveraging the right techniques, you can streamline processes and achieve significant improvements in accuracy and productivity.\n\n\n📊 VALIDATED DATA\n\nEnsuring that your data is accurate and validated is crucial for any automation logic to work effectively. How often do you encounter incorrect data that disrupts your workflows? Using validated data ensures reliability and efficiency in every automation step.",
        }
      ]
    }

    setGeneratedContent(prevContent => ({
      ...prevContent,
      [customerName]: [newContent, ...(prevContent[customerName] || [])]
    }))
    setIsLoading(false)
    setSuccessMessage(`"${contentIdea}" has been generated. Please see the Generated Content section.`)
    setShowSuccessModal(true)
    setContentIdea("")

    // Automatically switch to Generated Content section after 3 seconds
    setTimeout(() => {
      setActiveSection('Generated Content')
      setShowSuccessModal(false)
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Content Idea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-idea">Content Idea</Label>
            <Textarea 
              id="content-idea" 
              placeholder="Enter your content idea here..." 
              value={contentIdea}
              onChange={(e) => setContentIdea(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select value={customerName} onValueChange={setCustomerName}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer} value={customer}>
                    {customer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Upload Additional Content</Label>
            <div className="flex space-x-2">
              <Button  type="button" variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Video
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Audio
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Voice Notes
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating content idea...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </CardContent>
      {showSuccessModal && (
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
            </DialogHeader>
            <DialogDescription>{successMessage}</DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

function GeneratedContentSection({ generatedContent, onTopicClick }: {
  generatedContent: ContentItem[];
  onTopicClick: (topic: Topic) => void;
}) {
  // Sort content from most recent to oldest
  const sortedContent = [...generatedContent].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="space-y-8">
      {sortedContent.map((content, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Created on: {new Date(content.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">For Review</h3>
                <ul className="space-y-2">
                  {content.topics.filter(topic => topic.status === "For Review").map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() => onTopicClick(topic)}
                      >
                        {topic.title}
                      </Button>
                      <StatusBadge status={topic.status} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Other Statuses</h3>
                <ul className="space-y-2">
                  {content.topics.filter(topic  => topic.status !== "For Review").map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() => onTopicClick(topic)}
                      >
                        {topic.title}
                      </Button>
                      <StatusBadge status={topic.status} date={topic.scheduledDate || topic.postedDate} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status, date }: { status: string; date?: string }) {
  let badgeColor = "bg-gray-500"
  let dateString = ""

  switch (status) {
    case "For Review":
      badgeColor = "bg-yellow-500"
      break
    case "Viewed":
      badgeColor = "bg-blue-500"
      break
    case "Scheduled":
      badgeColor = "bg-purple-500"
      dateString = date ? ` - ${new Date(date).toLocaleDateString()}` : ""
      break
    case "Posted":
      badgeColor = "bg-green-500"
      dateString = date ? ` - ${new Date(date).toLocaleDateString()}` : ""
      break
  }

  return (
    <Badge className={`${badgeColor} text-white`}>
      {status}{dateString}
    </Badge>
  )
}

function isValidStatus(status: string): status is keyof MetricsType {
  return ['For Review', 'Viewed', 'Scheduled', 'Posted', 'Rejected'].includes(status);
}

function AnalyticsSection({ generatedContent, selectedDate, setSelectedDate }: {
  generatedContent: ContentItem[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) {
  const [metrics, setMetrics] = useState<MetricsType>({
    'For Review': 0,
    'Viewed': 0,
    'Scheduled': 0,
    'Posted': 0,
    'Rejected': 0
  });

  useEffect(() => {
    const newMetrics: MetricsType = {
      'For Review': 0,
      'Viewed': 0,
      'Scheduled': 0,
      'Posted': 0,
      'Rejected': 0
    };

    generatedContent.forEach(content => {
      content.topics.forEach(topic => {
        if (isValidStatus(topic.status)) {
          newMetrics[topic.status]++;
        }
      });
    });

    setMetrics(newMetrics);
  }, [generatedContent]);

  const pieChartData = Object.entries(metrics)
    .filter(([, value]) => value > 0)
    .map(([status, count]) => ({
      name: status,
      value: count
    }));

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  const totalContentItems = Object.values(metrics).reduce((a, b) => a + b, 0);
  const completionRate = totalContentItems > 0 ? ((metrics['Posted'] / totalContentItems) * 100).toFixed(2) : '0.00';
  const pendingReview = metrics['For Review'] + metrics['Viewed'];

  const getPostedDates = (): Date[] => {
    const dates: Date[] = [];
    generatedContent.forEach(content => {
      content.topics.forEach(topic => {
        const dateString = topic.postedDate || topic.scheduledDate;
        if (dateString && typeof dateString === 'string') {
          dates.push(new Date(dateString));
        }
      });
    });
    return dates;
  };

  const postedDates = getPostedDates();

  const getContentForDate = (date: Date): Topic[] => {
    const content: Topic[] = [];
    generatedContent.forEach(item => {
      item.topics.forEach(topic => {
        const topicDate = topic.postedDate || topic.scheduledDate;
        if (topicDate && new Date(topicDate).toDateString() === date.toDateString()) {
          content.push(topic);
        }
      });
    });
    return content;
  };

  const selectedDateContent = selectedDate ? getContentForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Production Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Total Content Items</Label>
                <div className="text-2xl font-bold">{totalContentItems}</div>
              </div>
              <div>
                <Label>Completion Rate</Label>
                <div className="text-2xl font-bold">{completionRate}%</div>
              </div>
              <div>
                <Label>Pending Review</Label>
                <div className="text-2xl font-bold">{pendingReview}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date: Date | undefined) => setSelectedDate(date || null)}
              className="rounded-md border"
              modifiers={{
                hasActivity: postedDates
              }}
              modifiersStyles={{
                hasActivity: { backgroundColor: 'red', color: 'white', borderRadius: '50%' }
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled/Posted Content</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              selectedDateContent.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDateContent.map((topic, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{topic.title}</span>
                      <StatusBadge status={topic.status} date={topic.scheduledDate || topic.postedDate} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No content scheduled or posted for this date.</p>
              )
            ) : (
              <p>Select a date to view scheduled or posted content.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


function TopicDetailModal({ topic, onClose, isEditing, setIsEditing, isScheduling, setIsScheduling, isPosting, setIsPosting, isRejecting, setIsRejecting, date, setDate, setGeneratedContent, customerName }: {
  topic: Topic;
  onClose: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isScheduling: boolean;
  setIsScheduling: (scheduling: boolean) => void;
  isPosting: boolean;
  setIsPosting: (posting: boolean) => void;
  isRejecting: boolean;
  setIsRejecting: (rejecting: boolean) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  setGeneratedContent: React.Dispatch<React.SetStateAction<GeneratedContent>>;
  customerName: string;
}) {
  const [editedScript, setEditedScript] = useState(topic.script)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setGeneratedContent(prevContent => ({
      ...prevContent,
      [customerName]: prevContent[customerName].map(content => ({
        ...content,
        topics: content.topics.map(t => 
          t.title === topic.title ? { ...t, script: editedScript } : t
        )
      }))
    }))
    setIsEditing(false)
  }

  const handleSchedule = () => {
    setIsScheduling(true)
  }

  const handlePostNow = () => {
    setIsPosting(true)
  }

  const handleConfirmPost = () => {
    setGeneratedContent(prevContent => ({
      ...prevContent,
      [customerName]: prevContent[customerName].map(content => ({
        ...content,
        topics: content.topics.map(t => 
          t.title === topic.title ? { ...t, status: "Posted", postedDate: new Date().toISOString() } : t
        )
      }))
    }))
    setIsPosting(false)
    onClose()
  }

  const handleReject = () => {
    setIsRejecting(true)
  }

  const handleConfirmReject = () => {
    setGeneratedContent(prevContent => ({
      ...prevContent,
      [customerName]: prevContent[customerName].map(content => ({
        ...content,
        topics: content.topics.map(t => 
          t.title === topic.title ? { ...t, status: "Rejected" } : t
        )
      }))
    }))
    setIsRejecting(false)
    onClose()
  }

  const handleConfirmSchedule = () => {
    if (date) {
      setGeneratedContent(prevContent => ({
        ...prevContent,
        [customerName]: prevContent[customerName].map(content => ({
          ...content,
          topics: content.topics.map(t => 
            t.title === topic.title ? { ...t, status: "Scheduled", scheduledDate: date.toISOString() } : t
          )
        }))
      }));
      setIsScheduling(false);
      onClose(); // Close the modal after scheduling
    } else {
      // Handle the case where date is undefined
      console.error("Cannot schedule: No date selected");
      // Optionally, show an error message to the user
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{topic.title}</DialogTitle>
          <DialogDescription>
            Created on: {new Date(topic.dateCreated).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-script">Content Script</Label>
              {isEditing ? (
                <Textarea
                  id="content-script"
                  value={editedScript}
                  onChange={(e) => setEditedScript(e.target.value)}
                  className="mt-2"
                />
              ) : (
                <div className="mt-2 p-2 bg-muted rounded-md">{topic.script}</div>
              )}
            </div>
            {topic.carouselContent && topic.carouselContent.length > 0 && (
              <div>
                <Label>Carousel Content</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {topic.carouselContent.map((item: string, index: number) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-md">
                      <img src={item} alt={`Carousel item ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          {isEditing ? (
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Button>
          )}
          <Button onClick={handleSchedule} className="bg-purple-500 hover:bg-purple-600 text-white">
            <Clock className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
          <Button onClick={handlePostNow} className="bg-green-500 hover:bg-green-600 text-white">
            <Send className="mr-2 h-4 w-4" />
            Post Now
          </Button>
          <Button onClick={handleReject} variant="destructive">
            <ThumbsDown className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Schedule Post Modal */}
      {isScheduling && (
        <Dialog open={isScheduling} onOpenChange={() => setIsScheduling(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Post</DialogTitle>
              <DialogDescription>Choose a date to schedule your post</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setIsScheduling(false)}>Cancel</Button>
              <Button onClick={handleConfirmSchedule} className="bg-purple-500 hover:bg-purple-600 text-white">
                Confirm Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Post Now Confirmation Modal */}
      {isPosting && (
        <Dialog open={isPosting} onOpenChange={() => setIsPosting(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Posting</DialogTitle>
            </DialogHeader>
            <p className="font-bold">Are you sure you want to post {topic.title} to LinkedIn?</p>
            <DialogFooter>
              <Button onClick={() => setIsPosting(false)} variant="outline">Cancel</Button>
              <Button onClick={handleConfirmPost} className="bg-green-500 hover:bg-green-600 text-white">
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Confirmation Modal */}
      {isRejecting && (
        <Dialog open={isRejecting} onOpenChange={() => setIsRejecting(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Rejection</DialogTitle>
            </DialogHeader>
            <p className="font-bold">Are you sure you want to reject {topic.title}?</p>
            <DialogFooter>
              <Button onClick={() => setIsRejecting(false)} variant="outline">Cancel</Button>
              <Button onClick={handleConfirmReject} variant="destructive">
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}