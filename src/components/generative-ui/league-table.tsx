'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Standing } from '@/lib/types/football';

type TableType = 'short' | 'full' | 'form';

export default function LeagueTable({
  standings,
  season,
}: {
  standings: Standing[];
  season: number;
}) {
  const [tableType, setTableType] = useState<TableType>('short');

  function TableTypeButton({ value }: { value: TableType }) {
    const selected = tableType === value;
    return (
      <Button
        variant="outline"
        className={cn('flex-1 rounded-full py-1 capitalize', {
          'hover:bg-background dark:hover:bg-input/30 cursor-default': selected,
          'hover:bg-background border-transparent bg-transparent shadow-none dark:border-transparent dark:bg-transparent':
            !selected,
        })}
        onClick={() => setTableType(value)}
        {...{ value }}
      >
        {value}
      </Button>
    );
  }

  const getBorderColor = (rank: number) => {
    // Champions League positions (top 4)
    if (rank <= 4) return 'border-l-green-600';
    // Europa League position (5th)
    if (rank === 5) return 'border-l-amber-500';
    // Conference League position (6th)
    if (rank === 6) return 'border-l-sky-600';
    // Relegation positions (bottom 3)
    if (rank >= 18) return 'border-l-red-600';
    // Everyone else
    return 'border-l-transparent';
  };

  const renderFormIndicator = (form: string) => {
    if (!form) return null;

    return (
      <div className="flex gap-1">
        {form.split('').map((result, index) => {
          return (
            <span
              key={index}
              className={cn(
                'flex size-6 items-center justify-center rounded-full text-sm font-bold',
                { 'bg-green-700 text-green-50': result === 'W' },
                { 'bg-red-600/80 text-white': result === 'L' },
                {
                  'bg-yellow-400 text-yellow-900 dark:text-yellow-950':
                    result === 'D',
                },
              )}
            >
              {result}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="ai-card animate-pop @container relative mr-7 origin-bottom-left gap-4 border-none p-4 shadow-none">
      <CardHeader className="grid gap-4">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Premier League Table</CardTitle>
          <CardDescription>
            <p>{season}</p>
          </CardDescription>
        </div>
        <div className="bg-muted flex gap-2 rounded-full border p-1 dark:border-neutral-600">
          <TableTypeButton value="short" />
          <TableTypeButton value="full" />
          <TableTypeButton value="form" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <Table className="text-xs min-[350px]:text-sm sm:text-base">
          <TableCaption className="pb-1 text-left max-[350px]:text-xs">
            <p className="flex items-center gap-2">
              <span className="block size-1.5 rounded-full bg-green-600" />
              Champions League
            </p>
            <p className="flex items-center gap-2">
              <span className="block size-1.5 rounded-full bg-amber-500" />
              Europa League
            </p>
            <p className="flex items-center gap-2">
              <span className="block size-1.5 rounded-full bg-sky-600" />
              Conference League
            </p>
            <p className="flex items-center gap-2">
              <span className="block size-1.5 rounded-full bg-red-600" />
              Relegation
            </p>
          </TableCaption>
          <TableHeader>
            <TableRow className="border-l-2 border-l-transparent hover:bg-transparent">
              <TableHead className="pl-1">#</TableHead>
              <TableHead className="bg-card sticky -left-px transition">
                Team
                <span className="sr-only">logo</span>
              </TableHead>
              <TableHead>
                <span className="sr-only">Team name</span>
              </TableHead>
              {tableType === 'full' && (
                <>
                  <TableHead className="text-center">W</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">L</TableHead>
                  <TableHead className="text-center">+ / –</TableHead>
                </>
              )}
              {tableType === 'form' ? (
                <TableHead className="pl-4">Form</TableHead>
              ) : (
                <>
                  <TableHead className="text-center">PL</TableHead>
                  <TableHead className="text-center">GD</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((row) => (
              <TableRow
                key={row.team.id}
                className={cn('group border-l-2', getBorderColor(row.rank))}
              >
                <TableCell className="pr-0 pl-2 font-medium">
                  {row.rank}
                </TableCell>
                <TableCell className="bg-card sticky -left-px flex justify-center transition group-hover:bg-transparent">
                  <div className="relative size-6">
                    <Image
                      src={
                        row.team.logo || '/placeholder.svg?height=24&width=24'
                      }
                      alt={row.team.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell className="w-full">{row.team.name}</TableCell>
                {tableType === 'full' && (
                  <>
                    <TableCell className="text-center">{row.all.win}</TableCell>
                    <TableCell className="text-center">
                      {row.all.draw}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.all.lose}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.all.goals.for}-{row.all.goals.against}
                    </TableCell>
                  </>
                )}
                {tableType === 'form' ? (
                  <TableCell className="pl-3 text-center max-[412px]:pr-2">
                    {renderFormIndicator(row.form)}
                  </TableCell>
                ) : (
                  <>
                    <TableCell className="text-center">
                      {row.all.played}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      <span
                        className={
                          row.goalsDiff > 0
                            ? 'text-green-700 dark:text-green-400'
                            : row.goalsDiff < 0
                              ? 'text-red-700 dark:text-red-400'
                              : ''
                        }
                      >
                        {row.goalsDiff > 0
                          ? `+${row.goalsDiff}`
                          : row.goalsDiff}
                      </span>
                    </TableCell>
                    <TableCell
                      className={cn('text-center font-bold', {
                        '@max-[249px]:pr-2': tableType === 'short',
                        '@max-[410px]:pr-2': tableType === 'full',
                      })}
                    >
                      {row.points}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          className={cn(
            'to-card absolute top-0 -right-3 hidden h-full w-8 rounded-md bg-linear-to-r from-transparent',
            {
              '@max-[249px]:block': tableType === 'short',
              '@max-[346px]:block': tableType === 'form',
              '@max-[410px]:block': tableType === 'full',
            },
          )}
        />
      </CardContent>
    </Card>
  );
}
