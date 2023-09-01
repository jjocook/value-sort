import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; // You'll need to install the 'react-beautiful-dnd' package
import './CardGrid.css';

const CardGrid = ({ data }) => {
    const [column1Items, setColumn1Items] = useState([]);
    const [column2Items, setColumn2Items] = useState([]);

    useEffect(() => {setColumn1Items(data)}, [data])
  

    const handleDragEnd = result => {
        if (!result.destination) return;
    
        const sourceColumn = result.source.droppableId;
        const destinationColumn = result.destination.droppableId;
        
        // If rearranging in same column
        if (sourceColumn === destinationColumn) {
            const reorderedItems = Array.from(destinationColumn === 'column-1' ? column1Items : column2Items);
            const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
            reorderedItems.splice(result.destination.index, 0, reorderedItem);
        
            destinationColumn === 'column-1' ? setColumn1Items(reorderedItems) : setColumn2Items(reorderedItems) 
        } else {
            // If moving item between columns
            const sourceItems = Array.from(sourceColumn === 'column-1' ? column1Items : column2Items);
            const destItems = Array.from(destinationColumn === 'column-1' ? column1Items : column2Items);
        
            const [movedItem] = sourceItems.splice(result.source.index, 1);
            destItems.splice(result.destination.index, 0, movedItem);
        
            //update source column contents
            if (sourceColumn === 'column-1') {
                setColumn1Items(sourceItems);
            } else {
                setColumn2Items(sourceItems);
            }
            //update destination column contents
            if (destinationColumn === 'column-1') {
                setColumn1Items(destItems);
            } else {
                setColumn2Items(destItems);
        }
        }
    };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
            <Droppable droppableId="column-1" direction="vertical">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                        {typeof column1Items !=="undefined" ? column1Items.map((item, index) => (
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
                                className="card"
                            >
                                <h3>{item.key}</h3>
                                <p>{item.value}</p>
                            </div>
                            )}
                        </Draggable>
                        )):""}
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
                        { column2Items.map((item, index) => (
                            <Draggable key={item.key} draggableId={item.key} index={index}>
                            {provided => (
                                <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="card"
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
            
        </div>
    </DragDropContext>
  );
};

export default CardGrid;
