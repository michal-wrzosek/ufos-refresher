import { NextRequest, NextResponse } from 'next/server';
import { RedditApiListing } from '../../../../types/common';
import {
  configSchema,
  fetchListings,
  getAccessToken,
  getListOfUniqueListings,
} from '../../../../server-utils/reddit';
import { z } from 'zod';

const subredditSchema = z.union([z.literal('ufos'), z.literal('aliens')]);

const listings = {
  aliens: [] as RedditApiListing[],
  ufos: [] as RedditApiListing[],
};
/** 5 minutes */
const queryInterval = 5 * 60 * 1000;

const lastQueryTimestamp = {
  aliens: 0,
  ufos: 0,
};

export async function GET(
  _request: NextRequest,
  { params: { subreddit } }: { params: { subreddit: string } }
) {
  try {
    const parsedSubreddit = subredditSchema.parse(subreddit);

    if (lastQueryTimestamp[parsedSubreddit] + queryInterval > +new Date()) {
      return NextResponse.json({ listings: listings[parsedSubreddit] });
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
      subreddit: parsedSubreddit === 'ufos' ? 'UFOs' : 'aliens',
      kind: 'hot',
      hotLocation: 'GLOBAL',
      limit: 30,
    });

    listings[parsedSubreddit] = getListOfUniqueListings([
      ...listingsResponse1.data.children,
    ]);

    lastQueryTimestamp[parsedSubreddit] = +new Date();

    return NextResponse.json({ listings: listings[parsedSubreddit] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
