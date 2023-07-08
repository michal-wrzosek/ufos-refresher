export type HotLocation =
  | 'GLOBAL'
  | 'US'
  | 'AR'
  | 'AU'
  | 'BG'
  | 'CA'
  | 'CL'
  | 'CO'
  | 'HR'
  | 'CZ'
  | 'FI'
  | 'FR'
  | 'DE'
  | 'GR'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'IE'
  | 'IT'
  | 'JP'
  | 'MY'
  | 'MX'
  | 'NZ'
  | 'PH'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'RO'
  | 'RS'
  | 'SG'
  | 'ES'
  | 'SE'
  | 'TW'
  | 'TH'
  | 'TR'
  | 'GB'
  | 'US_WA'
  | 'US_DE'
  | 'US_DC'
  | 'US_WI'
  | 'US_WV'
  | 'US_HI'
  | 'US_FL'
  | 'US_WY'
  | 'US_NH'
  | 'US_NJ'
  | 'US_NM'
  | 'US_TX'
  | 'US_LA'
  | 'US_NC'
  | 'US_ND'
  | 'US_NE'
  | 'US_TN'
  | 'US_NY'
  | 'US_PA'
  | 'US_CA'
  | 'US_NV'
  | 'US_VA'
  | 'US_CO'
  | 'US_AK'
  | 'US_AL'
  | 'US_AR'
  | 'US_VT'
  | 'US_IL'
  | 'US_GA'
  | 'US_IN'
  | 'US_IA'
  | 'US_OK'
  | 'US_AZ'
  | 'US_ID'
  | 'US_CT'
  | 'US_ME'
  | 'US_MD'
  | 'US_MA'
  | 'US_OH'
  | 'US_UT'
  | 'US_MO'
  | 'US_MN'
  | 'US_MI'
  | 'US_RI'
  | 'US_KS'
  | 'US_MT'
  | 'US_MS'
  | 'US_SC'
  | 'US_KY'
  | 'US_OR'
  | 'US_SD';

export type SortTime = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export interface RedditApiAccessTokenResponse {
  access_token: string;
  token_type: 'bearer';
  /** @example 86400 */
  expires_in: number;
  scope: '*';
}

export enum RedditApiObjectKind {
  Comment = 't1',
  Account = 't2',
  Link = 't3',
  Message = 't4',
  Subreddit = 't5',
  Award = 't6',
}

