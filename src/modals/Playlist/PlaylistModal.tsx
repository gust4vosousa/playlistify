import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fade,
  FormControlLabel,
  Modal,
  Typography
} from '@material-ui/core';
import UploadIcon from '@mui/icons-material/Upload';
import React, { Fragment, useState } from 'react';
import { InputComponent } from '../../components/Input/InputComponent';
import { ButtonContainer, ModalContainer } from './PlaylistModal.styles';
import { IPlaylistModalProps } from './PlaylistModal.types';

export const PlaylistModal: React.FC<IPlaylistModalProps> = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const { open, isBusy, onHandleClose, onHandleSubmit } = props;

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
        <ModalContainer>
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
                <ButtonContainer>
                  <Button
                    disabled={!name}
                    onClick={() =>
                      onHandleSubmit({ name, description, public: isPublic })
                    }
                    color='inherit'
                  >
                    <UploadIcon style={{ marginRight: 4 }} />
                    Enviar
                  </Button>
                </ButtonContainer>
              </Box>
            </Fragment>
          )}
        </ModalContainer>
      </Fade>
    </Modal>
  );
};
