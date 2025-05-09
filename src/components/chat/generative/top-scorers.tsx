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
  const [stat] = statistics;
  const fallback = 'N/A';

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-2 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
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
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="">
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {player.name ?? 'Unknown Player'}
            </h2>
            <p className="max-w-40 text-xs text-gray-600 sm:max-w-max sm:text-sm">
              {player.firstname} {player.lastname}
            </p>
            <p className="text-sm text-gray-600 sm:text-base">
              {player.nationality ?? fallback} &bull; Age:{' '}
              {player.age ?? fallback}
            </p>
            <p className="text-sm text-gray-500 sm:text-base">
              {player.height ?? fallback} &bull; {player.weight ?? fallback}
            </p>
            <p className="text-sm text-gray-500 sm:text-base">
              {stat.games?.position ?? 'Footballer'}
            </p>
          </div>
        </div>
        <p className="ml-auto grid size-9 shrink-0 place-content-center self-start rounded-full bg-neutral-400 text-lg font-bold text-white">
          {rank}
        </p>
      </div>

      {stat ? (
        <div className="text-sm text-gray-700">
          <div className="flex">
            <Badge className="mb-2 gap-2 text-sm">
              {stat.team.logo && (
                <Image
                  src={stat.team.logo}
                  alt={stat.team.name}
                  width={24}
                  height={24}
                  className="h-6 w-auto"
                />
              )}
              <span className="font-medium">{stat.team.name ?? fallback}</span>
            </Badge>
          </div>

          <div className="grid gap-x-4 gap-y-2 min-[450px]:grid-cols-2">
            <Stat label="Appearances" value={stat.games?.appearences} />
            <Stat label="Starts" value={stat.games?.lineups} />
            <Stat label="Minutes" value={stat.games?.minutes} />
            <Stat
              label="Rating"
              value={Number(stat.games?.rating).toFixed(2)}
            />
          </div>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="more-stats">
              <AccordionTrigger className="text-sm text-blue-600 hover:underline">
                View More Stats
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <StatsGroup title="Attacking">
                    <Stat label="Goals" value={stat.goals?.total} />
                    <Stat label="Assists" value={stat.goals?.assists} />
                    <Stat label="Shots" value={stat.shots?.total} />
                    <Stat label="Shots on target" value={stat.shots?.on} />
                  </StatsGroup>

                  <StatsGroup title="Passing">
                    <Stat label="Total Passes" value={stat.passes?.total} />
                    <Stat label="Key Passes" value={stat.passes?.key} />
                    <Stat label="Accuracy" value={stat.passes?.accuracy} />
                  </StatsGroup>

                  <StatsGroup title="Defensive">
                    <Stat label="Tackles" value={stat.tackles?.total} />
                    <Stat label="Blocks" value={stat.tackles?.blocks} />
                    <Stat
                      label="Interceptions"
                      value={stat.tackles?.interceptions}
                    />
                    <Stat label="Duels Won" value={stat.duels?.won} />
                  </StatsGroup>

                  <StatsGroup title="Discipline">
                    <Stat label="Fouls Drawn" value={stat.fouls?.drawn} />
                    <Stat
                      label="Fouls Committed"
                      value={stat.fouls?.committed}
                    />
                    <Stat label="Yellow Cards" value={stat.cards?.yellow} />
                    <Stat label="Red Cards" value={stat.cards?.red} />
                  </StatsGroup>

                  <StatsGroup title="Penalties">
                    <Stat label="Scored" value={stat.penalty?.scored} />
                    <Stat label="Missed" value={stat.penalty?.missed} />
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
    </div>
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
    <div className="flex justify-between gap-2 text-sm text-gray-800">
      <span className="font-medium">{label}:</span>
      <span className="text-gray-600">{value ?? fallback}</span>
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
      <h3 className="mb-2 border-b border-gray-200 pb-1 text-sm font-semibold text-gray-700">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-2 min-[450px]:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export default TopScorers;
