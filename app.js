/* =========================
   TMDb config (TU API KEY)
========================= */
const TMDB_API_KEY = "c2286f07ea47a4c3b3f9a4a8b822cb50";
const TMDB_READ_TOKEN = "";
const TMDB_LANG = "es-ES";
const TMDB_REGION = "CL";

/* =========================
   MCU Movies
========================= */
const HERO_COLORS = {
  ironman: "#9a0928dd",
  hulk: "#15b04e",
  thor: "#221965",
  captainamerica: "#2563eb",
  avengers: "#77757a99",
  guardians: "#f59e0b",
  antman: "#d04a4a",
  spiderman: "#223cc0",
  doctorstrange: "#f755b4",
  blackpanther: "#620065",
  captainmarvel: "#d4de53",
  blackwidow: "#543a28",
  shangchi: "#6d5714",
  eternals: "#60fafa",
  deadpool: "#ffffff",
  xmen: "#66f43f",
  thunderbolts: "#72afa8",
  fantasticfour: "#0ca2bc",
  other: "#b694b8",
};

function heroLabel(heroKey){
  const map = {
    ironman: "Iron Man",
    hulk: "Hulk",
    thor: "Thor",
    captainamerica: "Captain America",
    avengers: "Avengers",
    guardians: "Guardians",
    antman: "Ant-Man",
    spiderman: "Spider-Man",
    doctorstrange: "Doctor Strange",
    blackpanther: "Black Panther",
    captainmarvel: "Captain Marvel",
    blackwidow: "Black Widow",
    shangchi: "Shang-Chi",
    eternals: "Eternals",
    deadpool: "Deadpool",
    xmen: "X-Men",
    thunderbolts: "Thunderbolts",
    fantasticfour: "Fantastic Four",
    other: "Otros",
  };
  return map[heroKey] || "Otros";
}

function mk(id, title, year, phase, genres, trailer, heroKey, chronoOrder, releaseOrder, isUpcoming=false){
  const color = HERO_COLORS[heroKey] || HERO_COLORS.other;
  return {
    id, title, year, phase, genres,
    trailer,
    heroKey,
    color,
    chronoOrder,
    releaseOrder,
    isUpcoming,
    poster: `images/${id}-poster.jpg`,
    banner: `images/${id}-banner.jpg`,
    runtime: "—",
    rating: 0,
    desc: "Cargando información…",
  };
}

