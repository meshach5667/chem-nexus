
import React, { useState } from 'react';
import { elements } from '@/utils/elementData';
import ElementCard from './ElementCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  const handleElementClick = (elementNumber: number) => {
    setSelectedElement(elementNumber);
  };

  const handleCloseDialog = () => {
    setSelectedElement(null);
  };

  const selectedElementData = elements.find(el => el.number === selectedElement);

  // Generate a grid of elements
  // This is a simplified version - a real periodic table would have proper placement with gaps
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="w-full min-w-[900px]">
        <div className="grid grid-cols-18 gap-1">
          {/* Special handling for H and He in period 1 */}
          <div className="col-span-1">
            <ElementCard 
              element={elements[0]} 
              className="cursor-pointer"
              onClick={() => handleElementClick(elements[0].number)}
            />
          </div>
          <div className="col-span-16"></div> {/* Empty space */}
          <div className="col-span-1">
            <ElementCard 
              element={elements[1]} 
              className="cursor-pointer"
              onClick={() => handleElementClick(elements[1].number)}
            />
          </div>

          {/* Period 2 */}
          {elements.slice(2, 4).map(element => (
            <div key={element.number} className="col-span-1">
              <ElementCard 
                element={element} 
                className="cursor-pointer"
                onClick={() => handleElementClick(element.number)}
              />
            </div>
          ))}
          <div className="col-span-10"></div> {/* Empty space */}
          {elements.slice(4, 10).map(element => (
            <div key={element.number} className="col-span-1">
              <ElementCard 
                element={element} 
                className="cursor-pointer"
                onClick={() => handleElementClick(element.number)}
              />
            </div>
          ))}

          {/* Period 3 */}
          {elements.slice(10, 12).map(element => (
            <div key={element.number} className="col-span-1">
              <ElementCard 
                element={element} 
                className="cursor-pointer"
                onClick={() => handleElementClick(element.number)}
              />
            </div>
          ))}
          <div className="col-span-10"></div> {/* Empty space */}
          {elements.slice(12, 18).map(element => (
            <div key={element.number} className="col-span-1">
              <ElementCard 
                element={element} 
                className="cursor-pointer"
                onClick={() => handleElementClick(element.number)}
              />
            </div>
          ))}

          {/* Period 4 */}
          {elements.slice(18).map(element => (
            <div key={element.number} className="col-span-1">
              <ElementCard 
                element={element} 
                className="cursor-pointer"
                onClick={() => handleElementClick(element.number)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Element detail dialog */}
      <Dialog open={selectedElement !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Element Details</DialogTitle>
          </DialogHeader>
          {selectedElementData && (
            <ElementCard element={selectedElementData} expanded />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PeriodicTable;
