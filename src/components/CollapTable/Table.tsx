"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDrop } from "react-dnd";
import { Chip, DroppableZone } from "./Components";

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
	price: number,
	history: { date: string; customerId: string; amount: number }[]
) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history,
	};
}

export interface IChip {
	date: string;
	customerId: string;
	amount: number;
}

function Row(props: { row: ReturnType<typeof createData> }) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	const [chipList, setChipList] = React.useState<IChip[]>(row.history);

	const [{ isOver }, dropRef] = useDrop({
		accept: "CHIP",
		drop: (item: IChip) => {
			setChipList((chipsPrevState) =>
				!chipsPrevState.includes(item) ? [...chipsPrevState, item] : chipsPrevState
			);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
			{/* <TableCell>

</TableCell> */}
			<TableCell component="th" scope="row">
				{row.name}
			</TableCell>
			<TableCell align="right">{row.calories}</TableCell>
			<TableCell align="right">{row.fat}</TableCell>
			<TableCell align="right">{row.carbs}</TableCell>
			<TableCell align="right">
				<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
				{row.protein}
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{}} ref={dropRef}>
							{chipList.map((item, index) => (
								<Chip key={item.date} label={item.customerId} data={item} />
							))}
							<DroppableZone />
							{isOver && <h2>Drop here</h2>}
						</Box>
					</Collapse>
				</TableCell>
			</TableCell>
		</TableRow>
	);
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99, [
		{
			date: "2020-01-05",
			customerId: "primer",
			amount: 3,
		},
		{
			date: "2020-01-02",
			customerId: "Anonymous",
			amount: 1,
		},
	]),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99, [
		{
			date: "2020-01-05",
			customerId: "segudno",
			amount: 3,
		},
		{
			date: "2020-01-02",
			customerId: "Anonymous",
			amount: 1,
		},
	]),
	createData("Eclair", 262, 16.0, 24, 6.0, 3.79, [
		{
			date: "2020-01-05",
			customerId: "tercero",
			amount: 3,
		},
		{
			date: "2020-01-02",
			customerId: "Anonymous",
			amount: 1,
		},
	]),
	createData("Cupcake", 305, 3.7, 67, 4.3, 2.5, [
		{
			date: "2020-01-05",
			customerId: "cuarto",
			amount: 3,
		},
		{
			date: "2020-01-02",
			customerId: "Anonymous",
			amount: 1,
		},
	]),
	createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5, [
		{
			date: "2020-01-05",
			customerId: "sexto",
			amount: 3,
		},
		{
			date: "2020-01-02",
			customerId: "Anonymous",
			amount: 1,
		},
	]),
];

export default function CollapsibleTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						{/* <TableCell /> */}
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
						<TableCell align="right">Carbs&nbsp;(g)</TableCell>
						<TableCell align="right">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
