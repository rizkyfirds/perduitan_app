import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

export const listMenu = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { name: "New Transaction", icon: <AddCircleOutlineIcon />, path: "/dashboard/transactions" },
  { name: "My Pockets", icon: <WalletIcon />, path: "/dashboard/pockets" },
  { name: "Split Bill", icon: <GroupIcon />, path: "/dashboard/split-bill" },
  { name: "Monthly Report", icon: <BarChartIcon />, path: "/dashboard/report" },
];
