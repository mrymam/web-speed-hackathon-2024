// import _ from 'lodash';
import { Suspense, useId } from 'react';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard, FeatureCardSkeleton } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { RankingCard, RankingCardSkelton } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';
import { GetReleaseResponse } from '@wsh-2024/schema/src/api/releases/GetReleaseResponse';
import { GetFeatureListResponse } from '@wsh-2024/schema/src/api/features/GetFeatureListResponse';
import { GetRankingListResponse } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

const TopPageInner: React.FC = () => {

  const todayStr = getDayOfWeekStr(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });
  const { data: featureList } = useFeatureList({ query: {} });
  const { data: rankingList } = useRankingList({ query: {} });

  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    // <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
    //   <Box as="header" maxWidth="100%" width="100%">
    //     <CoverSection />
    //   </Box>
      <>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
              {featureList.map((feature) => (
                <FeatureCard key={feature.id} bookId={feature.book.id} book={feature.book} />
              ))}
            </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
            <Flex align="center" as="ul" direction="column" justify="center">
              {rankingList.map((ranking) => (
                <RankingCard key={ranking.id} bookId={ranking.book.id} book={ranking.book} />
              ))}
            </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" gap={Space * 2} justify="flex-start">
              {release.books.map((book) => (
                <BookCard key={book.id} bookId={book.id} book={book} />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
      </>
    // </Flex>
  );
};

type params = {
  featureCards: JSX.Element
  rankingCards: JSX.Element
  bookCards: JSX.Element

  pickupA11yId: string
  rankingA11yId: string
  todayA11yId: string
}

const TopPageInnerView = ({rankingCards, bookCards, featureCards, pickupA11yId, rankingA11yId, todayA11yId}: params) => {
  return <>
    <Box as="main" maxWidth="100%" width="100%">
      <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
        <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
          ピックアップ
        </Text>
        <Spacer height={Space * 2} />
        <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
          <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
            {featureCards}
          </Flex>
        </Box>
      </Box>

      <Spacer height={Space * 2} />

      <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
        <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
          ランキング
        </Text>
        <Spacer height={Space * 2} />
        <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
          <Flex align="center" as="ul" direction="column" justify="center">
            {rankingCards}
          </Flex>
        </Box>
      </Box>

      <Spacer height={Space * 2} />

      <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
        <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
          本日更新
        </Text>
        <Spacer height={Space * 2} />
        <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
          <Flex align="stretch" gap={Space * 2} justify="flex-start">
            {bookCards}
          </Flex>
        </Box>
      </Box>
    </Box>
  </>
}



const TopPageInnerWithSuspense: React.FC = () => {
  const fallback = TopPageInnerView({
    rankingCards: <>
      <RankingCardSkelton />
      <RankingCardSkelton />
      <RankingCardSkelton />
      <RankingCardSkelton />
    </>, 
    featureCards: <>
      <FeatureCardSkeleton />
      <FeatureCardSkeleton />
      <FeatureCardSkeleton />
      <FeatureCardSkeleton />
      <FeatureCardSkeleton />
    </>,
    bookCards: <></>,
    pickupA11yId: "",
    rankingA11yId: "",
    todayA11yId: "",
  })
  return (
    <Suspense fallback={fallback}>
      <TopPageInner />
    </Suspense>
  );
};



const TopPage: React.FC = () => {
  return <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
    <Box as="header" maxWidth="100%" width="100%">
      <CoverSection />
    </Box> 
    <TopPageInnerWithSuspense />
  </Flex>
}

export { TopPage };
