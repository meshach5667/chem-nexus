
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Element, getCategoryColorClass } from '@/utils/elementData';

interface ElementCardProps {
  element: Element;
  className?: string;
  expanded?: boolean;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, className, expanded = false }) => {
  const categoryColor = getCategoryColorClass(element.category);
  
  if (!expanded) {
    // Compact version for periodic table
    return (
      <div 
        className={cn(
          "element border-2 hover:scale-105",
          categoryColor,
          className
        )}
      >
        <div className="element-number">{element.number}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-weight">{element.atomic_mass.toFixed(2)}</div>
      </div>
    );
  }

  // Expanded version for detailed view
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("py-3", categoryColor)}>
        <div className="flex justify-between items-start">
          <span className="text-2xl font-bold">{element.symbol}</span>
          <span className="text-sm opacity-80">#{element.number}</span>
        </div>
        <h3 className="text-lg font-semibold">{element.name}</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Atomic Mass</span>
            <span className="font-medium">{element.atomic_mass.toFixed(4)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium capitalize">{element.category.replace('-', ' ')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Group</span>
            <span className="font-medium">{element.group || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Period</span>
            <span className="font-medium">{element.period}</span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-muted-foreground">Electron Configuration</span>
            <span className="font-medium">{element.electron_configuration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElementCard;
