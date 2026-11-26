const STORAGE_KEY = "cmatrix-campaign-briefs-v2";
const DB_NAME = "cmatrix-creative-library";
const DB_VERSION = 1;
const ASSET_STORE = "assets";
const READ_ONLY = Boolean(window.CMATRIX_CONFIG?.readOnly);
const SUPABASE_URL = window.CMATRIX_CONFIG?.supabaseUrl?.replace(/\/$/, "") || "";
const SUPABASE_KEY = window.CMATRIX_CONFIG?.supabasePublishableKey || "";
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);
const PRIVATE_FILE_URL_TTL = Number(window.CMATRIX_CONFIG?.privateFileUrlTtlSeconds) || 3600;
const ALLOWED_ROLES = new Set(["admin", "editor", "viewer"]);
const AUTH_LINK_TYPE = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("type");

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
        category: "Planning",
      },
      {
        date: "2026-11-27",
        title: "Confirm the KOL video concept",
        description: "Agree on the video format, creative direction and key talking points.",
        owner: "David",
        category: "Agreement",
      },
      {
        date: "2026-11-28",
        title: "Confirm terms and request payment",
        description: "Record the agreed amount and upfront percentage, then submit the request to Finance.",
        owner: "David / Finance",
        category: "Payment request",
      },
      {
        date: "2026-11-29",
        title: "Receive and review the first draft",
        description: "Check the draft against the approved concept, brief and CTA.",
        owner: "David",
        category: "Content review",
      },
      {
        date: "2026-11-30",
        title: "Give final written approval",
        description: "Consolidate feedback, complete agreed revisions and approve the final video.",
        owner: "Thaw Thaw / David",
        category: "Approval",
      },
      {
        date: "2026-12-01",
        title: "Publish and record the live link",
        description: "Publish only the approved video, then save the link and publication date.",
        owner: "David",
        category: "Publication",
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
        category: "Planning",
      },
      {
        date: "2026-11-27",
        title: "Confirm the KOL video concept",
        description: "Agree on the video format, creative direction and key talking points.",
        owner: "Emma",
        category: "Agreement",
      },
      {
        date: "2026-11-28",
        title: "Confirm terms and request payment",
        description: "Record the agreed amount and upfront percentage, then submit the request to Finance.",
        owner: "Emma / Finance",
        category: "Payment request",
      },
      {
        date: "2026-11-29",
        title: "Receive and review the first draft",
        description: "Check the draft against the approved concept, brief and CTA.",
        owner: "Emma",
        category: "Content review",
      },
      {
        date: "2026-11-30",
        title: "Give final written approval",
        description: "Consolidate feedback, complete agreed revisions and approve the final video.",
        owner: "Thaw Thaw / Emma",
        category: "Approval",
      },
      {
        date: "2026-12-01",
        title: "Publish and record the live link",
        description: "Publish only the approved video, then save the link and publication date.",
        owner: "Emma",
        category: "Publication",
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
  fallback.brands = [];
  fallback.activities = [];
  return fallback;
}

let state = loadState();
let assetCache = [];
let remoteAssets = [];
let toastTimer;
let previewUrl;
let appInitialised = false;
let currentProfile = null;
let currentSession = null;
let authListener = null;
let supabaseClient = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function saveState() {
  // Authenticated content is persisted only in Supabase.
}

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (!SUPABASE_ENABLED) throw new Error("Supabase configuration is missing.");
  if (!window.supabase?.createClient) throw new Error("The Supabase client could not be loaded.");
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return supabaseClient;
}

