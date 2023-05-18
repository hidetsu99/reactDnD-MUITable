import { IUser } from "@/components/ReactTable";
import axios, { AxiosRequestConfig } from "axios";

const getUsers = async ({ ...config }: AxiosRequestConfig) => {
	return await axios
		.get<IUser[]>("https://jsonplaceholder.typicode.com/users", config ?? null)
		.then((res) => res.data);
};

export { getUsers };
