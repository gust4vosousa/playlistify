import { Box, Fade, Modal, Typography, Backdrop, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { InputComponent } from '../../components/Input/InputComponent';
import { theme } from '../../theme/ThemeVariables';
import { IPlaylistModalProps } from './PlaylistModal.types';

export const PlaylistModal: React.FC<IPlaylistModalProps> = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const { open, onHandleClose, onHandleSubmit } = props;

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
            Quase lá! só preciso saber mais algumas coisinhas
          </Typography>
          <InputComponent 
          label='Nome'
                      value={name}
                      onChange={value => setName(value)}
                      />
                      <InputComponent 
          label='Descrição (opcional)'
                      value={name}
                      onChange={value => setName(value)}
                      />
                                                <Checkbox
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                          />
        </Box>
      </Fade>
    </Modal>
  );
};
