import {
  Box,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Checkbox,
  Button,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { InputComponent } from '../../components/Input/InputComponent';
import { theme } from '../../theme/variables';
import { IPlaylistModalProps } from './PlaylistModal.types';

export const PlaylistModal: React.FC<IPlaylistModalProps> = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const { open, isBusy, onHandleClose, onHandleSubmit } = props;

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
          {isBusy ? (
            <CircularProgress />
          ) : (
            <Fragment>
              <Typography variant='h6' component='h2'>
                Quase lá! só preciso saber mais algumas coisinhas
              </Typography>
              <Box style={{ marginTop: 10 }}>
                <Typography>Qual o nome da playlist?</Typography>
                <InputComponent
                  label='Nome'
                  value={name}
                  onChange={(value) => setName(value)}
                />
              </Box>

              <Box style={{ marginTop: 10 }}>
                <Typography>Quer adicionar uma descrição?</Typography>
                <InputComponent
                  label='Descrição (opcional)'
                  value={description}
                  onChange={(value) => setDescription(value)}
                />
              </Box>

              <Box
                style={{
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                    />
                  }
                  label='Playlist pública'
                />
                <Button
                  disabled={!name}
                  onClick={() =>
                    onHandleSubmit({ name, description, public: isPublic })
                  }
                >
                  Enviar
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};
