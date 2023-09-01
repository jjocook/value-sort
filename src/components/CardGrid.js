import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; // You'll need to install the 'react-beautiful-dnd' package
import './CardGrid.css';

const CardGrid = ({ data }) => {
  const [items, setItems] = useState(data);

  const handleDragEnd = result => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
            <Droppable droppableId="column-1" direction="vertical">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className = "card-container">
                        {items.map((item, index) => (
                        <Draggable
                        key={item.key}
                        draggableId={item.key.toString()}
                        index={index}
                    >
                        {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="column"
                        >
                            <h3>{item.key}</h3>
                            <p>{item.value}</p>
                        </div>
                        )}
                    </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            
            
            <Droppable droppableId="column-2" direction="vertical">
                    {provided => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="column"
                        >
                        {/* Cards dropped here will be in the second column */}
                        {provided.placeholder}
                        </div>
                    )}
            </Droppable>
            
        </div>
    </DragDropContext>
  );
};

export default CardGrid;
