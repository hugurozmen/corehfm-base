import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../auth/auth-store";

const cafes = [
  {
    id: "petra",
    name: "Petra Roasting Co.",
    area: "Gayrettepe, Besiktas",
    distance: "1.2 km",
    rating: "4.8",
    price: "₺₺₺",
    category: "Nitelikli Kahve",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    tags: ["V60", "Calisma Alani", "Cold Brew", "Bahceli"],
    text: "Endustriyel ve ferah atmosferi, mevsimsel cekirdekleri ve calismaya uygun masalariyla guvenilir bir bulusma noktasi.",
  },
  {
    id: "espresso-lab",
    name: "Espresso Lab",
    area: "Maslak",
    distance: "800 m",
    rating: "4.7",
    price: "₺₺",
    category: "Modern Espresso Bar",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    tags: ["Espresso", "Yeni", "Calisma"],
    text: "Minimal, aydinlik ve hareketli. Ekip bulusmalari ve hizli kahve rutini icin iyi bir secim.",
  },
  {
    id: "kronotrop",
    name: "Kronotrop",
    area: "Karakoy",
    distance: "3.4 km",
    rating: "4.6",
    price: "₺₺",
    category: "Espresso Bar",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    tags: ["Cold Brew", "Tatli", "Populer"],
    text: "Kompakt, sehirli ve enerjik. Espresso bazli icecekler ve tatli eslesmeleri icin favori duraklardan biri.",
  },
  {
    id: "norm",
    name: "Norm Coffee",
    area: "Moda, Kadikoy",
    distance: "5.1 km",
    rating: "4.9",
    price: "₺₺",
    category: "Mahalle Kahvecisi",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
    tags: ["Sessiz", "Kahvalti", "Pet Friendly"],
    text: "Sakin, samimi ve mahalle ritmine yakin. Uzun sohbetler ve pazar sabahi kahvaltilari icin sicak bir rota.",
  },
];

const lists = ["Hafta Sonu Kahvaltisi", "En Iyi 3. Nesil Kahveciler", "Sessiz Calisma Alanlari"];
const flowPages = [
  ["Splash", "/flow/splash"],
  ["Onboarding", "/flow/onboarding"],
  ["Telefon dogrulama", "/flow/phone"],
  ["Kod dogrulama", "/flow/verify"],
  ["Konum izni", "/flow/location"],
  ["Sehir ve ilce", "/flow/city"],
  ["Atmosfer", "/flow/atmosphere"],
] as const;

function Shell({ children, title }: { children: ReactNode; title: string }) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="web-app-shell">
      <aside className="web-sidebar">
        <Link className="web-brand" to="/discover">
          <span>C</span>
          <strong>Cafinder</strong>
        </Link>
        <nav>
          <Link to="/discover">Kesfet</Link>
          <Link to="/map">Harita</Link>
          <Link to="/lists">Listeler</Link>
          <Link to="/plan">Planla</Link>
          <Link to="/profile">Profil</Link>
          <Link to="/screens">Tum ekranlar</Link>
        </nav>
        <button className="secondary" onClick={logout} type="button">
          Log out
        </button>
      </aside>
      <section className="web-page">
        <header className="web-page-header">
          <div>
            <p className="eyebrow">Cafinder Web</p>
            <h1>{title}</h1>
          </div>
          <Link className="web-pill" to="/screens">
            Ekranlar
          </Link>
        </header>
        {children}
      </section>
    </main>
  );
}

function CafeCard({ cafe }: { cafe: (typeof cafes)[number] }) {
  return (
    <Link className="web-cafe-card" to={`/place/${cafe.id}`}>
      <img alt={cafe.name} src={cafe.image} />
      <div>
        <span>{cafe.category}</span>
        <strong>{cafe.name}</strong>
        <p>{cafe.text}</p>
        <div className="web-tags">
          {cafe.tags.slice(0, 3).map((tag) => (
            <small key={tag}>{tag}</small>
          ))}
        </div>
      </div>
      <b>{cafe.rating}</b>
    </Link>
  );
}

