import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RedditApiListing } from '../types/common';
import { mediaTablet } from '../styles/media-queries';

dayjs.extend(relativeTime);

const Seen = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 8px;
  display: flex;
  align-items: center;

  span {
    display: none;

    ${mediaTablet} {
      display: inline-block;
      font-size: 12px;
      margin-right: 4px;
    }
  }
`;
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
  line-height: 16px;
  -webkit-line-clamp: 5;
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
  line-height: 18px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${mediaTablet} {
    -webkit-line-clamp: 2;
  }
`;
const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.borderColor};
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
  gap: 8px;
`;
const ThumbnailSection = styled.div`
  width: 128px;
  height: 128px;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.borderColor};

  ${mediaTablet} {
    width: 128px;
    height: 128px;
  }
`;
const VotesSection = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  padding: 0 4px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  width: 128px;
  font-size: 12px;
  flex-grow: 1;

  ${mediaTablet} {
    width: 64px;
  }
`;
const VotesAndThumbnail = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mediaTablet} {
    flex-direction: row;
  }
`;

const Wrapper = styled.a<{ $isSeenLastTime: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(128px + 4 * 16px + 4 * 18px);
  border: 1px solid ${({ theme }) => theme.borderColor};
  opacity: ${({ $isSeenLastTime }) => ($isSeenLastTime ? '0.6' : '')};

  :hover {
    border-color: red;
    opacity: 1;
  }

  ${mediaTablet} {
    height: unset;
  }
`;

const arrowUp = `↑`;
const arrowDown = '↓';

export interface ListingProps {
  listing: RedditApiListing;
  isSeen: boolean;
  isSeenLastTime: boolean;
  isUsingOldReddit: boolean;
  onSee: (id: string) => void;
}

export const Listing = ({
  listing,
  isSeen,
  isSeenLastTime,
  isUsingOldReddit,
  onSee,
}: ListingProps) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '0% 0% -50% 0%',
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
      href={`https://${isUsingOldReddit ? 'old.' : ''}reddit.com${
        listing.data.permalink
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VotesAndThumbnail>
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
              backgroundImage: listing.data.thumbnail.startsWith('http')
                ? `url(${listing.data.thumbnail})`
                : '',
            }}
          />
        </ThumbnailSection>
      </VotesAndThumbnail>

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
      {isSeen ? (
        <Seen>
          <span>Marked as seen</span>
          <AiOutlineEye />
        </Seen>
      ) : null}
    </Wrapper>
  );
};
