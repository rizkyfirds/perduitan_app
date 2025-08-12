"use client";

import { Box, Container, Fab, MenuItem, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatRupiah } from "../page";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";

export const dataPocketsDummy = [
  {
    id: "1",
    pocketName: "Main Pocket",
    description: "Main Pocket",
    color: "#fffff",
    balance: 700000,
    transaction: [
      {
        id: "1",
        name: "laundry",
        date: "12/2/2025",
        bill: 200000,
        type: "EXPENSE",
      },
      {
        id: "1",
        name: "laundry",
        date: "13/2/2025",
        bill: 200000,
        type: "EXPENSE",
      },
    ],
  },
  {
    id: "2",
    pocketName: "Makan",
    description: "buat makan",
    color: "#1976D2",
    balance: 400000,
    transaction: [
      {
        id: "1",
        name: "padang",
        date: "12/2/2025",
        bill: 20000,
        type: "EXPENSE",
      },
      {
        id: "1",
        name: "bubur",
        date: "13/2/2025",
        bill: 10000,
        type: "EXPENSE",
      },
    ],
  },
];

export enum typeTransactionEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

interface transactionInterface {
  id: string;
  name: string;
  date: string;
  bill: number;
  type: typeTransactionEnum;
}

interface pocketDetails {
  id: string;
  pocketName: string;
  description: string;
  color: string;
  balance: number;
  transaction: transactionInterface[];
}

interface newPocketInterface {
  pocketName: string;
  desc: string;
  color: string;
  balance?: number;
  pocketIdSourceBill?: string
}

