import React, {useEffect, shouldComponentUpdate} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = async(confirmDelete) => {
    await props.deletarJogo(props.jogo, confirmDelete)
    setOpen(false)
  };
  
  const capitalizarPrimeiraLetra = (string) => {
    return string.replace(/\w/, c => c.toUpperCase())
  }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {capitalizarPrimeiraLetra(props.jogo.nome)} será excluído para sempre!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Sim
          </Button>
          <Button onClick={() => handleClose(false)} color="primary">
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.defaultProps = { show: true, jogo: {
  nome:'',
  id:''
}};
