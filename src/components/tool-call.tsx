import { ChevronsUpDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Button } from './ui/button';
import { ToolInvocationUIPart } from '@ai-sdk/ui-utils';

export default function CollapsibleToolCall({
  part,
}: {
  part: ToolInvocationUIPart;
}) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-3">
          <p>Show Tool Call</p>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <pre className="border-input rounded-xl border p-2 break-all whitespace-break-spaces shadow-md">
          {JSON.stringify(part.toolInvocation, null, 2)}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}
