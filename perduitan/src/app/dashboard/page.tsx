"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const formatRupiah = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ".00";
};

export default function DashboardPage() {
  const dataSaldo = [
    {
      name: "Total money",
      saldo: "700.000.00",
    },
    {
      name: "Total Income",
      saldo: "500.000.00",
    },
    {
      name: "Total Expenese",
      saldo: "200.000.00",
    },
  ];

  // Dummy data
  const dataDum = [
    { month: "Jan", income: 400000, expense: 200000 },
    { month: "Feb", income: 300000, expense: 150000 },
    { month: "Mar", income: 500000, expense: 300000 },
    // Tambahkan data lainnya
  ];

  function createData(
    name: string,
    dateBuy: Date,
    price: number,
    income: boolean
  ) {
    return { name, dateBuy, price, income };
  }

  const rows = [
    createData("Frozen yoghurt", new Date(), 10000, true),
    createData("Ice cream sandwich", new Date(), 10000, false),
    createData("Cupcake", new Date(), 20000, true),
  ];

  

  return (
    <Container sx={{padding: "12px"}}>
      <div className="flex gap-x-4 w-full justify-between">
        {dataSaldo.map((data, i) => {
          return (
            <>
              <Box
                component="section"
                sx={{
                  p: 5,
                  borderRadius: "1rem",
                  backgroundColor: "#F4F4F4",
                  boxShadow: 3,
                }}
                className="w-full h-fit"
                
              >
                <Typography variant="h6" className="text-center font-display">
                  {data.name}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Futura Display, sans-serif",
                    color:
                      data.name === "Total Income"
                        ? "var(--green-primary)"
                        : data.name === "Total Expenese"
                        ? "var(--red-minus)"
                        : "var(--soft-black)",
                  }}
                  className="text-center"
                >
                  {data.saldo}
                </Typography>
              </Box>
            </>
          );
        })}
      </div>
      <div className="flex w-full py-3 gap-x-3">
        <Box
          sx={{
            p: 5,
            borderRadius: "1rem",
            backgroundColor: "#F4F4F4",
            boxShadow: 1,
            width: "160%",
            height: 400,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
            Cash Flow
          </Typography>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dataDum}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `Rp ${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#7ED957"
                name="Income"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#FF6B6B"
                name="Expense"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: "0.6rem", backgroundColor: "#F4F4F4"}}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#27AE60" }}>
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
              {rows.map((row, i) => (
                <TableRow
                  key={row.name}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">
                    {row.dateBuy.toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.income ? "var(--green-primary)" : "var(--red-minus)",
                      fontFamily: "Futura Display, sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    {formatRupiah(row.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
