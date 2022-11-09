import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import React, { Fragment } from 'react';
import { ListContainer } from './ArtistListComponent.styles';
import { IArtistListProps } from './ArtistListComponent.types';
import DeleteIcon from '@mui/icons-material/Delete';

export const ArtistListComponent: React.FC<IArtistListProps> = ({
  data,
  editable,
  handleSelect
}) => {
  return (
    <ListContainer>
      <List>
        {data.map((artist) => (
          <Fragment key={artist.id}>
            <ListItem disablePadding>
              {editable ? (
                <ListItemButton onClick={() => handleSelect(artist)}>
                  <ListItemAvatar>
                    <Avatar src={artist.images[0]?.url} />
                  </ListItemAvatar>
                  <ListItemText primary={artist.name} />
                  <IconButton
                    onClick={() => handleSelect(artist)}
                    color='inherit'
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => handleSelect(artist)}>
                  <ListItemAvatar>
                    <Avatar src={artist.images[0]?.url} />
                  </ListItemAvatar>
                  <ListItemText primary={artist.name} />
                </ListItemButton>
              )}
              <Divider variant='inset' />
            </ListItem>
            <Divider variant='inset' />
          </Fragment>
        ))}
      </List>
    </ListContainer>
  );
};
