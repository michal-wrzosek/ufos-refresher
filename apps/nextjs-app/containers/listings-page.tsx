import { useCallback, useEffect, useMemo, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { RedditApiListing } from '../types/common';
import { Listing } from '../components/listing';
import styled from 'styled-components';
import Link from 'next/link';

const useDeprecatedIsConfigured =
  createPersistedState<boolean>('is-configured');
const useDeprecatedIdsSeen = createPersistedState<string[]>('ids-seen');

const useUfosIsConfigured = createPersistedState<boolean>('ufos:is-configured');
const useUfosIdsSeen = createPersistedState<string[]>('ufos:ids-seen');

const useAliensIsConfigured = createPersistedState<boolean>(
  'aliens:is-configured'
);
const useAliensIdsSeen = createPersistedState<string[]>('aliens:ids-seen');

const Navigation = styled.div`
  display: flex;
  gap: 16px;
  text-decoration: underline;

  > a {
    &.active {
      font-weight: bold;
    }

    :hover {
      color: grey;
    }
  }
`;

const Error = styled.div`
  font-size: 16px;
  font-style: italic;
  color: red;
`;

const Loading = styled.div`
  font-size: 16px;
  font-style: italic;
`;

const NothingToSee = styled.div`
  font-size: 16px;
  font-style: italic;
`;

const RepoLink = styled.a`
  font-size: 12px;
  text-decoration: underline;
`;

const PageTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

interface ListingsPageProps {
  subreddit: 'ufos' | 'aliens';
}

export const ListingsPage = ({ subreddit }: ListingsPageProps) => {
  /** renaming the local storege to ufos specific because we're adding aliens now as well */
  const [deprecatedIsConfigured] = useDeprecatedIsConfigured(false);
  const [deprecatedIdsSeen] = useDeprecatedIdsSeen([]);

  const [ufosIsConfigured, setUfosIsConfigured] = useUfosIsConfigured(
    deprecatedIsConfigured
  );
  const [ufosIdsSeen, setUfosIdsSeen] = useUfosIdsSeen(deprecatedIdsSeen);

  const [aliensIsConfigured, setAliensIsConfigured] =
    useAliensIsConfigured(false);
  const [aliensIdsSeen, setAliensIdsSeen] = useAliensIdsSeen([]);

  const isConfigured =
    subreddit === 'ufos' ? ufosIsConfigured : aliensIsConfigured;
  const setIsConfigured =
    subreddit === 'ufos' ? setUfosIsConfigured : setAliensIsConfigured;
  const idsSeen = subreddit === 'ufos' ? ufosIdsSeen : aliensIdsSeen;
  const setIdsSeen = subreddit === 'ufos' ? setUfosIdsSeen : setAliensIdsSeen;

  const [idsSeenLastTime, setIdsSeenLastTime] = useState(idsSeen);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<RedditApiListing[]>([]);

  const listingsSorted = useMemo(
    () => listings.sort((a, b) => b.data.created - a.data.created),
    [listings]
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/listings/${subreddit}`, {
          method: 'GET',
        });
        const data: { listings: RedditApiListing[] } = await response.json();
        setListings(data.listings);

        if (!isConfigured) {
          const ids = data.listings.map((listing) => listing.data.id);
          setIdsSeen(ids);
          setIdsSeenLastTime(ids);
          setIsConfigured(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { listingsNotSeenLastTime, listingsSeenLastTime } = useMemo(
    () =>
      listingsSorted.reduce<{
        listingsNotSeenLastTime: RedditApiListing[];
        listingsSeenLastTime: RedditApiListing[];
      }>(
        (sum, listing) => {
          if (idsSeenLastTime.includes(listing.data.id))
            return {
              ...sum,
              listingsSeenLastTime: [...sum.listingsSeenLastTime, listing],
            };
          return {
            ...sum,
            listingsNotSeenLastTime: [...sum.listingsNotSeenLastTime, listing],
          };
        },
        { listingsNotSeenLastTime: [], listingsSeenLastTime: [] }
      ),
    [idsSeenLastTime, listingsSorted]
  );

  const listingsNotSeenLastTimeProps = useMemo(
    () =>
      listingsNotSeenLastTime.map((listing) => ({
        listing,
        isSeen: idsSeen.includes(listing.data.id),
      })),
    [idsSeen, listingsNotSeenLastTime]
  );

  const handleSee = useCallback(
    (id: string) => {
      setIdsSeen((previous) => [...new Set([...previous, id])]);
    },
    [setIdsSeen]
  );

  return (
    <Wrapper>
      <Header>
        <PageTitle>
          r/{subreddit === 'ufos' ? 'UFOs' : 'aliens'} refresher
        </PageTitle>
        <RepoLink
          href="https://github.com/michal-wrzosek/ufos-refresher"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sourcecode: https://github.com/michal-wrzosek/ufos-refresher
        </RepoLink>
      </Header>
      <Navigation>
        <a href={'/ufos'} className={subreddit === 'ufos' ? 'active' : ''}>
          r/UFOs
        </a>
        <a href={'/aliens'} className={subreddit === 'aliens' ? 'active' : ''}>
          r/aliens
        </a>
      </Navigation>
      {loading ? <Loading>Loading...</Loading> : null}
      {error ? <Error>Error! Something went wrong.</Error> : null}
      {!error && !loading ? (
        <>
          <ListTitle>Not seen yet:</ListTitle>
          {listingsNotSeenLastTimeProps.map(({ listing, isSeen }) => (
            <Listing
              key={listing.data.id}
              listing={listing}
              isSeen={isSeen}
              isSeenLastTime={false}
              onSee={handleSee}
            />
          ))}
          {listingsNotSeenLastTimeProps.length === 0 ? (
            <NothingToSee>Nothing new for now. Come back later...</NothingToSee>
          ) : null}
          <ListTitle>Seen last time:</ListTitle>
          {listingsSeenLastTime.map((listing) => (
            <Listing
              key={listing.data.id}
              listing={listing}
              isSeen={true}
              isSeenLastTime={true}
              onSee={handleSee}
            />
          ))}
        </>
      ) : null}
    </Wrapper>
  );
};
