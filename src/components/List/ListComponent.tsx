import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material';
import React from 'react';
import { ListContainer } from './ListComponent.styles';
import { IArtistListProps } from './ListComponent.types';

export const ArtistListComponent: React.FC<IArtistListProps> = ({
  data,
  handleSelect
}) => {
  return (
    <ListContainer>
      <List>
        {data.map((artist) => (
          <ListItem key={artist.id} disablePadding>
            <ListItemButton onClick={() => handleSelect(artist)}>
              <ListItemAvatar>
                <Avatar src={artist.images[0]?.url} />
              </ListItemAvatar>
              <ListItemText primary={artist.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};
