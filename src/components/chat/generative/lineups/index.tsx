import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lineup } from '@/lib/types/football';
import Image from 'next/image';
import LineupFormation from './formation';
import LineupList from './list';
import { cn } from '@/lib/utils';

export default function LineupDisplay({ lineups }: { lineups: Lineup[] }) {
  if (!lineups || lineups.length === 0) {
    return <div className="p-4 text-center">No lineup data available</div>;
  }

  // TODO re-style as opposing teams on a pitch

  return (
    <Card className="ai-card animate-pop @container relative mr-7 origin-bottom-left gap-4 border-none p-0 shadow-none">
      <Tabs defaultValue="formation" className="w-full">
        <TabsList className="h-auto w-full p-4 pb-0">
          <TabsTrigger value="formation">Formation</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="formation" className="grid gap-2">
          {lineups.map((lineup, index) => {
            const isHomeTeam = index === 0;
            return (
              <Card
                key={lineup.team.id}
                className={cn(
                  'w-full gap-2 overflow-hidden border-0 bg-transparent p-1 shadow-none',
                  {
                    'flex-col-reverse': !isHomeTeam,
                  },
                )}
              >
                <CardHeader
                  className={cn('p-2', {
                    'border-b': isHomeTeam,
                  })}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12">
                      <Image
                        src={lineup.team.logo || '/placeholder.svg'}
                        alt={lineup.team.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-wrap gap-x-3">
                      <CardTitle className="grid flex-1 gap-1">
                        <p>{lineup.team.name}</p>
                        <p className="text-muted-foreground w-max text-sm font-normal">
                          {lineup.coach.name}
                        </p>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {lineup.formation}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="border-b pb-9">
                  <LineupFormation {...{ lineup, isHomeTeam }} />
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="list" className="flex flex-wrap gap-4 p-2">
          {lineups.map((lineup) => (
            <Card key={`list-${lineup.team.id}`} className="flex-1 shrink-0">
              <CardHeader className="bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={lineup.team.logo || '/placeholder.svg'}
                      alt={lineup.team.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{lineup.team.name}</CardTitle>
                    <CardDescription className="w-max">
                      {lineup.coach.name}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="w-max">
                <LineupList lineup={lineup} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
