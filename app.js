const STORAGE_KEY = "cmatrix-campaign-briefs-v2";
const DB_NAME = "cmatrix-creative-library";
const DB_VERSION = 1;
const ASSET_STORE = "assets";
const READ_ONLY = Boolean(window.CMATRIX_CONFIG?.readOnly);
const SUPABASE_URL = window.CMATRIX_CONFIG?.supabaseUrl?.replace(/\/$/, "") || "";
const SUPABASE_KEY = window.CMATRIX_CONFIG?.supabasePublishableKey || "";
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);

const brandSeed = [
  { id: "cardgoal", name: "Cardgoal", initials: "CG", tier: 1, owner: "David", color: "#c94b38" },
  { id: "cardace", name: "CardAce", initials: "CA", tier: 2, owner: "David", color: "#3d718c" },
  { id: "jiragift", name: "JaraGift", initials: "JG", tier: 2, owner: "Emma", color: "#4b8060" },
  { id: "vivakard", name: "Vivakard", initials: "VV", tier: 1, owner: "Emma", color: "#b8742e" },
];

const overviewPlanSeeds = [
  {
    brandId: "cardace",
    campaign: "December Christmas giveaway",
    launchDate: "2026-12-01",
    preparationDays: 5,
    currentStage: "Brief preparation",
    payment: "To confirm",
    finalApprovalDate: "2026-11-30",
    tasks: [
      {
        date: "2026-11-26",
        title: "Share final brand and promotion brief",
        description: "Provide the approved offer, key messages, CTA and content requirements.",
        owner: "David",
        icon: "file-text",
      },
      {
        date: "2026-11-27",
        title: "Confirm the KOL video concept",
        description: "Agree on the video format, creative direction and key talking points.",
        owner: "David",
        icon: "message-square",
      },
      {
        date: "2026-11-28",
        title: "Confirm payment terms",
        description: "Record the agreed upfront percentage and complete the required payment step.",
        owner: "David / Finance",
        icon: "landmark",
      },
      {
        date: "2026-11-29",
        title: "Receive and review the first draft",
        description: "Check the draft against the approved concept, brief and CTA.",
        owner: "David",
        icon: "video",
      },
      {
        date: "2026-11-30",
        title: "Give final written approval",
        description: "Consolidate feedback, complete agreed revisions and approve the final video.",
        owner: "Thaw Thaw / David",
        icon: "badge-check",
      },
      {
        date: "2026-12-01",
        title: "Publish and record the live link",
        description: "Publish only the approved video, then save the link and publication date.",
        owner: "David",
        icon: "send",
      },
    ],
  },
  {
    brandId: "vivakard",
    campaign: "12 Days of Trading",
    launchDate: "2026-12-01",
    preparationDays: 5,
    currentStage: "Brief preparation",
    payment: "To confirm",
    finalApprovalDate: "2026-11-30",
    tasks: [
      {
        date: "2026-11-26",
        title: "Share final brand and promotion brief",
        description: "Confirm the correct campaign phase, offer, CTA and content requirements.",
        owner: "Emma",
        icon: "file-text",
      },
      {
        date: "2026-11-27",
        title: "Confirm the KOL video concept",
        description: "Agree on the video format, creative direction and key talking points.",
        owner: "Emma",
        icon: "message-square",
      },
      {
        date: "2026-11-28",
        title: "Confirm payment terms",
        description: "Record the agreed upfront percentage and complete the required payment step.",
        owner: "Emma / Finance",
        icon: "landmark",
      },
      {
        date: "2026-11-29",
        title: "Receive and review the first draft",
        description: "Check the draft against the approved concept, brief and CTA.",
        owner: "Emma",
        icon: "video",
      },
      {
        date: "2026-11-30",
        title: "Give final written approval",
        description: "Consolidate feedback, complete agreed revisions and approve the final video.",
        owner: "Thaw Thaw / Emma",
        icon: "badge-check",
      },
      {
        date: "2026-12-01",
        title: "Publish and record the live link",
        description: "Publish only the approved video, then save the link and publication date.",
        owner: "Emma",
        icon: "send",
      },
    ],
  },
];

const staticAssetSeeds = [
  ...["cardace", "vivakard"].flatMap((brandId) => [
    {
      id: `${brandId}-december-targeted-source`,
      brandId,
      section: "december",
      title: "December targeted campaigns - source document",
      assetKind: "Campaign document",
      platform: "All channels",
      status: "Published",
      name: "december-targeted-campaigns.png",
      type: "image/png",
      size: 269255,
      url: "assets/documents/december-targeted-campaigns.png",
      dateLabel: "24 Nov 2026",
      isStatic: true,
    },
    {
      id: `${brandId}-december-christmas-source`,
      brandId,
      section: "december",
      title: "December Christmas campaigns - source document",
      assetKind: "Campaign document",
      platform: "All channels",
      status: "Published",
      name: "december-christmas-campaigns.png",
      type: "image/png",
      size: 297418,
      url: "assets/documents/december-christmas-campaigns.png",
      dateLabel: "24 Nov 2026",
      isStatic: true,
    },
  ]),
  {
    id: "cardace-december-christmas-giveaway-banner",
    brandId: "cardace",
    section: "december",
    title: "Christmas weekly giveaway banner",
    assetKind: "Creative design",
    platform: "All channels",
    status: "Published",
    name: "cardace-christmas-giveaway.jpg",
    type: "image/jpeg",
    size: 142151,
    url: "assets/creatives/cardace/cardace-christmas-giveaway.jpg",
    dateLabel: "24 Nov 2026",
    isStatic: true,
  },
  {
    id: "cardace-december-new-user-cash-banner",
    brandId: "cardace",
    section: "december",
    title: "New-user ₦3,000 cash reward banner",
    assetKind: "Creative design",
    platform: "All channels",
    status: "Published",
    name: "cardace-new-user-cash-reward.png",
    type: "image/png",
    size: 244377,
    url: "assets/creatives/cardace/cardace-new-user-cash-reward.png",
    dateLabel: "24 Nov 2026",
    isStatic: true,
  },
];

const blankCampaign = (section) => ({
  title: section === "current" ? "Current in-app promotion" : "December campaign brief",
  objective: "",
  audience: "",
  offer: "",
  keyMessages: "",
  cta: "",
  requirements: "",
  restrictions: "",
  notes: "",
  startDate: "",
  endDate: "",
  status: "Draft",
  lastUpdated: "Not updated",
});

