'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { PlayerStatsResponse } from '@/lib/types/football';
import { Badge } from '@/components/ui/badge';

const TopScorers = memo(function TopScorers({
  topScorers,
  season,
  premLogoSrc,
}: {
  topScorers: PlayerStatsResponse[];
  season: number;
  premLogoSrc: string;
}) {
  // TODO: limit to top 3 with accordion to display rest.
  return (
    <Card className="ai-card animate-pop @container relative mr-7 origin-bottom-left gap-4 border-none p-4 shadow-none">
      <CardHeader className="grid gap-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <div className="relative size-7 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-white shadow-md">
              <Image
                src={premLogoSrc}
                alt="Premier League Logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span className="text-lg leading-none text-balance">
              Premier League Top Scorers
            </span>
          </CardTitle>
          <CardDescription className="text-card-foreground sm:text-base">
            <p>{season}</p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        {topScorers.map(({ player, statistics }, index) => (
          <PlayerCard
            key={player.id}
            rank={index + 1}
            {...{ player, statistics }}
          />
        ))}
      </CardContent>
    </Card>
  );
});

type PlayerCardProps = PlayerStatsResponse & {
  rank: number;
};

function PlayerCard({ player, statistics, rank }: PlayerCardProps) {
  const [stats] = statistics;
  const fallback = 'N/A';

  return (
    <Card className="bg-primary-foreground mx-auto flex w-full max-w-lg flex-col gap-2 rounded-2xl p-4 text-neutral-600 shadow-lg sm:p-6 dark:text-neutral-300">
      <div className="flex gap-4 sm:items-center">
        <div className="flex flex-wrap gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 sm:h-28 sm:w-28">
            {player.photo ? (
              <Image
                src={player.photo}
                alt={player.name}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-neutral-500">
                No Image
              </div>
            )}
          </div>
          <div className="">
            <h2 className="text-card-foreground text-xl font-bold sm:text-2xl">
              {player.name ?? 'Unknown Player'}
            </h2>
            <p className="max-w-40 text-xs sm:max-w-max sm:text-sm">
              {player.firstname} {player.lastname}
            </p>
            <p className="text-sm sm:text-base">
              {player.nationality ?? fallback} &bull; Age:{' '}
              {player.age ?? fallback}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              {player.height ?? fallback} &bull; {player.weight ?? fallback}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              {stats.games?.position ?? 'Footballer'}
            </p>
          </div>
        </div>
        <p className="ml-auto grid size-9 shrink-0 place-content-center self-start rounded-full border text-lg font-semibold text-neutral-500 dark:text-neutral-400">
          {rank}
        </p>
      </div>

      {stats ? (
        <div className="text-sm">
          <div className="mb-2 flex items-center gap-2">
            {stats.team.logo && (
              <Image
                src={stats.team.logo}
                alt={stats.team.name}
                width={24}
                height={24}
                className="h-6 w-auto"
              />
            )}
            <Badge
              className="bg-neutral-200 text-sm font-medium dark:bg-neutral-700"
              variant="secondary"
            >
              {stats.team.name ?? fallback}
            </Badge>
          </div>

          <div className="grid gap-x-4 gap-y-2 min-[450px]:grid-cols-2">
            <Stat label="Appearances" value={stats.games?.appearences} />
            <Stat label="Starts" value={stats.games?.lineups} />
            <Stat label="Minutes" value={stats.games?.minutes} />
            <Stat
              label="Rating"
              value={Number(stats.games?.rating).toFixed(2)}
            />
          </div>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="more-stats">
              <AccordionTrigger className="max-w-max gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400">
                View More Stats
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-8 rounded-lg border bg-white p-4 dark:bg-neutral-950">
                  <StatsGroup title="Attacking">
                    <Stat label="Goals" value={stats.goals?.total} />
                    <Stat label="Assists" value={stats.goals?.assists} />
                    <Stat label="Shots" value={stats.shots?.total} />
                    <Stat label="Shots on target" value={stats.shots?.on} />
                  </StatsGroup>

                  <StatsGroup title="Passing">
                    <Stat label="Total Passes" value={stats.passes?.total} />
                    <Stat label="Key Passes" value={stats.passes?.key} />
                    <Stat label="Accuracy" value={stats.passes?.accuracy} />
                  </StatsGroup>

                  <StatsGroup title="Defensive">
                    <Stat label="Tackles" value={stats.tackles?.total} />
                    <Stat label="Blocks" value={stats.tackles?.blocks} />
                    <Stat
                      label="Interceptions"
                      value={stats.tackles?.interceptions}
                    />
                    <Stat label="Duels Won" value={stats.duels?.won} />
                  </StatsGroup>

                  <StatsGroup title="Discipline">
                    <Stat label="Fouls Drawn" value={stats.fouls?.drawn} />
                    <Stat
                      label="Fouls Committed"
                      value={stats.fouls?.committed}
                    />
                    <Stat label="Yellow Cards" value={stats.cards?.yellow} />
                    <Stat label="Red Cards" value={stats.cards?.red} />
                  </StatsGroup>

                  <StatsGroup title="Penalties">
                    <Stat label="Scored" value={stats.penalty?.scored} />
                    <Stat label="Missed" value={stats.penalty?.missed} />
                  </StatsGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="mt-4 text-center text-sm text-gray-500 italic">
          No statistics available for this player.
        </div>
      )}
    </Card>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  const fallback = 'N/A';
  return (
    <div className="flex justify-between gap-2 text-sm">
      <span className="text-card-foreground font-medium">{label}:</span>
      <span className="">{value ?? fallback}</span>
    </div>
  );
}

function StatsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-muted-foreground mb-2 border-b text-base font-semibold">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-2 min-[450px]:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export default TopScorers;
