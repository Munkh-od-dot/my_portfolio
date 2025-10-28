// Mock data for certificates and achievements (since no database integration)
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  imageUrl: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: string;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "CS50x introdaction to computer science",
    issuer: "Harvard University",
    date: "2024-03",
    category: "Computer science",
    imageUrl: "/CS50x.png",
  },
  {
    id: "2",
    title: "cs50p Programming with python",
    issuer: "Harvard University",
    date: "2025-09",
    category: "Computer science",
    imageUrl: "/CS50P.png",
  },
  {
    id: "3",
    title: "Shanhai summer school chinese weiqi promotion project",
    issuer: "SHANGHAI JAIN QIAO UNIVERSITY",
    date: "2024-08",
    category: "Go board game",
    imageUrl: "/weiqi_project.jpg",
  },
  {
    id: "4",
    title: "Internship at DataCare LLC",
    issuer: "DataCare LLC",
    date: "2025-07",
    category: "Computerscience",
    imageUrl: "/DataCare.jpg",
  },
  {
    id: "5",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "2024-10",
    category: "ComputerScience",
    imageUrl: "/Front-End.png",
  },
  {
    id: "6",
    title: "Version Control",
    issuer: "Meta",
    date: "2024-11",
    category: "ComputerScience",
    imageUrl: "/version_control.png",
  },
  {
    id: "7",
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "2024-12",
    category: "ComputerScience",
    imageUrl: "/meta_java.png",
  },
  {
    id: "8",
    title: "Local school tourement of Programming",
    issuer: "Tsonjin Cyber",
    date: "2024-11",
    category: "Academic",
    imageUrl: "/local_P.jpg",
  },
  {
    id: "9",
    title:
      "annuversy of 50th year of diplomatic relationship bitween japan and mongolia",
    issuer: "association ",
    date: "2022-4",
    category: "Go board game",
    imageUrl: "/50.jpg",
  },
  {
    id: "10",
    title: "Extensive Readers",
    issuer: "Tsonjin Cyber",
    date: "2024-11",
    category: "Academic",
    imageUrl: "/lingours.jpg",
  },
  {
    id: "11",
    title: "Happy teachers Day 2024",
    issuer: "Tsonjin Cyber",
    date: "2024-10",
    category: "Academic",
    imageUrl: "/teacherD1.jpg",
  },
  {
    id: "12",
    title: "Happy teachers Day 2025",
    issuer: "Tsonjin Cyber",
    date: "2025-10",
    category: "Academic",
    imageUrl: "/teacherD2.jpg",
  },
  {
    id: "13",
    title: "KANGAROO 2019",
    issuer: "Mongolian Committee for Kangaroo",
    date: "2019-04",
    category: "Academic",
    imageUrl: "/kangaroo.jpg",
  },
  {
    id: "14",
    title: "Introduction to HTML",
    issuer: "SoloLearn",
    date: "2024-11",
    category: "ComputerScience",
    imageUrl: "/solo_HTML.png",
  },
  {
    id: "15",
    title: "introduction to CSS",
    issuer: "SoloLearn",
    date: "2024-11",
    category: "ComputerScience",
    imageUrl: "/solo_CSS.png",
  },
  {
    id: "16",
    title: "Introduction to Javascript",
    issuer: "SoloLearn",
    date: "2024-11",
    category: "ComputerScience",
    imageUrl: "/solo_java.png",
  },
  {
    id: "17",
    title: "Boys council",
    issuer: "Advisor of boys council of capital",
    date: "2024-5",
    category: "Community",
    imageUrl: "/boysCouncil.jpg",
  },
  {
    id: "18",
    title: "Eco club",
    issuer: "Tsonjin Cyber",
    date: "2024-11",
    category: "Community",
    imageUrl: "/ecoclub.jpg",
  },
  {
    id: "19",
    title: "CleanUp Day 2024",
    issuer: "Clean Up Mongolia",
    date: "2024-10",
    category: "Community",
    imageUrl: "/CleanUpD4.png",
  },
  {
    id: "20",
    title: "CleanUp Day 2025",
    issuer: "Clean Up Mongolia",
    date: "2025-10",
    category: "Community",
    imageUrl: "/CleanUpD5.png",
  },
  {
    id: "21",
    title: "Peacefull Talent",
    issuer: "President of Asian baduk Federiation",
    date: "2023-12",
    category: "Go board game",
    imageUrl: "/baduk_tournament.jpg",
  },
  {
    id: "22",
    title: "Certificate of 2 Dan",
    issuer: "Mongolian children's and youth Go association",
    date: "2024-11",
    category: "Go board game",
    imageUrl: "/Dan.png",
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Working on project named Cyber Math",
    description:
      "Developed a web that has instraction purpose in math( Still in development stage )",
    date: "2025-11",
    category: "Projects",
    icon: "bot",
  },
  {
    id: "2",
    title: "NFT design",
    description: "did nft project in graphic design class",
    date: "2025-2",
    category: "Projects",
    icon: "users",
  },
  {
    id: "3",
    title: "Internship at DataCare LLC",
    description:
      "One of the main contribution in this company is prototype of management tool that helps small businesses track products with secure access. The experience taught me trade-offs, and why clear database schema design matters for reliability and data security, and how collaborative workflows processing such as issue tracking, version control, and code reviews to turn individual effort into excellent teamwork.",
    date: "2025-6",
    category: "Community",
    icon: "code",
  },
  {
    id: "4",
    title: "Research Publication",
    description: "Co-authored paper on Ai impact on academic",
    date: "2025-10",
    category: "Research",
    icon: "book",
  },
  {
    id: "5",
    title: "Innoknow english project",
    description:
      "Developed a web that has instraction purpose in English which is inspired by Duolinguo( Still in development stage )",
    date: "2025-12",
    category: "Projects",
    icon: "code",
  },
  {
    id: "6",
    title: "Perfect GPA",
    description: "Maintained near of 4.0 GPA in all subjects",
    date: "2024-05",
    category: "Academic",
    icon: "star",
  },
  {
    id: "7",
    title: "Tought my juniors Computer science",
    description: "In happy teachers day, I become teacher of computer sciences",
    date: "2024-10",
    category: "Academic",
    icon: "star",
  },
  {
    id: "8",
    title: "Tought my juniors Computer science Again",
    description:
      "In next year of happy teachers day, I become teacher of computer sciences again",
    date: "2025-10",
    category: "Academic",
    icon: "star",
  },
  {
    id: "9",
    title: "Participated CleanUp Day 2024",
    description: "One of the biggest eclogical event in the world",
    date: "2024-6",
    category: "Community",
    icon: "users",
  },
  {
    id: "10",
    title: "Participated CleanUp Day 2025",
    description: "One of the biggest eclogical event in the world",
    date: "2025-6",
    category: "Community",
    icon: "users",
  },
  {
    id: "11",
    title: "Eco club",
    description: "the club that encourages childrens to protect nature",
    date: "2024-9",
    category: "Community",
    icon: "users",
  },
  {
    id: "12",
    title: "Shanhai Summer school Chinese Weiqi Promotion Project",
    description:
      "Participated in Shanhai Summer school Chinese Weiqi Promotion Project",
    date: "2024-8",
    category: "Community",
    icon: "users",
  },
];

export const categories = {
  certificates: [
    "All",
    "ComputerScience",
    "Community",
    "Go board game",
    "Academic",
  ],
  achievements: ["All", "Projects", "Community", "Research", "Academic"],
};
