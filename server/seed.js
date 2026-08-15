const mongoose = require('mongoose');
const Package = require('./models/Package');
const Review = require('./models/Review');
const VisitorMedia = require('./models/VisitorMedia');
const connectDB = require('./config/db');

const packagesSeed = [
  {
    id: 'sandakphu',
    category: 'trekking',
    title: 'Sandakphu & Phalut Expedition',
    description: 'Conquer the highest peak of West Bengal with grand views of Everest & Kanchenjunga.',
    originalPrice: 14999,
    discountPercent: 15,
    duration: '6 Days / 5 Nights',
    rating: '4.9 (128)',
    tag: 'Trekking',
    tagIcon: 'fas fa-hiking',
    image: '/assets/images/img-13.jpg'
  },
  {
    id: 'tinchuley',
    category: 'offbeat',
    title: 'Tinchuley & Takdah Eco Retreat',
    description: 'Peaceful mountain village surrounded by orange orchards, tea gardens, and misty pine trails.',
    originalPrice: 8499,
    discountPercent: 10,
    duration: '3 Days / 2 Nights',
    rating: '4.8 (94)',
    tag: 'Offbeat',
    tagIcon: 'fas fa-leaf',
    image: '/assets/images/img-14.jpg'
  },
  {
    id: 'kalimpong',
    category: 'hillstation',
    title: 'Kalimpong & Deolo Hill Heritage',
    description: 'Historic orchids, colonial bungalows, Buddhist monasteries, and paragliding thrill.',
    originalPrice: 11299,
    discountPercent: 0,
    duration: '4 Days / 3 Nights',
    rating: '4.7 (110)',
    tag: 'Hill Station',
    tagIcon: 'fas fa-mountain',
    image: '/assets/images/img-15.jpg'
  },
  {
    id: 'darjeeling',
    category: 'hillstation',
    title: 'Darjeeling Queen of Hills',
    description: 'Tiger Hill sunrise over Kanchenjunga, Himalayan Railway toy train ride, and world-famous aromatic tea estates.',
    originalPrice: 13499,
    discountPercent: 12,
    duration: '4 Days / 3 Nights',
    rating: '4.9 (210)',
    tag: 'Hill Station',
    tagIcon: 'fas fa-train',
    image: '/assets/images/img-18.jpg'
  },
  {
    id: 'dooars',
    category: 'wildlife',
    title: 'Dooars Gorumara Wildlife Safari',
    description: 'Jeep safaris through dense tea gardens and forest reserves to spot one-horned rhinos, bison, and exotic birds.',
    originalPrice: 9999,
    discountPercent: 0,
    duration: '3 Days / 2 Nights',
    rating: '4.8 (85)',
    tag: 'Wildlife',
    tagIcon: 'fas fa-paw',
    image: '/assets/images/img-17.jpg'
  },
  {
    id: 'chatakpur',
    category: 'offbeat',
    title: 'Chatakpur Eco Village Stay',
    description: 'High-altitude organic village inside Senchal Wildlife Sanctuary offering uninterrupted snow peak vistas.',
    originalPrice: 7999,
    discountPercent: 15,
    duration: '3 Days / 2 Nights',
    rating: '4.9 (67)',
    tag: 'Offbeat',
    tagIcon: 'fas fa-tree',
    image: '/assets/images/img-19.jpg'
  }
];

const reviewsSeed = [
  {
    id: 'rev-1',
    name: 'Ananya Roy',
    location: 'Kolkata, WB',
    rating: 5,
    comment: 'The Sandakphu expedition was unforgettable! Kanchenjunga sunrise view was mesmerizing. Excellent guidance by Northbengal Buzz team.',
    date: '2026-07-20',
    status: 'approved',
    packageName: 'Sandakphu & Phalut Expedition'
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya Sharma',
    location: 'Delhi',
    rating: 5,
    comment: 'Booked Tinchuley & Takdah stay. Organic tea gardens, fresh pine air, and smooth jeep transport. 10/10 recommend!',
    date: '2026-08-02',
    status: 'approved',
    packageName: 'Tinchuley & Takdah Eco Retreat'
  },
  {
    id: 'rev-3',
    name: 'Priyanka Das',
    location: 'Siliguri, WB',
    rating: 4,
    comment: 'Loved the Darjeeling Toy Train & Tiger Hill experience. Very prompt WhatsApp customer support.',
    date: '2026-08-10',
    status: 'approved',
    packageName: 'Darjeeling Queen of Hills'
  }
];

const mediaSeed = [
  {
    id: 'vmed-1',
    authorName: 'Suman Mukherjee',
    location: 'Durgapur',
    caption: 'Misty sunrise over Sandakphu ridge line!',
    photos: [
      '/assets/images/img-13.jpg',
      '/assets/images/img-14.jpg'
    ],
    uploadDate: '2026-08-05',
    status: 'approved'
  },
  {
    id: 'vmed-2',
    authorName: 'Sneha & Rahul',
    location: 'Bangalore',
    caption: 'Memorable tea leaf plucking at Tinchuley estate.',
    photos: [
      '/assets/images/img-15.jpg',
      '/assets/images/img-18.jpg',
      '/assets/images/img-19.jpg'
    ],
    uploadDate: '2026-08-11',
    status: 'approved'
  }
];

const seedData = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('Skipping DB seeding because MongoDB is not running locally.');
    process.exit(0);
  }

  try {
    await Package.deleteMany({});
    await Review.deleteMany({});
    await VisitorMedia.deleteMany({});

    for (const pkg of packagesSeed) {
      const p = new Package(pkg);
      await p.save();
    }

    await Review.insertMany(reviewsSeed);
    await VisitorMedia.insertMany(mediaSeed);

    console.log('🌱 Database Seeded Successfully with Packages, Reviews, and Visitor Media!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