export function DiscoverWebPage() {
  return (
    <Shell title="Kesfet">
      <div className="web-hero-card">
        <img alt={cafes[0]!.name} src={cafes[0]!.image} />
        <div>
          <span>Bugunun rotasi</span>
          <h2>{cafes[0]!.name}</h2>
          <p>{cafes[0]!.area} • {cafes[0]!.distance} • {cafes[0]!.price}</p>
        </div>
      </div>
      <div className="web-filter-row">
        {["Tumu", "Yeni", "Populer", "Calisma Alani", "Bahceli"].map((item, index) => (
          <Link className={index === 0 ? "active" : ""} key={item} to="/filters">
            {item}
          </Link>
        ))}
      </div>
      <div className="web-grid two">
        {cafes.slice(1).map((cafe) => (
          <CafeCard cafe={cafe} key={cafe.id} />
        ))}
      </div>
      <Link className="web-primary-link" to="/discover-swipe">
        Kaydirma modunu ac
      </Link>
    </Shell>
  );
}

export function MapWebPage() {
  return (
    <Shell title="Harita">
      <div className="web-map">
        <span className="web-pin p1">Petra Roasting Co.</span>
        <span className="web-pin p2">Kronotrop</span>
        <span className="web-pin p3">Norm Coffee</span>
      </div>
      <div className="web-grid two">
        {cafes.slice(0, 3).map((cafe) => (
          <CafeCard cafe={cafe} key={cafe.id} />
        ))}
      </div>
    </Shell>
  );
}

export function ListsWebPage() {
  return (
    <Shell title="Listeler">
      <Link className="web-create-card" to="/lists/new">
        Yeni Liste
        <span>Kendi kesif rotani yarat.</span>
      </Link>
      <div className="web-grid three">
        {lists.map((list, index) => (
          <article className="web-list-card" key={list}>
            <span>{index + 5} mekan</span>
            <strong>{list}</strong>
            <p>Ozel secilmis kahve rotalari.</p>
          </article>
        ))}
      </div>
      <Link className="web-primary-link" to="/saved">
        Kaydedilenleri ac
      </Link>
    </Shell>
  );
}

export function SavedWebPage() {
  return (
    <Shell title="Kaydedilenler">
      <div className="web-grid two">
        {cafes.map((cafe) => (
          <CafeCard cafe={cafe} key={cafe.id} />
        ))}
      </div>
    </Shell>
  );
}

export function NewListWebPage() {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState<"private" | "public">("private");

  return (
    <Shell title="Yeni Liste">
      <form className="web-form">
        <label>Liste Adi</label>
        <input placeholder="Orn: Hafta Sonu Favorileri" />
        <label>Aciklama</label>
        <textarea placeholder="Bu liste hakkinda kisa bir bilgi verin..." />
        <div className="web-filter-row">
          <button className={privacy === "private" ? "active" : ""} onClick={() => setPrivacy("private")} type="button">Gizli</button>
          <button className={privacy === "public" ? "active" : ""} onClick={() => setPrivacy("public")} type="button">Herkese Acik</button>
        </div>
        <button onClick={() => navigate("/lists")} type="button">Olustur</button>
      </form>
    </Shell>
  );
}

