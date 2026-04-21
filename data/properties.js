// export const properties = [
//   {
//     id: 1,
//     title: "Luxury Villa in DHA Phase 6",
//     location: "Sector E, DHA Phase 6, Lahore",
//     price: 185000,
//     beds: 4,
//     baths: 5,
//     area: "1 Kanal",
//     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//     category: "House",
//     tenantType: "Family",
//     verified: true,
//     premium: true,
//     utilities: ["Gas", "Water", "Electricity"],
//     furnished: false,

//     // ✅ ADD THIS
//     owner: {
//       name: "Ali Khan",
//       phone: "03001234567"
//     }
//   },
//   {
//     id: 2,
//     title: "Modern Studio Apartment",
//     location: "Gulberg III, Lahore",
//     price: 45000,
//     beds: 1,
//     baths: 1,
//     area: "5 Marla",
//     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
//     category: "Apartment",
//     tenantType: "Bachelor",
//     verified: true,
//     premium: false,
//     utilities: ["Water", "Electricity"],
//     furnished: false,

//     owner: {
//       name: "Usman Ahmed",
//       phone: "03111234567"
//     }
//   },
//   {
//     id: 3,
//     title: "Executive Portion",
//     location: "Clifton Block 5, Karachi",
//     price: 85000,
//     beds: 3,
//     baths: 3,
//     area: "10 Marla",
//     image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
//     category: "Portion",
//     tenantType: "Family",
//     verified: true,
//     premium: true,
//     utilities: ["Gas", "Water"],
//     furnished: false,

//     owner: {
//       name: "Bilal Raza",
//       phone: "03211234567"
//     }
//   },
//   {
//     id: 4,
//     title: "Cozy 2-Bedroom Flat",
//     location: "Johar Town, Lahore",
//     price: 65000,
//     beds: 2,
//     baths: 2,
//     area: "7 Marla",
//     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
//     category: "Apartment",
//     tenantType: "Family",
//     verified: false,
//     premium: false,
//     utilities: ["Gas", "Water", "Electricity"],
//     furnished: true,

//     owner: {
//       name: "Sara Ahmed",
//       phone: "03331234567"
//     }
//   },
//   {
//     id: 5,
//     title: "Spacious House in Bahria Town",
//     location: "Bahria Town Phase 8, Rawalpindi",
//     price: 120000,
//     beds: 5,
//     baths: 4,
//     area: "1 Kanal",
//     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
//     category: "House",
//     tenantType: "Family",
//     verified: true,
//     premium: true,
//     utilities: ["Gas", "Water", "Electricity"],
//     furnished: false,

//     owner: {
//       name: "Ahmed Hassan",
//       phone: "03441234567"
//     }
//   },
//   {
//     id: 6,
//     title: "Bachelor Friendly Studio",
//     location: "Model Town, Lahore",
//     price: 35000,
//     beds: 1,
//     baths: 1,
//     area: "3 Marla",
//     image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
//     category: "Apartment",
//     tenantType: "Bachelor",
//     verified: false,
//     premium: false,
//     utilities: ["Water", "Electricity"],
//     furnished: false,

//     owner: {
//       name: "Zain Malik",
//       phone: "03551234567"
//     }
//   },
//   {
//     id: 7,
//     title: "Luxury Penthouse",
//     location: "DHA Phase 8, Karachi",
//     price: 250000,
//     beds: 4,
//     baths: 4,
//     area: "2 Kanal",
//     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
//     category: "House",
//     tenantType: "Family",
//     verified: true,
//     premium: true,
//     utilities: ["Gas", "Water", "Electricity"],
//     furnished: true,

//     owner: {
//       name: "Fatima Khan",
//       phone: "03661234567"
//     }
//   },
//   {
//     id: 8,
//     title: "Affordable Portion",
//     location: "Wapda Town, Lahore",
//     price: 55000,
//     beds: 2,
//     baths: 2,
//     area: "6 Marla",
//     image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
//     category: "Portion",
//     tenantType: "Family",
//     verified: false,
//     premium: false,
//     utilities: ["Gas", "Water"],
//     furnished: false,

//     owner: {
//       name: "Omar Sheikh",
//       phone: "03771234567"
//     }
//   },
//   {
//     id: 9,
//     title: "Modern 3-Bedroom House",
//     location: "Askari 10, Rawalpindi",
//     price: 95000,
//     beds: 3,
//     baths: 3,
//     area: "10 Marla",
//     image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
//     category: "House",
//     tenantType: "Family",
//     verified: true,
//     premium: false,
//     utilities: ["Gas", "Water", "Electricity"],
//     furnished: false,

//     owner: {
//       name: "Nadia Iqbal",
//       phone: "03881234567"
//     }
//   },
//   {
//     id: 10,
//     title: "Compact Studio for Students",
//     location: "Gulshan-e-Iqbal, Karachi",
//     price: 28000,
//     beds: 1,
//     baths: 1,
//     area: "2 Marla",
//     image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
//     category: "Apartment",
//     tenantType: "Bachelor",
//     verified: false,
//     premium: false,
//     utilities: ["Water", "Electricity"],
//     furnished: true,

//     owner: {
//       name: "Hassan Raza",
//       phone: "03991234567"
//     }
//   }
// ];