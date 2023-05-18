import { ReactTable } from "@/components/ReactTable";
import { getUsers } from "@/utils/http";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(["users"], getUsers);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default function Home({ Component, pageProps }: AppProps) {
	// Getting the users data
	const { data, error, isError } = useQuery({ queryKey: ["users"], queryFn: getUsers });

	// const memorizedData = useMemo(() => {}, []);

	if (isError) <h1> Something went worng </h1>;

	return <ReactTable data={data} />;
}
