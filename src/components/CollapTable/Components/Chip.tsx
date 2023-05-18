import React from "react";
import { Chip as ChipCom } from "@mui/material";
import { useDrag } from "react-dnd";
import { IChip } from "../Table";
type Props = {
	label: string;
	data: IChip;
	children?: React.ReactNode;
};

export default function Chip({ children, label = "Not found", data }: Props) {
	const [{ isDragging }, drag, preview] = useDrag(
		() => ({
			type: "CHIP",
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: data,
			end(draggedItem, monitor) {
				console.log(draggedItem, monitor);
			},
		}),
		[]
	);

	return <ChipCom label={label} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} />;
}
