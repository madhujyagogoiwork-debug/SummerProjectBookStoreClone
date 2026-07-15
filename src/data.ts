import { Book, UserProfile, Order } from './types';

export const BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'Modernism & Space',
    author: 'Studio Verse',
    price: 85.00,
    meta: 'Hardcover Limited Edition • Curated by Studio Verse',
    type: 'physical',
    category: 'Fiction', // can be general
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYtoPmG8mGzzc9intTsZsy7Wl9zrEvSkwO3az5ycBTs37lbE4Kh_MK-0XCJjPzh0qED181fgMiEuloiXNbG50wtyUEFPPVHmpHdNxk8rplwX4lmRjcM4O1wuS_mFU_TyRNl0NXvehSA1KCAikUUSp2dHrMW3FutYL4QmsFuA736s3oHXIh2azXI9TaORED9QvaN9z9H6oGs6Yvg50SFTmJPZSgphgtiynMpCWqHNEMqhinuCr5rOnGdw',
    description: 'A deep dive into minimalist design and spatial serenity.'
  },
  {
    id: 'b2',
    title: 'The Digital Soul',
    author: 'Interactive Content',
    price: 42.50,
    meta: 'First Edition Digital Bundle • Interactive Content',
    type: 'ebook',
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH7BL8fkrwul8NHhuSaHcm9L-aKHgr_jza8P_dscQPR-KohEPVZdRH6X31wM8ZmmLXipuUSR0lgn7IiXZT6q4IA0Gki_jqS5CJCxvTQaWvbZm3B_0TY8nQG5NcCxTOlkbxIfb-ubv4dXSqV9quCBmmhAg5Tje__7gNUgZuzvVL91q9usOC3AqCvzb608oyD5yqnkX0chVRurpD7GSDENPlh1W5-Y6d7KztiOgAjlVt1vBmfEXdgyBjCg',
    description: 'Precision in the modern age, focusing on creative systems.'
  },
  {
    id: 'b3',
    title: 'The Minimalist Manifesto',
    author: 'Studio Verse',
    price: 28.00,
    meta: 'Premium Hardcover • Design Philosophy',
    type: 'physical',
    category: 'Business',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGdkZV8QOz28i0dqH9TRhO8XKl0rI3986hJJYtzCGMNIK7gvccJ76bUW6PO_t_scFSmHKYuUUa3hok4I3KsuWt2M2dZx268PQAtanzK04HFu8pjN8QRKEHrVqEEaOjjT21AiVyNyhdNFoa5yAdzvfiMCmHnp_QRXl2aQKqOdcjrWaZKZ82HX0rAzaK6HlCN9PNUInkqhXiKsvJfOsM2S4qWJuXKdrMB1aESWrVSxZZJzJqZe3MzO1SA',
    description: 'An essential design guide for modern publishers.'
  },
  {
    id: 'b4',
    title: 'The Algorithm of Growth',
    author: 'Marcus Aurelius Jr.',
    price: 32.00,
    meta: 'Marcus Aurelius Jr. • Physical Book',
    type: 'physical',
    category: 'Business',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlT_AhzGYmFQpuLs1D3ZRjPOSOcntejbk5RNS005bEqGd6B9MAj2IucueJgZRbZgB4SF8V8ve2WiPXdrWcLW6J_Pg14RG9OmY2vu-emiwrvslAifA19l4sQhhuEiUP2mdVG4Vwqy4lKMBFzJSN-6HU_gEOCloWFsmxoxaLwJAkoNWOuBrg08GJmAJE_VVtgW3Y9lsrt1c2sSUp45-F0SmmHo-rCOlzbWJTczmB9bkP95LpMDIAHzx76w',
    description: 'Strategies for scaling in the digital age.'
  },
  {
    id: 'b5',
    title: 'Whispers of Kyoto',
    author: 'Elena Sato',
    price: 12.99,
    meta: 'Elena Sato • E-Book',
    type: 'ebook',
    category: 'Fiction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCslfBxahJ8dZkgR4owdR_uAzu_v479kIHHhLGhRLCBe9e_wxeiYY4eF-xWmYlTwcUV_mO8CvYCyAtsBSyHGTnNuzMpb3aBkIDm5XkBSu-7x4O7hDGynOVsMU0QNvuiI6B2lM10eVe4ad2kEe5ZS19d_1eOIA146CXJ9SxCtc195Egww7Wc8CxumtuigOvVEr2WYXatR6yoNCQAHemPu0AlSY4XnvDlHk6_uilU_Nu7sTi_PfmTI975xw',
    description: 'A novel of love, loss, and tradition.'
  },
  {
    id: 'b6',
    title: 'Architecting the Future',
    author: 'Dr. Sarah Chen',
    price: 45.00,
    meta: 'Tech & Innovation • Audiobook',
    type: 'audiobook',
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIjzfAbiNUgoh0oqVHvUwrQdnZGRE0J9K3JAi5dIloNk391jYmz9PdoYrsV_0s9EetTPoL5RwhviXoXXqtt6NieTeT73vskxDmd_3mydA3robV8Djl124qdLtmMOSth1lcrwYNVU3cfBp7CKVHWNPKVRIemMp1Mu5Gv5S0HutfcV497suCEIxHFCdZO6DWAxt5oXbfzvQwqNzKhWI59jJusH_DPGn8UuFqHhwaOZ5LgI9qI5GYVjUlmw',
    includedInSubscription: true,
    description: 'Building next-generation tech strategies.'
  },
  {
    id: 'b7',
    title: 'Biology Honors Masterclass Notes',
    author: 'Ivy League Prep',
    price: 8.50,
    meta: '57 Lessons | 9h 30m • Study Notes',
    type: 'notes',
    category: 'Study Notes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGLV9ibR0-1Biybu_u-BdlhjyOd99mgd6HnGFOLz3lnwUDlwQI7CJp6R5W5DIJk1dZIQelRLxrp_uSXcYUYn5dFpxvS2idBE5mowthAYw41bcyMfkA3xvkYkWMJc0uZi4IyfDjckgXqn4g2W3X9KLqX8kw4g36aGaMPSj_2xmRqjIBK3PhDykJtOoApRTF22MapstnNJLmfxhZ0GlDH5jyxJrbvlzhdpwTaGkoz6f7zTMjy5RF_MW5RA',
    description: 'Cellular Structure, Function &Unit 2: Genetics.'
  },
  {
    id: 'b8',
    title: 'Fullstack Performance',
    author: 'Liam Stark',
    price: 59.00,
    meta: 'Optimizing Modern Web Applications • Book',
    type: 'physical',
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmT3f_-DTSvNrs9Bhu2bZyCWKMQIIGy8P31BDz1Q2_nkvccMmxZBO4vFCmwCBukun20KXSRAZ8LRYz2E2nM-1DD3DxTYCixP41fK7S3IwNIOwdNt8Fxpllldw8jhHph2LBJNMUZiRkQyOpaCbHu3yQVfJVDRBFH5ZKLf9df1gq_HFABrel57TjyW7Xqlqik8-QPA51en3XpEyOdy5SyzSSxLj1kZA5qoAaz1xSQpThCQY78BJj99mJUA',
    description: 'Optimizing modern client and server-side web apps.'
  },
  {
    id: 'b9',
    title: 'UI Design Mastery',
    author: 'BookVerse Academy',
    price: 199.00,
    meta: 'Master Interface Design • Course',
    type: 'course',
    category: 'Courses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCMxMb-VLuTvGrGyhuM7H2j-H65Ph5-JpLz8cL_Szeu8lG9UagAecmYW7OJBdWs63VSvpHC1__bGP1qeBoszZNvdvSpfK4nDkPdGw2xIWrxgvOJNnnwF9XWEnkbSPfTSyjv85tn1o8PzDvZZHYFQs1rEextgJgOftI4jPg2Y8fJzKtSWYl9Ez9tKf6FTXyFoqNVurRoNrcgy8YnGKRBYu_TdvBGjFpVPo9CNogLWhr1q8LbZl-7Fisig',
    description: 'An exhaustive masterclass on UI elements.'
  },
  {
    id: 'b10',
    title: 'Geometric Foundations',
    author: 'Lars Müller',
    price: 45.00,
    meta: 'Theory & Practice of Design Philosophy',
    type: 'physical',
    category: 'Fiction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkgfu_HJSQWdPG43_VWcY8LxlN1FfXpOu5Svx0e4PbJyd2eskk6K6hnJMnt25hBu7bZ69nartiPoq3vuUVzQJ0L0aPyDymFQlrOLN4wesICKUVwA49D0XgrF9yavf6UTnHtSoEa3r8DjQnV5Dj11WvcWQk3k0yn8z02bQA2pbmn1XaVFaR6rfZuBkD3DdFCI9cbqHuOvyGVwESCy9XR28sTXWqXypajIsGPkCUjzGmapJV4DQ4_8u9Tw',
    isNew: true,
    description: 'Swiss design principles—orderly, professional, and structured.'
  },
  {
    id: 'b11',
    title: 'Structure & Light',
    author: 'Anatole Aris',
    price: 120.00,
    meta: 'Anatole Aris • Photography Hardcover',
    type: 'physical',
    category: 'Fiction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA4vAZVj-hQyozGnbA8f_bicudifeIZn8zZJ3aJAC_7HRBNfA03a6rHAt94hCGKIn2PDBlapmvSRVE2BSrQZ5PGDJ8SUN8dGurPLRNBdrzzOCf8qLloqmqGNhex-KS5PrcilhE_m_2NbgJGPj9PQSmu4rNQqOuAV6nrgkJMvEj4FbabIcx3pitJHbiXa8fBNFYdac8cvRpBEuto22JyjJnbPSZSzqZqM6hmAGcf89P6zdB8krrlhTGbQ',
    description: 'Concrete structures with sharp angles and clean lines.'
  },
  {
    id: 'b12',
    title: 'Vibrant Currents',
    author: 'Elena Rossi',
    price: 29.99,
    meta: 'Elena Rossi • Digital Art Book',
    type: 'ebook',
    category: 'Fiction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcmSDcJcy3-2SZIu6bT7A35fbjgyBs-leIRw0EBdMDyMIBV-1NxC_t9RgyvUvMtmqnmJT6-jeeq5LKX8JXs3sDVcyAUdVG44SY1ibXP1fOK9qNiGyshj-WyLLWsdWlblhjL6qvAFlrdOap3hG2oDJzpJ0FnCyvyyjZKtBbakWOpD_w6jwRwNOV2D_Z-Bop13BtFHVYmzHp1TeJkyu6eHJl2sXSyvjGx3_i5m3eri-T0i6UAi0A8kK7Q',
    description: 'Vibrant gradients of teal and purple swirling together.'
  },
  {
    id: 'b13',
    title: 'The Logic of Form',
    author: 'Dr. Julian Vance',
    price: 68.00,
    meta: 'Dr. Julian Vance • Philosophy',
    type: 'physical',
    category: 'Fiction',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQarkbuTFtfLRqvO8uSJp6AA0GMr2hOGdRhd6ASWMUfFdIYkOhuDIGK_CUidOK7RBejbV7uehtHgZESou0o7BZMvzDOS53p3Vwy3bNEAuSPicwC1wU6wlzpxPinFVcgbPlg0SfeeP6_k52DelZCSLI-CYSs2TitFS_0gGnYTl7bQx9BhBjh7r8favgffEpOCAQ76Ophvgo6CICdXTVXL9idbpv5c4WI3HaAAYrz4tFBXOxiLytUq8Wxg',
    description: 'Complex mathematical diagram with classic high-contrast layout.'
  }
];

