import React, { Fragment, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import hash from '../../lib/hash';
import { getFileName } from '../../lib/parsers';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { theme } from '../../theme/theme';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Item({ data, index, onDelete }) {
  const { id, path } = data;

  const _onClickDelete = () => {
    onDelete(index);
  }

  return(
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={_getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListItemIcon>
            <DragHandleIcon />
          </ListItemIcon>
          <ListItemText
            primary={getFileName(path)}
            secondary={path}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={_onClickDelete}>
            <HighlightOffIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      )}
    </Draggable>
  );
}

Item.propTypes = {
  data: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  onDelete: propTypes.func,
}

Item.defaultProps = {
  onDelete: () => {},
}

function Skeletons() {
  return(
    <Box pt={.5}>
      {[0, 1, 2, 3].map(i => <Skeleton key={i} height={65} />)}
    </Box>
  );
}

const _getItemsFromPaths = paths => (
  paths.map(path => ({
    id: hash(path) + '',
    path,
  }))
);

/*
const _getPathsFromItems = items => (
  items.map(item => item.path)
);
*/

const _reorder = (list, start, end) => {
  const _return = Array.from(list);
  const [removed] = _return.splice(start, 1);
  _return.splice(end, 0, removed);
  return _return;
};

const _getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  ...(isDragging && { background: 'rgb(245,245,245)' }),
});

const _getListStyle = isDraggingOver => ({
  background: isDraggingOver ?
    theme.colors.list.background.drag
    :
    theme.colors.list.background.main,
});

function ListFiles({ paths, onChange }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(_getItemsFromPaths(paths));
  }, [paths]);

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const _paths = _reorder(
      paths,
      result.source.index,
      result.destination.index
    )

    onChange(_paths);
  };

  const handleDelete = index => {
    const _paths = [...paths];
    _paths.splice(index, 1);

    onChange(_paths);
  };

  return(
    <Fragment>
      {items.length > 0 ?
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List style={_getListStyle(snapshot.isDraggingOver)}>
                  {items.map((item, index) => (
                    <Item
                      key={item.id}
                      data={item}
                      index={index}
                      onDelete={handleDelete}
                    />
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
        :
        <Skeletons />
      }
    </Fragment>
  );
}

ListFiles.propTypes = {
  items: propTypes.array,
  onChange: propTypes.func,
}

ListFiles.defaultProps = {
  items: [],
  onChange: () => {},
}

export default ListFiles
