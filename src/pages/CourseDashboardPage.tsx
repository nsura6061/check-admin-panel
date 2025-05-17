
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Play, Video, BookOpen } from "lucide-react";

interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: VideoLesson[];
  progress: number;
}

const CourseDashboardPage: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoLesson | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  
  // Dummy course data
  const courseTitle = "Advanced React Development";
  const courseDescription = "Master React with hooks, context API, and modern patterns";
  const courseInstructor = "Jane Smith";
  const overallProgress = 35;
  
  const chapters: Chapter[] = [
    {
      id: "chapter-1",
      title: "Introduction to Modern React",
      description: "Learn the basics of React and its ecosystem",
      progress: 100,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Course Overview",
          duration: "5:20",
          completed: true,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Environment",
          duration: "10:15",
          completed: true,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
      ]
    },
    {
      id: "chapter-2",
      title: "React Hooks in Depth",
      description: "Master the use of hooks for state and effects",
      progress: 50,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Understanding useState",
          duration: "12:45",
          completed: true,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          id: "lesson-2-2",
          title: "Working with useEffect",
          duration: "15:30",
          completed: false,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          id: "lesson-2-3",
          title: "Custom Hooks Patterns",
          duration: "18:20",
          completed: false,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
      ]
    },
    {
      id: "chapter-3",
      title: "State Management Solutions",
      description: "Compare different state management options",
      progress: 0,
      lessons: [
        {
          id: "lesson-3-1",
          title: "Context API Deep Dive",
          duration: "14:50",
          completed: false,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        },
        {
          id: "lesson-3-2",
          title: "Redux vs Context",
          duration: "20:10",
          completed: false,
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
      ]
    }
  ];

  const handlePlayVideo = (video: VideoLesson) => {
    setCurrentVideo(video);
    setActiveTab("video");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{courseTitle}</h1>
          <p className="text-muted-foreground mt-1">Instructor: {courseInstructor}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{overallProgress}% Complete</span>
          <Progress value={overallProgress} className="w-[180px]" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="video">
            <Video className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Current Video</span>
          </TabsTrigger>
          <TabsTrigger value="content">
            <BookOpen className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Course Content</span>
          </TabsTrigger>
          <TabsTrigger value="resources">
            <BookOpen className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="mt-6">
          {currentVideo ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{currentVideo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                    <video 
                      src={currentVideo.videoUrl} 
                      controls 
                      className="w-full h-full"
                      poster="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                    ></video>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No video selected</CardTitle>
                <CardDescription>Please select a video from the course content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setActiveTab("content")}>
                  Browse content
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <div className="space-y-4">
            {chapters.map(chapter => (
              <Card key={chapter.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{chapter.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{chapter.progress}%</span>
                      <Progress value={chapter.progress} className="w-[60px]" />
                    </div>
                  </div>
                  <CardDescription>{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={chapter.id}>
                      <AccordionTrigger>Lessons ({chapter.lessons.length})</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {chapter.lessons.map(lesson => (
                            <div 
                              key={lesson.id}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
                            >
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handlePlayVideo(lesson)}
                                  className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                                <div>
                                  <p className={`text-sm ${lesson.completed ? 'line-through opacity-70' : ''}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                </div>
                              </div>
                              {lesson.completed && (
                                <div className="text-sm text-green-500 font-medium">Completed</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
              <CardDescription>Download materials related to this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Course Slides</p>
                      <p className="text-xs text-muted-foreground">PDF, 2.4MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Exercise Files</p>
                      <p className="text-xs text-muted-foreground">ZIP, 15MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Reference Guide</p>
                      <p className="text-xs text-muted-foreground">PDF, 1.8MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDashboardPage;