export interface RedditApiListing {
  /** @example "t3" */
  kind: RedditApiObjectKind;
  data: {
    approved_at_utc: null;
    /** @example "MadeMeSmile" */
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked: boolean;
    /** @example "Adopted this guy - he needs a name? (OC)" */
    title: string;
    link_flair_richtext: {
      /** @example ":smilingface2:" */
      a?: string;
      /** @example "emoji" | "text" */
      e: string;
      /** @example "https://emoji.redditmedia.com/4md3ujskvn751_t5_2uqcm/smilingface2" */
      u?: string;
      /** @example " Family &amp; Friends " */
      t?: string;
    }[];
    /** @example "r/MadeMeSmile" */
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: string;
    downs: number;
    thumbnail_height: number;
    top_awarded_type: null;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    /** @example 0.93 */
    upvote_ratio: number;
    author_flair_background_color: null;
    ups: number;
    total_awards_received: number;
    media_embed: Record<string, unknown>;
    thumbnail_width: number;
    author_flair_template_id: null;
    is_original_content: boolean;
    user_reports: unknown[];
    secure_media: null;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: null;
    secure_media_embed: Record<string, unknown>;
    /** @example ":smilingface2: Family &amp; Friends :smilingface2:" */
    link_flair_text: string;
    can_mod_post: boolean;
    score: number;
    approved_by: null;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    /** @example "https://b.thumbs.redditmedia.com/Qdp5Q1iSddpEdBpR2S4DuhdwGfIeZXwE1ni_Ik7-chA.jpg" */
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: null;
    author_flair_richtext: unknown[];
    gildings: Record<string, unknown>;
    /** @example "image" */
    post_hint: string;
    content_categories: null;
    is_self: boolean;
    /** @example "public" */
    subreddit_type: string;
    /** @example 1659418990 */
    created: number;
    /** @example "richtext" */
    link_flair_type: string;
    wls: number;
    removed_by_category: null;
    banned_by: null;
    /** @example "text" */
    author_flair_type: string;
    /** @example "i.redd.it" */
    domain: string;
    allow_live_comments: boolean;
    /** @example "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;This is my Uncle David, who died 22 years ago today, holding his little daughter (my cousin). Shortly after his death, my husband and I adopted her, and my cousin became my daughter. &lt;/p&gt;\n\n&lt;p&gt;We love her very much and join her in celebrating her biological father&amp;#39;s life on this day. This is one of the few photographs she has with him, and she cherishes it. She keeps it on her desk year-round, but she has been carrying it with her from room to room today.&lt;/p&gt;\n\n&lt;p&gt;It made me smile!&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;" */
    selftext_html: string;
    likes: null;
    suggested_sort: null;
    banned_at_utc: null;
    /** @example "https://i.redd.it/robzllw3n8f91.jpg" */
    url_overridden_by_dest: string;
    view_count: null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: {
      images: [
        {
          source: {
            /** @example "https://preview.redd.it/robzllw3n8f91.jpg?auto=webp&amp;s=0c444eac926e73505f3f6dd1505a2923f74643ac" */
            url: string;
            /** @example 1440 */
            width: number;
            /** @example 1344 */
            height: number;
          };
          resolutions: [
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=783e1253e632309c45257aaca7b04020ac6af397" */
              url: string;
              /** @example 108 */
              width: number;
              /** @example 100 */
              height: number;
            },
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=63c10ddbf5d3a81e2d7d9d22a8cd447329a25034"  */
              url: string;
              /** @example 216 */
              width: number;
              /** @example 201 */
              height: number;
            },
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=b10a5a6ed54ee6d4397f38353a18c541433f468b"  */
              url: string;
              /** @example 320 */
              width: number;
              /** @example 298 */
              height: number;
            },
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=ecce68611354024239541da33fd7583e9f4c60de"  */
              url: string;
              /** @example 640 */
              width: number;
              /** @example 597 */
              height: number;
            },
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=910817e62ee65ed88f14f4606674c07df957d6a8"  */
              url: string;
              /** @example 960 */
              width: number;
              /** @example 896 */
              height: number;
            },
            {
              /** @example "https://preview.redd.it/robzllw3n8f91.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=5922ee0a2e8e7cca15d6db72b2065d5e8371a3f3"  */
              url: string;
              /** @example 1080 */
              width: number;
              /** @example 1008 */
              height: number;
            }
          ];
          variants: Record<string, unknown>;
          /** @example "NyhphQ9_CIfDA9eRA0F6wIVV_485Z_niWpF328hx-RQ" */
          id: string;
        }
      ];
      enabled: boolean;
    };
    all_awardings: unknown[];
    awarders: unknown[];
    media_only: boolean;
    /** @example "5cd08bdc-b96f-11ea-ba92-0e9be581c781" */
    link_flair_template_id: string;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: null;
    treatment_tags: unknown[];
    visited: boolean;
    removed_by: null;
    mod_note: null;
    distinguished: null;
    /** @example "t5_2uqcm" */
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: null;
    num_reports: null;
    removal_reason: null;
    /** @example "#aabcf7" */
    link_flair_background_color: string;
    /** @example "we3ipq"  */
    id: string;
    is_robot_indexable: boolean;
    report_reasons: null;
    /** @example "Beautiful-Card7976" */
    author: string;
    discussion_type: null;
    num_comments: number;
    send_replies: boolean;
    /** @example "all_ads" */
    whitelist_status: string;
    contest_mode: boolean;
    mod_reports: unknown[];
    author_patreon_flair: boolean;
    author_flair_text_color: null;
    /** @example "/r/MadeMeSmile/comments/we3ipq/the_cute_little_girl_is_my_cousin_and_my_daughter/" */
    permalink: string;
    /** @example "all_ads" */
    parent_whitelist_status: string;
    stickied: boolean;
    /** @example "https://i.redd.it/robzllw3n8f91.jpg" */
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: null;
    is_video: boolean;
  };
}

export interface RedditApiHotResponse {
  kind: 'Listing';
  data: {
    /** @example "t3_we3ipq" */
    after: string;
    dist: number;
    modhash: string;
    geo_filter: null;
    children: RedditApiListing[];
    before: null;
  };
}
