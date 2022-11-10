import { Box, Fade, Modal, Typography, Backdrop } from '@material-ui/core';
import React, { useState } from 'react';
import { theme } from '../../theme/ThemeVariables';
import { IPlaylistModalProps } from './PlaylistModal.types';

export const PlaylistModal: React.FC<IPlaylistModalProps> = (props) => {
  const { open, playlistId, onHandleClose, onHandleSubmit } = props;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: `${theme.background.light}`,
    color: `${theme.text.primary}`,
    border: 'none',
    borderRadius: '8px',
    padding: 32
  };

  return (
    <Modal
      open={open}
      onClose={onHandleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box style={{ ...style }}>
          <Typography variant='h6' component='h2'>
            Text in a modal
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
