import { useAuthStore } from "../auth/auth-store";

const cafes = [
  {
    area: "Gayrettepe",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=640&q=80",
    name: "Petra Roasting Co.",
    rating: "4.8",
    tags: ["V60", "Calisma", "Bahceli"],
  },
  {
    area: "Karakoy",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=640&q=80",
    name: "Kronotrop",
    rating: "4.6",
    tags: ["Cold Brew", "Tatli"],
  },
];

const lists = ["Hafta Sonu Kahvaltisi", "3. Nesil Kahveciler", "Sessiz Calisma Alanlari"];
const primaryCafe = cafes[0]!;

export function DashboardPage() {
  const email = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="cafinder-shell">
      <aside className="workspace-panel">
        <div className="brand-lockup">
          <span className="brand-mark">C</span>
          <div>
            <p className="eyebrow">Mobile UI System</p>
            <h1>Cafinder</h1>
          </div>
        </div>
        <p className="lede">
          Google Stitch mockuplarindan uretilen sicak, modern ve Turkce kahve kesif deneyimi.
        </p>
        <nav className="side-nav" aria-label="Cafinder sections">
          {["Kesfet", "Harita", "Listeler", "Planla", "Profil"].map((item, index) => (
            <a className={index === 0 ? "active" : ""} href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="signed-in">
          <span>Preview user</span>
          <strong>{email}</strong>
        </div>
        <button className="secondary" onClick={logout} type="button">
          Log out
        </button>
      </aside>

      <section className="preview-canvas" id="kesfet">
        <header className="preview-header">
          <div>
            <p className="eyebrow">Espresso Modern</p>
            <h2>Cafinder mockup implementation</h2>
          </div>
          <div className="status-pill">Expo + React</div>
        </header>

        <div className="phone-grid">
          <article className="phone-frame discover-phone">
            <div className="phone-topbar">
              <span>Cafinder</span>
              <button type="button">Tune</button>
            </div>
            <div className="search-pill">Mekan veya mutfak ara...</div>
            <div className="chip-strip">
              <span className="selected">Tumu</span>
              <span>Yeni</span>
              <span>Calisma</span>
            </div>
            <div className="hero-place">
              <img alt="Petra Roasting Co." src={primaryCafe.image} />
              <div>
                <small>Bugunun rotasi</small>
                <strong>{primaryCafe.name}</strong>
                <span>{primaryCafe.area} • 1.2 km</span>
              </div>
            </div>
            {cafes.map((cafe) => (
              <div className="cafe-row" key={cafe.name}>
                <img alt="" src={cafe.image} />
                <div>
                  <strong>{cafe.name}</strong>
                  <span>{cafe.area}</span>
                  <small>{cafe.tags.join(" • ")}</small>
                </div>
                <b>{cafe.rating}</b>
              </div>
            ))}
          </article>

          <article className="phone-frame map-phone" id="harita">
            <div className="phone-topbar">
              <span>Harita</span>
              <button type="button">Ara</button>
            </div>
            <div className="map-preview">
              <span className="map-pin pin-one">Petra</span>
              <span className="map-pin pin-two">Norm</span>
              <span className="map-pin pin-three">Kronotrop</span>
            </div>
            <div className="map-card">
              <strong>Yakindaki secimler</strong>
              <p>Konumuna gore siralandi</p>
              <div className="mini-list">
                <span>Petra Roasting Co.</span>
                <b>4.8</b>
              </div>
              <div className="mini-list">
                <span>Norm Coffee</span>
                <b>4.9</b>
              </div>
            </div>
          </article>

          <article className="phone-frame list-phone" id="listeler">
            <div className="phone-topbar">
              <span>Listelerim</span>
              <button type="button">Ekle</button>
            </div>
            <div className="create-list">Yeni Liste</div>
            {lists.map((item, index) => (
              <div className="list-row" key={item}>
                <span>{index + 5}</span>
                <div>
                  <strong>{item}</strong>
                  <p>Ozel secilmis mekanlar</p>
                </div>
              </div>
            ))}
          </article>

          <article className="phone-frame plan-phone" id="planla">
            <div className="phone-topbar">
              <span>Plan Yap</span>
              <button type="button">Davet</button>
            </div>
            <div className="plan-card">
              <small>Yeni plan baslat</small>
              <strong>Petra Roasting Co.</strong>
              <span>12 Ekim Cumartesi, 14:00</span>
            </div>
            {["Mekan", "Zaman", "Davet"].map((step, index) => (
              <div className="step-row" key={step}>
                <span className={index < 2 ? "done" : ""}>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </article>

          <article className="phone-frame profile-phone" id="profil">
            <div className="profile-avatar">DY</div>
            <h3>Deniz Yilmaz</h3>
            <p>Istanbul, TR</p>
            <div className="profile-stats">
              <span>
                <strong>42</strong> Mekan
              </span>
              <span>
                <strong>8</strong> Liste
              </span>
              <span>
                <strong>15</strong> Rozet
              </span>
            </div>
            {["Kahve Gurusu", "Erken Kus", "Kasif"].map((badge) => (
              <div className="badge-row" key={badge}>
                <span />
                <strong>{badge}</strong>
              </div>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
