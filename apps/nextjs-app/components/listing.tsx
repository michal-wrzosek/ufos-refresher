import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RedditApiListing } from '../types/common';
import { useEffect } from 'react';
import { mediaTablet } from '../styles/media-queries';

dayjs.extend(relativeTime);

const Comments = styled.div`
  padding: 0 8px;
  font-size: 12px;
`;
const Author = styled.div`
  padding: 0 8px;
  font-size: 12px;

  > span {
    display: none;

    ${mediaTablet} {
      display: inline-block;
      padding-right: 4px;
    }
  }
`;
const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaTablet} {
    flex-direction: row;
    gap: 16px;
  }
`;
const Content = styled.div`
  font-size: 14px;
  padding: 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${mediaTablet} {
    -webkit-line-clamp: 2;
  }
`;
const Header = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${mediaTablet} {
    -webkit-line-clamp: 2;
  }
`;
const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;

  ${mediaTablet} {
    background-size: cover;
  }
`;

const DownVotes = styled.div``;
const UpVotes = styled.div``;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;
const ThumbnailSection = styled.div`
  width: 64px;
  height: 128px;
  flex-shrink: 0;
  border-right: 1px solid black;

  ${mediaTablet} {
    width: 128px;
  }
`;
const VotesSection = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  padding: 0 4px;
  border-right: 1px solid black;
  width: 64px;
  font-size: 12px;
`;

const Wrapper = styled.a<{ $isSeenLastTime: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  border: 1px solid black;
  opacity: ${({ $isSeenLastTime }) => ($isSeenLastTime ? '0.6' : '')};

  :hover {
    border-color: red;
    opacity: 1;
  }
`;

const arrowUp = `↑`;
const arrowDown = '↓';

export interface ListingProps {
  listing: RedditApiListing;
  isSeen: boolean;
  isSeenLastTime: boolean;
  onSee: (id: string) => void;
}

export const Listing = ({
  listing,
  isSeen,
  isSeenLastTime,
  onSee,
}: ListingProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (isSeen) return;
    if (!inView) return;

    onSee(listing.data.id);
  }, [inView, isSeen, listing.data.id, onSee]);

  let downvotes = Math.round(
    (listing.data.score * (listing.data.upvote_ratio - 1)) /
      (1 - 2 * listing.data.upvote_ratio)
  );

  if (Number.isNaN(downvotes)) {
    downvotes = 0;
  }

  const upvotes = listing.data.score + downvotes;
  return (
    <Wrapper
      ref={ref}
      $isSeenLastTime={isSeenLastTime}
      href={`https://reddit.com${listing.data.permalink}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VotesSection>
        <UpVotes>
          {arrowUp} {upvotes}
        </UpVotes>
        <DownVotes>
          {arrowDown} {downvotes}
        </DownVotes>
      </VotesSection>

      <ThumbnailSection>
        <Thumbnail
          style={{
            backgroundImage: listing.data.thumbnail
              ? `url(${listing.data.thumbnail})`
              : '',
          }}
        />
      </ThumbnailSection>

      <ContentSection>
        <Header>{listing.data.title}</Header>
        <Content>{listing.data.selftext}</Content>
        <Footer>
          <Author>
            <span>Posted by</span>u/{listing.data.author}{' '}
            {dayjs().to(dayjs(listing.data.created * 1000))}
          </Author>
          <Comments>{listing.data.num_comments} Comments</Comments>
        </Footer>
      </ContentSection>
    </Wrapper>
  );
};