export const FEATURED_BOOK: Book = {
  id: 'b14',
  title: 'The Architecture of Silence',
  author: 'Chief Curator',
  price: 95.00,
  meta: "Editor's Choice",
  type: 'physical',
  category: 'Fiction',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp84Ne4-I8RG0rAwFM9qAHKOas_-v0CddG4uplb6outA_sr2kdWIRxnV3OPFYSg48WrW0HTGvNYDn9Y0UEK86N-FT6-clSou8zP4anJHT0agyYXM_oGqnGXUWJnwGk0bfyfTF1mHbJ1g4lSDQLES6U9tsoVsUO50m0ZO6fps8p3UYMVmeDd0W88BqUBZfhEMCaXvepJE4n42MiNZNzv9_6BmM-9y-lQNyMlvfxQZQ2PiYKL2Xwgp81Sg',
  description: 'A deep dive into minimalist design and the philosophy of spatial serenity in modern urban environments.'
};

export const RECOMMENDED_BOOK: Book = {
  id: 'b15',
  title: 'The Infinite Canvas',
  author: 'Chief Curator',
  price: 110.00,
  meta: 'Personal Recommendation',
  type: 'ebook',
  category: 'Tech',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD528NBn4t1kCvjcBGofwTItXpGluLoDo165IW2yIo1YMy-gvGjWNssEa9rZPD0HGIADPF7pNvWx7Bi7fvua7tP3mkQRBOxfRWF9JEAL9Z2EyQQwP1naU_uEZ8Dnfo4cpKbPm2WP3HiA73aEl6304aK7gTD7JbCepV0bAEp8MoodZvC4A3nntgSJEGISq-ErVczlb2-n-3GYvlj41a2gA_yiTGXEM_rCPs99gnA_XyjmcL3M-UkFaEAag',
  description: "Explore the evolution of digital artistry and how the browser became the most important gallery of the 21st century. This editor's pick includes exclusive interviews."
};

