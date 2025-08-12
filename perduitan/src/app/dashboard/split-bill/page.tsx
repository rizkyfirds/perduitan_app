"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Snackbar from "@mui/material/Snackbar";

export default function SplitBillPage() {
  const [total, setTotal] = React.useState<number | "">();
  const [percentageSetting, setPercentageSetting] =
    React.useState<boolean>(false);
  const [viewResult, setViewResult] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [people, setPeople] = React.useState<
    { name: string; percentage: number; bill: number }[]
  >([
    { name: "", percentage: 0, bill: 0 },
    { name: "", percentage: 0, bill: 0 },
  ]);

  const handleAddPerson = () => {
    setPeople([...people, { name: "", percentage: 0, bill: 0 }]);
  };

  const handleRemovePerson = (index: number) => {
    const newPeople = people.filter((_, i) => i !== index);
    setPeople(newPeople);
  };

  const handlePersonChange = (index: number, field: string, value: string) => {
    const updated = [...people];
    updated[index] = {
      ...updated[index],
      [field]: field === "percentage" ? Number(value) : value,
    };
    setPeople(updated);
  };

  const handleEqualSplit = () => {
    if (!percentageSetting) {
      const numericTotal = typeof total === "number" ? total : 0;
      const equalShare = numericTotal / people.length;
      const updated = people.map((p) => ({
        ...p,
        bill: Number(equalShare.toFixed(2)),
      }));
      setPeople(updated);
    } else {
      const allPercentage = people.reduce(
        (total, p) => total + p.percentage,
        0
      );
      if (allPercentage != 100) {
        return setShowSnackbar(true);
      }
      const numericTotal = typeof total === "number" ? total : 0;
      const updated = people.map((p) => {
        const billPerPerson = numericTotal * (p.percentage / 100);
        return {
          ...p,
          bill: Number(billPerPerson.toFixed(2)),
        };
      });
      setPeople(updated);
    }
    setViewResult(true);
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Paper
        elevation={5}
        sx={{ borderRadius: "2rem" }}
        className="p-6 w-full max-w-2xl min-h-fit max-h-[95%] grid gap-y-2 overflow-y-auto"
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "8px", fontWeight: "bold" }}
          className="text-center font-display"
        >
          Split Bill
        </Typography>

        <TextField
          fullWidth
          label="Total Amount"
          type="number"
          value={total}
          onChange={(e) =>
            setTotal(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="mb-4"
        />

        {people.map((person, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={index}
            className="mb-2"
          >
            <Grid item xs={5}>
              <Typography
                variant="h6"
                sx={{ marginRight: "5px", width: "10px" }}
                className="text-center font-display"
              >
                {index + 1}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Name"
                value={person.name}
                onChange={(e) =>
                  handlePersonChange(index, "name", e.target.value)
                }
                fullWidth
              />
            </Grid>
            {percentageSetting && (
              <Grid item xs={5}>
                <TextField
                  label="Percentage"
                  value={person.percentage}
                  onChange={(e) =>
                    handlePersonChange(index, "percentage", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <IconButton
                onClick={() => handleRemovePerson(index)}
                color="error"
              >
                <RemoveCircle sx={{ color: "#E74C3C" }} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <div className="flex justify-between mt-4">
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={handleAddPerson}
            sx={{ fontWeight: "bold", backgroundColor: "#27AE60" }}
          >
            Add Person
          </Button>
          <Button
            variant="contained"
            sx={
              percentageSetting
                ? {
                    backgroundColor: "#E74C3C",
                    color: "white",
                    fontWeight: "bold",
                  }
                : { fontWeight: "bold", backgroundColor: "#27AE60" }
            }
            startIcon={
              !percentageSetting ? <AddCircle /> : <RemoveCircleRoundedIcon />
            }
            onClick={() => setPercentageSetting(!percentageSetting)}
          >
            {!percentageSetting ? "Add " : "Remove "}Setting Percentage
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1E8449",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleEqualSplit}
          >
            Split Equally
          </Button>
        </div>
        {viewResult && (
          <div className="mt-6">
            <Typography variant="subtitle1" className="font-semibold">
              Result:
            </Typography>
            {people.map((p, i) => (
              <Typography key={i}>
                {p.name || `Person ${i + 1}`}: Rp {p.bill}
              </Typography>
            ))}
          </div>
        )}
      </Paper>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Total Count of Percentage Must Be equal to 100"
      />
    </div>
  );
}
