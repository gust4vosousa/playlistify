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
import React, { Fragment } from 'react';
import { InputComponent } from '../../components/Input/InputComponent';
import { ButtonContainer, ModalContainer } from './PlaylistModal.styles';
import { EFormFields, IPlaylistModalProps } from './PlaylistModal.types';

export const PlaylistModal: React.FC<IPlaylistModalProps> = (props) => {
  const { open, isBusy, values, onChange, onHandleClose, onHandleSubmit } =
    props;

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
                  value={values.name}
                  onChange={(value) => onChange(value, EFormFields.name)}
                />
              </Box>

              <Box style={{ marginTop: 10 }}>
                <Typography>Quer adicionar uma descrição?</Typography>
                <InputComponent
                  label='Descrição (opcional)'
                  value={values.description}
                  onChange={(value) => onChange(value, EFormFields.description)}
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
                      checked={values.public}
                      onChange={() =>
                        onChange(!values.public, EFormFields.public)
                      }
                    />
                  }
                  label='Playlist pública'
                />
                <ButtonContainer>
                  <Button
                    disabled={!values.name}
                    onClick={onHandleSubmit}
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
