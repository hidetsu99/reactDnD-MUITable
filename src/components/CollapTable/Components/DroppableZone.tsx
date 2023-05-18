import React from "react";
import { useDrop } from "react-dnd";

type Props = {
	children?: React.ReactNode;
};

export default function DroppableZone({}: Props) {
	const [{ isOver, canDrop, sayHello }, drop] = useDrop({
		accept: "CHIP",
		canDrop: (item, monitor) => {
			console.log("🚀 ~ file: DroppableZone.tsx:12 ~ DroppableZone ~ item, monitor:", item, monitor);
			console.log(item, monitor);
			return true;
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
			sayHello: monitor.didDrop(),
		}),
	});

	return <div ref={drop}></div>;
}