async function fetchSupabaseRows(table, columns, configure = (query) => query) {
  const query = configure(getSupabaseClient().from(table).select(columns));
  const { data, error } = await query;
  if (error) throw new Error(`${table} request failed: ${error.message}`);
  return data || [];
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

async function createPrivateFileUrl(path) {
  if (!path) return "";
  const { data, error } = await getSupabaseClient()
    .storage
    .from("campaign-files")
    .createSignedUrl(path, PRIVATE_FILE_URL_TTL);
  if (error) throw new Error(`Could not open ${path}: ${error.message}`);
  return data?.signedUrl || "";
}

async function loadRemoteContent() {
  if (!SUPABASE_ENABLED) return;
  const [brands, campaigns, files] = await Promise.all([
    fetchSupabaseRows(
      "brands",
      "id,name,initials,tier,owner_name,color,sort_order",
      (query) => query.eq("active", true).order("sort_order", { ascending: true }),
    ),
    fetchSupabaseRows(
      "campaigns",
      "brand_id,section,title,objective,audience,offer,key_messages,cta,content_requirements,restrictions,start_date,end_date,status,share_with_team,modules,updated_at",
    ),
    fetchSupabaseRows(
      "campaign_files",
      "id,brand_id,section,title,asset_kind,platform,status,share_with_team,file_name,mime_type,size_bytes,storage_path,display_date,created_at",
      (query) => query.order("created_at", { ascending: false }),
    ),
  ]);

  state.brands = brands.map((remote) => ({
    id: remote.id,
    name: remote.name,
    initials: remote.initials,
    tier: remote.tier,
    owner: remote.owner_name,
    color: remote.color,
    current: blankCampaign("current"),
    december: blankCampaign("december"),
  }));

  campaigns.forEach((row) => {
    const brand = state.brands.find((item) => item.id === row.brand_id);
    if (!brand || !["current", "december"].includes(row.section)) return;
    brand[row.section] = campaignFromRow(row, brand[row.section]);
  });

  remoteAssets = await Promise.all(files.map(async (file) => {
    const url = await createPrivateFileUrl(file.storage_path);
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
  }));
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

function isBriefFileAsset(asset) {
  const searchable = `${asset.assetKind || ""} ${asset.title || ""} ${asset.name || ""}`;
  return asset.type === "application/pdf" && /brief/i.test(searchable);
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

function canEditContent() {
  if (READ_ONLY) return false;
  return Boolean(currentProfile && ["admin", "editor"].includes(currentProfile.role));
}

function canOpenAdminMode() {
  return Boolean(currentProfile && ["admin", "editor"].includes(currentProfile.role));
}

function isPortalReadOnly() {
  return !canEditContent();
}

function setAccessLocked(locked) {
  document.body.classList.toggle("auth-locked", locked);
  $("#auth-gate").hidden = !locked;
  if (locked) {
    const target = $("#password-setup-form").hidden ? $("#auth-email") : $("#new-password");
    requestAnimationFrame(() => target?.focus());
  }
}

function renderAccountSummary() {
  const summary = $("#account-summary");
  if (!currentProfile) {
    summary.hidden = true;
    return;
  }
  const email = currentProfile.email || currentSession?.user?.email || "Team member";
  $("#account-email").textContent = email;
  $("#account-role").textContent = `${currentProfile.role.charAt(0).toUpperCase()}${currentProfile.role.slice(1)} access`;
  $("#account-avatar").textContent = email.charAt(0).toUpperCase();
  summary.hidden = false;
}

async function openProtectedWorkspace() {
  setAccessLocked(false);
  renderAccountSummary();
  if (!appInitialised) {
    appInitialised = true;
    await initialise();
  }
}

function setSupabaseAuthError(message) {
  const error = $("#supabase-auth-error");
  error.textContent = message;
  error.hidden = !message;
}

function setLoginPending(pending) {
  const button = $("#supabase-login-button");
  button.disabled = pending;
  button.innerHTML = pending
    ? '<i data-lucide="loader-circle" class="spin" aria-hidden="true"></i>Signing in'
    : '<i data-lucide="log-in" aria-hidden="true"></i>Sign in';
  renderIcons();
}

async function loadCurrentProfile(session) {
  const { data, error } = await getSupabaseClient()
    .from("user_profiles")
    .select("id,email,role,active")
    .eq("id", session.user.id)
    .maybeSingle();
  if (error) throw new Error(`Account access check failed: ${error.message}`);
  if (!data || !data.active || !ALLOWED_ROLES.has(data.role)) {
    const inactiveError = new Error("Your account is not approved for this portal. Please contact the campaign administrator.");
    inactiveError.code = "ACCOUNT_INACTIVE";
    throw inactiveError;
  }
  return data;
}

async function acceptSupabaseSession(session) {
  currentSession = session;
  try {
    currentProfile = await loadCurrentProfile(session);
    await openProtectedWorkspace();
  } catch (error) {
    currentSession = null;
    currentProfile = null;
    await getSupabaseClient().auth.signOut();
    setAccessLocked(true);
    setSupabaseAuthError(
      error.code === "ACCOUNT_INACTIVE"
        ? error.message
        : "We could not verify your portal access. Please try again or contact the campaign administrator.",
    );
    throw error;
  }
}

async function initialiseSupabaseGate() {
  const form = $("#supabase-auth-form");
  const emailInput = $("#auth-email");
  const passwordInput = $("#auth-password");
  form.hidden = false;

  if (!SUPABASE_ENABLED || !window.supabase?.createClient) {
    setAccessLocked(true);
    setSupabaseAuthError("Portal sign-in is not configured. Please contact the campaign administrator.");
    form.querySelectorAll("input, button").forEach((control) => { control.disabled = true; });
    return;
  }

  $("#password-toggle").addEventListener("click", () => {
    const showing = passwordInput.type === "text";
    passwordInput.type = showing ? "password" : "text";
    $("#password-toggle").setAttribute("aria-label", showing ? "Show password" : "Hide password");
    $("#password-toggle").setAttribute("title", showing ? "Show password" : "Hide password");
    $("#password-toggle").innerHTML = `<i data-lucide="${showing ? "eye" : "eye-off"}" aria-hidden="true"></i>`;
    renderIcons();
  });

  [emailInput, passwordInput].forEach((input) => input.addEventListener("input", () => {
    setSupabaseAuthError("");
    input.removeAttribute("aria-invalid");
  }));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setSupabaseAuthError("");
    setLoginPending(true);
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({
      email: emailInput.value.trim(),
      password: passwordInput.value,
    });
    if (error || !data.session) {
      setLoginPending(false);
      emailInput.setAttribute("aria-invalid", "true");
      passwordInput.setAttribute("aria-invalid", "true");
      setSupabaseAuthError("The email or password is incorrect, or this account has not been activated.");
      passwordInput.select();
      return;
    }
    try {
      await acceptSupabaseSession(data.session);
      passwordInput.value = "";
    } catch (sessionError) {
      console.warn("Portal access was denied.", sessionError);
    } finally {
      setLoginPending(false);
    }
  });

  const client = getSupabaseClient();
  const setupForm = $("#password-setup-form");
  const setupError = $("#password-setup-error");

  const showPasswordSetup = async (session) => {
    currentSession = session;
    currentProfile = await loadCurrentProfile(session);
    form.hidden = true;
    setupForm.hidden = false;
    $("#auth-title").textContent = "Create your portal password";
    $("#auth-description").textContent = "Choose a password with at least 8 characters to finish activating your account.";
    setAccessLocked(true);
    renderIcons();
  };

  setupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = $("#new-password").value;
    const confirmation = $("#confirm-password").value;
    setupError.hidden = true;
    if (password.length < 8 || password !== confirmation) {
      setupError.textContent = password.length < 8 ? "Use at least 8 characters." : "The passwords do not match.";
      setupError.hidden = false;
      return;
    }
    const button = $("#password-setup-button");
    button.disabled = true;
    const { error: updateError } = await client.auth.updateUser({ password });
    if (updateError) {
      setupError.textContent = updateError.message || "The password could not be saved. Please request a new recovery email.";
      setupError.hidden = false;
      button.disabled = false;
      return;
    }
    window.history.replaceState({}, document.title, window.location.pathname);
    setupForm.hidden = true;
    form.hidden = false;
    button.disabled = false;
    await acceptSupabaseSession(currentSession);
  });

  let passwordSetupRequested = ["invite", "recovery"].includes(AUTH_LINK_TYPE);
  const { data: listener } = client.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY" && session) {
      passwordSetupRequested = true;
      showPasswordSetup(session).catch((error) => setSupabaseAuthError(error.message));
    }
    if (event === "SIGNED_OUT" && !document.body.classList.contains("auth-locked")) window.location.reload();
  });
  authListener = listener.subscription;

  const { data, error } = await client.auth.getSession();
  if (error) {
    setSupabaseAuthError("Your saved session could not be restored. Please sign in again.");
    setAccessLocked(true);
  } else if (data.session) {
    try {
      if (passwordSetupRequested) await showPasswordSetup(data.session);
      else await acceptSupabaseSession(data.session);
    } catch (sessionError) {
      console.warn("Saved portal access was denied.", sessionError);
    }
  } else {
    setAccessLocked(true);
  }

}