export default function PocketsPage() {
  const [open, setOpen] = React.useState(false);
  const [openAddPocket, setOpenAddPocket] = React.useState(true);
  const [selectedPocketNameToAddBalance, setSelectedPocketNameToAddBalance] =
    React.useState("Main Pocket");

  const [colorHex, setColorHex] = React.useState("#ffffff");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorHex(event.target.value);
  };

  const selectedPocketToAddBalance = dataPocketsDummy.find(
    (pocket) => pocket.pocketName === selectedPocketNameToAddBalance
  );

  const [dataSelected, setDataSelect] = React.useState<pocketDetails>({
    id: "1",
    pocketName: "Main Pocket",
    description: "Main Pocket",
    color: "#fffff",
    balance: 700000,
    transaction: [
      {
        id: "1",
        name: "laundry",
        date: "12/2/2025",
        bill: 200000,
        type: typeTransactionEnum.EXPENSE,
      },
      {
        id: "1",
        name: "laundry",
        date: "13/2/2025",
        bill: 200000,
        type: typeTransactionEnum.EXPENSE,
      },
    ],
  });

  const handleCloseDialog = () => {
    setOpen(!open);
  };

  const handleCloseAddDialog = () => {
    setOpenAddPocket(!openAddPocket);
  };

  const handleAddPocket = (data: newPocketInterface) => {
    if (data.balance && data.pocketIdSourceBill){
      dataPocketsDummy.find((d) => d.id = data.pocketIdSourceBill!)
    }
  };

  return (
    <>
      <Container sx={{ paddingY: "12px" }}>
        <Grid container spacing={2}>
          {dataPocketsDummy.map((pocket) => (
            <Paper
              key={pocket.id}
              elevation={6}
              sx={{
                backgroundColor: pocket.color,
                padding: "32px",
                width: "33.33%",
              }}
              onClick={() => {
                setOpen(!open);
                setDataSelect(pocket);
              }}
            >
              <Grid container spacing={2} alignItems={"center"}>
                <CreditCardRoundedIcon />
                <Typography variant="h5" fontWeight={700}>
                  {pocket.pocketName}
                </Typography>
              </Grid>
              <Typography variant="body1">
                Rp {formatRupiah(pocket.balance)}
              </Typography>
              <Typography variant="body2">{pocket.description}</Typography>
            </Paper>
          ))}
        </Grid>
        <div className="absolute bottom-5 right-5">
          <Fab
            variant="extended"
            size="large"
            color="primary"
            onClick={() => setOpenAddPocket(!openAddPocket)}
          >
            <AddCardRoundedIcon /> Add Pocket
          </Fab>
        </div>
      </Container>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleCloseDialog();
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <DialogTitle
            variant="h3"
            textAlign={"center"}
            sx={{
              fontFamily: "var(--font-display)",
            }}
          >
            {dataSelected.pocketName}
          </DialogTitle>
          <DialogContent sx={{ padding: "4px" }}>
            <DialogContentText
              textAlign={"center"}
              variant="body1"
              sx={{
                fontFamily: "var(--font-display)",
              }}
            >
              {dataSelected.description}
            </DialogContentText>
            <DialogContentText
              textAlign={"center"}
              variant="h6"
              sx={{
                fontFamily: "Futura Display, sans-serif",
                color: "var(--soft-black)",
              }}
            >
              Rp {formatRupiah(dataSelected.balance)}
            </DialogContentText>
            {/* <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          </DialogContent>
          <DialogActions sx={{ marginY: "20px" }}>
            <Button
              color="error"
              sx={{
                gap: "10px",
                backgroundColor: "var(--green-primary)",
                color: "black",
                fontFamily: "var(--font-display)",
              }}
            >
              <AddCircleRoundedIcon />
              Tambah Uang
            </Button>
            <Button
              sx={{
                gap: "10px",
                backgroundColor: "var(--green-primary)",
                color: "black",
              }}
              className="font-display"
            >
              <ExitToAppRoundedIcon />
              Pindahkan Uang
            </Button>
          </DialogActions>
          <TableContainer component={Paper} sx={{ borderRadius: "0.3rem" }}>
            <Table sx={{}} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "var(--green-primary)" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    className="font-display"
                    align="center"
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    className="font-display"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    className="font-display"
                    align="center"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    className="font-display"
                    align="center"
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSelected.transaction?.map((data, i) => {
                  return (
                    <TableRow
                      key={data.id}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell align="center">{data.date}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            data.type == typeTransactionEnum.INCOME
                              ? "var(--green-primary"
                              : "var(--red-minus)",
                          fontFamily: "Futura Display, sans-serif",
                          fontSize: "15px",
                        }}
                      >
                        Rp {formatRupiah(data.bill)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
      {openAddPocket && (
        <Dialog open={openAddPocket} onClose={handleCloseAddDialog}>
          <Box
            component="form"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              console.log("email");
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              console.log(formJson);
              handleAddPocket(formJson)
              handleCloseAddDialog();
            }}
            sx={{ p: 2 }}
          >
            <DialogTitle
              variant="h3"
              textAlign="center"
              sx={{ fontFamily: "var(--font-display)" }}
            >
              {dataSelected.pocketName}
            </DialogTitle>
            <DialogContent sx={{ padding: "4px" }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="pocketName"
                label="Pocket Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                id="desc"
                name="desc"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
              />
              <div className="flex gap-x-3">
                <TextField
                  margin="dense"
                  id="balance"
                  name="balance"
                  label="Add Balance"
                  type="number"
                  variant="outlined"
                  className="w-2/3"
                  inputProps={{
                    max: selectedPocketToAddBalance?.balance,
                  }}
                  helperText={
                    selectedPocketToAddBalance
                      ? `Max: ${selectedPocketToAddBalance.balance.toLocaleString()}`
                      : "Please select a pocket"
                  }
                />
                <TextField
                  select
                  margin="dense"
                  label="Select"
                  name="selectedPocket"
                  defaultValue="1"
                  className="w-1/3"
                  onChange={(e) =>
                    setSelectedPocketNameToAddBalance(e.target.value)
                  }
                >
                  {dataPocketsDummy.map((pocket) => (
                    <MenuItem key={pocket.id} value={pocket.id}>
                      {pocket.pocketName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <input
                  type="color"
                  value={colorHex}
                  onChange={handleColorChange}
                  style={{
                    width: 40,
                    height: 40,
                    border: "none",
                    background: "none",
                  }}
                />

                <TextField
                  label="Hex Color"
                  variant="outlined"
                  value={colorHex}
                  name="colorHex"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: 150 }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ marginY: "20px", justifyContent: "center" }}>
              <Button
                type="submit"
                color="error"
                sx={{
                  gap: "10px",
                  backgroundColor: "var(--green-primary)",
                  color: "white",
                  fontFamily: "var(--font-display)",
                }}
              >
                <AddCircleRoundedIcon />
                Add Pocket
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </>
  );
}