export const USER_PROFILE: UserProfile = {
  name: 'Julian Thorne',
  role: 'Premium Collector & Curator',
  booksRead: 128,
  rewardPoints: 4250,
  tierStatus: 'Gold Bibliophile',
  pointsToNextTier: 750,
  nextTier: 'Platinum',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwZ7TLjUiKg5W8Dn3hZ8AFwoqYrZDFYYXaRR-bJz5SJjqH0BB1PVW-NdaFJ41D2l3imq2T6HcPJnOlRY9UVIOzbaH9rvsuV_KePJFWzw37d3P3zUsBwf4ULh2bbIEuw4ssxITc3RuqBIQPDkU2efKvfIZGlsq_PYHexXsxywjWJ0v35FOuwK5xXEIt9aeEe656uoudtkrEiDgYU1NY6PWkcdgklXd7FEASffwULFbCudehIIHlBnibAA'
};

export const WISHLIST_BOOKS: { title: string; author: string; image: string }[] = [
  {
    title: 'The Zenith Pulse',
    author: 'L.K. Aris',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGdkZV8QOz28i0dqH9TRhO8XKl0rI3986hJJYtzCGMNIK7gvccJ76bUW6PO_t_scFSmHKYuUUa3hok4I3KsuWt2M2dZx268PQAtanzK04HFu8pjN8QRKEHrVqEEaOjjT21AiVyNyhdNFoa5yAdzvfiMCmHnp_QRXl2aQKqOdcjrWaZKZ82HX0rAzaK6HlCN9PNUInkqhXiKsvJfOsM2S4qWJuXKdrMB1aESWrVSxZZJzJqZe3MzO1SA'
  },
  {
    title: 'Digital Flow',
    author: 'Marc Ren',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtA0o9A6cUKQVL5mczCGDtFWaDbcgZcObTCK3aOF8g9MRGb4v1Ch3d_wZknA6Vssra9qnjnHjqx7YlcNWH5rZg5UVCF7y_lPbCtuHosOjTD6sv8LQOc3eCJbBQnsoXHdryrXSlUr5e9Xh5LmVscKfGUndTpMRNPB28SI1-QgQaJAF4fxDVsr_BefUPr4fLtpRFTSdLpVT_LY7Js5Cu4BjdpRfUOZQDhZVGPI1xIuLT8YRMmrs8XXSISw'
  }
];