async function initialiseAccessGate() {
  $("#auth-logout").addEventListener("click", async () => {
    if (supabaseClient) await supabaseClient.auth.signOut();
    window.location.reload();
  });

  renderIcons();
  await initialiseSupabaseGate();
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

function renderBrandTimeline(plan, brand) {
  const tasks = [...plan.tasks].sort((a, b) => a.date.localeCompare(b.date));
  return `
    <section class="schedule-lane" aria-label="${escapeHtml(brand.name)} timeline">
      <header class="schedule-heading">
        <div><h2>${escapeHtml(brand.name)}</h2><p>${escapeHtml(plan.campaign)} · ${escapeHtml(brand.owner)}</p></div>
        <div class="schedule-launch">Estimated launch <strong>${formatDate(plan.launchDate)}</strong></div>
      </header>
      <ol class="schedule-track">
        ${tasks.map(task => `
          <li class="schedule-stop">
            <time datetime="${task.date}">${formatShortDate(task.date)}</time>
            <span class="schedule-category" data-category="${escapeHtml(task.category)}">${escapeHtml(task.category)}</span>
            <details><summary>${escapeHtml(task.title)}</summary><p>${escapeHtml(task.description)}</p></details>
            <span class="schedule-owner">${escapeHtml(task.owner)}</span>
          </li>`).join("")}
      </ol>
    </section>`;
}

function renderOverview() {
  const internal = canOpenAdminMode();
  const scheduled = (internal ? overviewPlanSeeds : [])
    .map(plan => ({ plan, brand: state.brands.find(brand => brand.id === plan.brandId) }))
    .filter(entry => entry.brand);
  const pending = internal ? state.brands.filter(brand => !scheduled.some(entry => entry.brand.id === brand.id)) : [];
  return `
    <div class="page-header"><div>
      <h1>${internal ? "Campaign timeline" : "Campaign overview"}</h1>
      <p>${internal ? "Estimated task dates by brand. Select a task to see what its owner needs to do." : "Select a brand to view its shared campaigns and files."}</p>
    </div></div>
    ${scheduled.map(({ plan, brand }) => renderBrandTimeline(plan, brand)).join("")}
    ${pending.length ? `<p class="schedule-pending"><strong>Awaiting schedule</strong> ${pending.map(brand => escapeHtml(brand.name)).join(" · ")}</p>` : ""}

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
  const briefAssets = activeAssets.filter(
    (asset) => isBriefFileAsset(asset) && (state.mode === "admin" || ["Approved", "Published"].includes(asset.status)),
  );
  const creativeAssets = activeAssets.filter((asset) => !isBriefFileAsset(asset));
  const visibleCampaign = state.mode === "admin" || ["Approved", "Published"].includes(campaign.status) || campaign.shareVisible;
  const isBriefTab = state.activeTab === "briefs";
  const headerStatus = isBriefTab ? `${briefAssets.length} PDF${briefAssets.length === 1 ? "" : "s"}` : campaign.status;
  const headerUpdated = isBriefTab ? briefAssets[0]?.dateLabel || "No PDF uploaded" : campaign.lastUpdated;

  return `
    <div class="brand-hero">
      <div class="brand-heading">
        <span class="brand-initial" style="--brand-color:${brand.color}">${brand.initials}</span>
        <div>
          <div class="brand-meta">
            <span class="tier-badge tier-${brand.tier}">Tier ${brand.tier}</span>
            <span class="status-badge ${isBriefTab ? "status-brief-files" : statusClass(campaign.status)}">${headerStatus}</span>
          </div>
          <h1>${brand.name}</h1>
          <p>Owner: ${brand.owner} · Last updated: ${headerUpdated}</p>
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
      <button class="tab-button ${state.activeTab === "briefs" ? "active" : ""}" data-tab="briefs">Brief files <span class="muted">(${briefAssets.length})</span></button>
      <button class="tab-button ${state.activeTab === "creatives" ? "active" : ""}" data-tab="creatives">Creatives <span class="muted">(${creativeAssets.length})</span></button>
    </div>

    ${
      state.activeTab === "briefs"
        ? renderBriefLibrary(briefAssets, brand)
        : state.activeTab === "creatives"
          ? renderCreativeLibrary(creativeAssets, brand.id)
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
        <p>${canOpenAdminMode() ? "Open Admin mode to review the draft campaign information." : "This campaign has not been approved for team access yet."}</p>
        ${canOpenAdminMode() ? `<button class="button secondary" data-switch-admin="${brand.id}">Open Admin mode</button>` : ""}
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
      !isBriefFileAsset(asset) &&
      (state.mode === "admin" || ["Approved", "Published"].includes(asset.status)),
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

function renderBriefLibrary(assets, brand) {
  const visibleAssets = assets.filter((asset) => state.mode === "admin" || ["Approved", "Published"].includes(asset.status));
  const [latest, ...otherFiles] = visibleAssets;

  if (!latest) {
    return `
      <div class="brief-files-page brief-files-empty-state">
        <div class="brief-files-heading">
          <div>
            <span class="eyebrow">Team reference</span>
            <h2>Brief files</h2>
            <p>Approved influencer briefs will be available here for browser preview and download.</p>
          </div>
          <button class="button primary admin-only ${state.mode === "admin" ? "" : "hidden"}" data-upload-creative="${brand.id}" data-upload-section="shared">
            <i data-lucide="upload" aria-hidden="true"></i>Upload PDF
          </button>
        </div>
        <div class="brief-files-empty">
          <i data-lucide="file-text" aria-hidden="true"></i>
          <h3>No approved brief PDF yet</h3>
          <p>The PDF will appear here after it is uploaded and published for the team.</p>
          <span><i data-lucide="eye" aria-hidden="true"></i>Preview in browser</span>
          <span><i data-lucide="download" aria-hidden="true"></i>Download original PDF</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="brief-files-page">
      <div class="brief-files-heading">
        <div>
          <span class="eyebrow">Team reference</span>
          <h2>Brief files</h2>
          <p>Open the approved brief in the browser or download the original PDF.</p>
        </div>
        <div class="brief-files-heading-actions">
          <span>${visibleAssets.length} PDF file${visibleAssets.length === 1 ? "" : "s"}</span>
          <button class="button primary admin-only ${state.mode === "admin" ? "" : "hidden"}" data-upload-creative="${brand.id}" data-upload-section="shared">
            <i data-lucide="upload" aria-hidden="true"></i>Upload PDF
          </button>
        </div>
      </div>
      ${renderFeaturedBriefFile(latest)}
      ${otherFiles.length ? `<div class="brief-file-list">${otherFiles.map(renderBriefFileRow).join("")}</div>` : ""}
      <div class="brief-access-note">
        <i data-lucide="info" aria-hidden="true"></i>
        <p><strong>Team access</strong><span>Team members can preview and download published PDFs. Uploading and replacing files remain restricted to the backend owner.</span></p>
      </div>
    </div>
  `;
}

function renderFeaturedBriefFile(asset) {
  return `
    <article class="featured-brief-file">
      <div class="brief-pdf-mark"><i data-lucide="file-text" aria-hidden="true"></i><span>PDF</span></div>
      <div class="brief-file-copy">
        <span class="brief-latest-label">Latest brief</span>
        <h3>${escapeHtml(asset.title)}</h3>
        <p>${escapeHtml(asset.assetKind || "Influencer brief")} · ${formatBytes(asset.size)} · Added ${escapeHtml(asset.dateLabel || "recently")}</p>
      </div>
      <div class="brief-file-actions">
        <button class="button primary" data-preview-asset="${asset.id}"><i data-lucide="eye" aria-hidden="true"></i>Preview</button>
        <button class="button secondary" data-download-asset="${asset.id}"><i data-lucide="download" aria-hidden="true"></i>Download</button>
        ${asset.isStatic ? "" : `<button class="icon-button admin-only ${state.mode === "admin" ? "" : "hidden"}" data-delete-asset="${asset.id}" aria-label="Delete ${escapeHtml(asset.title)}" title="Delete"><i data-lucide="trash-2" aria-hidden="true"></i></button>`}
      </div>
    </article>
  `;
}

function renderBriefFileRow(asset) {
  return `
    <article class="brief-file-row">
      <span class="brief-file-row-icon"><i data-lucide="file-text" aria-hidden="true"></i></span>
      <div class="brief-file-copy">
        <h3>${escapeHtml(asset.title)}</h3>
        <p>${escapeHtml(asset.assetKind || "Influencer brief")} · ${formatBytes(asset.size)} · Added ${escapeHtml(asset.dateLabel || "recently")}</p>
      </div>
      <span class="status-badge ${statusClass(asset.status)}">${asset.status}</span>
      <div class="campaign-file-actions">
        <button class="icon-button" data-preview-asset="${asset.id}" aria-label="Preview ${escapeHtml(asset.title)}" title="Preview"><i data-lucide="eye" aria-hidden="true"></i></button>
        <button class="icon-button" data-download-asset="${asset.id}" aria-label="Download ${escapeHtml(asset.title)}" title="Download"><i data-lucide="download" aria-hidden="true"></i></button>
        ${asset.isStatic ? "" : `<button class="icon-button admin-only ${state.mode === "admin" ? "" : "hidden"}" data-delete-asset="${asset.id}" aria-label="Delete ${escapeHtml(asset.title)}" title="Delete"><i data-lucide="trash-2" aria-hidden="true"></i></button>`}
      </div>
    </article>
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
  const visibleAssets = assets.filter((asset) => state.mode === "admin" || ["Approved", "Published"].includes(asset.status));
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
        <p>Browse campaign documents, briefs, designs, scripts and supporting materials across all four brands.</p>
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
    if (brand) {
      html = renderBrandPage(brand);
      breadcrumb = `${brand.name} / ${state.activeTab === "current" ? "Current promotion" : state.activeTab === "december" ? "December campaign" : state.activeTab === "briefs" ? "Brief files" : "Creatives"}`;
    } else {
      state.route = "overview";
      html = renderOverview();
    }
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
  const portalReadOnly = isPortalReadOnly();
  document.body.classList.toggle("read-only", portalReadOnly);
  $("#breadcrumb").textContent = breadcrumb;
  $("#prototype-notice").classList.toggle("hidden", state.noticeDismissed || portalReadOnly);
  $(".mode-switch").classList.toggle("hidden", !canOpenAdminMode());
  $$(".mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  $("#top-add-button").classList.toggle("hidden", state.mode !== "admin" || !canEditContent());
  $$(".nav-item").forEach((button) => {
    const isBrand = button.dataset.route === "brand" && button.dataset.brandId === state.activeBrandId;
    const isRoute = button.dataset.route === state.route && state.route !== "brand";
    button.classList.toggle("active", isBrand || isRoute);
  });
  bindDynamicEvents();
  renderIcons();
}

function setMode(mode) {
  if (mode === "admin" && !canOpenAdminMode()) return;
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
  assetCache = [...remoteAssets];
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
  try {
    await loadRemoteContent();
  } catch (error) {
    console.error("Authenticated campaign content is unavailable.", error);
    renderBrandNavigation();
    populateBrandSelectors();
    bindStaticEvents();
    $("#app-content").innerHTML = `
      <div class="secure-load-error">
        <i data-lucide="cloud-off" aria-hidden="true"></i>
        <h1>Campaign content is unavailable</h1>
        <p>The secure content service could not be reached. No bundled campaign data has been shown.</p>
        <button class="button secondary" type="button" onclick="window.location.reload()"><i data-lucide="refresh-cw" aria-hidden="true"></i>Try again</button>
      </div>`;
    renderIcons();
    return;
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

initialiseAccessGate();
