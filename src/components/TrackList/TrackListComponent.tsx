import { List, ListItem, ListItemText, Divider } from '@mui/material';
import React, { Fragment } from 'react';
import { ITrackListProps } from './TrackListComponent.types';
import { ListContainer } from './TrackListComponent.styles';

export const TrackListComponent: React.FC<ITrackListProps> = ({ data }) => {
  return (
    <ListContainer>
      <List>
        {data.map((track, index) => {
          const artistsNames = track.artists.map((artist) => artist.name);

          return (
            <Fragment key={track.id}>
              <ListItem disablePadding>
                <ListItemText
                  primary={`${index + 1}. ${track.name}`}
                  secondary={
                    artistsNames.length <= 3
                      ? artistsNames.toString()
                      : artistsNames.slice(0, 2).toString()
                  }
                />
                <Divider variant='inset' />
              </ListItem>
              <Divider variant='inset' />
            </Fragment>
          );
        })}
      </List>
    </ListContainer>
  );
};
