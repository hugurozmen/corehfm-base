export interface Cafe {
  id: string;
  name: string;
  area: string;
  distance: string;
  rating: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  hours: string;
  address: string;
  amenities: string[];
}

export interface CafeList {
  id: string;
  title: string;
  description: string;
  count: number;
  imageUrl: string;
}

export interface Friend {
  id: string;
  name: string;
  note: string;
  initials: string;
  selected: boolean;
  imageUrl?: string;
}

export const cafes: Cafe[] = [
  {
    id: "petra",
    name: "Petra Roasting Co.",
    area: "Gayrettepe, Besiktas",
    distance: "1.2 km",
    rating: "4.8",
    price: "₺₺₺",
    category: "Nitelikli Kahve",
    description:
      "Endustriyel ve ferah atmosferi, mevsimsel cekirdekleri ve calismaya uygun masalariyla gunun her saatinde guvenilir bir bulusma noktasi.",
    imageUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    tags: ["V60", "Calisma Alani", "Cold Brew", "Bahceli"],
    hours: "Acik, kapanis 20:00",
    address: "Hossohbet Sk. Panorama Selenium Residence Magaza 1",
    amenities: ["Hizli Wi-Fi", "Acik Alan", "Hayvan Dostu", "Klima"],
  },
  {
    id: "espresso-lab",
    name: "Espresso Lab",
    area: "Maslak",
    distance: "800 m",
    rating: "4.7",
    price: "₺₺",
    category: "Modern Espresso Bar",
    description:
      "Minimal, aydinlik ve hareketli. Ekip bulusmalari, kisa calisma molalari ve hizli kahve rutini icin iyi bir secim.",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    tags: ["Espresso", "Yeni", "Calisma Alani"],
    hours: "Acik, kapanis 21:30",
    address: "Buyukdere Cd. No: 245, Maslak",
    amenities: ["Priz", "Sessiz Masa", "Paket Servis"],
  },
  {
    id: "kronotrop",
    name: "Kronotrop",
    area: "Karakoy",
    distance: "3.4 km",
    rating: "4.6",
    price: "₺₺",
    category: "Espresso Bar",
    description:
      "Kompakt, sehirli ve enerjik. Ozellikle espresso bazli icecekler ve tatli eslesmeleri icin favori duraklardan biri.",
    imageUrl:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    tags: ["Cold Brew", "Tatli", "Populer"],
    hours: "Acik, kapanis 19:30",
    address: "Kemankes Cd. No: 12, Karakoy",
    amenities: ["Dis Mekan", "Kisa Mola", "Tatli"],
  },
  {
    id: "norm",
    name: "Norm Coffee",
    area: "Moda, Kadikoy",
    distance: "5.1 km",
    rating: "4.9",
    price: "₺₺",
    category: "Mahalle Kahvecisi",
    description:
      "Sakin, samimi ve mahalle ritmine yakin. Uzun sohbetler ve pazar sabahi kahvaltilari icin sicak bir rota.",
    imageUrl:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
    tags: ["Sessiz", "Kahvalti", "Pet Friendly"],
    hours: "Acik, kapanis 20:30",
    address: "Moda Cd. No: 84, Kadikoy",
    amenities: ["Pet Friendly", "Kahvalti", "Sessiz"],
  },
  {
    id: "vienna",
    name: "Viyana Kahvesi",
    area: "Galata",
    distance: "1.5 km",
    rating: "4.8",
    price: "₺₺",
    category: "Retro Cafe",
    description:
      "Ahşap detaylar, tatli vitrini ve klasik kahve sunumlariyla nostaljik ama bakimli bir deneyim.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    tags: ["Retro", "Tatli", "Sessiz Ortam"],
    hours: "Acik, kapanis 22:00",
    address: "Galata Kulesi Sk. No: 7, Beyoglu",
    amenities: ["Tatli", "Manzara", "Rezervasyon"],
  },
];

export const curatedLists: CafeList[] = [
  {
    id: "weekend",
    title: "Hafta Sonu Kahvaltisi",
    description: "Pazar sabahlarini guzellestirecek kruvasan ve kahve eslesmeleri.",
    count: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "third-wave",
    title: "En Iyi 3. Nesil Kahveciler",
    description: "Nitelikli kahve cekirdekleri ve ustaca demlenmis filtre kahveler.",
    count: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "focus",
    title: "Sessiz Calisma Alanlari",
    description: "Odaklanmak icin ideal, genis masali ve sakin kafeler.",
    count: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
];

export const friends: Friend[] = [
  {
    id: "zeynep",
    name: "Zeynep Yilmaz",
    note: "Kahve tutkunu",
    initials: "ZY",
    selected: true,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
  },
  {
    id: "can",
    name: "Can Ozkan",
    note: "Cold brew sever",
    initials: "CO",
    selected: true,
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
  },
  {
    id: "elif",
    name: "Elif Demir",
    note: "Tatlilar onda",
    initials: "ED",
    selected: false,
  },
];

export const atmosphereOptions = [
  { icon: "laptop-mac", title: "Sessiz Calisma", subtitle: "Odaklanmak icin" },
  { icon: "groups", title: "Sosyal", subtitle: "Sohbet ve bulusma" },
  { icon: "landscape", title: "Manzarali", subtitle: "Seyrine doyulmaz" },
  { icon: "photo-camera", title: "Retro", subtitle: "Nostaljik dokunus" },
  { icon: "architecture", title: "Modern", subtitle: "Minimal ve sik" },
] as const;

export const profileBadges = [
  { icon: "local-cafe", title: "Kahve Gurusu" },
  { icon: "wb-sunny", title: "Erken Kus" },
  { icon: "explore", title: "Kasif" },
] as const;