export const CONTINUE_READING_ITEMS = [
  {
    id: 'cr1',
    title: 'Architectural Epiphanies',
    author: 'Marcus V. Sterling',
    chapter: 'Chapter 08',
    progress: 68,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8oO7elhRPS2tjaPURJUukMdVi8TGMe2bhwpGBNR-GOd5Van6PS940obSr12ea9XPqY_meCe5WQ5g69kAunhZ59c-jdvJcthsC_0mvDlcWOVMAhfnicZkYJtzVXmDcHTNTDSv8G8bAIzDuD2gMPloxQ5ndIvHBqv7QiMQeWlqTj2H9GRfIkiu1wdMUlILuvcLFTHLHXV2xl5AwT3QqUR8funcsP6i_WFnh87kyKKWIAwqnxK_a2cDXDg',
    btnLabel: 'RESUME READING'
  },
  {
    id: 'cr2',
    title: 'Mastery of Typography',
    author: 'Elena Rossi',
    chapter: 'Module 02',
    progress: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNscRh4djhbmPN5SQAv2fx6mjBMsuZuuKDxSK5bfcJASgF9P_alFYMJEAQZE-T8j0E7dWS1zQI9sdAKPomV4mzCQr1vgYCFkgnWA4ILvkZka6lWHHzm62nyc87TEPV4T1u46uYaq_h4C8N1E9f7mD1Glz7kF79WbTl4I2qQj-aAnceZr7lztlzk_DW0-HJuG4jqU7GsyyIh35bpULOKu4sclqYubW5d-YRR3WJ-NO_wwHiCbDGaMkmLw',
    btnLabel: 'CONTINUE COURSE'
  }
];

