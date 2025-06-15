
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Vote, Users, Clock, MapPin, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventsPolls = () => {
  const events = [
    {
      id: 1,
      title: "Advanced Nail Art Masterclass",
      date: "March 15, 2024",
      time: "2:00 PM PST",
      attendees: 247,
      maxAttendees: 300,
      location: "Virtual Event",
      community: "Elite Nail Artists",
      image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
      price: "Free for Members",
      status: "filling_fast"
    },
    {
      id: 2,
      title: "Hair Color Theory Workshop",
      date: "March 20, 2024",
      time: "6:00 PM EST",
      attendees: 156,
      maxAttendees: 200,
      location: "New York, NY",
      community: "Hair Mastery",
      image: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png",
      price: "$89",
      status: "available"
    }
  ];

  const polls = [
    {
      id: 1,
      question: "What topic should we cover in next week's masterclass?",
      options: [
        { text: "Advanced 3D Nail Art", votes: 1247, percentage: 45 },
        { text: "Color Theory Basics", votes: 834, percentage: 30 },
        { text: "Business Marketing", votes: 692, percentage: 25 }
      ],
      totalVotes: 2773,
      timeLeft: "2 days left",
      community: "Elite Nail Artists"
    },
    {
      id: 2,
      question: "Which feature would you like to see added to EmviApp?",
      options: [
        { text: "Live Streaming", votes: 987, percentage: 38 },
        { text: "Mentorship Matching", votes: 823, percentage: 32 },
        { text: "Certification Courses", votes: 776, percentage: 30 }
      ],
      totalVotes: 2586,
      timeLeft: "5 days left",
      community: "Global Community"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Events & Community Voice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join exclusive events and help shape the future of our communities through polls and feedback
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-8 w-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                  Upcoming Events
                </h3>
              </div>

              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={
                        event.status === 'filling_fast' 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-green-500 hover:bg-green-600"
                      }>
                        {event.status === 'filling_fast' ? 'Filling Fast!' : 'Available'}
                      </Badge>
                    </div>

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <Badge variant="outline" className="bg-white/20 border-white/30 text-white mb-2">
                        {event.community}
                      </Badge>
                      <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Spots Filled</span>
                        <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-purple-600">
                        {event.price}
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Reserve Spot
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Polls Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Vote className="h-8 w-8 text-pink-600" />
                <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                  Community Polls
                </h3>
              </div>

              {polls.map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      {poll.community}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{poll.timeLeft}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-6">
                    {poll.question}
                  </h4>

                  <div className="space-y-4 mb-6">
                    {poll.options.map((option, optIndex) => (
                      <div key={optIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{option.text}</span>
                          <span className="text-gray-500">{option.votes} votes</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 cursor-pointer hover:bg-gray-300 transition-colors">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>{poll.totalVotes.toLocaleString()}</strong> total votes
                    </div>
                    <Button variant="outline" size="sm">
                      <Vote className="h-4 w-4 mr-2" />
                      Vote Now
                    </Button>
                  </div>
                </motion.div>
              ))}

              {/* Create Poll Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center"
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Create Your Own Poll
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPolls;
