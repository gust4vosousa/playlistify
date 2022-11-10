import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import React, { Fragment } from 'react';
import { ITrackListProps } from './TrackListComponent.types';
import { ItemContainer } from './TrackListComponent.styles';

export const TrackListComponent: React.FC<ITrackListProps> = ({ data }) => {
  return (
    <List>
      {data.map((track, index) => {
        const artistsNames = track.artists.map((artist) => artist.name);

        return (
          <Fragment key={track.id}>
            <ItemContainer>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar src={track.album.images[0].url} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${index + 1}. ${track.name}`}
                  secondary={
                    artistsNames.length <= 3
                      ? artistsNames.toString()
                      : artistsNames.slice(0, 2).toString()
                  }
                />
              </ListItem>
            </ItemContainer>
          </Fragment>
        );
      })}
    </List>
  );
};
