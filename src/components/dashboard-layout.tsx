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
import React from 'react'

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
      title: "Process Automation for Accounting Services",
      createdAt: "2024-01-15T10:30:00Z",
      topics: [
        {
          title: "Improving Cash Flow by Automating Payment Reminders",
          status: "For Review",
          dateCreated: "2024-01-16T09:00:00Z",
          script: "Improving cash flow is crucial for any business. One effective way to achieve this is by automating payment reminders. With innovative management solutions and the integration of payment software engineering, your company can enhance its cash flow without the constant manual oversight. How can this automation be advantageous to your business? Let’s delve into some strategies that can make a difference.\n\n 💡 AUTOMATION IMPACT\n Implementing a system that automates payment reminders can drastically improve efficiency. For instance, embracing operations software can ensure timely follow-ups with clients. Have you ever considered how much time your team spends manually tracking overdue payments?\n\n 🔄 STRATEGIC INNOVATION \nProper management through strategic innovation not only improves processes but also fosters client retention. Utilizing a central management console allows for streamlined operations. What innovative steps are you currently taking to manage payment reminders?\n\n 💻 PAYMENT TECHNOLOGIES\n Adopting payment software like Stripe can simplify the invoice process. This not only alleviates administrative burdens but also reduces accounting errors. Imagine the reduction in labor management system costs with such efficiencies.",
          carouselContent: [
            "/images/32.1.jfif",
            "/images/32.2.jfif",
            "/images/32.3.jfif",
            "/images/32.4.jfif",
            "/images/32.5.jfif",
            "/images/32.6.jfif"
          ]
        },
        {
          title: "Benefits of Automating Accounting Processes for Small Businesses",
          dateCreated: "2024-01-16T09:00:00Z",
          status: "Scheduled",
          scheduledDate: "2024-02-01T10:00:00Z",
          script: "In today's fast-paced business environment, small businesses are constantly seeking innovative management solutions to improve efficiency and accuracy. Automating accounting processes is not just about saving time—it's about leveraging payment software engineering to streamline operations. Our company specializes in providing American business solutions that adapt to the unique needs of small businesses. But how can automation truly benefit your organization?\n\n 🔍 INCREASED ACCURACY \n Automation minimizes human error by ensuring consistency across all financial records. Have you ever had those moments where manual errors led to costly mistakes? With tools like Wave Accounting, businesses can ensure double-entry accounting is precisely managed. This leads to more accurate financial statements and a clearer understanding of risk-weighted assets. \n\n ⏱️ TIME SAVINGS \n Automation liberates small businesses by reducing the time spent on repetitive tasks. Consider how many business hours in a year employees spend on manual accounting. Imagine reallocating that time towards strategic operations or enhancing collaborative decision-making processes. This shift not only boosts efficiency but also employee satisfaction.",
          carouselContent: [
            "/images/33.1.jfif",
            "/images/33.2.jfif",
            "/images/33.4.jfif",
            "/images/33.5.jfif",
            "/images/33.6.jfif"
          ]
        },
        {
          title: "Enhancing Efficiency with Automated Accounts Payable",
          dateCreated: "2024-01-16T09:00:00Z",
          status: "Posted",
          postedDate: "2024-01-20T14:30:00Z",
          script: "Enhancing efficiency in accounting operations has become crucial for businesses aiming to stay competitive. In today's fast-paced environment, Automated Accounts Payable solutions are increasingly becoming the cornerstone of prosperity management and proper management. Here's how this transformative technology impacts various aspects of compliance and financial operations: \n\n 🔍 COMPLIANCE MANAGEMENT SYSTEM \n An effective compliance management system integrates seamlessly with automated accounts payable to ensure every transaction adheres to organizational and regulatory obligations. Do you have a system in place that can identify and mitigate compliance risks automatically?\n\n 🔑 PAYMENT SOFTWARE ENGINEERING \n The integration of advanced payment software engineering within accounts payable automation simplifies complex payment processes. For instance, by leveraging solutions such as Stripe and Square Invoices, companies can streamline transactions. How efficient are your current payment processes?",
          carouselContent: [
            "/images/34.1.jfif",
            "/images/34.2.jfif",
            "/images/34.3.jfif",
            "/images/34.4.jfif",
            "/images/34.5.jfif",
            "/images/34.6.jfif"
          ]
        }
      ]
    }
  ],
  "Acme Corp": [
    {
      title: "Automation agencies for accounting firms are revolutionizing the industry",
      createdAt: "2024-01-17T14:45:00Z",
      topics: [
        {
          title: "The role of automation agencies in streamlining financial management for accounting firms",
          status: "For Review",
          dateCreated: "2024-01-18T11:00:00Z",
          script: "Exploring the transformative power of automation agencies in financial management brings to light new opportunities for accounting firms striving for efficiency. This integration not only reshapes processes but also aligns with our company's dedication to innovation.\n\n 🔄 EFFICIENCY ENHANCEMENT \n Automation agencies streamline repetitive tasks, allowing firms to optimize resources. By automating processes tied to the accounting equation and financial accounting hub, companies can reduce manual errors. Have you considered how automation might transform market-to-market accounting processes for your firm?\n\n 💡 STRATEGIC RESOURCE ALLOCATION  \n With the growing complexity of financial statements, accounting firms need effective solutions that agencies of record provide. Automation enables precise tracking of assets and liabilities in accounting, freeing up valuable time for strategic planning. What tasks would your team prioritize if given more time through automation?"
        },
        {
          title: "How automation agencies are changing the landscape of the accounting industry",
          status: "For Review",
          dateCreated: "2024-01-19T10:30:00Z",
          script: "Automation agencies are rapidly reshaping the accounting industry, driving significant transformation and innovation. At the heart of these changes is the ability to integrate technologies that streamline operations and enhance financial transparency. How exactly does this impact companies like ours? Let's dive into the key ways automation is revolutionizing accounting.\n\n 🔍 INNOVATIVE MANAGEMENT SOLUTIONS \n The rise of innovative management solutions is changing how accounting processes are handled. By integrating automation with accounting by Wave, businesses can streamline invoicing and financial reporting. Have you considered how much time your team could save with a system that simplifies double entry accounting?\n\n 👥 STRATEGIC INNOVATION GROUPS \n Strategic innovation groups are pushing companies to rethink their financial strategies. They help businesses adopt tools that improve accuracy and efficiency, similar to those offered by defense finance and accounting services. What if your financial analyst could leverage automation to predict future trends more accurately?"
        },
        {
          title: "How automation agencies are changing the landscape of the accounting industry",
          status: "Viewed",
          dateCreated: "2024-01-19T10:30:00Z",
          script: "Automation agencies are rapidly reshaping the accounting industry, driving significant transformation and innovation. At the heart of these changes is the ability to integrate technologies that streamline operations and enhance financial transparency. How exactly does this impact companies like ours? Let's dive into the key ways automation is revolutionizing accounting. \n\n 🔍 INNOVATIVE MANAGEMENT SOLUTIONS\n The rise of innovative management solutions is changing how accounting processes are handled. By integrating automation with accounting by Wave, businesses can streamline invoicing and financial reporting. Have you considered how much time your team could save with a system that simplifies double entry accounting?\n\n 👥 STRATEGIC INNOVATION GROUPS \n Strategic innovation groups are pushing companies to rethink their financial strategies. They help businesses adopt tools that improve accuracy and efficiency, similar to those offered by defense finance and accounting services. What if your financial analyst could leverage automation to predict future trends more accurately?"
        }
      ]
    }
  ],
  "TechNova Solutions": [
    {
      title: "Utilizing Airtable for Content Automation",
      createdAt: "2024-01-20T09:15:00Z",
      topics: [
        {
          title: "Maximizing Business Efficiency: The Role of Airtable in Content Automation",
          status: "For Review",
          dateCreated: "2024-01-21T08:00:00Z",
          script: "Maximizing Business Efficiency: The Role of Airtable in Content Automation is crucial for staying ahead in today's fast-paced environment. As businesses like ours strive for innovative management solutions, understanding content automation becomes a key driver for growth."
        },
        {
          title: "Unleashing the Full Potential of Your Business: Understanding Airtable and Content Automation",
          status: "Scheduled",
          scheduledDate: "2024-02-05T13:00:00Z",
          script: "Understanding how to harness tools like Airtable and content automation can significantly drive business growth and transform daily operations. In today's fast-paced digital landscape, automating processes is no longer a luxury but a necessity for businesses aiming to stay competitive. How can your business leverage automation to enhance efficiency and boost productivity?"
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
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
  
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Define topic templates for specific content ideas
    const topicTemplateMap: { [key: string]: { title: string; script: string; carouselContent?: string[] }[] } = {
      "Automated Expense Report Processing": [
        {
          title: "How Automation in Expense Reporting Can Benefit Your Business",
          script: "In today's fast-paced business environment, automation in expense reporting is more crucial than ever for enhancing efficiency and accuracy. This shift not only streamlines processes but also impacts essential functions within a company. Let's explore how embracing automation can significantly benefit your organization.\n\n 📊 PROCESS IMPROVEMENT \n Automation logic in expense reporting leads to seamless process flow, reducing manual intervention and errors. Have you ever considered how much time your team spends on repetitive tasks? Integrating an automated process can free up valuable resources, allowing your team to focus on strategic projects rather than tedious administrative work.\n\n 🕒 TIME SAVINGS \n Automated expense reporting tools like Turbotax Business for Mac save hours of manual data entry, increasing productivity. Employees can submit expenses in real-time, and managers can approve them with ease. Isn't it time you shifted focus from process management to business growth? These systems can transform how you manage financial operations.\n\n 📈 FINANCIAL ACCURACY \n With advanced systems in place, like payment management systems, error rates in financial report samples decrease. Accurate data is crucial for financial auditors, especially when analyzing the three financial statements. How does your current setup handle discrepancies in financial accounting vs managerial accounting? Enhanced accuracy not only ensures compliance but also helps in strategic decision-making.",
          carouselContent: [
            "/images/airtable71.1.jfif",
            "/images/airtable71.2.jfif",
            "/images/airtable71.3.jfif",
            "/images/airtable71.4.jfif",
            "/images/airtable71.5.jfif",
            "/images/airtable71.6.jfif"
          ]
        },
        {
          title: "Revolutionize Your Expense Management with Automated Processing",
          script: "Transform how you handle expenses with our innovative automated processing solutions. Navigating the complexities of modern-day expense management can be a challenge, but with the right tools, it becomes much easier. By incorporating advanced systems and strategies, your company can streamline processes and drive prosperity.\n\n 📊 COMPLIANCE MANAGEMENT SYSTEMS\n Maintaining regulations is key. Are you confident that your existing compliance system effectively manages your company's policies? Our solutions integrate seamlessly with compliance management systems to avoid regulatory pitfalls, ensuring proper management without the extra hassle. \n\n 💡 INNOVATIVE PAYMENT SOLUTIONS \n In today's fast-paced world, efficient financial transactions are crucial. Does your current payment software support all your operational needs? Our solutions, equipped with retail price management and payments software engineering, enhance the speed and accuracy of transactions, giving you more control over financial processes.",
          carouselContent: [
            "/images/airtable72.1.jfif",
            "/images/airtable72.2.jfif",
            "/images/airtable72.3.jfif",
            "/images/airtable72.4.jfif",
            "/images/airtable72.5.jfif"
          ]
        },
        {
          title: "The Future of Business: Automated Expense Report Processing",
          script: "In the fast-paced world of business, finding efficient ways to handle tasks can be the difference between success and stagnation. Automated expense report processing is revolutionizing how companies manage their finances. What possibilities does this hold for future business operations and compliance management systems?\n\n 📈 AUTOMATED EFFICIENCY \n Automation in expense processing reduces labor-intensive tasks, boosting productivity. Imagine the time employees could save with automatic data processing. Could this also lead to better labor management systems? Efficiency here means more focus on strategic tasks rather than mundane processes.\n\n 🔐 ENHANCED ACCURACY \n Automating expense reports ensures precision in financial documentation. Errors in manual entry can affect the prosperity management of any organization. Is your company's compliance stringent enough to prevent discrepancies that an automated system could easily handle?",
          carouselContent: [
            "/images/airtable73.1.jfif",
            "/images/airtable73.2.jfif",
            "/images/airtable73.3.jfif",
            "/images/airtable73.4.jfif",
            "/images/airtable73.5.jfif",
            "/images/airtable73.6.jfif"
          ]
        },
      ],
      "Content Automation": [
        {
          title: "The Role of Content Automation in Modern Marketing: Exploring Its Benefits and Implementation Strategies",
          script: "Content automation has become a significant asset in modern marketing, offering numerous benefits and transforming strategies for companies like FirmOS. As marketing evolves, it's crucial to explore how automation can revolutionize the way we tackle content creation and distribution.\n\n 🔗 SCALABILITY AND EFFICIENCY\n Content automation allows marketing strategist teams to scale their content efforts efficiently. How can businesses manage extensive marketing campaigns without delaying content delivery? By automating repetitive tasks, teams can focus on more strategic initiatives, ensuring timely content delivery. This becomes especially effective for international marketing groups handling diverse audiences.\n\n ✈️ IMPROVED TARGETING\n With tools like automated SEO and marketing intelligence, marketers can deliver personalized content effortlessly. Has your team struggled to tailor messages for specific audience segments? Automation helps by using data-driven insights to craft targeted campaigns that resonate with different demographics, enhancing engagement and effectiveness.",
          carouselContent: [
            "/images/airtable1.1.jfif",
            "/images/airtable1.2.jfif",
            "/images/airtable1.3.jfif",
            "/images/airtable1.4.jfif",
            "/images/airtable1.5.jfif",
            "/images/airtable1.6.jfif"
          ]
        },
        {
          title: "How Content Automation Can Help Your Business Scale Without Extra Resources",
          script: "In today's fast-paced business environment, scaling efficiently can be a challenge. However, with advances in content automation, businesses can achieve growth without needing extra resources. At FirmOS, we understand how crucial it is to stay ahead. Here's how content automation can play a vital role.\n\n 🚀 EFFICIENCY AND PRODUCTIVITY \n Content automation streamlines repetitive tasks, freeing up valuable time for your team. Did you know that tools like automation studio and real-time automation can handle routine content updates and posts? Imagine reallocating the time spent on these tasks to strategic initiatives.\n\n 🧭 IMPROVED ACCURACY\n Automation reduces the risk of human error. Have you ever experienced inconsistencies in your information management system? Automated processes ensure that each output is consistent and error-free, enhancing your brand’s reliability.",
          carouselContent: [
            "/images/airtable2.1.jfif",
            "/images/airtable2.2.jfif",
            "/images/airtable2.3.jfif",
            "/images/airtable2.4.jfif",
            "/images/airtable2.5.jfif",
            "/images/airtable2.6.jfif"
          ]
        },
        {
          title: "Top Tools and Technologies for Effective Content Automation",
          script: "Discover best practices for implementing content automation in your organization to achieve effective and scalable results.",
          carouselContent: [
            "/images/airtable3.1.jfif",
            "/images/airtable3.2.jfif",
            "/images/airtable3.3.jfif",
            "/images/airtable3.4.jfif",
            "/images/airtable3.5.jfif",
            "/images/airtable3.6.jfif"
          ]
        },
      ],
      "Why Airtable is great at automating simple documents": [
        {
          title: "Maximizing Efficiency with Airtable and Document Automation",
          script: "In today's fast-paced business world, maximizing efficiency with tools like Airtable and integrating document automation can significantly enhance productivity. As technology solutions professionals, how can leveraging these innovations drive American business solutions forward and support our day-to-day operations?\n\n 📌STREAMLINED WORKFLOWS\n Imagine having complex data sets managed seamlessly. Airtable provides innovative management solutions for organizing data, automating workflows, and reducing manual tasks. How often do you find yourself bogged down by repetitive tasks that could be automated?\n\n 📊INTEGRATED DATA SOLUTIONS\n Through integrated data solutions, Airtable can pull together different data streams into one coherent system. This not only simplifies data management but also boosts real-time collaboration. For instance, have you ever experienced delays simply because teams are using different data sources?",
          carouselContent: [
            "/images/airtable1.jfif",
            "/images/airtable2.jfif",
            "/images/airtable3.jfif",
            "/images/airtable4.jfif",
            "/images/airtable5.jfif",
            "/images/airtable6.jfif"
          ]
        },
        {
          title: "Simplifying Document Creation with Airtable Automation",
          script: "Simplifying the process of document creation can significantly enhance productivity for companies utilizing technology solutions professional services. Airtable automation offers an innovative management solutions approach to streamline workflows, ensuring proper management of tasks and projects. Here's how you can leverage Airtable to make your document creation process more efficient: \n\n\n📄 DOCUMENT TEMPLATES \n\nBy setting up specific templates for recurring documents, you can save valuable time and ensure consistency. Have you ever thought about how much time you spend recreating similar documents? Templates can be particularly useful in compliance management systems, where standardization is key.",
          carouselContent: [
            "/images/airtable8.1.jfif",
            "/images/airtable8.2.jfif",
            "/images/airtable8.3.jfif",
            "/images/airtable8.4.jfif"
          ]
        },
        {
          title: "A Step-by-Step Guide to Creating Automated Documents in Airtable",
          script: "The rise of automation has paved the way for businesses to streamline their processes, save time, and reduce errors. Our company recognizes the importance of leveraging tools like Airtable for automating documents, which is an integral part of modern business operations.\n\n 📊 AUTOMATED PROCESS\n Setting up an automated process in Airtable involves configuring workflows, defining triggers, and setting action steps. Have you ever experienced inefficiencies due to manual processes? Let Airtable manage tasks such as sending onboarding documents and product requirements document examples automatically.\n\n 📃 DESIGN DOCUMENT TEMPLATE\n A well-structured design document template can improve project integration management. For instance, you can automate the populating of fields within a design document, which ensures consistency and accuracy in every project.",
          carouselContent: [
            "/images/airtable9.1.jfif",
            "/images/airtable9.2.jfif",
            "/images/airtable9.3.jfif",
            "/images/airtable9.4.jfif",
            "/images/airtable9.5.jfif",
            "/images/airtable9.6.jfif"
          ]
        },
      ],
      // Add more content ideas and their respective templates here as needed.
    };
  
    // Determine the appropriate templates based on content idea
    const templates = topicTemplateMap[contentIdea] || [
      {
        title: `Exploring the Benefits of ${contentIdea}`,
        script: `In this topic, we discuss the key benefits of ${contentIdea} for your business. Understanding these advantages can help you make informed decisions about implementing ${contentIdea} in your organization.

1. Increased Efficiency: ${contentIdea} can streamline your processes, saving time and resources.
2. Competitive Advantage: Adopting ${contentIdea} early can put you ahead of your competitors.
3. Cost Savings: By optimizing operations, ${contentIdea} often leads to significant cost reductions.
4. Enhanced Customer Experience: ${contentIdea} can improve how you interact with and serve your customers.
5. Data-Driven Decision Making: ${contentIdea} often provides valuable insights for better business decisions.

How could your business specifically benefit from implementing ${contentIdea}?`,
        carouselContent: [""]
      },
      {
        title: `How ${contentIdea} Can Transform Your Business`,
        script: `Learn how ${contentIdea} can be used to bring positive changes to your organization. ${contentIdea} is not just a buzzword; it's a powerful tool that can revolutionize the way you do business.

1. Process Optimization: ${contentIdea} can help streamline your workflows and eliminate inefficiencies.
2. Innovation Catalyst: Implementing ${contentIdea} often leads to new ideas and approaches in your business.
3. Scalability: ${contentIdea} can provide the foundation for growing your business more effectively.
4. Employee Empowerment: With ${contentIdea}, your team can focus on more strategic, high-value tasks.
5. Competitive Edge: Embracing ${contentIdea} can help you stay ahead in your industry.

What aspects of your business do you think could be most transformed by ${contentIdea}?`,
        carouselContent: [""]
      },
      {
        title: `The Future of ${contentIdea}`,
        script: `An overview of the potential future developments and trends related to ${contentIdea}. As technology and business practices evolve, so too will the applications and impact of ${contentIdea}.

1. Emerging Technologies: How will AI, blockchain, or IoT influence the future of ${contentIdea}?
2. Industry Adoption: Which sectors are likely to see increased adoption of ${contentIdea} in the coming years?
3. Regulatory Landscape: How might future regulations shape the use and implementation of ${contentIdea}?
4. Integration with Other Systems: How will ${contentIdea} integrate with other business technologies and processes?
5. Societal Impact: What broader effects might widespread adoption of ${contentIdea} have on society and the economy?

How do you see ${contentIdea} evolving in your industry over the next 5-10 years?`,
        carouselContent: [""]
      },
    ];
  
    // Generate unique topics for the content idea
    const newTopics = templates.map((template) => ({
      title: template.title,
      status: "For Review",
      dateCreated: new Date().toISOString(),
      script: template.script,
      carouselContent: template.carouselContent
    }));
  
    // Add the new content idea with the generated unique topics
    const newContent = {
      title: contentIdea,
      createdAt: new Date().toISOString(),
      topics: newTopics,
    };

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
            <CardTitle className="break-words whitespace-normal">
              {content.title}
            </CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Created on: {new Date(content.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">For Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.topics.filter(topic => topic.status === "For Review").map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center justify-between">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-left break-words whitespace-normal"
                          onClick={() => onTopicClick(topic)}
                        >
                          <span className="line-clamp-2">{topic.title}</span>
                        </Button>
                        <StatusBadge status={topic.status} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Other Statuses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.topics.filter(topic => topic.status !== "For Review").map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center justify-between">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-left break-words whitespace-normal"
                          onClick={() => onTopicClick(topic)}
                        >
                          <span className="line-clamp-2">{topic.title}</span>
                        </Button>
                        <StatusBadge status={topic.status} date={topic.scheduledDate || topic.postedDate} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
}): React.ReactElement {
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
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <div className="h-full">
              <CalendarComponent
                mode="single"
                selected={selectedDate || undefined}
                onSelect={(date: Date | undefined) => setSelectedDate(date || null)}
                className="w-full h-full"
                modifiers={{ hasActivity: postedDates }}
                modifiersStyles={{
                  hasActivity: { backgroundColor: 'red', color: 'white', borderRadius: '50%' }
                }}
              />
            </div>
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
      <DialogContent className="sm:max-w-[90vw] h-[90vh] flex flex-col p-0">
        <div className="flex-shrink-0 p-6">
          <DialogHeader>
            <DialogTitle>{topic.title}</DialogTitle>
            <DialogDescription>
              Created on: {new Date(topic.dateCreated).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
        </div>
        <ScrollArea className="flex-grow px-6">
          <div className="space-y-4 pr-4">
            <div>
              <Label htmlFor="content-script">Content Script</Label>
              {isEditing ? (
                <Textarea
                  id="content-script"
                  value={editedScript}
                  onChange={(e) => setEditedScript(e.target.value)}
                  className="mt-2 w-full"
                  rows={10}
                />
              ) : (
                <div className="mt-2 p-2 bg-muted rounded-md whitespace-pre-wrap break-words">
                  {topic.script}
                </div>
              )}
            </div>
            {topic.carouselContent && topic.carouselContent.length > 0 && (
              <div>
                <Label>Carousel Content</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
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
        <div className="flex-shrink-0 p-6">
          <DialogFooter>
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
      </div>
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