import MaterialReactTable, { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { useMemo, useState, useCallback } from "react";

import { IUser } from "./interfaces";
import { Box, Typography } from "@mui/material";

// HTTP

interface ITableProps {
	data?: IUser[] | undefined;
	onError?: null;
}

export default function ReactTable({ data }: ITableProps) {
	const [users, setUsers] = useState<IUser[] | undefined>(data);
	console.log("🚀 ~ file: ReactTable.tsx:16 ~ ReactTable ~ users:", users);

	const columns = useMemo<MRT_ColumnDef<IUser>[]>(
		() =>
			[
				{
					header: "Username",
					accessorKey: "username",
				},
				{
					header: "Phone",
					accessorKey: "phone",
					id: "phone",
				},
				{
					header: "company",
					accessorKey: "company.name",
				},
			] as MRT_ColumnDef<IUser>[],
		[]
	);
	if (!users) return <h1>no tengo info todavia :(</h1>;

	return (
		<MaterialReactTable
			columns={columns}
			data={users}
			enableRowSelection
			enableRowOrdering
			enableSorting={false}
			enableMultiRowSelection
			muiTableBodyRowDragHandleProps={({ table }) => ({
				onDragEnd: () => {
					const { draggingRow, hoveredRow } = table.getState();
					if (hoveredRow && draggingRow) {
						users.splice((hoveredRow as MRT_Row<IUser>).index, 0, users.splice(draggingRow.index, 1)[0]);
						setUsers([...users]);
					}
				},
			})}
			renderDetailPanel={({ row }) => (
				<Box
					sx={{
						display: "flex",
						margin: "auto",
						width: "100%",
					}}
				>
					<Typography>Address: {row.original.address.city}</Typography>
					<Typography>City: {row.original.address.zipcode}</Typography>
					<Typography>State: {row.original.address.street}</Typography>
					<Typography>Country: {row.original.address.suite}</Typography>
				</Box>
			)}
		/>
	);
}