function cardAceCampaigns() {
  return {
    current: {
      ...blankCampaign("current"),
      title: "CardAce live promotions",
      objective: "Help new users start trading and reward customers who refer friends.",
      audience: "New users and customers referring friends",
      offer: "Three live promotions: a new-user cash reward, a coupon bundle and referral rewards.",
      keyMessages: "New users can receive a ₦1,500 cash reward\nNew users can receive ₦1,500 in coupons\nReferrers and eligible friends can receive rewards",
      cta: "CTA and app link to be confirmed before influencer outreach.",
      requirements: "Explain one promotion at a time. Show the qualifying trade amount, reward and validity clearly on screen.",
      restrictions: "Do not combine the cash reward, coupon bundle and referral reward into one benefit. Include the 15-day coupon validity, 1% coupon cap and 14-day referral qualification window where relevant.",
      status: "Published",
      lastUpdated: "24 Nov 2026",
      modules: [
        {
          type: "metricStrip",
          items: [
            { value: "3", label: "Live promotions" },
            { value: "₦1,500", label: "New-user cash reward" },
            { value: "₦1,500", label: "Total coupon value" },
          ],
        },
        {
          type: "promotionCards",
          title: "Live promotions",
          intro: "Keep each promotion separate so the reward and qualifying action are easy to understand.",
          items: [
            {
              label: "New users",
              title: "New-user cash reward",
              summary: "Eligible new users receive a ₦1,500 cash reward.",
              facts: [{ label: "Reward", value: "₦1,500 cash" }],
            },
            {
              label: "New users",
              title: "New-user bonus coupons",
              summary: "New users receive ₦1,500 in three coupons. Each coupon is valid for 15 days, works on all card types and is capped at a 1% bonus ratio.",
              facts: [
                { label: "₦1,000 coupon", value: "Minimum single trade: ₦100,000" },
                { label: "₦300 coupon", value: "Minimum single trade: ₦30,000" },
                { label: "₦200 coupon", value: "Minimum single trade: ₦20,000" },
              ],
            },
            {
              label: "Referral",
              title: "Invite a friend",
              summary: "The inviter and eligible friend each receive ₦1,000 after the friend completes the qualifying order.",
              facts: [
                { label: "Invite reward", value: "₦1,000 each" },
                { label: "Friend’s first order", value: "₦50,000 minimum" },
                { label: "Qualification window", value: "Within 14 days of sign-up" },
                { label: "Ongoing commission", value: "1% on all trades" },
              ],
            },
          ],
        },
        {
          type: "reviewNotes",
          title: "Confirm before using in influencer content",
          items: [
            "Eligibility and payout timing for the ₦1,500 new-user cash reward.",
            "How long the referral commission continues and whether any cap applies.",
            "The approved CTA, app link and exact promotion terms.",
          ],
        },
      ],
    },
    december: {
      ...blankCampaign("december"),
      seedVersion: 2,
      title: "CardAce December campaign",
      objective: "Increase GMV by encouraging new users to start trading, inactive users to return and existing users to trade consistently.",
      audience: "High-value customers, inactive users, new users and active traders",
      offer: "Targeted rewards from 28 November to 7 December, followed by weekly Christmas giveaways throughout December.",
      keyMessages: "Different customer groups receive different qualifying offers\nActive traders can qualify for weekly Christmas cash giveaways\nRewards are subject to campaign thresholds and verification",
      cta: "December campaign CTA and tracking link to be confirmed.",
      requirements: "Present the targeted offer for the correct audience. For the Christmas giveaway, show the weekly qualifying trade amount, reward and verification timing.",
      restrictions: "Do not suggest that every user receives every reward. Christmas giveaway participants can receive only one reward per week, subject to backend verification.",
      startDate: "2026-11-28",
      endDate: "2026-12-31",
      status: "Under Review",
      shareVisible: true,
      lastUpdated: "24 Nov 2026",
      modules: [
        {
          type: "metricStrip",
          items: [
            { value: "28 Nov", label: "Targeted offers begin" },
            { value: "1–31 Dec", label: "Christmas campaign" },
            { value: "₦5,000", label: "Weekly giveaway reward" },
          ],
        },
        {
          type: "promotionCards",
          title: "Launch phase: targeted offers",
          intro: "These audience-specific offers run from 28 November to 7 December.",
          items: [
            {
              label: "High-value customers",
              title: "₦9,000 coupon offer",
              summary: "Complete one single trade above ₦150,000 during the campaign period.",
              facts: [
                { label: "Reward", value: "₦9,000 coupon" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
            },
            {
              label: "Inactive users",
              title: "Reactivation coupon offer",
              summary: "Complete an eligible trade during the campaign and receive the matching tier reward.",
              facts: [
                { label: "Tier 1", value: "Trade ₦50,000 or more → ₦1,000 coupon" },
                { label: "Tier 2", value: "Trade above ₦100,000 → ₦3,000 coupon" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
            },
            {
              label: "New users",
              title: "First-trade cash reward",
              summary: "Complete the first trade above ₦30,000 during the campaign period.",
              facts: [
                { label: "Reward", value: "₦3,000 cash" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
              media: {
                assetId: "cardace-december-new-user-cash-banner",
                src: "assets/creatives/cardace/cardace-new-user-cash-reward.png",
                alt: "CardAce new-user ₦3,000 first-trade cash reward banner",
                caption: "New-user campaign creative",
              },
            },
          ],
        },
        {
          type: "weeklyTimeline",
          title: "Full-month Christmas giveaway",
          intro: "Active traders qualify through a single trade above ₦100,000 each week. Each user can receive only one reward per week. Cash is sent to the user’s wallet after backend verification, normally within one to two days.",
          weeks: [
            { dates: "1–7 Dec", reward: "₦5,000" },
            { dates: "8–14 Dec", reward: "₦5,000" },
            { dates: "15–21 Dec", reward: "₦5,000" },
            { dates: "22–28 Dec", reward: "₦5,000" },
          ],
          media: {
            assetId: "cardace-december-christmas-giveaway-banner",
            src: "assets/creatives/cardace/cardace-christmas-giveaway.jpg",
            alt: "CardAce Christmas weekly giveaway banner",
            caption: "Christmas giveaway campaign creative",
          },
        },
        {
          type: "channelList",
          title: "Channel execution",
          items: [
            { channel: "Social media", detail: "Promote Christmas activities, trading offers and reward opportunities." },
            { channel: "Email", detail: "Send personalised offers, progress updates and deadline reminders." },
            { channel: "In-app banners", detail: "Show offers, campaign progress and available rewards." },
            { channel: "Pop-ups", detail: "Highlight reward unlocks, qualifying milestones and approaching deadlines." },
          ],
        },
        {
          type: "reviewNotes",
          title: "Confirm before publishing the December brief",
          items: [
            "Whether the inactive-user rewards map as Tier 1 = ₦1,000 and Tier 2 = ₦3,000.",
            "How winners are selected and how many users can receive the ₦5,000 weekly giveaway.",
            "Whether a fifth reward period applies from 29 to 31 December.",
            "Coupon validity, usage limits and the final CTA or tracking link.",
          ],
        },
      ],
    },
  };
}

function vivakardCampaigns() {
  return {
    current: blankCampaign("current"),
    december: {
      ...blankCampaign("december"),
      title: "Vivakard December campaign",
      objective: "Increase GMV by encouraging new users to start trading, inactive users to return and existing users to trade consistently.",
      audience: "High-value customers, users inactive for 30–90 days, new users and all active users",
      offer: "Targeted rewards from 28 November to 7 December, followed by the full-month 12 Days of Trading campaign.",
      keyMessages: "Different customer groups receive different qualifying offers\nTwo boosted coupon-code phases run during December\nEligible users who redeem both December coupons can qualify for a loyalty cash reward",
      cta: "Vivakard December campaign CTA and tracking link to be confirmed.",
      requirements: "Present only the offer that matches the intended audience. For 12 Days of Trading, show the correct campaign phase, coupon code, reward and qualifying action on screen.",
      restrictions: "Do not suggest that every user receives every reward. Do not publish the coupon codes or final mechanics until eligibility, validity and redemption rules have written approval.",
      startDate: "2026-11-28",
      endDate: "2026-12-31",
      status: "Under Review",
      shareVisible: true,
      lastUpdated: "24 Nov 2026",
      modules: [
        {
          type: "metricStrip",
          items: [
            { value: "28 Nov", label: "Targeted offers begin" },
            { value: "₦20,000", label: "HVC coupon bundle" },
            { value: "₦6,000", label: "December loyalty cash" },
          ],
        },
        {
          type: "promotionCards",
          title: "Launch phase: targeted offers",
          intro: "These audience-specific offers run from 28 November to 7 December.",
          items: [
            {
              label: "High-value customers",
              title: "₦20,000 coupon bundle",
              summary: "Complete four eligible trades during the campaign period.",
              facts: [
                { label: "Bundle structure", value: "Two ₦6,000 coupons and two ₦4,000 coupons" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
            },
            {
              label: "Inactive users",
              title: "Reactivation cash reward",
              summary: "Users inactive for 30–90 days complete one trade above ₦20,000.",
              facts: [
                { label: "Reward", value: "₦1,000 cash" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
            },
            {
              label: "New users",
              title: "Welcome reward",
              summary: "Receive a welcome kit and complete the first eligible trade within the stated seven-day validity period.",
              facts: [
                { label: "Reward", value: "₦5,000 cash" },
                { label: "Channels", value: "Email, in-app banners and pop-ups" },
              ],
            },
          ],
        },
        {
          type: "promotionCards",
          title: "12 Days of Trading: full-month campaign",
          intro: "The campaign uses two boosted coupon-code waves followed by a loyalty reward phase.",
          items: [
            {
              label: "1–12 December",
              title: "MERRY2026",
              summary: "First boosted-card and coupon-code phase for daily engagement and repeat trading.",
              facts: [{ label: "Coupon value", value: "₦12,000" }],
            },
            {
              label: "13–24 December",
              title: "XMAS2026",
              summary: "Second boosted-card and coupon-code phase supporting repeat trades and December GMV.",
              facts: [{ label: "Coupon value", value: "₦12,000" }],
            },
            {
              label: "25–31 December",
              title: "Loyalty reward phase",
              summary: "Users who redeem both December coupons can qualify for a cash loyalty reward on 31 December.",
              facts: [{ label: "Reward", value: "₦6,000 cash" }],
            },
          ],
        },
        {
          type: "channelList",
          title: "Channel execution",
          items: [
            { channel: "Social media", detail: "Promote Christmas activities, trading offers and daily reward opportunities." },
            { channel: "Email", detail: "Send personalised offers, progress updates and deadline reminders." },
            { channel: "In-app banners", detail: "Show daily offers, campaign progress and available rewards." },
            { channel: "Pop-ups", detail: "Highlight reward unlocks, qualifying milestones and approaching expiry dates." },
          ],
        },
        {
          type: "reviewNotes",
          title: "Review after the first week",
          items: [
            "Evaluate first-trade conversion, inactive-user reactivation, repeat trading and incremental GMV.",
            "Compare additional revenue with reward costs before continuing or adjusting future mechanics.",
            "Honour rewards already earned if mechanics or qualifying criteria are changed for future offers.",
          ],
        },
        {
          type: "reviewNotes",
          title: "Confirm before publishing the December brief",
          items: [
            "Confirm that the HVC ₦20,000 bundle is made up of two ₦6,000 coupons and two ₦4,000 coupons, and define the qualifying trade for each coupon.",
            "Confirm whether the new-user seven-day validity applies to the welcome kit, first trade or cash reward.",
            "Confirm boosted-card mechanics, coupon validity and redemption conditions for MERRY2026 and XMAS2026.",
            "Confirm that users must redeem both coupons to receive the ₦6,000 loyalty cash reward on 31 December.",
          ],
        },
      ],
    },
  };
}

function campaignDefaultsFor(brandId) {
  if (brandId === "cardace") return cardAceCampaigns();
  if (brandId === "vivakard") return vivakardCampaigns();
  return { current: blankCampaign("current"), december: blankCampaign("december") };
}

function mergeCampaign(defaultCampaign, savedCampaign) {
  if (!savedCampaign) return defaultCampaign;
  const untouched =
    savedCampaign.lastUpdated === "Not updated" &&
    !savedCampaign.objective &&
    !savedCampaign.offer &&
    !savedCampaign.audience;
  if (untouched && defaultCampaign.lastUpdated !== "Not updated") return defaultCampaign;
  const merged = { ...defaultCampaign, ...savedCampaign };
  if ((defaultCampaign.seedVersion || 0) > (savedCampaign.seedVersion || 0)) {
    merged.modules = defaultCampaign.modules;
    merged.seedVersion = defaultCampaign.seedVersion;
  }
  return merged;
}

function createInitialState() {
  return {
    mode: "team",
    route: "overview",
    activeBrandId: "cardgoal",
    activeTab: "current",
    creativeFilter: "all",
    noticeDismissed: false,
    brands: brandSeed.map((brand) => ({
      ...brand,
      ...campaignDefaultsFor(brand.id),
    })),
    activities: [],
  };
}

function loadState() {
  const fallback = createInitialState();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored?.brands) return fallback;
    const nextState = {
      ...fallback,
      ...stored,
      brands: brandSeed.map((seed) => {
        const saved = stored.brands.find((brand) => brand.id === seed.id) || {};
        const defaults = campaignDefaultsFor(seed.id);
        return {
          ...saved,
          ...seed,
          current: mergeCampaign(defaults.current, saved.current),
          december: mergeCampaign(defaults.december, saved.december),
        };
      }),
    };
    if (READ_ONLY) nextState.mode = "team";
    return nextState;
  } catch {
    if (READ_ONLY) fallback.mode = "team";
    return fallback;
  }
}

let state = loadState();
let assetCache = [];
let remoteAssets = [];
let toastTimer;
let previewUrl;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function fetchSupabaseRows(table, query) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!response.ok) throw new Error(`${table} request failed with ${response.status}`);
  return response.json();
}

function campaignFromRow(row, fallback) {
  const remoteModules = Array.isArray(row.modules) && row.modules.length ? row.modules : fallback.modules;
  return {
    ...fallback,
    title: row.title || fallback.title,
    objective: row.objective || "",
    audience: row.audience || "",
    offer: row.offer || "",
    keyMessages: row.key_messages || "",
    cta: row.cta || "",
    requirements: row.content_requirements || "",
    restrictions: row.restrictions || "",
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    status: row.status || "Draft",
    shareVisible: Boolean(row.share_with_team),
    lastUpdated: row.updated_at ? formatRemoteDate(row.updated_at) : fallback.lastUpdated,
    modules: remoteModules,
  };
}

function formatRemoteDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date(value));
}

function storagePublicUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/campaign-files/${path.split("/").map(encodeURIComponent).join("/")}`;
}

async function loadRemoteContent() {
  if (!SUPABASE_ENABLED) return;
  const [brands, campaigns, files] = await Promise.all([
    fetchSupabaseRows("brands", "select=id,name,initials,tier,owner_name,color,sort_order&active=eq.true&order=sort_order.asc"),
    fetchSupabaseRows("campaigns", "select=brand_id,section,title,objective,audience,offer,key_messages,cta,content_requirements,restrictions,start_date,end_date,status,share_with_team,modules,updated_at"),
    fetchSupabaseRows("campaign_files", "select=id,brand_id,section,title,asset_kind,platform,status,file_name,mime_type,size_bytes,storage_path,display_date,created_at&order=created_at.desc"),
  ]);

  if (brands.length) {
    state.brands = state.brands.map((brand) => {
      const remote = brands.find((item) => item.id === brand.id);
      return remote
        ? {
            ...brand,
            name: remote.name,
            initials: remote.initials,
            tier: remote.tier,
            owner: remote.owner_name,
            color: remote.color,
          }
        : brand;
    });
  }

  campaigns.forEach((row) => {
    const brand = state.brands.find((item) => item.id === row.brand_id);
    if (!brand || !["current", "december"].includes(row.section)) return;
    brand[row.section] = campaignFromRow(row, brand[row.section]);
  });

  remoteAssets = files.map((file) => {
    const url = storagePublicUrl(file.storage_path);
    return {
      id: file.id,
      brandId: file.brand_id,
      section: file.section,
      title: file.title,
      assetKind: file.asset_kind,
      platform: file.platform,
      status: file.status,
      name: file.file_name,
      type: file.mime_type || "application/octet-stream",
      size: file.size_bytes || 0,
      url,
      objectUrl: url,
      dateLabel: file.display_date || formatRemoteDate(file.created_at),
      isStatic: true,
      isRemote: true,
    };
  });
}

function formatDate(dateString) {
  if (!dateString) return "To be confirmed";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date(`${dateString}T12:00:00+04:00`));
}

function formatShortDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date(`${dateString}T12:00:00+04:00`));
}

function todayLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date());
}

function statusClass(status) {
  return `status-${status.toLowerCase().replaceAll(" ", "-")}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function lines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function valueOrPending(value, label = "Information") {
  return value?.trim() || `${label} has not been added yet.`;
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ASSET_STORE)) {
        const store = db.createObjectStore(ASSET_STORE, { keyPath: "id" });
        store.createIndex("brandId", "brandId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAssets() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ASSET_STORE, "readonly");
    const request = transaction.objectStore(ASSET_STORE).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
    request.onerror = () => reject(request.error);
  });
}

async function saveAsset(asset) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ASSET_STORE, "readwrite");
    transaction.objectStore(ASSET_STORE).put(asset);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function removeAsset(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ASSET_STORE, "readwrite");
    transaction.objectStore(ASSET_STORE).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function populateBrandSelectors() {
  const options = state.brands
    .map((brand) => `<option value="${brand.id}">${brand.name}</option>`)
    .join("");
  $("#brief-brand").innerHTML = options;
  $("#creative-brand").innerHTML = options;
}

function renderBrandNavigation() {
  $("#brand-nav").innerHTML = state.brands
    .map(
      (brand) => `
        <button class="nav-item" data-route="brand" data-brand-id="${brand.id}">
          <span class="nav-brand-dot" style="--brand-color:${brand.color}"></span>
          <span>${brand.name}</span>
        </button>
      `,
    )
    .join("");
}

function renderOverview() {
  const campaigns = state.brands.flatMap((brand) => [brand.current, brand.december]);
  const published = campaigns.filter((campaign) => campaign.status === "Published").length;
  const underReview = campaigns.filter((campaign) => campaign.status === "Under Review").length;
  const overviewPlans = overviewPlanSeeds
    .map((plan) => ({ ...plan, brand: state.brands.find((brand) => brand.id === plan.brandId) }))
    .filter((plan) => plan.brand);
  const groupedTasks = overviewPlans
    .flatMap((plan) => plan.tasks.map((task) => ({ ...task, plan })))
    .sort((a, b) => a.date.localeCompare(b.date))
    .reduce((groups, task) => {
      if (!groups[task.date]) groups[task.date] = [];
      groups[task.date].push(task);
      return groups;
    }, {});

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Internal planning</span>
        <h1>Upcoming actions</h1>
        <p>Backward-planned preparation tasks for each influencer campaign, from the final brief through publication.</p>
      </div>
    </div>

    <div class="overview-notice">
      <i data-lucide="calendar-clock" aria-hidden="true"></i>
      <p><strong>Estimated internal timeline</strong><span>Dates are planning references and should be updated when each brand confirms its campaign, launch date and KOL agreement.</span></p>
    </div>

    <div class="readiness-strip" aria-label="Campaign readiness summary">
      <div><span>Campaigns scheduled</span><strong>${overviewPlans.length}</strong><small>CardAce and Vivakard</small></div>
      <div><span>Next internal deadline</span><strong>26 Nov</strong><small>Final brand and promotion briefs</small></div>
      <div><span>Payment terms pending</span><strong>${overviewPlans.filter((plan) => plan.payment === "To confirm").length}</strong><small>Confirm before content production</small></div>
    </div>

    <div class="overview-planning-layout">
      <section class="action-queue" aria-labelledby="action-queue-title">
        <div class="planning-section-header">
          <div>
            <h2 id="action-queue-title">Internal awareness timeline</h2>
            <p>Actions are grouped by their estimated completion date.</p>
          </div>
          <span class="planning-label">26 Nov–1 Dec</span>
        </div>
        ${Object.entries(groupedTasks)
          .map(
            ([date, tasks]) => `
              <div class="action-date-row">
                <strong>${formatShortDate(date)}</strong>
                <span>${tasks.length} action${tasks.length === 1 ? "" : "s"}</span>
              </div>
              ${tasks
                .map(
                  (task) => `
                    <article class="action-item">
                      <span class="action-icon"><i data-lucide="${task.icon}" aria-hidden="true"></i></span>
                      <div class="action-copy">
                        <span class="action-brand" style="--brand-color:${task.plan.brand.color}">${task.plan.brand.initials} · ${escapeHtml(task.plan.campaign)}</span>
                        <h3>${escapeHtml(task.title)}</h3>
                        <p>${escapeHtml(task.description)}</p>
                      </div>
                      <div class="action-owner"><span>Owner</span><strong>${escapeHtml(task.owner)}</strong></div>
                    </article>
                  `,
                )
                .join("")}
            `,
          )
          .join("")}
      </section>

      <aside class="launch-plan-panel" aria-labelledby="launch-plan-title">
        <div class="planning-section-header">
          <div>
            <h2 id="launch-plan-title">Campaign launch plan</h2>
            <p>Estimated schedules</p>
          </div>
        </div>
        ${overviewPlans
          .map(
            (plan) => `
              <div class="launch-plan">
                <div class="launch-plan-heading">
                  <span class="brand-initial" style="--brand-color:${plan.brand.color}">${plan.brand.initials}</span>
                  <div><strong>${escapeHtml(plan.campaign)}</strong><span>${formatShortDate(plan.launchDate)} · ${plan.preparationDays} preparation days</span></div>
                  <span class="planning-status">Estimated</span>
                </div>
                <div class="launch-progress" aria-label="Preparation not started"><span style="width:16%"></span></div>
                <dl>
                  <div><dt>Current stage</dt><dd>${escapeHtml(plan.currentStage)}</dd></div>
                  <div><dt>Payment</dt><dd>${escapeHtml(plan.payment)}</dd></div>
                  <div><dt>Final approval</dt><dd>${formatShortDate(plan.finalApprovalDate)}</dd></div>
                  <div><dt>Owner</dt><dd>${escapeHtml(plan.brand.owner)}</dd></div>
                </dl>
              </div>
            `,
          )
          .join("")}
        <div class="launch-plan-placeholder">
          <i data-lucide="plus-circle" aria-hidden="true"></i>
          <p><strong>Two campaigns to add</strong><span>Cardgoal and JaraGift will appear after the promotion and launch date are confirmed.</span></p>
        </div>
      </aside>
    </div>

    <div class="section-heading">
      <div>
        <h2>Brand readiness</h2>
        <p>Current promotion and December campaign status</p>
      </div>
    </div>
    <div class="brand-table-wrap">
      <table class="brand-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Tier</th>
            <th>Owner</th>
            <th>Current promotion</th>
            <th>December campaign</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          ${state.brands
            .map(
              (brand) => `
                <tr data-open-brand="${brand.id}">
                  <td><div class="brand-name-cell"><span class="brand-initial" style="--brand-color:${brand.color}">${brand.initials}</span>${brand.name}</div></td>
                  <td><span class="tier-badge tier-${brand.tier}">Tier ${brand.tier}</span></td>
                  <td>${brand.owner}</td>
                  <td><span class="status-badge ${statusClass(brand.current.status)}">${brand.current.status}</span></td>
                  <td><span class="status-badge ${statusClass(brand.december.status)}">${brand.december.status}</span></td>
                  <td>${brand.current.lastUpdated === "Not updated" && brand.december.lastUpdated === "Not updated" ? "Not updated" : brand.december.lastUpdated}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderActivity() {
  if (!state.activities.length) {
    return `<div class="empty-state"><div><i data-lucide="history" aria-hidden="true"></i><h3>No activity yet</h3><p>Campaign edits and creative uploads will appear here.</p></div></div>`;
  }
  return `<div class="activity-list">${state.activities
    .slice(0, 8)
    .map(
      (activity) => `
        <div class="activity-row">
          <time>${escapeHtml(activity.date)}</time>
          <p>${escapeHtml(activity.text)}</p>
          <span>${escapeHtml(activity.type)}</span>
        </div>
      `,
    )
    .join("")}</div>`;
}

function renderBrandPage(brand) {
  const campaign = brand[state.activeTab === "december" ? "december" : "current"];
  const activeAssets = assetCache.filter((asset) => asset.brandId === brand.id);
  const visibleCampaign = state.mode === "admin" || campaign.status === "Published" || campaign.shareVisible;

  return `
    <div class="brand-hero">
      <div class="brand-heading">
        <span class="brand-initial" style="--brand-color:${brand.color}">${brand.initials}</span>
        <div>
          <div class="brand-meta">
            <span class="tier-badge tier-${brand.tier}">Tier ${brand.tier}</span>
            <span class="status-badge ${statusClass(campaign.status)}">${campaign.status}</span>
          </div>
          <h1>${brand.name}</h1>
          <p>Owner: ${brand.owner} · Last updated: ${campaign.lastUpdated}</p>
        </div>
      </div>
      <div class="brand-actions">
        <button class="button primary admin-only ${state.mode === "admin" ? "" : "hidden"}" data-edit-brief="${brand.id}">
          <i data-lucide="pencil" aria-hidden="true"></i>Edit brief
        </button>
      </div>
    </div>

    <div class="tabs" role="tablist">
      <button class="tab-button ${state.activeTab === "current" ? "active" : ""}" data-tab="current">Current promotion</button>
      <button class="tab-button ${state.activeTab === "december" ? "active" : ""}" data-tab="december">December campaign</button>
      <button class="tab-button ${state.activeTab === "creatives" ? "active" : ""}" data-tab="creatives">Creatives <span class="muted">(${activeAssets.length})</span></button>
    </div>

    ${
      state.activeTab === "creatives"
        ? renderCreativeLibrary(activeAssets, brand.id)
        : visibleCampaign
          ? renderCampaign(campaign, brand)
          : renderUnpublishedCampaign(brand)
    }
  `;
}

function renderUnpublishedCampaign(brand) {
  return `
    <div class="empty-state">
      <div>
        <i data-lucide="file-clock" aria-hidden="true"></i>
        <h3>This brief is not published yet</h3>
        <p>Switch to Admin mode to add the campaign information and publish it for the team.</p>
        <button class="button secondary" data-switch-admin="${brand.id}">Open Admin mode</button>
      </div>
    </div>
  `;
}

function renderCampaign(campaign, brand) {
  const messageItems = lines(campaign.keyMessages);
  const dateRange = campaign.startDate || campaign.endDate
    ? `${formatDate(campaign.startDate)} – ${formatDate(campaign.endDate)}`
    : "To be confirmed";
  return `
    <div class="campaign-layout">
      <div class="campaign-main">
        <section>
          <span class="eyebrow">${state.activeTab === "current" ? "Current in-app promotion" : "December campaign"}</span>
          <h2>${escapeHtml(campaign.title)}</h2>
          <p>${escapeHtml(valueOrPending(campaign.objective, "Campaign objective"))}</p>
        </section>
        ${
          campaign.modules?.length
            ? renderCampaignModules(campaign.modules)
            : `
              <section>
                <h3>Offer and mechanics</h3>
                <p>${escapeHtml(valueOrPending(campaign.offer, "Promotion information"))}</p>
              </section>
              <section>
                <h3>Key messages</h3>
                ${messageItems.length ? `<ul>${messageItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>Key messages have not been added yet.</p>`}
              </section>
            `
        }
        <section>
          <h3>Influencer content guidance</h3>
          <p>${escapeHtml(valueOrPending(campaign.requirements, "Content requirements"))}</p>
        </section>
        <section>
          <h3>Restrictions and terms</h3>
          <p>${escapeHtml(valueOrPending(campaign.restrictions, "Restrictions and terms"))}</p>
        </section>
        <section>
          <h3>Required CTA</h3>
          <div class="cta-box">
            <p id="campaign-cta">${escapeHtml(valueOrPending(campaign.cta, "CTA"))}</p>
            <button class="icon-button" data-copy-cta aria-label="Copy CTA" title="Copy CTA"><i data-lucide="copy" aria-hidden="true"></i></button>
          </div>
        </section>
        ${renderCampaignFiles(brand.id, state.activeTab)}
      </div>
      <aside class="campaign-sidebar">
        <div class="sidebar-block">
          <h3>Campaign period</h3>
          <p>${dateRange}</p>
        </div>
        <div class="sidebar-block">
          <h3>Target audience</h3>
          <p>${escapeHtml(valueOrPending(campaign.audience, "Audience"))}</p>
        </div>
        <div class="sidebar-block">
          <h3>Brand owner</h3>
          <p>${brand.owner}</p>
        </div>
        <div class="sidebar-block">
          <h3>Approval status</h3>
          <span class="status-badge ${statusClass(campaign.status)}">${campaign.status}</span>
        </div>
        ${
          state.mode === "admin" && campaign.notes
            ? `<div class="sidebar-block"><h3>Internal notes</h3><p>${escapeHtml(campaign.notes)}</p></div>`
            : ""
        }
      </aside>
    </div>
  `;
}

function renderCampaignFiles(brandId, section) {
  const files = assetCache.filter(
    (asset) =>
      asset.brandId === brandId &&
      asset.section === section &&
      (state.mode === "admin" || asset.status === "Published"),
  );
  return `
    <section class="campaign-files">
      <div class="campaign-files-heading">
        <div>
          <h3>Campaign documents and creative files</h3>
          <p>Reference documents, approved designs, scripts and supporting campaign materials.</p>
        </div>
        <button class="button secondary admin-only ${state.mode === "admin" ? "" : "hidden"}" data-upload-creative="${brandId}" data-upload-section="${section}">
          <i data-lucide="upload" aria-hidden="true"></i>Upload file
        </button>
      </div>
      ${
        files.length
          ? `<div class="campaign-file-list">${files.map(renderCampaignFileRow).join("")}</div>`
          : `<div class="campaign-files-empty"><i data-lucide="folder-open" aria-hidden="true"></i><span>${state.mode === "admin" ? "No files yet. Upload the campaign source document, brief or approved creative." : "No approved campaign files have been added yet."}</span></div>`
      }
    </section>
  `;
}

function renderCampaignFileRow(asset) {
  const extension = asset.name.split(".").pop() || "file";
  return `
    <div class="campaign-file-row">
      <div class="campaign-file-icon"><i data-lucide="file-text" aria-hidden="true"></i></div>
      <div class="campaign-file-details">
        <strong>${escapeHtml(asset.title)}</strong>
        <span>${escapeHtml(asset.assetKind || "Campaign file")} · ${escapeHtml(extension.toUpperCase())} · ${formatBytes(asset.size)}</span>
      </div>
      <span class="status-badge ${statusClass(asset.status)}">${asset.status}</span>
      <div class="campaign-file-actions">
        <button class="icon-button" data-preview-asset="${asset.id}" aria-label="Preview ${escapeHtml(asset.title)}" title="Preview"><i data-lucide="eye" aria-hidden="true"></i></button>
        <button class="icon-button" data-download-asset="${asset.id}" aria-label="Download ${escapeHtml(asset.title)}" title="Download"><i data-lucide="download" aria-hidden="true"></i></button>
        ${asset.isStatic ? "" : `<button class="icon-button admin-only ${state.mode === "admin" ? "" : "hidden"}" data-delete-asset="${asset.id}" aria-label="Delete ${escapeHtml(asset.title)}" title="Delete"><i data-lucide="trash-2" aria-hidden="true"></i></button>`}
      </div>
    </div>
  `;
}

function renderCampaignModules(modules) {
  return modules.map((module) => {
    if (module.type === "metricStrip") {
      return `
        <div class="brief-metric-strip">
          ${module.items.map((item) => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}
        </div>
      `;
    }

    if (module.type === "promotionCards") {
      return `
        <section>
          <div class="module-heading">
            <h2>${escapeHtml(module.title)}</h2>
            ${module.intro ? `<p>${escapeHtml(module.intro)}</p>` : ""}
          </div>
          <div class="brief-card-grid">
            ${module.items.map((item) => `
              <article class="brief-card ${item.media ? "brief-card-with-media" : ""}">
                <span class="brief-card-label">${escapeHtml(item.label)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
                <dl>
                  ${item.facts.map((fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join("")}
                </dl>
                ${item.media ? renderInlineCampaignMedia(item.media, "brief-card-media") : ""}
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (module.type === "weeklyTimeline") {
      return `
        <section>
          <div class="module-heading">
            <h2>${escapeHtml(module.title)}</h2>
            <p>${escapeHtml(module.intro)}</p>
          </div>
          <div class="timeline-gallery-layout ${module.media ? "has-media" : ""}">
            <div class="week-grid">
              ${module.weeks.map((week, index) => `<div class="week-item"><span>Week ${index + 1}</span><strong>${escapeHtml(week.dates)}</strong><b>${escapeHtml(week.reward)}</b></div>`).join("")}
            </div>
            ${module.media ? renderInlineCampaignMedia(module.media, "timeline-gallery-media") : ""}
          </div>
        </section>
      `;
    }

    if (module.type === "channelList") {
      return `
        <section>
          <div class="module-heading"><h2>${escapeHtml(module.title)}</h2></div>
          <div class="channel-list">
            ${module.items.map((item) => `<div><span>${escapeHtml(item.channel)}</span><p>${escapeHtml(item.detail)}</p></div>`).join("")}
          </div>
        </section>
      `;
    }

    if (module.type === "reviewNotes") {
      return `
        <section class="review-notes">
          <div class="review-notes-title"><i data-lucide="circle-help" aria-hidden="true"></i><h3>${escapeHtml(module.title)}</h3></div>
          <ul>${module.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `;
    }

    return "";
  }).join("");
}

function renderInlineCampaignMedia(media, className) {
  return `
    <button class="inline-campaign-media ${className}" data-preview-asset="${escapeHtml(media.assetId)}" aria-label="Preview ${escapeHtml(media.caption)}">
      <img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" />
      <span><i data-lucide="expand" aria-hidden="true"></i>${escapeHtml(media.caption)}</span>
    </button>
  `;
}

function renderCreativeLibrary(assets, brandId = null) {
  const visibleAssets = assets.filter((asset) => state.mode === "admin" || asset.status === "Published");
  const filtered = visibleAssets.filter((asset) => state.creativeFilter === "all" || asset.section === state.creativeFilter);
  return `
    <div class="creative-toolbar">
      <div class="filter-group" aria-label="Filter creatives">
        <button class="filter-button ${state.creativeFilter === "all" ? "active" : ""}" data-filter="all">All</button>
        <button class="filter-button ${state.creativeFilter === "current" ? "active" : ""}" data-filter="current">Current promotion</button>
        <button class="filter-button ${state.creativeFilter === "december" ? "active" : ""}" data-filter="december">December</button>
        <button class="filter-button ${state.creativeFilter === "shared" ? "active" : ""}" data-filter="shared">Shared assets</button>
      </div>
      <button class="button primary admin-only ${state.mode === "admin" ? "" : "hidden"}" data-upload-creative="${brandId || ""}">
        <i data-lucide="upload" aria-hidden="true"></i>Upload creative
      </button>
    </div>
    ${
      filtered.length
        ? `<div class="creative-grid">${filtered.map(renderCreativeCard).join("")}</div>`
        : `<div class="empty-state"><div><i data-lucide="images" aria-hidden="true"></i><h3>No creative files here</h3><p>${state.mode === "admin" ? "Upload campaign designs, videos, PDFs or presentation files." : "Approved creative files will appear here when they are published."}</p>${state.mode === "admin" ? `<button class="button secondary" data-upload-creative="${brandId || ""}">Upload creative</button>` : ""}</div></div>`
    }
  `;
}

function renderCreativeCard(asset) {
  const brand = state.brands.find((item) => item.id === asset.brandId);
  const preview = asset.type.startsWith("image/")
    ? `<img src="${asset.objectUrl}" alt="${escapeHtml(asset.title)}" />`
    : asset.type.startsWith("video/")
      ? `<video src="${asset.objectUrl}" muted preload="metadata"></video>`
      : `<i data-lucide="file-text" aria-hidden="true"></i>`;
  const extension = asset.name.split(".").pop() || "file";
  return `
    <article class="creative-card">
      <button class="creative-preview" data-preview-asset="${asset.id}" aria-label="Preview ${escapeHtml(asset.title)}">
        ${preview}<span class="file-extension">${escapeHtml(extension)}</span>
      </button>
      <div class="creative-body">
        <h3 title="${escapeHtml(asset.title)}">${escapeHtml(asset.title)}</h3>
        <div class="creative-tags">
          <span class="platform-badge">${escapeHtml(asset.platform)}</span>
          <span class="section-badge">${asset.section === "current" ? "Current" : asset.section === "december" ? "December" : "Shared"}</span>
          <span class="status-badge ${statusClass(asset.status)}">${asset.status}</span>
        </div>
        <div class="creative-actions">
          <span>${brand?.name || "Unknown"} · ${asset.dateLabel}</span>
          <div class="creative-action-buttons">
            <button class="icon-button" data-download-asset="${asset.id}" aria-label="Download" title="Download"><i data-lucide="download" aria-hidden="true"></i></button>
            ${asset.isStatic ? "" : `<button class="icon-button admin-only ${state.mode === "admin" ? "" : "hidden"}" data-delete-asset="${asset.id}" aria-label="Delete" title="Delete"><i data-lucide="trash-2" aria-hidden="true"></i></button>`}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderAllAssets() {
  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Shared library</span>
        <h1>Campaign files</h1>
        <p>Browse campaign documents, designs, scripts and supporting materials across all five brands.</p>
      </div>
    </div>
    ${renderCreativeLibrary(assetCache)}
  `;
}

function renderProcess() {
  const steps = [
    ["Share the final brief", "Confirm the brand, promotion mechanics, audience and campaign requirements."],
    ["Share the script and CTA", "Provide the proposed script, required CTA and all mandatory talking points."],
    ["KOL submits the video idea", "The KOL proposes a suitable format such as screen recording, voice-over or talking head."],
    ["Approve the video idea", "The team reviews the concept before production begins.", true],
    ["KOL submits the first draft", "The KOL records and submits Draft 1 for review."],
    ["Provide consolidated feedback", "Emma or David sends one consolidated set of comments."],
    ["Complete agreed revisions", "The KOL completes the included revision rounds. Escalate additional reshoots or out-of-scope changes."],
    ["Give final written approval", "The team confirms that the final content can be published.", true],
    ["Publish the approved video", "The KOL publishes only the approved final version."],
    ["Record the live link", "Emma or David records the publication date and live link in the tracker."],
  ];
  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Controlled workflow</span>
        <h1>Content process</h1>
        <p>Every concept and final video must pass the approval gates before the next stage begins.</p>
      </div>
    </div>
    <div class="workflow">
      ${steps
        .map(
          ([title, description, gate], index) => `
            <div class="workflow-step">
              <div class="step-number">${index + 1}</div>
              <div>
                <h3>${title}</h3>
                <p>${description}</p>
                ${gate ? `<span class="approval-gate"><i data-lucide="shield-check" aria-hidden="true"></i>Approval gate</span>` : ""}
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function render() {
  const content = $("#app-content");
  let html;
  let breadcrumb = "Campaign overview";

  if (state.route === "brand") {
    const brand = state.brands.find((item) => item.id === state.activeBrandId) || state.brands[0];
    html = renderBrandPage(brand);
    breadcrumb = `${brand.name} / ${state.activeTab === "current" ? "Current promotion" : state.activeTab === "december" ? "December campaign" : "Creatives"}`;
  } else if (state.route === "process") {
    html = renderProcess();
    breadcrumb = "Content process";
  } else if (state.route === "assets") {
    html = renderAllAssets();
    breadcrumb = "All creatives";
  } else {
    html = renderOverview();
  }

  content.innerHTML = html;
  document.body.classList.toggle("read-only", READ_ONLY);
  $("#breadcrumb").textContent = breadcrumb;
  $("#prototype-notice").classList.toggle("hidden", state.noticeDismissed || READ_ONLY);
  $$(".mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  $("#top-add-button").classList.toggle("hidden", state.mode !== "admin");
  $$(".nav-item").forEach((button) => {
    const isBrand = button.dataset.route === "brand" && button.dataset.brandId === state.activeBrandId;
    const isRoute = button.dataset.route === state.route && state.route !== "brand";
    button.classList.toggle("active", isBrand || isRoute);
  });
  bindDynamicEvents();
  renderIcons();
}

function setMode(mode) {
  if (READ_ONLY) return;
  state.mode = mode;
  saveState();
  render();
}

function navigate(route, brandId = null) {
  state.route = route;
  if (brandId) state.activeBrandId = brandId;
  saveState();
  render();
  $("#app-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindStaticEvents() {
  $("#primary-nav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-route]");
    if (!button) return;
    navigate(button.dataset.route, button.dataset.brandId);
  });

  $$(".mode-button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));

  $("#dismiss-notice").addEventListener("click", () => {
    state.noticeDismissed = true;
    saveState();
    render();
  });

  $("#top-add-button").addEventListener("click", () => {
    if (state.route === "brand") openBriefModal(state.activeBrandId, state.activeTab === "december" ? "december" : "current");
    else openCreativeModal(state.route === "brand" ? state.activeBrandId : "");
  });

  $$('[data-close-modal]').forEach((button) => {
    button.addEventListener("click", () => document.getElementById(button.dataset.closeModal).close());
  });

  $("#brief-form").addEventListener("submit", handleBriefSubmit);
  $("#creative-form").addEventListener("submit", handleCreativeSubmit);

  const fileInput = $('#creative-form input[type="file"]');
  fileInput.addEventListener("change", () => renderSelectedFiles(fileInput.files));
  const dropZone = $("#file-drop-zone");
  ["dragenter", "dragover"].forEach((type) => dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.add("dragover");
  }));
  ["dragleave", "drop"].forEach((type) => dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragover");
  }));
  dropZone.addEventListener("drop", (event) => {
    fileInput.files = event.dataTransfer.files;
    renderSelectedFiles(fileInput.files);
  });

  $("#preview-modal").addEventListener("close", () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  });
}

function bindDynamicEvents() {
  $$('[data-open-brand]').forEach((row) => row.addEventListener("click", () => navigate("brand", row.dataset.openBrand)));

  $$('[data-tab]').forEach((button) => button.addEventListener("click", () => {
    state.activeTab = button.dataset.tab;
    state.creativeFilter = "all";
    saveState();
    render();
  }));

  $$('[data-edit-brief]').forEach((button) => button.addEventListener("click", () => {
    openBriefModal(button.dataset.editBrief, state.activeTab === "december" ? "december" : "current");
  }));

  $$('[data-switch-admin]').forEach((button) => button.addEventListener("click", () => {
    setMode("admin");
    openBriefModal(button.dataset.switchAdmin, state.activeTab === "december" ? "december" : "current");
  }));

  $$('[data-upload-creative]').forEach((button) => button.addEventListener("click", () => openCreativeModal(button.dataset.uploadCreative, button.dataset.uploadSection)));

  $$('[data-filter]').forEach((button) => button.addEventListener("click", () => {
    state.creativeFilter = button.dataset.filter;
    saveState();
    render();
  }));

  $$('[data-copy-cta]').forEach((button) => button.addEventListener("click", async () => {
    const cta = $("#campaign-cta")?.textContent || "";
    await navigator.clipboard.writeText(cta);
    showToast("CTA copied to clipboard");
  }));

  $$('[data-preview-asset]').forEach((button) => button.addEventListener("click", () => previewAsset(button.dataset.previewAsset)));
  $$('[data-download-asset]').forEach((button) => button.addEventListener("click", () => downloadAsset(button.dataset.downloadAsset)));
  $$('[data-delete-asset]').forEach((button) => button.addEventListener("click", () => deleteAsset(button.dataset.deleteAsset)));
}

function openBriefModal(brandId, section) {
  const brand = state.brands.find((item) => item.id === brandId) || state.brands[0];
  const campaign = brand[section];
  const form = $("#brief-form");
  form.reset();
  form.elements.brandId.value = brand.id;
  form.elements.section.value = section;
  ["title", "startDate", "endDate", "status", "audience", "objective", "offer", "keyMessages", "cta", "requirements", "restrictions", "notes"].forEach((field) => {
    form.elements[field].value = campaign[field] || "";
  });
  $("#brief-modal-title").textContent = `Edit ${brand.name} brief`;
  $("#brief-modal").showModal();
}

function handleBriefSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const brand = state.brands.find((item) => item.id === form.get("brandId"));
  const section = form.get("section");
  if (!brand || !["current", "december"].includes(section)) return;
  const previous = brand[section];
  brand[section] = {
    ...previous,
    title: form.get("title").trim(),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    status: form.get("status"),
    audience: form.get("audience").trim(),
    objective: form.get("objective").trim(),
    offer: form.get("offer").trim(),
    keyMessages: form.get("keyMessages").trim(),
    cta: form.get("cta").trim(),
    requirements: form.get("requirements").trim(),
    restrictions: form.get("restrictions").trim(),
    notes: form.get("notes").trim(),
    lastUpdated: todayLabel(),
  };
  state.activeBrandId = brand.id;
  state.activeTab = section;
  state.route = "brand";
  addActivity(`${brand.name} ${section === "current" ? "current promotion" : "December campaign"} brief updated`, "Brief");
  saveState();
  $("#brief-modal").close();
  render();
  showToast("Campaign brief saved");
}

function openCreativeModal(brandId = "", section = "") {
  const form = $("#creative-form");
  form.reset();
  form.elements.brandId.value = brandId || state.activeBrandId || state.brands[0].id;
  if (["current", "december", "shared"].includes(section)) form.elements.section.value = section;
  else if (state.route === "brand" && ["current", "december"].includes(state.activeTab)) form.elements.section.value = state.activeTab;
  $("#selected-files").innerHTML = "";
  $("#creative-modal").showModal();
}

function renderSelectedFiles(fileList) {
  $("#selected-files").innerHTML = [...fileList]
    .map((file) => `<div class="selected-file"><span>${escapeHtml(file.name)}</span><span>${formatBytes(file.size)}</span></div>`)
    .join("");
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

async function handleCreativeSubmit(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const files = [...formElement.elements.files.files];
  if (!files.length) return;
  const baseTitle = form.get("title").trim();
  const brand = state.brands.find((item) => item.id === form.get("brandId"));
  for (const [index, file] of files.entries()) {
    await saveAsset({
      id: crypto.randomUUID(),
      brandId: form.get("brandId"),
      section: form.get("section"),
      title: files.length > 1 ? `${baseTitle} ${index + 1}` : baseTitle,
      assetKind: form.get("assetKind"),
      platform: form.get("platform"),
      status: form.get("status"),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      blob: file,
      createdAt: Date.now() + index,
      dateLabel: todayLabel(),
    });
  }
  addActivity(`${files.length} campaign file${files.length > 1 ? "s" : ""} uploaded for ${brand?.name || "brand"}`, "File");
  saveState();
  $("#creative-modal").close();
  await refreshAssets();
  showToast(`${files.length} file${files.length > 1 ? "s" : ""} uploaded`);
}

function addActivity(text, type) {
  state.activities.unshift({ text, type, date: todayLabel(), createdAt: Date.now() });
  state.activities = state.activities.slice(0, 25);
}

async function refreshAssets() {
  assetCache.forEach((asset) => !asset.isStatic && asset.objectUrl && URL.revokeObjectURL(asset.objectUrl));
  const storedAssets = await getAssets();
  assetCache = [
    ...staticAssetSeeds.map((asset) => ({ ...asset, objectUrl: asset.url })),
    ...remoteAssets,
    ...storedAssets.map((asset) => ({ ...asset, objectUrl: URL.createObjectURL(asset.blob) })),
  ];
  render();
}

function previewAsset(id) {
  const asset = assetCache.find((item) => item.id === id);
  if (!asset) return;
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = asset.url || URL.createObjectURL(asset.blob);
  $("#preview-title").textContent = asset.title;
  const stage = $("#preview-stage");
  if (asset.type.startsWith("image/")) {
    stage.innerHTML = `<img src="${previewUrl}" alt="${escapeHtml(asset.title)}" />`;
  } else if (asset.type.startsWith("video/")) {
    stage.innerHTML = `<video src="${previewUrl}" controls autoplay></video>`;
  } else if (asset.type === "application/pdf") {
    stage.innerHTML = `<iframe src="${previewUrl}" title="${escapeHtml(asset.title)}"></iframe>`;
  } else {
    stage.innerHTML = `<div class="preview-fallback"><i data-lucide="file-text" aria-hidden="true"></i><h3>Preview is not available</h3><p>Download the file to open it in its native application.</p><button class="button secondary" data-download-asset="${asset.id}">Download file</button></div>`;
    $('[data-download-asset]', stage).addEventListener("click", () => downloadAsset(asset.id));
  }
  $("#preview-modal").showModal();
  renderIcons();
}

function downloadAsset(id) {
  const asset = assetCache.find((item) => item.id === id);
  if (!asset) return;
  const url = asset.url || URL.createObjectURL(asset.blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = asset.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (!asset.url) setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function deleteAsset(id) {
  const asset = assetCache.find((item) => item.id === id);
  if (!asset || !window.confirm(`Delete “${asset.title}”? This cannot be undone.`)) return;
  await removeAsset(id);
  addActivity(`${asset.title} deleted from the creative library`, "Creative");
  saveState();
  await refreshAssets();
  showToast("Creative deleted");
}

async function initialise() {
  if (SUPABASE_ENABLED) {
    try {
      await loadRemoteContent();
    } catch (error) {
      console.warn("Supabase content is unavailable; using the bundled campaign data.", error);
    }
  }
  renderBrandNavigation();
  populateBrandSelectors();
  bindStaticEvents();
  try {
    await refreshAssets();
  } catch (error) {
    console.error("Could not load the creative library", error);
    render();
    showToast("Creative storage is unavailable in this browser");
  }
}

initialise();