export function PlanWebPage() {
  return (
    <Shell title="Planla">
      <div className="web-plan-card">
        <img alt={cafes[0]!.name} src={cafes[0]!.image} />
        <div>
          <span>Yeni plan baslat</span>
          <strong>{cafes[0]!.name}</strong>
          <p>12 Ekim Cumartesi, 14:00</p>
        </div>
        <Link to="/plan/new">Davet et</Link>
      </div>
      <div className="web-grid three">
        {["Mekan", "Zaman", "Davet"].map((step, index) => (
          <article className="web-step" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function NewPlanWebPage() {
  const navigate = useNavigate();
  const [selectedFriends, setSelectedFriends] = useState(["Zeynep Yilmaz", "Can Ozkan"]);

  function toggleFriend(friend: string) {
    setSelectedFriends((current) => (
      current.includes(friend)
        ? current.filter((item) => item !== friend)
        : [...current, friend]
    ));
  }

  return (
    <Shell title="Yeni Plan">
      <div className="web-form">
        <label>Arkadas ara</label>
        <input placeholder="Arkadas ara..." />
        {["Zeynep Yilmaz", "Can Ozkan", "Elif Demir"].map((friend) => (
          <div className="web-friend-row" key={friend}>
            <span>{friend.split(" ").map((part) => part[0]).join("")}</span>
            <strong>{friend}</strong>
            <input
              checked={selectedFriends.includes(friend)}
              onChange={() => toggleFriend(friend)}
              type="checkbox"
            />
          </div>
        ))}
        <button onClick={() => navigate("/plan")} type="button">Plani Tamamla</button>
      </div>
    </Shell>
  );
}

export function ProfileWebPage() {
  return (
    <Shell title="Profil">
      <div className="web-profile-card">
        <span>DY</span>
        <h2>Deniz Yilmaz</h2>
        <p>Istanbul, TR</p>
        <div className="profile-stats">
          <span><strong>42</strong> Mekan</span>
          <span><strong>8</strong> Liste</span>
          <span><strong>15</strong> Rozet</span>
        </div>
        <Link to="/profile/detail">Profili duzenle</Link>
      </div>
    </Shell>
  );
}

export function ProfileDetailWebPage() {
  return (
    <Shell title="Profil Detayi">
      <div className="web-profile-card">
        <span>AY</span>
        <h2>Ayse Yilmaz</h2>
        <p>Kadikoy, Istanbul</p>
        {["Hesap", "Bildirimler", "Gizlilik", "Cikis Yap"].map((item) => (
          <div className="web-setting-row" key={item}>{item}</div>
        ))}
      </div>
    </Shell>
  );
}

export function PlaceWebPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cafe = cafes.find((item) => item.id === id) ?? cafes[0]!;

  return (
    <Shell title={cafe.name}>
      <div className="web-place-detail">
        <img alt={cafe.name} src={cafe.image} />
        <div>
          <p className="eyebrow">{cafe.category}</p>
          <h2>{cafe.name}</h2>
          <p>{cafe.area} • {cafe.rating} • {cafe.price}</p>
          <div className="web-tags">
            {cafe.tags.map((tag) => <small key={tag}>{tag}</small>)}
          </div>
          <p>{cafe.text}</p>
          <div className="web-filter-row">
            <button onClick={() => navigate("/saved")} type="button">Listeye Ekle</button>
            <button onClick={() => navigate("/plan/new")} type="button">Rezervasyon</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function FiltersWebPage() {
  const [atmosphere, setAtmosphere] = useState("Sessiz Calisma");
  const [features, setFeatures] = useState(["Hizli Wi-Fi"]);

  function toggleFeature(feature: string) {
    setFeatures((current) => (
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    ));
  }

  return (
    <Shell title="Filtreler">
      <div className="web-grid three">
        {["Sessiz Calisma", "Sosyal", "Manzarali", "Retro", "Modern"].map((item) => (
          <button
            className={atmosphere === item ? "web-option active" : "web-option"}
            key={item}
            onClick={() => setAtmosphere(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="web-filter-row">
        {["Hizli Wi-Fi", "Acik Alan", "Hayvan Dostu", "Tatli", "Acik Olanlar"].map((item) => (
          <button
            className={features.includes(item) ? "active" : ""}
            key={item}
            onClick={() => toggleFeature(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </Shell>
  );
}

export function SwipeWebPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [message, setMessage] = useState("Kaydirma modu hazir.");
  const [stats, setStats] = useState({ liked: 0, saved: 0, skipped: 0 });
  const dragStartRef = useRef<number | null>(null);
  const cafe = cafes[activeIndex % cafes.length]!;
  const nextCafe = cafes[(activeIndex + 1) % cafes.length]!;
  const dragIntent = useMemo(() => {
    if (dragOffset > 84) {
      return "Begen";
    }
    if (dragOffset < -84) {
      return "Gec";
    }
    return "";
  }, [dragOffset]);

  const advance = (action: "liked" | "saved" | "skipped") => {
    const labels = {
      liked: "begenildi",
      saved: "kaydedildi",
      skipped: "gecildi",
    };

    setStats((current) => ({ ...current, [action]: current[action] + 1 }));
    setMessage(`${cafe.name} ${labels[action]}. Siradaki: ${nextCafe.name}.`);
    setActiveIndex((current) => current + 1);
    setDragOffset(0);
    setDragStart(null);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = event.clientX;
    setDragStart(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return;
    }
    setDragOffset(Math.max(-160, Math.min(160, event.clientX - dragStartRef.current)));
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return;
    }

    const finalOffset = event.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (finalOffset > 90) {
      advance("liked");
      return;
    }
    if (finalOffset < -90) {
      advance("skipped");
      return;
    }

    setDragOffset(0);
    setDragStart(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      advance("liked");
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      advance("skipped");
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      advance("saved");
    }
  };

  return (
    <Shell title="Kaydirarak Kesfet">
      <div className="web-swipe-layout">
        <section className="web-swipe-stage" aria-label="Kaydirma modu">
          <div
            aria-describedby="swipe-help swipe-status"
            aria-label={`${cafe.name}, ${cafe.area}, puan ${cafe.rating}`}
            className={dragStart === null ? "web-swipe-card" : "web-swipe-card dragging"}
            onKeyDown={handleKeyDown}
            onPointerCancel={handlePointerEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            role="group"
            style={{
              transform: `translateX(${dragOffset}px) rotate(${dragOffset / 22}deg)`,
            }}
            tabIndex={0}
          >
            <img alt={cafe.name} src={cafe.image} />
            {dragIntent ? <strong className="web-swipe-intent">{dragIntent}</strong> : null}
            <div className="web-swipe-copy">
              <span>{cafe.distance} uzakta • {cafe.area}</span>
              <h2>{cafe.name}</h2>
              <p>{cafe.tags.join(" • ")}</p>
            </div>
          </div>
          <p className="sr-only" id="swipe-help">
            Sola surukle veya sol ok ile gec, saga surukle veya sag ok ile begen, yukari ok ile kaydet.
          </p>
          <p aria-live="polite" className="web-swipe-status" id="swipe-status">
            {message}
          </p>
          <div className="web-filter-row web-swipe-actions">
            <button onClick={() => advance("skipped")} type="button">Gec</button>
            <button onClick={() => advance("saved")} type="button">Kaydet</button>
            <button onClick={() => advance("liked")} type="button">Begen</button>
          </div>
        </section>
        <aside className="web-swipe-panel" aria-label="Kaydirma ozeti">
          <div>
            <span>Aktif Kart</span>
            <strong>{(activeIndex % cafes.length) + 1}/{cafes.length}</strong>
          </div>
          <div>
            <span>Siradaki</span>
            <strong>{nextCafe.name}</strong>
          </div>
          <div className="web-swipe-stats">
            <span><strong>{stats.liked}</strong> Begenildi</span>
            <span><strong>{stats.saved}</strong> Kaydedildi</span>
            <span><strong>{stats.skipped}</strong> Gecildi</span>
          </div>
        </aside>
      </div>
    </Shell>
  );
}

export function ScreensWebPage() {
  const screenLinks = [
    ...flowPages,
    ["Kesfet", "/discover"],
    ["Filtreler", "/filters"],
    ["Kaydirma", "/discover-swipe"],
    ["Harita", "/map"],
    ["Listeler", "/lists"],
    ["Kaydedilenler", "/saved"],
    ["Yeni Liste", "/lists/new"],
    ["Planla", "/plan"],
    ["Grup Plani", "/plan/new"],
    ["Profil", "/profile"],
    ["Profil Detayi", "/profile/detail"],
    ["Mekan Detayi", "/place/petra"],
  ] as const;

  return (
    <Shell title="Tum Ekranlar">
      <div className="web-grid three">
        {screenLinks.map(([label, href]) => (
          <Link className="web-screen-link" key={href} to={href}>
            {label}
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export function FlowWebPage({ kind }: { kind: string }) {
  const navigate = useNavigate();
  const titles: Record<string, string> = {
    atmosphere: "Nasil bir ortam ariyorsun?",
    city: "Sehir Secimi",
    location: "Sana yakin mekanlari gosterelim",
    onboarding: "Sehrin en iyi koselerini kesfet",
    phone: "Telefon numarani dogrula",
    splash: "Cafinder",
    verify: "Dogrulama Kodu",
  };

  return (
    <Shell title={titles[kind] ?? "Onboarding"}>
      <div className="web-flow-card">
        <span className="brand-mark">C</span>
        <h2>{titles[kind] ?? "Cafinder"}</h2>
        <p>Mobil flow ekraninin web karsiligi. Aksiyonlar demo icinde gezilebilir.</p>
        <button onClick={() => navigate("/discover")} type="button">
          Devam Et
        </button>
      </div>
    </Shell>
  );
}