const movies = [
  mk("ironman","Iron Man",2008,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=uzdRdMqPJqI","ironman",3,1),
  mk("incrediblehulk","The Incredible Hulk",2008,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=iAbQLS2TGq4","hulk",10,2),
  mk("ironman2","Iron Man 2",2010,"Fase 1",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=rOrRtdOQcZs","ironman",4,3),
  mk("thor","Thor",2011,"Fase 1",["Acción","Fantasía"],"https://www.youtube.com/watch?v=XqlnQDNrg-Q","thor",5,4),
  mk("captainamerica1","Captain America: The First Avenger",2011,"Fase 1",["Acción","Aventura"],"https://www.youtube.com/watch?v=JhI9QQeLeD0","captainamerica",1,5),
  mk("avengers","The Avengers",2012,"Fase 1",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=yNXfOOL8824","avengers",12,6),

  mk("ironman3","Iron Man 3",2013,"Fase 2",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=MPwsK6CI4dQ","ironman",13,7),
  mk("thor2","Thor: The Dark World",2013,"Fase 2",["Acción","Fantasía"],"https://www.youtube.com/watch?v=_87P6WrC8C0","thor",14,8),
  mk("captainamerica2","Captain America: The Winter Soldier",2014,"Fase 2",["Acción","Thriller"],"https://www.youtube.com/watch?v=GpP3kd1a0Yk","captainamerica",15,9),
  mk("guardians1","Guardians of the Galaxy",2014,"Fase 2",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=qdIuXCfUKM8","guardians",16,10),
  mk("avengers2","Avengers: Age of Ultron",2015,"Fase 2",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=DMFBm_lp4rU","avengers",18,11),
  mk("antman","Ant-Man",2015,"Fase 2",["Acción","Comedia","Ciencia ficción"],"https://www.youtube.com/watch?v=42h1BHPf0ag","antman",19,12),

  mk("captainamerica3","Captain America: Civil War",2016,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=s5PVmDAEuro","captainamerica",20,13),
  mk("doctorstrange","Doctor Strange",2016,"Fase 3",["Acción","Fantasía"],"https://www.youtube.com/watch?v=pSDvNzXDA38","doctorstrange",21,14),
  mk("guardians2","Guardians of the Galaxy Vol. 2",2017,"Fase 3",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=Za0BlY6plOA","guardians",17,15),
  mk("spidermanhomecoming","Spider-Man: Homecoming",2017,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=UBd31udDF_0","spiderman",22,16),
  mk("thor3","Thor: Ragnarok",2017,"Fase 3",["Acción","Comedia","Fantasía"],"https://www.youtube.com/watch?v=qeJoP5eprXc&t=5s","thor",23,17),
  mk("blackpanther","Black Panther",2018,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=wp_QaWgfZDc","blackpanther",24,18),
  mk("avengers3","Avengers: Infinity War",2018,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=LG4DS-L4PZo","avengers",25,19),
  mk("antman2","Ant-Man and the Wasp",2018,"Fase 3",["Acción","Comedia","Ciencia ficción"],"https://www.youtube.com/watch?v=8_rTIAOohas","antman",26,20),
  mk("captainmarvel","Captain Marvel",2019,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=6XkN-MFNZpI","captainmarvel",2,21),
  mk("avengers4","Avengers: Endgame",2019,"Fase 3",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=KdL8ucqi1F8","avengers",27,22),
  mk("spidermanfarfromhome","Spider-Man: Far From Home",2019,"Fase 3",["Acción","Aventura"],"https://www.youtube.com/watch?v=GNbfQKcHHqw","spiderman",28,23),

  mk("blackwidow","Black Widow",2021,"Fase 4",["Acción","Thriller"],"https://www.youtube.com/watch?v=bWge6aMmgkk","blackwidow",11,24),
  mk("shangchi","Shang-Chi and the Legend of the Ten Rings",2021,"Fase 4",["Acción","Fantasía","Aventura"],"https://www.youtube.com/watch?v=BD77EOU8N3o","shangchi",29,25),
  mk("eternals","Eternals",2021,"Fase 4",["Acción","Ciencia ficción","Fantasía"],"https://www.youtube.com/watch?v=v1EkoQV4g5c","eternals",30,26),
  mk("spidermannowayhome","Spider-Man: No Way Home",2021,"Fase 4",["Acción","Aventura"],"https://www.youtube.com/watch?v=aIONNnhkonQ","spiderman",31,27),
  mk("doctorstrange2","Doctor Strange in the Multiverse of Madness",2022,"Fase 4",["Acción","Fantasía"],"https://www.youtube.com/watch?v=KREBGtEeW9U","doctorstrange",32,28),
  mk("thor4","Thor: Love and Thunder",2022,"Fase 4",["Acción","Comedia","Fantasía"],"https://www.youtube.com/watch?v=ZaD7iZR0-5w","thor",33,29),
  mk("blackpanther2","Black Panther: Wakanda Forever",2022,"Fase 4",["Acción","Aventura"],"https://www.youtube.com/watch?v=hpT-11DMqVs","blackpanther",34,30),

  mk("antman3","Ant-Man and the Wasp: Quantumania",2023,"Fase 5",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=mjkQXxYn-ag","antman",35,31),
  mk("guardians3","Guardians of the Galaxy Vol. 3",2023,"Fase 5",["Acción","Ciencia ficción","Aventura"],"https://www.youtube.com/watch?v=sinstLBy9l8","guardians",36,32),
  mk("themarvels","The Marvels",2023,"Fase 5",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=itm8efx8k8U&t=12s","captainmarvel",37,33),

  mk("deadpoolwolverine","Deadpool & Wolverine",2024,"Fase 5",["Acción","Comedia"],"https://www.youtube.com/watch?v=UzFZR2dRsSY","deadpool",38,34),
  mk("captainamerica4","Captain America: Brave New World",2025,"Fase 5",["Acción","Thriller"],"https://www.youtube.com/watch?v=RXoqRPP-y5c","captainamerica",39,35),
  mk("thunderbolts","Thunderbolts*",2025,"Fase 5",["Acción","Aventura"],"https://www.youtube.com/watch?v=F2XL9eamayo","thunderbolts",40,36),
  mk("fantasticfourfirststeps", "The Fantastic 4: First Steps", 2025, "Fase 6", ["Acción","Ciencia ficción"], "https://www.youtube.com/watch?v=big1YWw_TgM", "fantasticfour", 41, 37),

  mk("spidermanbrandnewday","Spider-Man: Brand New Day",2026,"Fase 6",["Acción","Aventura"],"https://www.youtube.com/watch?v=QOdF1zK4ZkY","spiderman",42,38,true),
  mk("avengersdoomsday","Avengers: Doomsday",2026,"Fase 6",["Acción","Ciencia ficción"],"https://www.youtube.com/watch?v=NLWIn5lfXCE","avengers",43,39,true),
  mk("avengerssecretwars","Avengers: Secret Wars",2027,"Fase 6",["Acción","Ciencia ficción"],"https://www.youtube.com/results?search_query=avengers_secret_wars+trailer","avengers",44,40,true),
];

/* =========================
   State + Storage
========================= */
const LS_KEY = "guidemovies_app_v1";
const TMDB_CACHE_KEY = "tmdb_cache_v2";

const defaultState = {
  selectedId: movies[0]?.id || null,
  search: "",
  genre: "Todos",
  phase: "Todas",
  selectedPhases: [],
  listMode: "all",
  orderMode: "chrono",
  favorites: [],
  playlists: {
    "pl_watchlater": { name: "Ver después", items: [] },
  },
  activePlaylistId: "pl_watchlater",
  sidebarView: "movies",
  mobilePhaseCollapse: {},
};

let state = loadState();
let tmdbCache = loadTMDbCache();

const TMDB_FORCE_IDS = {
  fantasticfourfirststeps: 617126,
  avengers: 24428,
  blackwidow: 497698,
  captainamerica3: 271110,
};

function loadState() {
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);

    const merged = structuredClone(defaultState);
    Object.assign(merged, parsed);

    merged.playlists = merged.playlists || structuredClone(defaultState.playlists);
    if(!merged.playlists[merged.activePlaylistId]) {
      merged.activePlaylistId = Object.keys(merged.playlists)[0];
    }
    if(!merged.selectedId) merged.selectedId = movies[0]?.id || null;

    if(!Array.isArray(merged.selectedPhases)) merged.selectedPhases = [];
    merged.selectedPhases = merged.selectedPhases.filter(Boolean);

    if(merged.sidebarView !== "movies" && merged.sidebarView !== "playlists"){
      merged.sidebarView = "movies";
    }

    if(typeof merged.mobilePhaseCollapse !== "object" || merged.mobilePhaseCollapse === null){
      merged.mobilePhaseCollapse = {};
    }

    return merged;
  }catch{
    return structuredClone(defaultState);
  }
}
function saveState(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }

function loadTMDbCache(){
  try{
    const raw = localStorage.getItem(TMDB_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch{
    return {};
  }
}
function saveTMDbCache(){ localStorage.setItem(TMDB_CACHE_KEY, JSON.stringify(tmdbCache)); }

function $(id){ return document.getElementById(id); }
function isMobileViewport(){ return window.matchMedia("(max-width: 900px)").matches; }

function toast(msg){
  const el = $("toast");
  if(!el) return;
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> el.classList.remove("is-show"), 1600);
}

function movieById(id){ return movies.find(m => m.id === id); }
function isFav(id){ return state.favorites.includes(id); }

function toggleFav(id){
  if(isFav(id)){
    state.favorites = state.favorites.filter(x => x !== id);
    toast("Quitado de favoritos");
  }else{
    state.favorites.push(id);
    toast("Agregado a favoritos");
  }
  saveState();
}

function ensureListCanShowMovie(movieId){
  const movie = movieById(movieId);
  if(!movie) return;

  if(state.listMode === "favorites" && !isFav(movieId)){
    state.listMode = "all";
    if($("listModeSelect")) $("listModeSelect").value = "all";
  }

  if(state.listMode === "playlist"){
    const pl = currentPlaylist();
    const inPlaylist = pl?.items?.includes(movieId);
    if(!inPlaylist){
      state.listMode = "all";
      if($("listModeSelect")) $("listModeSelect").value = "all";
    }
  }

  if(state.sidebarView !== "movies"){
    state.sidebarView = "movies";
  }
}

/* =========================
   DETAIL RELOCATION
========================= */
function moveDetailBackToLayout(){
  const detail = $("detail");
  const layout = document.querySelector(".layout");
  if(!detail || !layout) return;
  if(detail.parentElement !== layout){
    layout.appendChild(detail);
  }
  detail.classList.remove("detail--inline");
}

function syncDetailVisibility(){
  const detail = $("detail");
  if(!detail) return;

  const shouldHide = isMobileViewport() && state.sidebarView === "playlists";

  detail.classList.toggle("is-hidden", shouldHide);

  if(shouldHide){
    moveDetailBackToLayout();
  }
}

function relocateDetailForViewport() {
  const detail = $("detail");
  const layout = document.querySelector(".layout");
  const movieList = $("movieList");

  if (!detail || !layout || !movieList) return;

  if (state.sidebarView === "playlists" || !isMobileViewport()) {
    moveDetailBackToLayout();
    return;
  }

  const activeCard =
    movieList.querySelector(`.card[data-id="${state.selectedId}"]`) ||
    movieList.querySelector(".card");

  if (!activeCard) {
    moveDetailBackToLayout();
    return;
  }

  detail.classList.add("detail--inline");

  if (activeCard.nextSibling !== detail) {
    movieList.insertBefore(detail, activeCard.nextSibling);
  }
}

function scrollCardIntoViewIfMobile(movieId){
  if(!isMobileViewport()) return;
  const movieList = $("movieList");
  if(!movieList) return;
  const card = movieList.querySelector(`.card[data-id="${movieId}"]`);
  if(!card) return;

  requestAnimationFrame(()=>{
    card.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function handleMovieSelect(movieId, animate = true){
  ensureListCanShowMovie(movieId);
  state.selectedId = movieId;
  state.sidebarView = "movies";
  saveState();

  renderSidebar();
  syncDetailVisibility();
  relocateDetailForViewport();
  renderDetail(animate);
  relocateDetailForViewport();

  if (isMobileViewport()) {
    scrollCardIntoViewIfMobile(movieId);
  } else {
    $("detail")?.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* =========================
   AUTO-HIDE SIDEBAR
========================= */
function setSbProgress(p){
  const clamped = Math.max(0, Math.min(1, p));
  document.documentElement.style.setProperty("--sbHide", String(clamped));

  if(clamped >= 0.98){
    document.body.classList.add("is-sidebar-hidden");
  }else if(clamped <= 0.02){
    document.body.classList.remove("is-sidebar-hidden");
  }else{
    document.body.classList.remove("is-sidebar-hidden");
  }
}

function setSidebarHidden(hidden){
  if (isMobileViewport()) return;
  if(hidden) setSbProgress(1);
  else setSbProgress(0);
}

function setupAutoSidebar(){
  const detail = $("detail");
  const sidebar = $("sidebar");
  const timeline = $("timeline");
  const reco = $("recoSection");
  const toTopBtn = $("toTopBtn");
  if(!detail || !timeline || !reco || !sidebar) return;

  let lockUntil = 0;

  function lockHide(forceHidden, ms=520){
    lockUntil = Date.now() + ms;
    setSidebarHidden(forceHidden);
  }

  window.__lockSidebarHide = lockHide;

  sidebar.addEventListener("wheel", (e)=>{
    if(isMobileViewport()) return;
    detail.scrollTop += e.deltaY;
    e.preventDefault();
  }, { passive: false });

  let raf = null;

  function update(){
    raf = null;

    if(isMobileViewport()){
      document.body.classList.remove("is-sidebar-hidden");
      setSbProgress(0);
      if(toTopBtn) toTopBtn.classList.remove("is-show");
      return;
    }

    const y = detail.scrollTop;

    if(toTopBtn){
      toTopBtn.classList.toggle("is-show", y > 250);
    }

    if(Date.now() < lockUntil) return;

    const showAt = Math.max(0, reco.offsetTop - 140);
    const hideAt = Math.max(showAt + 220, timeline.offsetTop - 220);

    const p = (y - showAt) / (hideAt - showAt);
    setSbProgress(p);
  }

  function onScroll(){
    if(raf) return;
    raf = requestAnimationFrame(update);
  }

  detail.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", ()=> requestAnimationFrame(update));
  requestAnimationFrame(update);

  if(toTopBtn){
    toTopBtn.addEventListener("click", ()=>{
      if(isMobileViewport()){
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      lockHide(false, 420);
      detail.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* =========================
   TMDb helpers
========================= */
function tmdbEnabled(){
  const hasKey = typeof TMDB_API_KEY === "string" && TMDB_API_KEY.trim();
  const hasToken = typeof TMDB_READ_TOKEN === "string" && TMDB_READ_TOKEN.trim().length > 20;
  return hasKey || hasToken;
}

function tmdbHeaders(){
  const headers = {};
  if (typeof TMDB_READ_TOKEN === "string" && TMDB_READ_TOKEN.trim().length > 20){
    headers["Authorization"] = `Bearer ${TMDB_READ_TOKEN.trim()}`;
  }
  return headers;
}

async function tmdbFetchJson(url){
  const res = await fetch(url, { headers: tmdbHeaders() });
  let data = null;
  try { data = await res.json(); } catch {}
  if(!res.ok){
    console.error("TMDb ERROR:", res.status, data);
    throw new Error(`TMDb ${res.status}`);
  }
  if(data && typeof data.status_code === "number" && data.success === false){
    console.error("TMDb API ERROR payload:", data);
    throw new Error(`TMDb payload error: ${data.status_code}`);
  }
  return data;
}

function toRuntimeLabel(mins){
  if(!mins || mins <= 0) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}min`;
}

function normTitle(s){
  return (s || "")
    .toLowerCase()
    .replace(/^the\s+/g, "")
    .replace(/&/g, "and")
    .replace(/[:'".,!?*()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreCandidate(qTitle, qYear, candidate){
  const ct = normTitle(candidate.title || candidate.original_title || "");
  const qt = normTitle(qTitle);

  let titleScore = 0;
  if(ct === qt) titleScore = 100;
  else if(ct.includes(qt) || qt.includes(ct)) titleScore = 80;
  else {
    const a = new Set(qt.split(" "));
    const b = new Set(ct.split(" "));
    let inter = 0;
    for(const w of a) if(b.has(w)) inter++;
    const union = new Set([...a, ...b]).size || 1;
    titleScore = Math.round((inter / union) * 70);
  }

  let yearScore = 0;
  const y = Number((candidate.release_date || "").slice(0,4));
  if(qYear && y){
    const diff = Math.abs(y - qYear);
    yearScore = diff === 0 ? 30 : diff === 1 ? 18 : diff === 2 ? 10 : 0;
  }

  const pop = typeof candidate.popularity === "number" ? Math.min(20, candidate.popularity / 10) : 0;
  return titleScore + yearScore + pop;
}

async function tmdbSearchMovie(title, year){
  if (title.includes("Fantastic 4") || title.includes("Fantastic Four")) {
    title = "The Fantastic Four: First Steps";
  }

  async function doSearch(query, y){
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    if (TMDB_API_KEY && TMDB_API_KEY.trim()) url.searchParams.set("api_key", TMDB_API_KEY.trim());
    url.searchParams.set("language", TMDB_LANG);
    url.searchParams.set("region", TMDB_REGION);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("query", query);
    if(y) url.searchParams.set("year", String(y));

    const data = await tmdbFetchJson(url.toString());
    return Array.isArray(data.results) ? data.results : [];
  }

  const qYear = Number(year) || null;
  let results = await doSearch(title, qYear);
  if(!results.length) results = await doSearch(title, null);
  if(!results.length) return null;

  let best = results[0];
  let bestScore = -Infinity;
  for(const c of results){
    const s = scoreCandidate(title, qYear, c);
    if(s > bestScore){
      bestScore = s;
      best = c;
    }
  }
  return best || null;
}

async function tmdbGetMovieDetails(tmdbId){
  const url = new URL(`https://api.themoviedb.org/3/movie/${tmdbId}`);
  if (TMDB_API_KEY && TMDB_API_KEY.trim()) url.searchParams.set("api_key", TMDB_API_KEY.trim());
  url.searchParams.set("language", TMDB_LANG);
  return await tmdbFetchJson(url.toString());
}

function isBadCacheEntry(c){
  if(!c) return true;
  const desc = String(c.desc || "").trim();
  if(!desc) return true;
  if(desc.toLowerCase() === "descripción no disponible.") return true;
  return false;
}

async function hydrateMovieFromTMDb(m) {
  if (!tmdbEnabled()) return;

  const cached = tmdbCache[m.id];
  if (cached && !isBadCacheEntry(cached)) {
    m.desc = cached.desc; m.rating = cached.rating; m.runtime = cached.runtime;
    return;
  }

  try {
    let foundId = null;

    if (TMDB_FORCE_IDS[m.id]) {
      foundId = TMDB_FORCE_IDS[m.id];
    } else {
      const found = await tmdbSearchMovie(m.title, m.year);
      foundId = found ? found.id : null;
    }

    if (!foundId) {
      m.desc = "Descripción no disponible.";
      m.rating = 0;
      m.runtime = "—";
      return;
    }

    const details = await tmdbGetMovieDetails(foundId);

    if (details.overview && details.overview.includes("Aladdin")) {
      m.desc = "El equipo de superhéroes más icónico de Marvel, los Cuatro Fantásticos, se prepara para su gran debut en el MCU en una aventura cósmica ambientada en un mundo retro-futurista de los años 60.";
    } else {
      m.desc = details.overview || "Descripción no disponible.";
    }

    m.rating = details.vote_average || 0;
    m.runtime = toRuntimeLabel(details.runtime);

    tmdbCache[m.id] = { tmdbId: foundId, desc: m.desc, rating: m.rating, runtime: m.runtime, ts: Date.now() };
    saveTMDbCache();
  } catch (err) {
    console.error("Error real TMDb:", err);
    m.desc = "Descripción no disponible.";
    m.rating = 0;
    m.runtime = "—";
  }
}

/* =========================
   Warmup ratings
========================= */
async function prefetchTMDbForList(list, concurrency = 4){
  if(!tmdbEnabled()) return;

  const queue = list.slice();

  async function worker(){
    while(queue.length){
      const m = queue.shift();
      if(!m) continue;
      await hydrateMovieFromTMDb(m);
    }
  }

  const workers = Array.from({length: Math.max(1, concurrency)}, worker);
  await Promise.all(workers);
}

async function warmupRatings(){
  if(!tmdbEnabled()) return;

  const key = (state.orderMode === "chrono") ? "chronoOrder" : "releaseOrder";
  const ordered = [...movies].sort((a,b)=> (a[key] ?? 9999) - (b[key] ?? 9999));

  const firstBatch = ordered.slice(0, 18);
  const rest = ordered.slice(18);

  await prefetchTMDbForList(firstBatch, 4);
  renderSidebar();

  prefetchTMDbForList(rest, 4).then(()=> {
    renderSidebar();
  });
}

/* =========================
   Menú Filtros
========================= */
function setupMenus(){
  const btn = $("filtersBtn");
  const panel = $("filtersPanel");
  if(!btn || !panel) return;

  function close(){
    panel.classList.remove("is-open");
    btn.setAttribute("aria-expanded","false");
  }

  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault();
    const open = panel.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  panel.addEventListener("click", (e)=> e.stopPropagation());

  document.addEventListener("click", (e)=>{
    if (!panel.classList.contains("is-open")) return;
    if (btn.contains(e.target) || panel.contains(e.target)) return;
    close();
  });

  window.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") close();
  });
}

/* =========================
   Orden switch
========================= */
function setupOrderSwitch(){
  const btn = $("orderSwitchBtn");
  const left = $("switchLeft");
  const right = $("switchRight");
  if(!btn || !left || !right) return;

  function sync(){
    const isRight = state.orderMode === "release";
    btn.classList.toggle("is-right", isRight);
    left.classList.toggle("is-active", !isRight);
    right.classList.toggle("is-active", isRight);
  }

  btn.addEventListener("click", ()=>{
    state.orderMode = (state.orderMode === "chrono") ? "release" : "chrono";
    saveState();
    sync();
    renderSidebar();
    renderTimeline();
    warmupRatings();
  });

  sync();
}

/* =========================
   Playlists
========================= */
function currentPlaylist(){ return state.playlists[state.activePlaylistId]; }

function createPlaylist(name){
  const clean = String(name || "").trim();
  if(!clean) return null;
  const id = "pl_" + Math.random().toString(16).slice(2,9);
  state.playlists[id] = { name: clean, items: [] };
  state.activePlaylistId = id;
  saveState();
  return id;
}

function deletePlaylist(id){
  const keys = Object.keys(state.playlists);
  if(keys.length <= 1) return toast("Necesitas al menos 1 playlist");
  const pl = state.playlists[id];
  if(!pl) return;

  const ok = confirm(`¿Borrar playlist "${pl.name}"?`);
  if(!ok) return;

  delete state.playlists[id];

  if(state.activePlaylistId === id){
    state.activePlaylistId = Object.keys(state.playlists)[0];
  }

  if(state.listMode === "playlist"){
    state.listMode = "all";
  }

  saveState();
  renderSidebar();
  updateSidebarTitle();
  updateDetailActions();
  toast("Playlist borrada");
}

function renamePlaylist(id){
  const pl = state.playlists[id];
  if(!pl) return;
  const name = prompt("Nuevo nombre:", pl.name);
  if(!name) return;
  pl.name = name.trim();
  saveState();
  renderSidebar();
  updateSidebarTitle();
  toast("Playlist renombrada");
}

function addToPlaylist(movieId, playlistId){
  const pl = state.playlists[playlistId];
  if(!pl) return;
  if(pl.items.includes(movieId)){ toast("Ya está en esa playlist"); return; }
  pl.items.push(movieId);
  saveState();
  toast(`Agregado a "${pl.name}"`);
}

function fillPlaylistPickSelect(selectedId = null){
  const sel = $("playlistPickSelect");
  if(!sel) return;
  sel.innerHTML = "";
  Object.entries(state.playlists).forEach(([id, pl])=>{
    sel.appendChild(new Option(pl.name, id));
  });
  const pick = selectedId || state.activePlaylistId || Object.keys(state.playlists)[0];
  if(pick && state.playlists[pick]) sel.value = pick;
}

/* =========================
   Modal Playlist
========================= */
let modalMoviePendingId = null;

function openPlaylistModal(movieId){
  modalMoviePendingId = movieId;
  const m = movieById(movieId);
  const sub = $("playlistModalSub");
  if(sub) sub.textContent = m ? `Agregar: ${m.title}` : "Elige una playlist";

  fillPlaylistPickSelect(state.activePlaylistId);
  const input = $("playlistNewName");
  if(input) input.value = "";

  const modal = $("playlistModal");
  if(!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
}

function closePlaylistModal(){
  modalMoviePendingId = null;
  const modal = $("playlistModal");
  if(!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
}

function setupPlaylistModal(){
  const modal = $("playlistModal");
  if(!modal) return;

  modal.addEventListener("click", (e)=>{
    const t = e.target;
    if(t && t.dataset && t.dataset.close){
      closePlaylistModal();
    }
  });

  window.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && modal.classList.contains("is-open")){
      closePlaylistModal();
    }
  });

  $("playlistCreateAndPick")?.addEventListener("click", ()=>{
    const input = $("playlistNewName");
    const name = input ? input.value.trim() : "";
    if(!name) return toast("Escribe un nombre");
    if(!modalMoviePendingId) return toast("No hay película seleccionada");

    const newId = createPlaylist(name);
    if(!newId) return;

    fillPlaylistPickSelect(newId);
    addToPlaylist(modalMoviePendingId, newId);

    renderSidebar();
    updateSidebarTitle();
    updateDetailActions();

    closePlaylistModal();
  });

  $("playlistConfirmAdd")?.addEventListener("click", ()=>{
    if(!modalMoviePendingId) return closePlaylistModal();
    const select = $("playlistPickSelect");
    const plId = select ? select.value : state.activePlaylistId;
    state.activePlaylistId = plId;
    addToPlaylist(modalMoviePendingId, plId);

    saveState();
    renderSidebar();
    updateDetailActions();
    closePlaylistModal();
  });
}

/* =========================
   Filtros dinámicos
========================= */
function hydrateFilterOptions(){
  const genreSel = $("genreSelect");
  const phaseSel = $("phaseSelect");
  if(!genreSel || !phaseSel) return;

  const genres = new Set();
  const phases = new Set();

  movies.forEach(m=>{
    m.genres.forEach(g=> genres.add(g));
    phases.add(m.phase);
  });

  genreSel.innerHTML = "";
  genreSel.appendChild(new Option("Todos","Todos"));
  [...genres].sort((a,b)=> a.localeCompare(b, "es")).forEach(g=>{
    genreSel.appendChild(new Option(g, g));
  });

  phaseSel.innerHTML = "";
  phaseSel.appendChild(new Option("Todas","Todas"));
  const orderedPhases = [...phases].sort((a,b)=>{
    const na = Number((a.match(/\d+/)||["0"])[0]);
    const nb = Number((b.match(/\d+/)||["0"])[0]);
    return na - nb;
  });
  orderedPhases.forEach(ph=>{
    phaseSel.appendChild(new Option(ph, ph));
  });

  genreSel.value = state.genre;
  phaseSel.value = state.phase;
}

/* =========================
   Header controls
========================= */
function setupHeaderControls(){
  const searchInput = $("searchInput");
  const listModeSelect = $("listModeSelect");
  const genreSelect = $("genreSelect");
  const phaseSelect = $("phaseSelect");

  if(searchInput) searchInput.value = state.search;
  if(listModeSelect) listModeSelect.value = state.listMode === "favorites" ? "favorites" : "all";

  searchInput?.addEventListener("input", (e)=>{
    state.search = e.target.value;
    saveState();
    renderSidebar();
  });

  genreSelect?.addEventListener("change", (e)=>{
    state.genre = e.target.value;
    saveState();
    renderSidebar();
  });

  phaseSelect?.addEventListener("change", (e)=>{
    state.phase = e.target.value;

    if(state.phase === "Todas"){
      state.selectedPhases = [];
    }else{
      state.selectedPhases = [state.phase];
    }

    saveState();
    renderSidebar();
    renderTimeline();
  });

  listModeSelect?.addEventListener("change", (e)=>{
    state.listMode = e.target.value;
    state.sidebarView = "movies";
    saveState();
    renderSidebar();
    syncDetailVisibility();
    updateSidebarTitle();
    updateDetailActions();
  });

  $("resetBtn")?.addEventListener("click", ()=> resetToAll("Reset aplicado"));

  $("timelineBtn")?.addEventListener("click", ()=>{
    if(window.__lockSidebarHide) window.__lockSidebarHide(true, 650);
    requestAnimationFrame(()=>{
      $("timeline")?.scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });

  $("recoPrev")?.addEventListener("click", ()=> $("recoRow")?.scrollBy({left:-520, behavior:"smooth"}));
  $("recoNext")?.addEventListener("click", ()=> $("recoRow")?.scrollBy({left: 520, behavior:"smooth"}));

  $("playlistsBtn")?.addEventListener("click", ()=>{
    state.sidebarView = (state.sidebarView === "playlists") ? "movies" : "playlists";
    saveState();
    renderSidebar();
    syncDetailVisibility();
    updateSidebarTitle();
  });

  $("backToAllBtn")?.addEventListener("click", ()=> resetToAll("Volviste a Todas"));

  $("newPlaylistSidebarBtn")?.addEventListener("click", ()=>{
    const name = prompt("Nombre de la nueva playlist:");
    if(!name) return;
    createPlaylist(name);
    state.sidebarView = "playlists";
    saveState();
    renderSidebar();
    syncDetailVisibility();
    updateSidebarTitle();
    toast("Playlist creada");
  });
}

/* =========================
   Reset a Todas
========================= */
function resetToAll(msg=""){
  state.search = "";
  state.genre = "Todos";
  state.phase = "Todas";
  state.selectedPhases = [];
  state.listMode = "all";
  state.sidebarView = "movies";
  saveState();

  if($("searchInput")) $("searchInput").value = "";
  if($("listModeSelect")) $("listModeSelect").value = "all";
  hydrateFilterOptions();
  renderTimeline();
  renderSidebar();
  syncDetailVisibility();
  updateSidebarTitle();
  updateDetailActions();
  if(msg) toast(msg);

  setSidebarHidden(false);
  warmupRatings();
}

/* =========================
   Sidebar title + botones
========================= */
function updateSidebarTitle(){
  const title = $("sidebarTitle");
  const sub = $("sidebarSub");
  const backBtn = $("backToAllBtn");
  const newPlBtn = $("newPlaylistSidebarBtn");
  if(!title || !sub || !backBtn || !newPlBtn) return;

  if(state.sidebarView === "playlists"){
    title.textContent = "Tus playlists";
    sub.textContent = "Elige una playlist para ver sus películas.";
    backBtn.classList.remove("is-hidden");
    newPlBtn.classList.remove("is-hidden");
    return;
  }

  if(state.listMode === "favorites"){
    title.textContent = "Favoritos";
    sub.textContent = state.favorites.length ? "Tus favoritos." : "No hay favoritos aún.";
    backBtn.classList.remove("is-hidden");
    newPlBtn.classList.add("is-hidden");
    return;
  }

  if(state.listMode === "playlist"){
    const pl = currentPlaylist();
    title.textContent = `Playlist: ${pl.name}`;
    sub.textContent = (pl.items?.length || 0)
      ? "Orden según vas agregando."
      : "Agrega películas a la playlist.";
    backBtn.classList.remove("is-hidden");
    newPlBtn.classList.add("is-hidden");
    return;
  }

  title.textContent = "Todas";
  sub.textContent = "Click en una película para verla.";
  backBtn.classList.add("is-hidden");
  newPlBtn.classList.add("is-hidden");
}

/* =========================
   fases activas
========================= */
function getActivePhases(){
  if(Array.isArray(state.selectedPhases) && state.selectedPhases.length){
    return state.selectedPhases.slice();
  }
  if(state.phase && state.phase !== "Todas"){
    return [state.phase];
  }
  return [];
}

/* =========================
   Filtros
========================= */
function passesFilters(m){
  const s = state.search.trim().toLowerCase();
  if(s){
    const hay = `${m.title} ${m.year} ${m.phase} ${m.genres.join(" ")} ${heroLabel(m.heroKey)}`.toLowerCase();
    if(!hay.includes(s)) return false;
  }

  if(state.genre !== "Todos" && !m.genres.includes(state.genre)) return false;

  const phases = getActivePhases();
  if(phases.length && !phases.includes(m.phase)) return false;

  if(state.listMode === "favorites" && !isFav(m.id)) return false;

  if(state.listMode === "playlist"){
    const pl = currentPlaylist();
    if(!pl.items.includes(m.id)) return false;
  }

  return true;
}

function sortedMoviesForList(){
  let list = movies.filter(passesFilters);

  if(state.listMode === "playlist"){
    const pl = currentPlaylist();
    const map = new Map(list.map(m => [m.id, m]));
    list = pl.items.map(id => map.get(id)).filter(Boolean);
    return list;
  }

  const key = (state.orderMode === "chrono") ? "chronoOrder" : "releaseOrder";
  list.sort((a,b)=> (a[key] ?? 9999) - (b[key] ?? 9999));
  return list;
}

/* =========================
   Mobile grouped phases
========================= */
function getFilteredMoviesGroupedByPhase(){
  const key = (state.orderMode === "chrono") ? "chronoOrder" : "releaseOrder";
  const filtered = movies.filter(passesFilters);
  const phaseOrder = phasesOrdered();
  const groupsMap = new Map();

  filtered.forEach(m=>{
    if(!groupsMap.has(m.phase)) groupsMap.set(m.phase, []);
    groupsMap.get(m.phase).push(m);
  });

  phaseOrder.forEach(phase=>{
    const arr = groupsMap.get(phase);
    if(arr){
      arr.sort((a,b)=> (a[key] ?? 9999) - (b[key] ?? 9999));
    }
  });

  return phaseOrder
    .filter(phase => groupsMap.has(phase))
    .map(phase => ({
      phase,
      items: groupsMap.get(phase)
    }));
}

function isPhaseCollapsedOnMobile(phase){
  return !!state.mobilePhaseCollapse?.[phase];
}

function setPhaseCollapsedOnMobile(phase, collapsed){
  if(!state.mobilePhaseCollapse || typeof state.mobilePhaseCollapse !== "object"){
    state.mobilePhaseCollapse = {};
  }
  state.mobilePhaseCollapse[phase] = collapsed;
  saveState();
}

function renderMobilePhaseHeader(phase, count){
  const wrap = document.createElement("div");
  wrap.className = "mobilePhaseHeader";

  const collapsed = isPhaseCollapsedOnMobile(phase);

  wrap.innerHTML = `
    <div class="mobilePhaseHeader__left">
      <div class="mobilePhaseHeader__title">${phase}</div>
      <div class="mobilePhaseHeader__count">${count} película(s)</div>
    </div>
    <button class="mobilePhaseHeader__toggle" type="button" aria-label="Abrir o cerrar fase">
      ${collapsed ? "＋" : "−"}
    </button>
  `;

  const btn = wrap.querySelector(".mobilePhaseHeader__toggle");
  btn.addEventListener("click", ()=>{
    setPhaseCollapsedOnMobile(phase, !collapsed);
    renderSidebar();
  });

  return wrap;
}

/* =========================
   Render Sidebar
========================= */
function renderSidebar(){
  const container = $("movieList");
  if(!container) return;

  moveDetailBackToLayout();
  container.innerHTML = "";

  if(state.sidebarView === "playlists"){
    renderPlaylistsSidebar(container);
    syncDetailVisibility();
    return;
  }

  renderMoviesSidebar(container);
  syncDetailVisibility();
}

function getPlaylistCoverSrc(pl){
  const firstId = pl.items && pl.items.length ? pl.items[0] : null;
  if(!firstId) return null;
  const m = movieById(firstId);
  return m ? m.poster : null;
}

function renderPlaylistsSidebar(container){
  const entries = Object.entries(state.playlists);

  if(!entries.length){
    container.innerHTML = `<div style="color:rgba(255,255,255,.55); font-size:13px; padding:8px 4px;">No hay playlists.</div>`;
    return;
  }

  entries.forEach(([id, pl])=>{
    const cover = getPlaylistCoverSrc(pl);

    const card = document.createElement("div");
    card.className = "plCard";

    card.innerHTML = `
      <div class="plCover">${cover ? `<img src="${cover}" alt="cover">` : ``}</div>
      <div class="plInfo">
        <div class="plName">${pl.name}</div>
        <div class="plMeta">${(pl.items?.length || 0)} película(s)</div>
      </div>
      <div class="plBtns">
        <button class="plIcon" title="Renombrar">✎</button>
        <button class="plIcon plIcon--danger" title="Borrar">🗑</button>
        <button class="plView" title="Ver">Ver</button>
      </div>
    `;

    const [btnRename, btnDelete, btnView] = card.querySelectorAll("button");

    btnRename.addEventListener("click", (e)=>{ e.stopPropagation(); renamePlaylist(id); });
    btnDelete.addEventListener("click", (e)=>{ e.stopPropagation(); deletePlaylist(id); });

    btnView.addEventListener("click", (e)=>{
      e.stopPropagation();
      state.activePlaylistId = id;
      state.listMode = "playlist";
      state.sidebarView = "movies";
      if($("listModeSelect")) $("listModeSelect").value = "all";
      saveState();
      renderSidebar();
      syncDetailVisibility();
      updateSidebarTitle();
      updateDetailActions();
      toast(`Viendo: ${pl.name}`);
    });

    card.addEventListener("click", ()=>{
      state.activePlaylistId = id;
      state.listMode = "playlist";
      state.sidebarView = "movies";
      if($("listModeSelect")) $("listModeSelect").value = "all";
      saveState();
      renderSidebar();
      syncDetailVisibility();
      updateSidebarTitle();
      updateDetailActions();
      toast(`Viendo: ${pl.name}`);
    });

    container.appendChild(card);
  });
}

function renderMoviesSidebar(container){
  const list = sortedMoviesForList();

  if(list.length && !list.find(m=>m.id===state.selectedId)){
    state.selectedId = list[0].id;
    saveState();
  }

  if(isMobileViewport()){
    const grouped = getFilteredMoviesGroupedByPhase();

    grouped.forEach(group=>{
      container.appendChild(renderMobilePhaseHeader(group.phase, group.items.length));

      if(!isPhaseCollapsedOnMobile(group.phase)){
        group.items.forEach(m => container.appendChild(renderListCard(m)));
      }
    });
  }else{
    list.forEach((m)=> container.appendChild(renderListCard(m)));
  }

  updateSidebarTitle();
  relocateDetailForViewport();
  renderDetail(false);
}

function renderListCard(m){
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = m.id;
  card.style.setProperty("--accent", m.color);
  card.style.setProperty("--banner", `url('${m.banner}')`);

  if(m.id === state.selectedId) card.classList.add("is-active");

  const poster = document.createElement("div");
  poster.className = "poster";
  poster.innerHTML = `<img src="${m.poster}" alt="${m.title} poster" onerror="this.style.opacity='.0'">`;

  const info = document.createElement("div");
  info.className = "info";

  const ratingPct =
    (typeof m.rating === "number" && m.rating > 0) ? Math.min(100, Math.max(8, (m.rating/10)*100)) : 18;

  info.innerHTML = `
    <div class="nameRow">
      <div class="name">${m.title}</div>
      ${m.isUpcoming ? `<div class="pillSoon">Próximamente</div>` : ``}
    </div>
    <div class="sub">${m.year} • ${heroLabel(m.heroKey)} • ${m.phase}</div>
    <div class="ratingLabel">Rating</div>
    <div class="progress"><span style="width:${ratingPct}%; background:${m.color};"></span></div>
  `;

  const favBtn = document.createElement("button");
  favBtn.className = "favBtn";
  favBtn.type = "button";
  favBtn.title = isFav(m.id) ? "Quitar de favoritos" : "Agregar a favoritos";
  favBtn.innerHTML = `<span>${isFav(m.id) ? "★" : "☆"}</span>`;
  favBtn.addEventListener("click", (e)=>{
    e.stopPropagation();
    toggleFav(m.id);
    renderSidebar();
    renderDetail(false);
  });

  card.addEventListener("click", ()=>{
    handleMovieSelect(m.id, true);
  });

  card.appendChild(poster);
  card.appendChild(info);
  card.appendChild(favBtn);
  return card;
}

/* =========================
   Recomendaciones
========================= */
function uniqById(list){
  const seen = new Set();
  return list.filter(m=>{
    if(!m || !m.id) return false;
    if(seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}
function byKeySorted(key){
  return [...movies].sort((a,b)=> (a[key] ?? 9999) - (b[key] ?? 9999));
}
function neighbors(movie, key){
  const arr = byKeySorted(key);
  const idx = arr.findIndex(x => x.id === movie.id);
  const prev = idx > 0 ? arr[idx-1] : null;
  const next = idx >= 0 && idx < arr.length-1 ? arr[idx+1] : null;
  return {prev, next};
}
function getRecommendationsFor(m){
  const sameHero = movies
    .filter(x => x.heroKey === m.heroKey && x.id !== m.id)
    .sort((a,b)=> (a.chronoOrder ?? 9999) - (b.chronoOrder ?? 9999));

  const c = neighbors(m, "chronoOrder");
  const r = neighbors(m, "releaseOrder");
  const extras = [c.prev, c.next, r.prev, r.next].filter(Boolean).filter(x => x.id !== m.id);

  return uniqById([...sameHero, ...extras]);
}

function renderRecommendations(){
  const m = movieById(state.selectedId);
  if(!m) return;

  const row = $("recoRow");
  if(!row) return;
  row.innerHTML = "";

  const recos = getRecommendationsFor(m);
  if($("recoTitle")) $("recoTitle").textContent = `Sigue con ${heroLabel(m.heroKey)}…`;

  recos.forEach(x=>{
    const card = document.createElement("div");
    card.className = "recoCard";
    card.innerHTML = `
      <div class="recoImg" style="background-image:url('${x.banner}')"></div>
      <div class="recoBody">
        <div class="recoName">${x.title}</div>
        <div class="recoSub">${x.year} • ${heroLabel(x.heroKey)}</div>
      </div>
    `;

    card.addEventListener("click", ()=>{
      handleMovieSelect(x.id, true);
    });

    row.appendChild(card);
  });
}

/* =========================
   Detail
========================= */
function hexToRgba(hex, a){
  const h = (hex||"#ffffff").replace("#","");
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

function setBackgroundFromMovie(m){
  const bg = $("bg");
  if(!bg) return;
  bg.style.background =
    `radial-gradient(900px 600px at 20% 15%, ${hexToRgba(m.color, .18)}, transparent 60%),
     radial-gradient(900px 700px at 85% 20%, rgba(80,130,255,.12), transparent 55%),
     linear-gradient(180deg, rgba(5,6,10,.2), rgba(5,6,10,.6))`;
}

function startDetailSwitch(ms = 260){
  const detail = $("detail");
  if(!detail) return () => {};
  detail.classList.add("is-switching");
  const end = () => detail.classList.remove("is-switching");
  clearTimeout(startDetailSwitch._t);
  startDetailSwitch._t = setTimeout(end, ms);
  return end;
}

function applyHeroTransition(m){
  const hero = document.querySelector(".hero");
  const img = $("detailBanner");
  if(!hero || !img || !m) return;

  hero.classList.add("is-switching");
  hero.style.setProperty("--hero-bg", `url('${m.banner}')`);
  hero.style.setProperty("--hero-color", hexToRgba(m.color || "#ffffff", .22));

  const onLoad = () => {
    requestAnimationFrame(()=> hero.classList.remove("is-switching"));
  };

  img.addEventListener("load", onLoad, { once:true });
  img.src = m.banner;

  img.onerror = () => {
    hero.classList.remove("is-switching");
    img.style.opacity = ".0";
  };
}

async function renderDetail(animate=false){
  const m = movieById(state.selectedId) || movies[0];
  if(!m) return;

  startDetailSwitch(260);
  setBackgroundFromMovie(m);
  applyHeroTransition(m);

  if($("detailGenres")) $("detailGenres").textContent = m.genres.join(" • ");
  if($("detailTitle")) $("detailTitle").textContent = m.title;

  if($("favBigIcon")) $("favBigIcon").textContent = isFav(m.id) ? "★" : "☆";
  if($("favBigBtn")){
    $("favBigBtn").onclick = ()=>{
      toggleFav(m.id);
      renderSidebar();
      renderDetail(false);
    };
  }

  if($("trailerBtn")) $("trailerBtn").href = m.trailer || "#";
  if($("detailYear")) $("detailYear").innerHTML = `${m.year}${m.isUpcoming ? ` <span class="pillSoon">Próximamente</span>` : ``}`;

  updateDetailActions();

  await hydrateMovieFromTMDb(m);

  if($("detailRuntime")) $("detailRuntime").textContent = m.runtime || "—";
  if($("detailRating")) $("detailRating").textContent = (typeof m.rating === "number" && m.rating > 0) ? String(m.rating.toFixed(1)) : "—";
  if($("detailDesc")) $("detailDesc").textContent = m.desc || "—";

  renderRecommendations();

  if(animate){
    const hero = document.querySelector(".hero");
    const title = $("detailTitle");
    hero?.animate(
      [{ transform: "translateX(-18px)" },{ transform: "translateX(0)" }],
      { duration: 260, easing: "cubic-bezier(.2,.9,.2,1)" }
    );
    title?.animate(
      [{ transform: "translateX(-10px)", opacity: .75 },{ transform: "translateX(0)", opacity: 1 }],
      { duration: 240, easing: "cubic-bezier(.2,.9,.2,1)" }
    );
  }
}

function updateDetailActions(){
  const m = movieById(state.selectedId);
  if(!m) return;

  const addBtn = $("listBtn");
  const removeBtn = $("removeFromListBtn");

  const pl = state.playlists[state.activePlaylistId];
  const inPl = pl?.items?.includes(m.id);

  if(removeBtn) removeBtn.classList.add("is-hidden");
  if(addBtn) addBtn.onclick = ()=> openPlaylistModal(m.id);

  if(state.listMode === "playlist" && inPl && removeBtn){
    removeBtn.classList.remove("is-hidden");
    removeBtn.onclick = ()=>{
      const pl2 = state.playlists[state.activePlaylistId];
      pl2.items = pl2.items.filter(x => x !== m.id);
      saveState();
      toast("Quitado de la playlist");
      renderSidebar();
      updateDetailActions();
    };
  }
}

/* =========================
   Timeline
========================= */
function orderKey(){
  return (state.orderMode === "chrono") ? "chronoOrder" : "releaseOrder";
}

function phasesOrdered(){
  const phases = [...new Set(movies.map(m => m.phase))];
  phases.sort((a,b)=>{
    const na = Number((a.match(/\d+/)||["0"])[0]);
    const nb = Number((b.match(/\d+/)||["0"])[0]);
    return na - nb;
  });
  return phases;
}

function moviesForPhase(phase){
  const key = orderKey();
  const list = movies.filter(m => m.phase === phase);
  list.sort((a,b)=> (a[key] ?? 9999) - (b[key] ?? 9999));
  return list;
}

function renderPhaseColumn(){
  const box = $("timelineList");
  if(!box) return;
  box.innerHTML = "";

  const phases = getActivePhases();
  if(!phases.length){
    box.classList.add("is-hidden");
    return;
  }

  box.classList.remove("is-hidden");
  box.innerHTML = `
    <div class="timelineListHead">
      <h3 class="timelineListTitle">${phases.join(" + ")}</h3>
      <div class="timelineListSub">
        <span>${phases.reduce((acc, ph)=> acc + movies.filter(m=>m.phase===ph).length, 0)} película(s)</span>
        <button id="clearPhasesBtn" class="btn btn--chip btn--danger" type="button">Limpiar fases</button>
      </div>
    </div>
    <div id="phaseGroups"></div>
  `;

  $("clearPhasesBtn")?.addEventListener("click", ()=>{
    state.selectedPhases = [];
    state.phase = "Todas";
    if($("phaseSelect")) $("phaseSelect").value = "Todas";
    saveState();
    renderSidebar();
    renderTimeline();
    toast("Fases limpiadas");
    warmupRatings();
  });

  const groups = document.getElementById("phaseGroups");
  if(!groups) return;

  phases.forEach(ph=>{
    const list = moviesForPhase(ph);

    const group = document.createElement("div");
    group.className = "phaseGroup";
    group.innerHTML = `
      <div class="phaseGroupTitle">
        ${ph} <span class="phaseGroupCount">${list.length} película(s)</span>
      </div>
      <div class="phaseColumn"></div>
    `;

    const col = group.querySelector(".phaseColumn");

    list.forEach(m=>{
      const item = document.createElement("div");
      item.className = "phaseItem";
      item.innerHTML = `
        <div class="phaseItem__poster"><img src="${m.poster}" alt="${m.title}" onerror="this.style.opacity='.0'"></div>
        <div class="phaseItem__dot" style="background:${m.color}"></div>
        <div class="phaseItem__main">
          <div class="phaseItem__title">${m.title}</div>
          <div class="phaseItem__meta">${m.year} • ${m.phase} • ${heroLabel(m.heroKey)}${m.isUpcoming ? " • Próximamente" : ""}</div>
        </div>
      `;

      item.addEventListener("click", ()=>{
        handleMovieSelect(m.id, true);
        setSidebarHidden(false);
        toast(`Seleccionado: ${m.title}`);
      });

      col.appendChild(item);
    });

    groups.appendChild(group);
  });
}

function scrollToPhaseList(){
  const el = $("timelineList");
  if(!el || el.classList.contains("is-hidden")) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderTimeline(){
  const grid = $("timelineGrid");
  const timeline = $("timeline");
  if(!grid || !timeline) return;

  if(isMobileViewport()){
    timeline.style.display = "none";
    return;
  }else{
    timeline.style.display = "";
  }

  grid.innerHTML = "";

  const phases = phasesOrdered();

  phases.forEach(ph=>{
    const count = movies.filter(m=>m.phase===ph).length;
    const card = document.createElement("div");
    card.className = "phaseCard";

    const isActive = state.selectedPhases.includes(ph);
    if(isActive) card.classList.add("is-active");

    card.innerHTML = `
      <b>${ph}</b>
      <span>${count} película(s)</span>
      ${isActive ? `<div class="phaseCheck">✔</div>` : ``}
    `;

    card.addEventListener("click", ()=>{
      const idx = state.selectedPhases.indexOf(ph);
      if(idx >= 0){
        state.selectedPhases.splice(idx, 1);
        toast(`Desmarcado: ${ph}`);
      }else{
        state.selectedPhases.push(ph);
        toast(`Marcado: ${ph}`);
      }

      const order = phasesOrdered();
      state.selectedPhases.sort((a,b)=> order.indexOf(a) - order.indexOf(b));

      if(state.selectedPhases.length === 1){
        state.phase = state.selectedPhases[0];
        if($("phaseSelect")) $("phaseSelect").value = state.phase;
      }else{
        state.phase = "Todas";
        if($("phaseSelect")) $("phaseSelect").value = "Todas";
      }

      saveState();
      renderSidebar();
      renderTimeline();

      if(state.selectedPhases.length) {
        if(window.__lockSidebarHide) window.__lockSidebarHide(true, 520);
        scrollToPhaseList();
      }
    });

    grid.appendChild(card);
  });

  renderPhaseColumn();
}

/* =========================
   Init
========================= */
function init(){
  setupMenus();
  setupOrderSwitch();
  setupPlaylistModal();

  hydrateFilterOptions();
  setupHeaderControls();

  renderTimeline();
  renderSidebar();
  updateSidebarTitle();

  setupAutoSidebar();

  const first = movieById(state.selectedId);
  if(first) hydrateMovieFromTMDb(first).then(()=> renderSidebar());

  warmupRatings();

  relocateDetailForViewport();
  syncDetailVisibility();

  window.addEventListener("resize", () => {
    relocateDetailForViewport();
    renderTimeline();
    renderSidebar();
    syncDetailVisibility();
  });
}

document.addEventListener("DOMContentLoaded", init);