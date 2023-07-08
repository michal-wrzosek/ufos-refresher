import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';
import {
  HotLocation,
  RedditApiAccessTokenResponse,
  RedditApiHotResponse,
  RedditApiListing,
  SortTime,
} from '../../../types/common';

const configSchema = z.object({
  REDDIT_APP_ID: z.string(),
  REDDIT_APP_SECRET: z.string(),
});

async function getAccessToken(appId: string, appSecret: string) {
  const response = await axios.post<RedditApiAccessTokenResponse>(
    'https://www.reddit.com/api/v1/access_token',
    new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
    {
      auth: {
        username: appId,
        password: appSecret,
      },
    }
  );

  return response.data.access_token;
}

interface FetchListingsBaseProps {
  accessToken: string;
  limit?: number;
  /** @example "t3_2hus8s" */
  after?: string;
  /** @example "popular" */
  subreddit: string;
}

interface FetchListingsNewRisingProps extends FetchListingsBaseProps {
  kind: 'new' | 'rising';
}

interface FetchListingsHotProps extends FetchListingsBaseProps {
  kind: 'hot';
  hotLocation: HotLocation;
}

interface FetchListingsSortingProps extends FetchListingsBaseProps {
  kind: 'top' | 'controversial';
  sortTime: SortTime;
}

type FetchListingsProps =
  | FetchListingsNewRisingProps
  | FetchListingsHotProps
  | FetchListingsSortingProps;

async function fetchListings(props: FetchListingsProps) {
  const response = await axios.get<RedditApiHotResponse>(
    `https://oauth.reddit.com/r/${props.subreddit}/${
      props.kind
    }.json?${new URLSearchParams({
      /** JSON without altered strings. Look for "response body encoding" in https://www.reddit.com/dev/api/ */
      raw_json: '1',
      ...(typeof props.limit !== 'undefined'
        ? { limit: String(props.limit) }
        : {}),
      ...(typeof props.after !== 'undefined' ? { after: props.after } : {}),
      ...(props.kind === 'hot' && typeof props.hotLocation !== 'undefined'
        ? { g: props.hotLocation }
        : {}),
      ...((props.kind === 'top' || props.kind === 'controversial') &&
      typeof props.sortTime !== 'undefined'
        ? { t: props.sortTime }
        : {}),
    })}`,
    {
      headers: { Authorization: `Bearer ${props.accessToken}` },
    }
  );

  return response.data;
}

function getListOfUniqueListings(listings: RedditApiListing[]) {
  return Object.values(
    listings.reduce<Record<string, RedditApiListing>>(
      (sum, listing) => ({ ...sum, [listing.data.id]: listing }),
      {}
    )
  );
}

let listings: RedditApiListing[] = [];
/** 5 minutes */
const queryInterval = 5 * 60 * 1000;
let lastQueryTimestamp = 0;

export async function GET() {
  try {
    if (lastQueryTimestamp + queryInterval > +new Date()) {
      return NextResponse.json({ listings });
    }

    const config = configSchema.parse({
      REDDIT_APP_ID: process.env.REDDIT_APP_ID,
      REDDIT_APP_SECRET: process.env.REDDIT_APP_SECRET,
    });

    const accessToken = await getAccessToken(
      config.REDDIT_APP_ID,
      config.REDDIT_APP_SECRET
    );

    const listingsResponse1 = await fetchListings({
      accessToken,
      subreddit: 'UFOs',
      kind: 'hot',
      hotLocation: 'GLOBAL',
      limit: 100,
    });

    listings = getListOfUniqueListings([...listingsResponse1.data.children]);

    lastQueryTimestamp = +new Date();

    return NextResponse.json({ listings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