export const RECENT_ORDERS: { id: string; bookTitle: string; bookType: string; bookImage: string; date: string; status: 'Delivered' | 'Pending'; price: number }[] = [
  {
    id: 'O1',
    bookTitle: 'The Quantum Field',
    bookType: 'Digital Deluxe Edition',
    bookImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQFV8j_fcTnOtJx9o1HG0iMFuNjn0Vly5ooJq3gm0vtzRpryi9ID5DbnY-mo251Lz31yarby2jjaGIms_v5VtiG3YfJrj1XjjhLp3XcVLIGr3qfvs_7ULiWoB4cGVZ6YmoccOVfHcBVqUQdn1uLMlAQfYPbbNF0Ht7nT-H5vk_zt9_y7oQlpRGXDs6pF_a_H2UKn5Vjr4GUHRf1iej2avEPz7jW8anQdpAw-VzKBqzc4iuuBdxc5kVHQ',
    date: 'Oct 24, 2024',
    status: 'Delivered',
    price: 24.99
  },
  {
    id: 'O2',
    bookTitle: 'History of Silk Roads',
    bookType: 'Course Access',
    bookImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGZ6QOZhueoVHzWZKRKbCk3WTbSmq6UPU-8JZvs1fSiVFpN_e-ldF2WU3OQ2_rK2i6GelE0yRNOLVe7wpp5_g6kTCoyff-S9gZFbvn6UftJeZDvNFFlpyZzVl6zxIv60i5x0Yy_Q_eEp9LtEjhPR8T3Sk_IUDgxhqx9o7uwcUKQfK6KekBTtcziyaiq7kDN0nSpiJuvHdGRveH_Bd35owxYnXQIjh3fTy7v9pRHk0K7GhfL_J8eZPANw',
    date: 'Oct 18, 2024',
    status: 'Delivered',
    price: 120.00
  }
];
