import { TableHead, TableRow, TableCell } from "@mui/material";

interface TableProps {
  headLabel: { id: string; label: string }[];
}

export function TableHeadCustom({ headLabel }: TableProps) {
  return (
    <TableHead sx={{ background: "#FCFCFD", fontSize: 12 }}>
      <TableRow>
        {headLabel.map(({ id, label }) => (
          <TableCell sx={{ color: "#344054" }} key={id}>
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
