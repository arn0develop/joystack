import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = list
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 16,
  borderRadius: 10,
  background: isDragging ? 'lightgreen' : 'inherit',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#f5f6f8' : 'inherit',
  padding: 8,
})

interface State {
  draggableItems: any[]
}

interface Properties {
  draggableItems: any[]
  renderItem: (Object: any) => React.ReactNode
}

export default class DragAndDrop extends Component<Properties, State> {
  constructor(properties: any) {
    super(properties)
    this.state = {
      draggableItems: this.props.draggableItems,
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    const draggableItems = reorder(
      this.state.draggableItems,
      result.source.index,
      result.destination.index
    )

    this.setState({
      draggableItems,
    })
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.draggableItems.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {this.props.renderItem({ ...item })}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
